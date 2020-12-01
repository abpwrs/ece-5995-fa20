// Add a 2dsphere spatial index for the location of the zipcodes collection using the createIndex command. 
// What is the size of the loc index in KBs? 
// You can use the stats command over the collection to find out the index size.
db.zips.createIndex( {loc: "2dsphere"} )
// "loc_2dsphere" : 532480 // which is 532 KB

