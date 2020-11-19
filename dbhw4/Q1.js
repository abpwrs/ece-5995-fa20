// The number of zipcodes in the state of New York
db.zips.find({ 'city': /^new york$/i }).count()
// 40