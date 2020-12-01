// Write a query using find to retrieve the zipcodes within a minDistance of 1,913.43 km (0.3 
// radians) and a maxDistance of 1,914.71 km (.3002 radians) from location [-73.9667,40.75] 
// using the $nearSphere command.
db.zips.find({
    loc:
    {
        $nearSphere: [-73.9667, 40.75],
        $minDistance: 0.3, // 1913.43
        $maxDistance: 0.3002 // 1914.71
    }
}
)

// { "_id" : "57069", "city" : "VERMILLION", "loc" : [ -96.925784, 42.795109 ], "pop" : 11446, "state" : "SD" }
// { "_id" : "70039", "city" : "BOUTTE", "loc" : [ -90.393396, 29.897319 ], "pop" : 2432, "state" : "LA" }
// { "_id" : "71479", "city" : "TULLOS", "loc" : [ -92.301254, 31.853088 ], "pop" : 1280, "state" : "LA" }
// { "_id" : "57238", "city" : "BEMIS", "loc" : [ -96.811368, 44.886232 ], "pop" : 509, "state" : "SD" }
// { "_id" : "70775", "city" : "BAINS", "loc" : [ -91.392266, 30.858658 ], "pop" : 5634, "state" : "LA" }
// { "_id" : "57265", "city" : "STRANDBURG", "loc" : [ -96.790129, 45.038872 ], "pop" : 133, "state" : "SD" }
// { "_id" : "68374", "city" : "HOLMESVILLE", "loc" : [ -96.632635, 40.220245 ], "pop" : 353, "state" : "NE" }
