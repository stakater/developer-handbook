# API Naming

Here are the API naming conventions we must follow:

## MUST: Use lowercase separate words with hyphens for Path Segments

Example:

```
/purchase-orders/{purchase-order-id}
```

This applies to concrete path segments and not the names of path parameters. For example `{purchase_order_id}` would be ok 
as a path parameter.

## MUST: Use snake_case (never camelCase) for Query Parameters

Examples:

```
customer_number, order_id, billing_address
```

## MUST: Use Hyphenated HTTP Headers

## MUST: Pluralize Resource Names

Usually, a collection of resource instances is provided (at least API should be ready here). The special case of a 
resource singleton is a collection with cardinality 1.

## MUST: Avoid Trailing Slashes

The trailing slash must not have specific semantics. Resource paths must deliver the same results whether they have the trailing slash or not.

## MUST: Use Conventional Query Strings

If you provide query support for sorting, pagination, filtering functions or other actions, use the following standardized naming conventions:

- `q` — default query parameter (e.g. used by browser tab completion); should have an entity specific alias, like sku
- `limit` — to restrict the number of entries. See Pagination section below. Hint: You can use size as an alternate query string.
- `cursor` — key-based page start. See Pagination section below.
- `offset` — numeric offset page start. See Pagination section below. Hint: In combination with limit, you can use page as an alternative to offset.
- `sort` — comma-separated list of fields to sort. To indicate sorting direction, fields my prefixed with + (ascending) or - (descending, default), e.g. /sales-orders?sort=+id
- `fields` — to retrieve a subset of fields.
- `embed` — to expand embedded entities (ie.: inside of an article entity, expand silhouette code into the silhouette object). Implementing “expand” correctly is difficult, so do it with care. 

## SHOULD: Prefer Hyphenated-Pascal-Case for HTTP header Fields

This is for consistency in your documentation (most other headers follow this convention). Avoid camelCase (without hyphens). Exceptions are common abbreviations like “ID.”

Examples:

```
Accept-Encoding
Apply-To-Redirect-Ref
Disposition-Notification-Options
Original-Message-ID
```

See also: [HTTP Headers are case-insensitive (RFC 7230)](http://tools.ietf.org/html/rfc7230#page-22).

## COULD: Use Standardized Headers

Use [this list](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields) and mention its support in your OpenAPI definition.

