// Write a query using find to retrieve the zip code with location [-91.511192, 41.654899].
db.zips.find({ loc: { $nearSphere: [-91.511192, 41.654899] } }).limit(1)
//
// { "_id" : "52240", "city" : "IOWA CITY", "loc" : [ -91.511192, 41.654899 ], "pop" : 25049, "state" : "IA" }