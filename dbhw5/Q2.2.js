// Create a text index on the title and authors. You can provide a name (later we will drop this index). 
// How big is the index in KBs?
db.abstracts.createIndex({ "title": "text", "authors": "text" })
// 110KB