# Agendista - web client

This is a proof-of-concept front end for an online appointment manager. The use cases are based in 
the needs of a business / organization booking client appointments:
* Managing appointments
* Managing customers
* Defining available services
* Defining business hours, holidays and vacation time

As of December 2019, the application only retrieves and display data from its back end.

## Getting started

Install [the back end](https://github.com/pereyragamboa/agendista.back) before running the application. 

Once installed, change the back-end server path in `src/serverData.js` and `codegen.yml`. Run `gql-gen` as detailed in
[Apollo's documentation on fragments](https://www.apollographql.com/docs/react/v2.6/advanced/fragments/#fragments-on-unions-and-interfaces) 
for creating `src/fragmentTypes.json`.

After that, use the available scripts in [create-react-app](https://create-react-app.dev/docs/getting-started/#scripts).

## Frameworks and tools 

* Front-end library: [React](https://github.com/facebook/create-react-app)
* CSS framework: [Bulma](https://bulma.io/)
* Data fetching and state management: [Apollo Client](https://www.apollographql.com/docs/react/)
* Date picker: [CreativeBulma Calendar](https://creativebulma.net/product/calendar)
* Icons: [Feather](https://feathericons.com/)
