# Logging

Annotate any class with a `@Slf4j` annotation to let lombok generate a logger field. The logger is named `log`.

`@Slf4j`

Creates:

```
private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);
```

Here is a complete example:

```
@Slf4j
public class LogExampleOther {
  
  public static void main(String... args) {
    log.error("Something else is wrong here");
  }
}
```

[Reference](https://projectlombok.org/features/log)
