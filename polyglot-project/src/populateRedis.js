
var
  // The CSV file containing the pokemon data
  csvFilename = 'pokedex_(Update_05.20).csv',
  // Track how many file lines we've processed
  processedLines = 0,

  // Import libraries
  csv = require('csv-parser'),
  redis = require('redis'),
  fs = require('fs'),

  // Redis client
  redisClient = redis.createClient(6379);
  redisClient.on ("error", function (error) {
                  console.error(error);
  });
  console.log('Connected..')

/**
 * Utility function that increments the total number
 * of lines processed and outputs every 100.
 */
function trackLineCount() {
  if (++processedLines % 100 === 0) {
    console.log(`Lines Processed: ${processedLines}`);
  }
}

/**
 * This function loops through the
 * CSV data file and populates Redis
 */
function populateRedis() {
  var stream = csv({
    separator: ',',
    newline: '\n'
  });
  
  fs.createReadStream(csvFilename)
    .pipe(stream)
    .on('data', function(data) {
        var species = data['species'], pokemon = data['name'];
             
        var pokemonObj = {
            pokedexNumber: data['pokedex_number'],
            pokemon: data['name'],
            height_m: data['height_m'],
            weight_kg: data['weight_kg']
        };
        
      if (pokemon === '') {
        trackLineCount();
        return true;
      }
       
      redisClient.sadd('species:' + species, JSON.stringify(pokemonObj));
      
      var type_1 = data['type_1'], type_2 = data['type_2'];
      if (type_1 !== '')
          redisClient.sadd(`pokemon:${species}:${pokemon}`, type_1);
      if (type_2 !== '')
          redisClient.sadd(`pokemon:${species}:${pokemon}`, type_2);

      trackLineCount();
    })
    .on('end', function(totalLines) {
      console.log(`Total lines processed: ${processedLines}`);
      redisClient.quit();
    });
};

populateRedis();
