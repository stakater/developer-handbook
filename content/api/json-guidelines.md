# JSON Guidelines

These guidelines provides recommendations for defining JSON data. JSON here refers to [RFC 7159](http://www.rfc-editor.org/rfc/rfc7159.txt) (which updates [RFC 4627](https://www.ietf.org/rfc/rfc4627.txt)),
the `application/json` media type and custom JSON media types defined for APIs. The guidelines clarifies some specific
cases to allow JSON data to have an idiomatic form across teams and services.

## Must: Use Consistent Property Names

## Must: Property names must be snake case (and never `camelCase`)

No established industry standard exists, but many popular Internet companies prefer snake case: e.g. GitHub, Stack Exchange,
Twitter. Others, like Google and Amazon, use both - but not only `camelCase`. It’s essential to establish a consistent look and
feel such that JSON looks as if it came from the same hand.

## Must: Property names must be an ASCII subset

Property names are restricted to ASCII encoded strings. The first character must be a letter, an underscore or a dollar sign,
and subsequent characters can be a letter, an underscore, a dollar sign, or a number.

## Must: Use Consistent Property Values

## Must: boolean property values must not be null

Schema based JSON properties that are by design booleans must not be presented as nulls. A boolean is essentially a closed
enumeration of two values, true and false. If the content has a meaningful null value, strongly prefer to replace the boolean
with enumeration of named values or statuses - for example `accepted_terms_and_conditions` with true or false can be replaced
with `terms_and_conditions` with values yes, no and unknown.

## Must: Date property values should conform to RFC 3399

Use the date and time formats defined by [RFC 3339](http://tools.ietf.org/html/rfc3339#section-5.6):

- for "date" use strings matching `date-fullyear "-" date-month "-" date-mday`, for example: `2015-05-28`
- for "date-time" use strings matching `full-date "T" full-time`, for example `2015-05-28T14:07:17Z`

Note that the [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types) format
"date-time" corresponds to "date-time" in the RFC) and `2015-05-28` for a date (note that the OpenAPI format "date" corresponds
to "full-date" in the RFC). Both are specific profiles, a subset of the international standard [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601).

A zone offset may be used (both, in request and responses) -- this is simply defined by the standards. However, we encourage
restricting dates to UTC and without offsets. For example `2015-05-28T14:07:17Z` rather than `2015-05-28T14:07:17+00:00`. From
experience we have learned that zone offsets are not easy to understand and often not correctly handled. Note also that zone
offsets are different from local times that might be including daylight saving time. Localization of dates should be done by
the services that provide user interfaces, if required.

When it comes to storage, all dates should be consistently stored in UTC without a zone offset. Localization should be done
locally by the services that provide user interfaces, if required.

Sometimes it can seem data is naturally represented using numerical timestamps, but this can introduce interpretation issues
with precision - for example whether to represent a timestamp as 1460062925, 1460062925000 or 1460062925.000. Date strings,
though more verbose and requiring more effort to parse, avoid this ambiguity.

## Must: Standards must be used for Language, Country and Currency

- [ISO 3166-1-alpha2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country (It's "GB", not "UK")
- [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code; [BCP-47](https://tools.ietf.org/html/bcp47) (based on ISO 639-1) for language variants
- [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency codes

## Should: Reserved JavaScript keywords should be avoided

Most API content is consumed by non-JavaScript clients today, but for security and sanity reasons, JavaScript (strictly, ECMAScript) keywords are worth avoiding. A list of keywords can be found in the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-reserved-words).

## Should: Array names should be pluralized

To indicate they contain multiple values prefer to pluralize array names. This implies that object names should in turn be singular.

## Should: Null values should not have their fields removed

## Should: Empty array values should not be null

Empty array values can unambiguously be represented as the empty list: `[]`

## Should: Enumerations should be represented as Strings

Strings are a reasonable target for values that are by design enumerations.
