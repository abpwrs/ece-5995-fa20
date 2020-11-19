// For the ten most popular cities in NY (the ones with the most population), get the minimum and maximum latitude and longitude.
db.zips.aggregate([
    { $match: { "state": { $eq: "NY" } } },
    {
        $group: {
            _id: "$city",
            state: { $first: "$state" },
            pop: { $sum: "$pop" },
            min_lat_long: { $min: "$loc" },
            max_lat_long: { $max: "$loc" }
        }
    },
    { $sort: { pop: -1 } },
    { $limit: 10 }
])
// { "_id" : "BROOKLYN", "state" : "NY", "pop" : 2300504, "min_lat_long" : [ -74.030304, 40.625106 ], "max_lat_long" : [ -73.873649, 40.676191 ] }
// { "_id" : "NEW YORK", "state" : "NY", "pop" : 1476790, "min_lat_long" : [ -74.016323, 40.710537 ], "max_lat_long" : [ -73.922077, 40.866222 ] }
// { "_id" : "BRONX", "state" : "NY", "pop" : 1209548, "min_lat_long" : [ -73.921735, 40.8222 ], "max_lat_long" : [ -73.787436, 40.846941 ] }
// { "_id" : "ROCHESTER", "state" : "NY", "pop" : 396013, "min_lat_long" : [ -77.703996, 43.21257 ], "max_lat_long" : [ -77.549501, 43.14524 ] }
// { "_id" : "STATEN ISLAND", "state" : "NY", "pop" : 378977, "min_lat_long" : [ -74.244482, 40.508452 ], "max_lat_long" : [ -74.076795, 40.597296 ] }
// { "_id" : "BUFFALO", "state" : "NY", "pop" : 375479, "min_lat_long" : [ -78.897815, 42.949062 ], "max_lat_long" : [ -78.810375, 42.881132 ] }
// { "_id" : "FLUSHING", "state" : "NY", "pop" : 224162, "min_lat_long" : [ -73.873535, 40.772117 ], "max_lat_long" : [ -73.758646, 40.745847 ] }
// { "_id" : "JAMAICA", "state" : "NY", "pop" : 195205, "min_lat_long" : [ -73.811121, 40.702934 ], "max_lat_long" : [ -73.77584, 40.677483 ] }
// { "_id" : "SYRACUSE", "state" : "NY", "pop" : 184963, "min_lat_long" : [ -76.226159, 43.040943 ], "max_lat_long" : [ -76.104609, 43.042134 ] }
// { "_id" : "YONKERS", "state" : "NY", "pop" : 172131, "min_lat_long" : [ -73.895041, 40.917665 ], "max_lat_long" : [ -73.843435, 40.965574 ] }
