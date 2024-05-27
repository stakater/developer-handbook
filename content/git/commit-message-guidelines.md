# Commit Message Guideline

A guide to understanding the importance of commit messages and how to write them well.

It may help you to learn what a commit is, why it is important to write good messages, best practices and some tips to plan and (re)write a good commit history.

## What is a "commit"?

In simple terms, a commit is a _snapshot_ of your local files, written in your local repository.
Contrary to what some people think, [git doesn't store only the difference between the files, it stores a full version of all files](https://git-scm.com/book/en/v2/Appendix-C%3A-Git-Commands-Basic-Snapshotting).
For files that didn't change from one commit to another, git stores just a link to the previous identical file that is already stored.

## Why are commit messages important?

- To speed up and streamline code reviews
- To help in the understanding of a change
- To explain "the whys" that cannot be described only with code
- To help future maintainers figure out why and how changes were made, making troubleshooting and debugging easier

To maximize those outcomes, we can use some good practices and standards described in the next section.

## Good practices

These are some practices collected from my experiences, internet articles, and other guides. If you have others (or disagree with some) feel free to open a Pull Request and contribute.

### Use imperative form

Good: Use InventoryBackendPool to retrieve inventory backend

Bad: Used InventoryBackendPool to retrieve inventory backend

_But why use the imperative form?_

A commit message describes what the referenced change actually **does**, its effects, not what was done.

[This excellent article from Chris Beams](https://chris.beams.io/posts/git-commit/) gives us a simple sentence that can be used to help us write better commit messages in imperative form:

`If applied, this commit will <commit message>`

Examples:

Good: If applied, this commit will use InventoryBackendPool to retrieve inventory backend

Bad: If applied, this commit will used InventoryBackendPool to retrieve inventory backend

### Capitalize the first letter

Good: Add `use` method to Credit model

Bad: add `use` method to Credit model

The reason that the first letter should be capitalized is to follow the grammar rule of using capital letters at the beginning of sentences.

The use of this practice may vary from person to person, team to team, or even from language to language.
Capitalized or not, an important point is to stick to a single standard and follow it.

### Try to communicate what the change does without having to look at the source code

Good: `Add "use" method to Credit model`

Bad: `Add "use" method`

Good: `Increase left padding between text-box and layout frame`

Bad: `Adjust css`

It is useful in many scenarios (e.g. multiple commits, several changes and refactors) to help reviewers understand what the committer was thinking.

### Use the message body to explain "why", "for what", "how" and additional details

Good:

```txt
Fix method name of InventoryBackend child classes

Classes derived from InventoryBackend were not
respecting the base class interface.

It worked because the cart was calling the backend implementation
incorrectly.
```

Good:

```txt
Serialize and deserialize credits to JSON in Cart

Convert the Credit instances to dict for two main reasons:

  - Pickle relies on file path for classes and we do not want to break up
    everything if a refactor is needed
  - Dict and built-in types are pickleable by default
```

Good:

```txt
Add `use` method to Credit

Change from namedtuple to class because we need to
setup a new attribute (in_use_amount) with a new value
```

The subject and the body of the messages are separated by a blank line.
Additional blank lines are considered as a part of the message body.

Characters like `-`, `*` and \` are elements that improve readability.

### Avoid generic messages or messages without any context

Bad:

```txt
Fix this

Fix stuff

It should work now

Change stuff

Adjust css
```

### Limit the number of characters

[It's recommended](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines) to use a maximum of 50 characters for the subject and 72 for the body.

### Keep language consistency

For project owners: Choose a language and write all commit messages using that language. Ideally, it should match the code comments, default translation locale (for localized projects), etc.

For contributors: Write your commit messages using the same language as the existing commit history.

Good:

```txt
ababab Add `use` method to Credit model
efefef Use InventoryBackendPool to retrieve inventory backend
bebebe Fix method name of InventoryBackend child classes
```

Good:

```txt
ababab Adiciona o método `use` ao model Credit
efefef Usa o InventoryBackendPool para recuperar o backend de estoque
bebebe Corrige nome de método na classe InventoryBackend
```

Bad - mixes English and Portuguese:

```txt
ababab Usa o InventoryBackendPool para recuperar o backend de estoque
efefef Add `use` method to Credit model
cdcdcd Agora vai
```

### Template

This is a template, [written originally by Tim Pope](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html), which appears in the [_Pro Git Book_](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).

```txt
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

## References

- [`Romulo Oliveira`](https://github.com/RomuloOliveira)
- [Commit messages guide](https://github.com/RomuloOliveira/commit-messages-guide/blob/master/README.md)
