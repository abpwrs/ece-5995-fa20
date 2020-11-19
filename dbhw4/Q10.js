// Which is the city with the most inspections in 2015?
db.city_inspections.aggregate([
    { $match: { "date": /^(.*2015)$/i } },
    {
        $group: {
            _id: "$address.city",
            count: { $sum: 1 },
        }
    },
    { $sort: { count: -1 } },
    { $limit: 1 }
])
// { "_id" : "BROOKLYN", "count" : 25024 }
