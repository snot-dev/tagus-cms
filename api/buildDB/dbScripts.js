const async = require('async');
const usersSeed = require('../users/data');
const User = require('../users/model');
const unitFieldsSeed = require('../unitFields/data');
const UnitField = require('../unitFields/model');
const unitsSeed = require('../units/data');
const Unit = require('../units/model');
const translatesSeed = require('../translates/data');
const Translate = require('../translates/model');
const settingsSeed = require('../settings/data');
const Settings = require('../settings/model');
const bridgesSeed = require('../bridges/data');
const Bridges = require('../bridges/model');
const contentSeed = require('../content/data');
const Content = require('../content/model');

const collections = [
    {
        model: Settings,
        seed: settingsSeed
    },
    {
        model: User
    },
    {
        model: Translate,
        seed: translatesSeed    
    },
    {
        model: UnitField,
        seed: unitFieldsSeed    
    },
    {
        model: Unit,
        seed: unitsSeed    
    },
    {
        model: Bridges,
        seed: bridgesSeed    
    },
    {
        model: Content,
        seed: contentSeed    
    }
];

function insertCollection(collection, done) {
    let collectionCreated = false;

     collection.model.find({})
    .then(docs => {
        if (docs.length === 0 && collection.seed) {
            return collection.model.insertMany(collection.seed);
        }
        else {
            collectionCreated = true;
        }
    })
    .then(() => {
        const collectionName = collection.model.collection.collectionName;
        console.log(collectionCreated ? `${collectionName} already created!` : `Inserted ${collectionName}`);
        done();
    })
    .catch( err => {
        console.log(err);
        done();
        process.exit(1);
    });
}

function insertCollections(exit) {
    return new Promise((resolve, reject) => {
        console.log("Connected! Building DB....");
        
        async.eachSeries(collections, (collection, done) => {
            insertCollection(collection, done);
        }, err => {
            console.log(err || "DB was built!");
            if (exit) {
                exit();
            }
            resolve();
        });
    });
}

function removeCollection(collection, done) {
    collection.model.remove({})
    .then((result, err) => {
        console.log(err || `${collection.model.collection.collectionName} was deleted!`);
        done();
    })
    .catch( err => {
        console.log(err);
        done();
        process.exit(1);
    });
}

function removeCollections() {
    console.log("Connected! Removing Collections....");

    async.eachSeries(collections, (collection, done) => {
        removeCollection(collection, done);
    }, err => {
        console.log(err || "All collections were deleted!");
        process.exit(0);
    });
}

module.exports = {
    insertCollections,
    removeCollections
};