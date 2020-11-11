# Utilities

Various Useful Utilities

Aiming to keep this repo pretty small

## ToDo
Questions:
* Should I strip out all tests etc and only publish a dist folder to npm?

## Usage
`npm install @unegma/utilities`
`const utilities = require('@unegma/utilities');`


```
// Question Scout
client.firstName = utilities.getAttValue(fields, '5f454cdda96008830e523d1b', 'id');

// Tutor Cruncher
let day = utilities.getAttValue(job.extraAttributes, 'day');
```
