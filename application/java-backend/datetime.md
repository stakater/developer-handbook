# DateTime

Let’s say you’re building your first API. Be it public, private, or some hybrid thereof, don’t be surprised if your first defect is date/time-related. Do not underestimate how much trouble you can get into when it comes to handling date and times. Here are some tips which might keep you out of this potential future.

- Always use `java.util.Date`! Domain shouldn’t need to care about timezone! `java.util.date` is the safest and best way to store stuff in data stores.
- TimeZone is a presentation concern; and presentation should bother about it and take care of it. Backend should be free of timezone and should only contain datetime in UTC format.
- Always use `UTC` timezone
- Always use `ISO-8601` for your dates and set this property: `spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS = false`
- Accept any timezone
- Store it in `UTC` in `ISO-8601`
- Return it in `UTC` in `ISO-8601`
- Don’t use time if you don’t need it!

You should return an absolute point in time, then anyone can localize that timestamp as needed. By "absolute timestamp" I mean either a UNIX timestamp or a human readable timestamp which includes the timezone in one of the standardized ISO formats, e.g. IS0-8601 "2007-04-05T14:30:35Z". This can trivially be converted to a local timezone by the client as necessary.

Dealing with timezones is notoriously difficult and the technical options are wide open.

## What is ISO-8601?

Generally, ISO-8601 looks something like `2009-05-20` for dates and `2009-05-20T12:30:30Z` for date/time combinations.

## How to get current in UTC in ISO-8601 on backend in Java?

Convert Date String to/from ISO 8601 respecting UTC in Java.

```
public static String toISO8601UTC(Date date) {
  TimeZone tz = TimeZone.getTimeZone("UTC");
  DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
  df.setTimeZone(tz);
  return df.format(date);
}

public static Date fromISO8601UTC(String dateStr) {
  TimeZone tz = TimeZone.getTimeZone("UTC");
  DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");
  df.setTimeZone(tz);
  
  try {
    return df.parse(dateStr);
  } catch (ParseException e) {
    // TODO: throw exception
  }
  
  // TODO: throw exception
}
```

## How to do conversion on frontend?

We’ll do the conversion in JS – but it’s worth understanding that, for read operations, the server still returns UTC dates.

[Moment.js](http://momentjs.com/) helps here with the timezone conversion.

This code should work (haven't tested it on browser)

```
function convertDate(date){
    // this will return UTC
    var serverTimezone = [[${#dates.format(#calendars.createToday(), 'z')}]];
    // datetime recieved over API in UTC
    var serverDate = moment.tz(date, serverTimezone);
    // user browser to get client time zone (plz read the section below)
    var clientTimezone = moment.tz.guess();
    var clientDate = serverDate.clone().tz(clientTimezone);
    // example sample format
    var myformat = "YYYY-MM-DD HH:mm";
    return clientDate.format(myformat);
}
```

### How to find the timezone of the client?

The question is if server is always returning UTC then how do I convert in the browser into client timezone? How do I find the timezone?

You can use:

```
moment-timezone
<script src="moment.js"></script>
<script src="moment-timezone-with-data.js"></script>
```

```
// retrieve timezone by name (i.e. "America/Chicago")
moment.tz.guess();
```

Browser time zone detection is rather tricky to get right, as there is little information provided by the browser.

Moment Timezone uses Date.getTimezoneOffset() and Date.toString() on a handful of moments around the current year to gather as much information about the browser environment as possible. It then compares that information with all the time zone data loaded and returns the closest match. In case of ties, the time zone with the city with largest population is returned.

```
console.log(moment.tz.guess()); // America/Chicago
```

This is the only one that gives the actual timezone name rather than offset. Remember that timezone offset can be derived from the name, the opposite isn't true. Because of DST and other subtleties, multiple timezones can have the same offset on some specific days of the year only. 

## References

- [The 5 laws of API dates and times](http://apiux.com/2013/03/20/5-laws-api-dates-and-times/)
- [Show date in users timezone](https://www.baeldung.com/reddit-app-show-date-in-the-users-timezone)
