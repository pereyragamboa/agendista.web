# Agendista - web client

This is a proof-of-concept front end for an online appointment manager. The use cases are based in 
the needs of a business / organization booking client appointments:
* Managing appointments
* Managing customers
* Defining available services
* Defining business hours, holidays and vacation time

As of April 2020, the application only retrieves and display data from its back end.

## Getting started

Install [the back end](https://github.com/pereyragamboa/agendista.back) before running the application. 

Once installed, add a file `src/serverData.js`, with the following content, replacing the value of `uri` with your local back end:

```javascript
export const uri = 'https://your-back-end.example.com/';
``` 
 
Set the same path in `codegen.yml`. This file is used by `gql-gen` for creating `src/fragmentTypes.json`, as detailed in
[Apollo's documentation on fragments](https://www.apollographql.com/docs/react/advanced/fragments/#fragments-on-unions-and-interfaces).

After that, use the available scripts in [create-react-app](https://create-react-app.dev/docs/getting-started/#scripts).

## Frameworks and tools 

* Front-end library: [React](https://github.com/facebook/create-react-app)
* CSS framework: [Bulma](https://bulma.io/)
* Data fetching and state management: [Apollo Client](https://www.apollographql.com/docs/react/)
* Date picker: [CreativeBulma Calendar](https://creativebulma.net/product/calendar)
* Icons: [Feather](https://feathericons.com/)
