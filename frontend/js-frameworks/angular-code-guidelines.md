# Angular Code Guidelines

Building an application and building an application with manageable/scalable code are 2 different things. Despite being an opinionated framework Angular requires some practices on developer's end to be adopted so that the code written is maintainable and scalable.

Every Angular developer must go through [Angular's Official Style Guide](https://angular.io/guide/styleguide) at least once. It's complete set of rules and is very well written with recommendations including What to **DO**, **AVOID** and **CONSIDER**. And I'll be discussing some of the topics from the guide breifly.

## Variables, Properties & Methods

- Use `let` & `const` instead of `var` as var is function scoped whereas let and const are blocked scoped. let is immutable whereas const isn't.
- Don't use \_ (underscore) for private methods or properties as Typescript has it covered.
- Place `private` members after `public` members, make sure they are in alphabetic order. (I place ngOnDestroy at the end of file as I find it convenient because that's where the clean up of component takes place normally)
- Write small methods - no more than **75** lines of code
- Specify properties and variables types

## LIFT Pattern

Read this: [LIFT Pattern in Single Page Applications](/frontend/architecture/spa-applications-architecture.html#use-of-lift-pattern).

## Comments

Make a practice of adding comments on top of your methods.

```ts
/**
 * @description Checks if the user is verified or not
 *
 * @param string username - the username to be verified
 * @return boolean - verified or not
**/
checkUserVerification(username: string): boolean { /*...*/ return isVerified; }
```

## Imports

Read this: [File Imports in Single Page Applications](/frontend/architecture/spa-applications-architecture.html#file-imports).

More on imports

- Import only what you need
- Remove usage of a service from a component or any other service remove it's import as well.

## Take TSLint Seriously

Developers tend to ignore errors or suggestion highlighted by TSLint, which creates proplems in consistency. This might lead Git to show change by the user who actually never worked on that part of the file. Just because other developer used double quotes instead of single and TSLint changes those quotes to single automatically for the new developer.

Plus TSLint adds squigly lines that makes the code look uglier.

Make sure you either use Linter properly or write a code that never wakes the Linter :ghost:

Follow are some basic rules to avoid TSLint errors popping up all across your file.

- Prefer use of `const` instead `let` where possible.
- Avoid using `var` keyword.
- Use single quotations marks.
- Keep opening curly brace on the same line.
- Enforce curly braces for if/for/do/while statements.
- Enforce indentation with tabs or spaces.
  - Using only one of tabs or spaces for indentation leads to more consistent editor behavior, cleaner diffs in version control.
- Line should be under max length, recommended length is 140 characters.
  - Break statements to multi lines, if it exceeds one line to make code more readable.
- As mentioned earlier order should be maintained in members of the file i.e. Static > Public > Private and in alphabetical order
- Append colon at the end of each statement
- Use strict comparison i.e. triple equals
- Avoid unnecessary white spaces

## Single Responsibility Principle

Makes your code easier to read and manage and more convenient to test. Consider limiting your components to **400** lines at max. Code is less prone to errors.

## Enums

One of the benefits of using Typescript is Enums. Prefer use of enums instead of string literals to ensure consisty throughout the application. Constants may solve the problem with string literals but enums also offers intellisense of what type of values it holds inside.

**NOTE:** Never ever user enums as getters in a smart component, NEVER!

## @Inputs & @Outputs

- Consider placing @Input() or @Output() on the same line as the property it decorates
- Don't pass hard coded values into your components. Make them re-usable by adding inputs with default values.
- Avoid pointless aliasing of @Input and @Output 
```ts
/* Avoid pointless aliasing */
@Output('changeEvent') change = new EventEmitter<any>();
@Input('labelAttribute') label: string;

/* Cleaner without aliasing */
@Output() change = new EventEmitter<any>();
@Input() label: string;
```

- Avoiding prefixing @Output with `on`

```ts
/* Avoid */
@Output() onUpdateAppointment = new EventEmitter<Appointment>();

/* Prefer */
@Output() updateAppointment = new EventEmitter<Appointment>();
```

## API Calls & Response 

Read this: [API Calls & Response in Single Page Applications](/frontend/architecture/spa-applications-architecture.html#api-calls-response).

## General Guidelines 

- Do not nest directories unneccessarily.
- Create files for constants i.e. LocalStorage Constants etc
- Refactor common methods to services 
- Use SwitchMap when nesting observables, helps in writing a much cleaner code
- Use ts-lint and prettifier and format your code properly
- Don’t use JS to get reference of HTML elements e.g. `document.getElementById`, the are better ways of doing it in Angular
- Don’t generate HTML from a method as strings, use components or directives instead
- Use find method instead of iterating and finding an item out of an array conditionally
- Use ngAfterViewInit if you want to get reference to an element in the template on component load
    - Avoid using timeouts for such cases with hard coded wait time

## Services 

Instead of providing a service into the module if it’s going to be the part of core module then use providedIn: ‘root’ attribute inside a decorator else provide it in the feature module if its score is limited to the module itself. For example
@Injectable({
  providedIn: 'root'
})
export class UserService { }

If not used a in service or component this Service will get tree-shaken in the final build and won't be included in bundle.js


## Shared Components

If a component is used in more than 1 modules move it into shared module with respective directory. For example 
If **choose-patient** modal is used in **appointment** and **invoicing** module, in shared module you can move it either **appointment** directory(because primarily it was part of appointment module) or better move it into **patients** directory e.g. **shared/components/patients/choose-patient-modal**

## RxJS 
Angular 6+ uses **RxJS 6** internally so let’s make a habbit of using it in our application as well. 

Best part of **RxJS 6** is that you import only what you need, without having to import the whole rxjs modules like before.

If you want to read What changed in RxJS 6? Go ahead and read [this](https://www.academind.com/learn/javascript/rxjs-6-what-changed/) article.

Since RxJS 6 has some breaking changes and rxjs-compat doesn't cover those. We need to make sure if we are facing any issue related to RxJS, we need to refer to this guide:  [RxJS v5.x to v6 Update Guide](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md)


Refer to this site for the interactive changes from RxJS 5 -> RxJS 6 [RxJS Explorer](https://reactive.how/rxjs/explorer)


