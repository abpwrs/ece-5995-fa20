// List the cities in the state of New York with over 100K  people in descending order of population.
db.zips.aggregate([
    { $match: { "state": { $eq: "NY" } } },
    {
        $group: {
            _id: "$city",
            state: { $first: "$state" },
            pop: { $sum: "$pop" },
        }
    },
    { $match: { "pop": { $gt: 100000 } } },
    { $sort: { pop: 1 } }
])
// { "_id" : "ASTORIA", "state" : "NY", "pop" : 165629 }
// { "_id" : "BRONX", "state" : "NY", "pop" : 1209548 }
// { "_id" : "BROOKLYN", "state" : "NY", "pop" : 2300504 }
// { "_id" : "BUFFALO", "state" : "NY", "pop" : 375479 }
// { "_id" : "FAR ROCKAWAY", "state" : "NY", "pop" : 100646 }
// { "_id" : "FLUSHING", "state" : "NY", "pop" : 224162 }
// { "_id" : "JACKSON HEIGHTS", "state" : "NY", "pop" : 145967 }
// { "_id" : "JAMAICA", "state" : "NY", "pop" : 195205 }
// { "_id" : "NEW YORK", "state" : "NY", "pop" : 1476790 }
// { "_id" : "ROCHESTER", "state" : "NY", "pop" : 396013 }
// { "_id" : "STATEN ISLAND", "state" : "NY", "pop" : 378977 }
// { "_id" : "SYRACUSE", "state" : "NY", "pop" : 184963 }
// { "_id" : "YONKERS", "state" : "NY", "pop" : 172131 }

