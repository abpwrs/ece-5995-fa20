// The number of cities in  the state of New York.
db.zips.distinct('city', { 'state': /^NY$/i }).length
// 1370