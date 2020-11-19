// Count the number of inspections per result performed in Feb 2015.
db.city_inspections.aggregate([
    { $match: { "date": /^(feb\s*\d{0,2}\s*2015)$/i } },
    {
        $group: {
            _id: "$result",
            count: { $sum: 1 },
        }
    }
])
// { "_id" : "Samples Obtained", "count" : 3 }
// { "_id" : "No Violation Issued", "count" : 2571 }
// { "_id" : "Unable to Locate", "count" : 13 }
// { "_id" : "No Evidence of Activity", "count" : 214 }
// { "_id" : "Licensed", "count" : 15 }
// { "_id" : "License Confiscated", "count" : 2 }
// { "_id" : "Re-inspection", "count" : 10 }
// { "_id" : "Warning", "count" : 46 }
// { "_id" : "Fail", "count" : 46 }
// { "_id" : "Pass", "count" : 894 }
// { "_id" : "Violation Issued", "count" : 1018 }
// { "_id" : "Posting Order Served", "count" : 12 }
// { "_id" : "Closed", "count" : 74 }
// { "_id" : "Out of Business", "count" : 463 }
// { "_id" : "NOH Withdrawn", "count" : 10 }
// { "_id" : "Unable to Complete Inspection", "count" : 3 }



