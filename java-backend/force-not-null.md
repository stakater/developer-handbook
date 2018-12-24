# Force not null
Having the freedom to return `null` is the root cause for most `NullPointerExceptions`. It also makes the client code for any API or method etc dirty by having a lot of `null` checks.

# Solution
* If you feel the need for a `null` while using your own code (i.e. excluding external libraries). Rethink the implementation of that part to not return `null`
* Force IDE/Compiler to not allow returning `null`. It will complain whenever you return or pass in a value that is `null` or can be `null`
https://github.com/osundblad/intellij-annotations-instrumenter-maven-plugin
* It boosts developer's confidence by not worrying about NPE while coding. 
* For exceptional cases where you really need that `null` you can use the `@Nullable` annotation, it also makes it clear to other developers that there could be a `null` value which they should handle. 
