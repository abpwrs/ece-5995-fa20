// MongoDB only supports one text index per collection. Drop the text index for the title and 
// create another text index for all the attributes in the collection. You can specify each key 
// name as parameters or use the $** to indicate all the attributes. How does the size of this 
// index compare to the size of the collection?

db.abstracts.dropIndex("title_text_authors_text")

db.abstracts.createIndex({"$**": "text"})
// total size: 587KB
// index size: 528KB

