// List  the  cities  in  the state of New York with more than 10 zip  codes in  alphabetical order. 
// The result should include the name of the city, the state, and the number of zip codes.
db.zips.aggregate([
    { $match: { "state": { $eq: "NY" } } },
    {
        $group: {
            _id: "$city",
            state: { $first: "$state" },
            count: { $sum: 1 },
        }
    },
    { $match: { "count": { $gt: 10 } } },
    { $sort: { _id: 1 } }
])
// { "_id" : "BRONX", "state" : "NY", "count" : 25 }
// { "_id" : "BROOKLYN", "state" : "NY", "count" : 37 }
// { "_id" : "BUFFALO", "state" : "NY", "count" : 18 }
// { "_id" : "NEW YORK", "state" : "NY", "count" : 40 }
// { "_id" : "ROCHESTER", "state" : "NY", "count" : 19 }
// { "_id" : "STATEN ISLAND", "state" : "NY", "count" : 12 }
