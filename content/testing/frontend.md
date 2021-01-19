# Frontend Testing (Microfrontends)

Usually question arises how to test frontend?

### 1 Unit Tests

- Business logic unit tests

### 2 Component Tests

- e.g. click on button should open a date picker

### 3 Integration Tests

- Most of the tests should be written at this level
- Test/verify the accepted user scenarios
- CDC from frontend to backend?

### 4 E2E Tests

- Recommended to use Cypress

### 5 Best Practices

- Test as a user; never test underlying implementation details; so, one can easily switch the technology
- https://testing-library.com/

# References

* https://martinfowler.com/articles/microservice-testing/
* https://www.thoughtworks.com/insights/blog/architecting-continuous-delivery
* https://vrockai.github.io/blog/2017/10/28/cypress-keycloak-intregration/
