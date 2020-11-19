// List the cities with inspections containing the keyword “bro” (case insensitive).
db.city_inspections.createIndex({ id: "text", business_name: "text", result: "text", sector: "text" })
db.city_inspections.find({ $text: { $search: "bro" } })
// { "_id" : ObjectId("56d61034a378eccde8a90267"), "id" : "67922-2015-ENFO", "certificate_number" : 9311307, "business_name" : "KAL-BRO, INC.", "date" : "Dec  1 2015", "result" : "No Violation Issued", "sector" : "Secondhand Dealer [General] - 006", "address" : { "city" : "COLLEGE POINT", "zip" : 11356, "street" : "14TH RD", "number" : 11414 } }
// { "_id" : ObjectId("56d61034a378eccde8a91947"), "id" : "55831-2015-ENFO", "certificate_number" : 9315506, "business_name" : "JOHN'S BRO'S DELI & GROCERY INC.", "date" : "Sep 25 2015", "result" : "No Violation Issued", "sector" : "Grocery-Retail - 808", "address" : { "city" : "BROOKLYN", "zip" : 11226, "street" : "CHURCH AVE", "number" : 1720 } }
