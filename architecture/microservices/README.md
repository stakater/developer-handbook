# Microservices

Read following:

- [Microservices Best Practices for Java](https://www.redbooks.ibm.com/redbooks/pdfs/sg248357.pdf)

## How should I name my microservices?

We follow a naming convention for microservices. Services should be named as follows:

- If the service relates to an entity (i.e. it's a `noun`), then take the plural form and append -service
For example: `ingredients-service`
- If the service relates to an action (i.e. it's a `verb`), then take that verb and append -service
For example: `auth-service`

The convention should also be followed in automation, CI, etc.

## How should I name my other projects or git repo's?

We follow kebab-case or hyphen-case i.e. `carbook-gitlab-config`, `synthetic-tests`, `e2e-tests` naming convention whenever creating
a git repo

