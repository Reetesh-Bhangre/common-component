// Script to run json schema validator on environment.json
const fs = require('fs');
const Ajv = require("ajv")
const ajv = new Ajv({ useDefaults: 'empty' })

// Load a schema by which to validate
fs.readFile('apps/tn-ng-screens/src/environments/environment.schema.json',function(err,schemaJson) {
  if(err) throw err;
  var schema = JSON.parse(schemaJson);
  // Load data file
  fs.readFile('apps/tn-ng-screens/src/environments/environment.json',function(error,dataJson) {
    if(error) throw error;
    // Parse as JSON
    var data = JSON.parse(dataJson);

    const valid = ajv.validate(schema, data)
    if (!valid) {
      console.log(ajv.errors)
      throw {'error': 'environment file is not valid'}
    }
  });
});
