// Write a query using find to retrieve all the zip codes contained in the rectangle with left 
// bottom corner at [-91.6143, 41.6623] and upper right corner [-91.123750,41.873890] using 
// the $geoWithin and $box commands.
db.zips.find({ loc: { $geoWithin: { $box: [[-91.6143, 41.6623], [-91.123750, 41.873890]] } } })
//
// { "_id" : "52241", "city" : "CORALVILLE", "loc" : [ -91.590608, 41.693666 ], "pop" : 12646, "state" : "IA" }
// { "_id" : "52245", "city" : "IOWA CITY", "loc" : [ -91.51507, 41.664916 ], "pop" : 21140, "state" : "IA" }
// { "_id" : "52317", "city" : "NORTH LIBERTY", "loc" : [ -91.60612, 41.744318 ], "pop" : 3241, "state" : "IA" }
// { "_id" : "52333", "city" : "SOLON", "loc" : [ -91.508609, 41.809913 ], "pop" : 2894, "state" : "IA" }
// { "_id" : "52358", "city" : "WEST BRANCH", "loc" : [ -91.3141, 41.672622 ], "pop" : 3533, "state" : "IA" }
// { "_id" : "52772", "city" : "TIPTON", "loc" : [ -91.136163, 41.756276 ], "pop" : 5751, "state" : "IA" }