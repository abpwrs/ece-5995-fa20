// Write a query using find to retrieve all the zip codes within 10 miles of a circle centered at 
// location [-91.511192, 41.654899] using the $geoWithin and $centerSphere commands.
db.zips.find({ loc: { $geoWithin: { $centerSphere: [[-91.511192, 41.654899], 10 / 3963.2] } } })
//
// { "_id" : "52246", "city" : "IOWA CITY", "loc" : [ -91.566882, 41.643813 ], "pop" : 22869, "state" : "IA" }
// { "_id" : "52241", "city" : "CORALVILLE", "loc" : [ -91.590608, 41.693666 ], "pop" : 12646, "state" : "IA" }
// { "_id" : "52317", "city" : "NORTH LIBERTY", "loc" : [ -91.60612, 41.744318 ], "pop" : 3241, "state" : "IA" }
// { "_id" : "52245", "city" : "IOWA CITY", "loc" : [ -91.51507, 41.664916 ], "pop" : 21140, "state" : "IA" }
// { "_id" : "52240", "city" : "IOWA CITY", "loc" : [ -91.511192, 41.654899 ], "pop" : 25049, "state" : "IA" }