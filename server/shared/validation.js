const SchemaObject = require('schema-object');

const email = new SchemaObject({
    email: {type: String, required: true},
    pass: {type: String, required: true}
});

const media = new SchemaObject({
    path: {type: String, required: true},
    dir: {type: String, required: true}, 
    root: {type: String, required: true}
});

const views = new SchemaObject({
    path: { type: Array, arrayType: String, required: true },
    engine: { type: String, required: true } 
});

const Settings = new SchemaObject({
    email: {type:email, required: true},
    media: {type: media, required: true}, 
    authSecretKey: {type: String, required: true},
    mongoConnectionString: {type: String, required: true},
    public: {type: String, required: true},
    domain: {type: String, required: true},
    views: {type: views, required: true}
});

module.exports = Settings;
