// Count the number of inspections performed in the cities of Brooklyn, New York, or Bronx.
db.city_inspections.find({ "address.city": /(^bronx$)|(^new\syork$)|(^brooklyn$)/i }).count()
// 57088