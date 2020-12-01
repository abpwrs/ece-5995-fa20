
var
  // how many pokemon we expect to process
  totalpokemon = null,
  // and keep track of how many pokemon we have processed
  processedpokemon = 0,
  // The name of the mongo database
  mongoDBDatabase = 'pokemon',
  // The size of document upload batches
  batchSize = 50,

  // standard libraries
  redis = require('redis'),

  // database clients
  mongoClient = require('mongodb').MongoClient,
  redisClient = redis.createClient(6379),
  url = "mongodb://localhost:27017/pokemon";


/**
 * A helper function that builds a good mongoDB key
 * @param string the unicode string being keyified
 */
function mongoKeyify(string)
{
  // remove bad chars, and disallow starting with an underscore
  return string.replace(/[\t \?\#\\\-\+\.\,'"()*&!\/]+/g, '_').
    replace(/^_+/, '');
};

/*
 * Keep track of the number of species processed, output every 100 loaded,
 * and close the Redis client when done.
 */
function trackLineCount(increment) {
  processedpokemon += increment;

  // Output once every 100 lines
  if (processedpokemon % 100 === 0) {
    console.log('pokemon Loaded: ' + processedpokemon);
  }

  // Close the Redis client when complete
  if (totalpokemon <= processedpokemon) {
    console.log(`Total pokemon Loaded: ${processedpokemon}`);
    redisClient.quit();
  }
};

/*
 * Insert documents into mongoDB in bulk.
 * @param documents The documents to store
 * @param count The number of documents being inserted.
 */
function saveDocs(documents, count) {
    // Use connect method to connect to the server
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pokemon");
        
        dbo.collection("pokemon").insertMany(documents, function(err, res) {
          if (err) {
            console.error(`saveDocs tot error: ${err.message}`);
          } else {
            //console.log("Number of documents inserted: " + res.insertedCount);
            trackLineCount(count);
          }
          db.close();
        });
    });
};

/*
 * Loop through all of the pokemon populated in Redis. We expect
 * the format of each key to be 'species:pokemon Name' having the value
 * as a set with all the pokemon properties. The pokemons each have
 * the list of types, keyed by 'pokemon:specie Name:pokemon Name'.
 * The pokemon name, set of pokemon properties, and pokemon type(s)
 * populates the mongoDB documents. eg:
 {
     "_id" : "Seed_Pokémon",
     "name" : "Seed Pokémon",
     "pokemons" : [
         {
             "pokedexNumber" : "2",
             "pokemon" : "Ivysaur",
             "height_m" : "1.0",
             "weight_kg" : "13.0",
             "type" : [
                 "Poison",
                 "Grass"
             ]
         },
         {
             "pokedexNumber" : "1",
             "pokemon" : "Bulbasaur",
             "height_m" : "0.7",
             "weight_kg" : "6.9",
             "type" : [
                 "Poison",
                 "Grass"
             ]
         }
     ]
 }
 */
function populatepokemon() {
    redisClient.keys('species:*', function(err, speciesKeys) {
    totalSpecies = speciesKeys.length;
    var
      readSpecies = 0,
      speciesBatch = [];

    speciesKeys.forEach(function(speciesKey) {
      // substring of 'pokemon:'.length gives us the pokemon name
      var speciesName = speciesKey.substring(8);
      redisClient.smembers(speciesKey, function(err, pokemons) {
          // batch the Redis calls to get all pokemons' information at once
          var typeBatch = [];
          pokemons.forEach(function(pokemon) {
              var pokemonDoc = JSON.parse(pokemon);
              var pokemonName = pokemonDoc['pokemon'];
             typeBatch.push([
              'smembers',
              `pokemon:${speciesName}:${pokemonName}`
            ]);
          });
        
          // batch up each pokemon species
          redisClient.
            multi(typeBatch).
            exec(function(err, types) {
              var
                i = 0,
                pokemonDocs = [];
                // build the pokemon sub-documents
                pokemons.forEach(function(pokemon) {
                    var pokemonDoc = JSON.parse(pokemon);
                    pokemonDoc['type'] = types[i++] ;
                    pokemonDocs.push(pokemonDoc);
                });

              // add this new species document to the batch to be executed later
              speciesBatch.push({
                _id: mongoKeyify(speciesName),
                name: speciesName,
                pokemons: pokemonDocs
              });
              // keep track of the total number of species read
              readSpecies++;

              // upload batches of 50 values to mongodb or the remaining values left
              if (speciesBatch.length >= batchSize || totalSpecies - readSpecies == 0) {
                saveDocs(speciesBatch, speciesBatch.length);

                // empty out the batch array to be filled again
                speciesBatch = [];              }
            });
        });
      });
    });
};
// expose mongoKeyify function
exports.mongoKeyify = mongoKeyify;



function populatepokemon_noBatch() {
    redisClient.keys('species:*', function(err, speciesKeys) {
    totalSpecies = speciesKeys.length;
    var
      readSpecies = 0,
      speciesBatch = [];

    speciesKeys.forEach(function(speciesKey) {
      // substring of 'pokemon:'.length gives us the pokemon name
      var speciesName = speciesKey.substring(8);
      var pokemonDocs =[];
      redisClient.smembers(speciesKey, function(err, pokemons) {
          pokemons.forEach(function(pokemon) {
              var pokemonDoc = JSON.parse(pokemon);
              var pokemonName = pokemonDoc['pokemon'];
              redisClient.smembers(`pokemon:${speciesName}:${pokemonName}`, function(err, types) {
                  pokemonDoc['type']=types;
              });
              pokemonDocs.push(pokemonDoc);
          });
      });
          
      // add this new species document to the batch to be executed later
      speciesBatch.push({
         _id: mongoKeyify(speciesName),
         name: speciesName,
         pokemons: pokemonDocs
      });
      // keep track of the total number of species read
      readSpecies++;

     // upload batches of 50 values to mongodb or the remaining values left
      if (speciesBatch.length >= batchSize || totalSpecies - readSpecies == 0) {
            saveDocs(speciesBatch, speciesBatch.length);
            // empty out the batch array to be filled again
            speciesBatch = [];              }
    });
    });
};


// start populating pokemon if running as main script
if (!module.parent) {
    populatepokemon();
    //populatepokemon_noBatch();
}
