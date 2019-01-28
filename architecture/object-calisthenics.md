# Object Calisthenics

Object Calisthenics has been introduced the first time by Jeff Bay. Object Calisthenics outlines 9 basic rules to apply when writing code.

The idea of Object Calisthenics is that the high-level concepts and principles of good object-oriented programming can be distilled into low-level rules to follow.

## 1. Only one level of indentation per method

This rule is simple, and applied, greatly reduces complexity.

Just try to keep your method as simple and understandable as you can.

The primary motivation of this rule is that one is not dealing with multiple levels — both indentation and abstraction — at once.

```
class InsertionSort {
    public function sort(array $array) {
        // 1 level
        for ($i = 0; $i < count($array); $i++) {
            // 2 level
            $x = $array[$i];
            for ($j = $i - 1; $j >= 0; $j--) {
                // 3 level
                if ($array[$j] > $x) {
                    $array[$j + 1] = $array[$j];
                    $array[$j] = $x;
                }
            }
        }
        return $array;
    }
}
```

That’s a common example when you can easily spot multiple indentation levels into a method. That’s bad. Bottom line.

You can fix this most of the time, using the Extract Method pattern or in others, composing your objects in order to don’t aggregate all logic in one method. This is also somehow related with Single Responsibility Principle and High Cohesion which are valid as well for methods. If your method has multiple indentation levels, then maybe is not doing only one thing

```
class InsertionSort {
    public function sort(array $array) {
        for ($i = 0; $i < count($array); $i++) {
            $array = $this->insert($array, $i);
        }
        return $array;
    }
    protected function insert(array $array, $i) {
        $x = $array[$i];
        for ($j = $i - 1; $j >= 0; $j--) {
            $array = $this->swap($array, $x, $j);
        }
        return $array;
    }
    protected function swap(array $array, $x, $j) {
        if ($array[$j] > $x) {
            $array[$j + 1] = $array[$j];
            $array[$j] = $x;
        }
        return $array;
   }
}
```

The bottom line: it works. I’ve written much more straightforward code this way, and the result is small methods that can then be pushed out of the current class to the primary object being acted upon, which generally, is the first parameter of the method.

Ever stare at a big old method wondering where to start? A giant method lacks cohesiveness. One guideline is to limit method length to 5 lines, but that kind of transition can be daunting if your code is littered with 500-line monsters. Instead, try to ensure that each method does exactly one thing – one control structure, or one block of statements, per method. If you’ve got nested control structures in a method, you’re working at multiple levels of abstraction, and that means you’re doing more than one thing.

As you work with methods that do exactly one thing, expressed within classes doing exactly one thing, your code begins to change. As each unit in your application becomes smaller, your level of re-use will start to rise exponentially. It can be difficult to spot opportunities for reuse within a method that has five responsibilities and is implemented in 100 lines. A three-line method that manages the state of a single object in a given context is usable in many different contexts. 

Use the Extract Method feature of your IDE to pull out behaviors until your methods only have one level of indentation, like this:

```
class Board {
...
    String board() {
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++)
                buf.append(data[i][j]);
            buf.append(“\n”);
        }
        return buf.toString();
    }
}
```

```
class Board {
...
    String board() {
        StringBuffer buf = new StringBuffer();
        collectRows(buf);
        return buf.toString();
    }

    void collectRows(StringBuffer buf) {
        for (int i = 0; i < 10; i++)
            collectRow(buf, i);
    }

    void collectRow(StringBuffer buf, int row) {
        for (int i = 0; i < 10; i++)
            Buf.append(data[row][i]);
        buf.append(“\n”);
    }
}
```

Notice that another effect has occurred with this refactoring. Each individual method has become virtually trivial to match its implementation to its name. Determining the existence of bugs in these much smaller snippets is frequently much easier.

Here at the end of the first rule, we should also point out that the more you practice applying the rules, the more the advantages come to fruition. Your first attempts to decompose problems in the style presented here will feel awkward and likely lead to little gain you can perceive. There is a skill to the application of the rules – this is the art of the programmer raised to another level.

## 2. Don’t use the “else” keyword

The argument is to reduce the number of branches, keeping long conditional blocks out of the code.

