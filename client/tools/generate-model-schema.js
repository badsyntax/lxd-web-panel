var fs = require('fs');
var path = require('path');
var SwaggerParser = require('swagger-parser');
var swaggerFile = path.resolve(__dirname, '../../server/api/swagger/swagger.yaml');
var schemaFile = path.resolve(__dirname, '../src/models/schema.json');

var parser = new SwaggerParser();

parser.parse(swaggerFile)
  .then(getModelSchema)
  .then(writeSchema)
  .then(function() {
    console.log('Successfully written schema data to:', schemaFile);
  })
  .catch(function(e) {
    console.log(e);
  });

function getModelSchema(api) {
  console.log("API name: %s, Version: %s", api.info.title, api.info.version);

  var models = Object.keys(api.definitions)
    .filter(function(definitionKey) {
      return /Model$/.test(definitionKey);
    })
    .reduce(function(models, definitionKey) {
      models[definitionKey] = api.definitions[definitionKey];
      return models;
    }, {});

  return JSON.stringify(models, null, 2);
}

function writeSchema(schema) {
  fs.writeFileSync(schemaFile, schema, 'utf8');
}
