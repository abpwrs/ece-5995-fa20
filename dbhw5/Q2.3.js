// Write the following queries using the find command (to use the text index in a query you 
// need to use the $text and $search commands). For all the queries, only display the _id and 
// the title of the documents.
// a. Search for the documents with the keywords “gamble” or “approximation” or “gaspers” in the text index.
// b. Search for the documents with the phrase “security games”
db.abstracts.find({ $text: { $search: "gamble approximation gaspers" } }, {_id: 1, title: 1})
// { "_id" : ObjectId("5f9777619474fb96b93fd891"), "title" : "Approximate Equilibrium and Incentivizing Social Coordination" }
// { "_id" : ObjectId("5f9777619474fb96b93fd814"), "title" : "Approximate Lifting Techniques for Belief Propagation" }
// { "_id" : ObjectId("5f9777619474fb96b93fd8a6"), "title" : "Point-based POMDP solving with factored value function approximation" }
// { "_id" : ObjectId("5f9777619474fb96b93fd804"), "title" : "Explanation-Based Approximate Weighted Model Counting for Probabilistic Logics" }
// { "_id" : ObjectId("5f9777619474fb96b93fd7ef"), "title" : "Instance-based Domain Adaptation in NLP via In-target-domain Logistic Approximation" }
// { "_id" : ObjectId("5f9777619474fb96b93fd78e"), "title" : "Using The Matrix Ridge Approximation to Speedup Determinantal Point Processes Sampling Algorithms" }
// { "_id" : ObjectId("5f9777619474fb96b93fd802"), "title" : "Backdoors into Heterogeneous Classes of SAT and CSP" }
// { "_id" : ObjectId("5f9777619474fb96b93fd792"), "title" : "Fixing a Balanced Knockout Tournament" }
db.abstracts.find({ $text: { $search: "\"security games\"" } }, {_id: 1, title: 1})
// { "_id" : ObjectId("5f9777619474fb96b93fd8c3"), "title" : "Solving Zero-Sum Security Games in Discretized Spatio-Temporal Domains" }
// { "_id" : ObjectId("5f9777619474fb96b93fd85a"), "title" : "Regret-based Optimization and Preference Elicitation for Stackelberg Security Games with Uncertainty" }
