# Alphanym.js

Alphanym.js is a React component library which helps improve your sign up page by replacing your first and last name form fields with a single universal Alphanym field.
 
This ensures you will always know the best way to refer to your customers, regardless of their name or nationality.

[Demo](https://www.alphanym.com/demo)

## Installation

`npm i alphanym-js`

## Integration

The [Alphanym Example App](https://github.com/Alphanym/alphanym-example-app) demonstrates a full-stack integration with the Alphanym service.

```jsx
...

<AlphanymField
 onQuery={ this.handleQuery }
 onComplete={ this.handleComplete }
 results={ queryResults }
 loading={ queryLoading }
 />

...
```

## Attributes 

#### onQuery
Callback triggered when the field should query the API. The callback is passed the raw name text as its first argument.

#### onComplete
Callback triggered when the field has been filled out. The callback is passed an object with `name` and `betanym` fields.

##### Example JSON
```json
{
  "version": "1.0.1",
  "name": "Charles Darwin",
  "betanym": "Charles"
};
```

#### results
An object detailing Alphanym's interpretation of the name. This should default to an empty object when a query request hasn't been set yet.   

#### loading
A Boolean value which plays the loading animation.

#### onFeedback (Optional)
Callback for sending feedback, when Alphanym interprets a name incorrectly. The callback is passed an object with `name` and `betanym` fields.

##### Example JSON
```json
{
  "version": "1.0.1",
  "name": "Charles Darwin",
  "betanym": "Charles"
};
```

#### font (Optional)
The CSS value used for the font.

#### debounceTimeout (Optional)
Milliseconds before the field automatically sends a query.


