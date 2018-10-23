# DateTime

- Always use `java.util.Date`! Domain shouldn’t need to care about timezone! `java.util.date` is the safest and best way to store stuff in data stores.
- TimeZone is a presentation concern; and presentation should bother about it and take care of it. Backend should be free of timezone and should only contain datetime in UTC format.
- Always use `UTC` timezone
- Always use `ISO-8601` for your dates; `spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS = false`
- Accept any timezone
- Store it in `UTC`
- Return it in `UTC`
- Don’t use time if you don’t need it!
