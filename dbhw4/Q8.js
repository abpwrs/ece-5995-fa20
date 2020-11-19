// List the businesses that contain the keywords (case insensitive):  “gourmet”, “food”, “corp” in the business name 
// and whose inspection resulted in an issued violation.
db.city_inspections.createIndex({ business_name: "text", result: "text" })
db.city_inspections.find({ $text: { $search: "gourmet food corp" }, result: /^(violation\sissued)$/i }, { _id: 0, business_name: 1, result: 1 })
// mongo hw4 --quiet --eval 'DBQuery.shellBatchSize = 10000; db.city_inspections.find({ $text: { $search: "gourmet food corp" }, result: /^(violation\sissued)$/i }, {_id: 0, business_name: 1, result: 1})' > output.json
// OUTPUT at Q8_output.json
