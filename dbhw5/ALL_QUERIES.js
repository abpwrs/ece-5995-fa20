// Add a 2dsphere spatial index for the location of the zipcodes collection using the createIndex command. 
// What is the size of the loc index in KBs? 
// You can use the stats command over the collection to find out the index size.
db.zips.createIndex( {loc: "2dsphere"} )
// "loc_2dsphere" : 532480 // which is 532 KB

// Write a query using find to retrieve the zip code with location [-91.511192, 41.654899].
db.zips.find({ loc: { $nearSphere: [-91.511192, 41.654899] } }).limit(1)
//
// { "_id" : "52240", "city" : "IOWA CITY", "loc" : [ -91.511192, 41.654899 ], "pop" : 25049, "state" : "IA" }// Write a query using find to retrieve all the zip codes within 10 miles of a circle centered at 
// location [-91.511192, 41.654899] using the $geoWithin and $centerSphere commands.
db.zips.find({ loc: { $geoWithin: { $centerSphere: [[-91.511192, 41.654899], 10 / 3963.2] } } })
//
// { "_id" : "52246", "city" : "IOWA CITY", "loc" : [ -91.566882, 41.643813 ], "pop" : 22869, "state" : "IA" }
// { "_id" : "52241", "city" : "CORALVILLE", "loc" : [ -91.590608, 41.693666 ], "pop" : 12646, "state" : "IA" }
// { "_id" : "52317", "city" : "NORTH LIBERTY", "loc" : [ -91.60612, 41.744318 ], "pop" : 3241, "state" : "IA" }
// { "_id" : "52245", "city" : "IOWA CITY", "loc" : [ -91.51507, 41.664916 ], "pop" : 21140, "state" : "IA" }
// { "_id" : "52240", "city" : "IOWA CITY", "loc" : [ -91.511192, 41.654899 ], "pop" : 25049, "state" : "IA" }// Write a query using find to retrieve all the zip codes contained in the rectangle with left 
// bottom corner at [-91.6143, 41.6623] and upper right corner [-91.123750,41.873890] using 
// the $geoWithin and $box commands.
db.zips.find({ loc: { $geoWithin: { $box: [[-91.6143, 41.6623], [-91.123750, 41.873890]] } } })
//
// { "_id" : "52241", "city" : "CORALVILLE", "loc" : [ -91.590608, 41.693666 ], "pop" : 12646, "state" : "IA" }
// { "_id" : "52245", "city" : "IOWA CITY", "loc" : [ -91.51507, 41.664916 ], "pop" : 21140, "state" : "IA" }
// { "_id" : "52317", "city" : "NORTH LIBERTY", "loc" : [ -91.60612, 41.744318 ], "pop" : 3241, "state" : "IA" }
// { "_id" : "52333", "city" : "SOLON", "loc" : [ -91.508609, 41.809913 ], "pop" : 2894, "state" : "IA" }
// { "_id" : "52358", "city" : "WEST BRANCH", "loc" : [ -91.3141, 41.672622 ], "pop" : 3533, "state" : "IA" }
// { "_id" : "52772", "city" : "TIPTON", "loc" : [ -91.136163, 41.756276 ], "pop" : 5751, "state" : "IA" }// Write a query using find to retrieve the zipcodes within a minDistance of 1,913.43 km (0.3 
// radians) and a maxDistance of 1,914.71 km (.3002 radians) from location [-73.9667,40.75] 
// using the $nearSphere command.
db.zips.find({
    loc:
    {
        $nearSphere: [-73.9667, 40.75],
        $minDistance: 0.3, // 1913.43
        $maxDistance: 0.3002 // 1914.71
    }
}
)

// { "_id" : "57069", "city" : "VERMILLION", "loc" : [ -96.925784, 42.795109 ], "pop" : 11446, "state" : "SD" }
// { "_id" : "70039", "city" : "BOUTTE", "loc" : [ -90.393396, 29.897319 ], "pop" : 2432, "state" : "LA" }
// { "_id" : "71479", "city" : "TULLOS", "loc" : [ -92.301254, 31.853088 ], "pop" : 1280, "state" : "LA" }
// { "_id" : "57238", "city" : "BEMIS", "loc" : [ -96.811368, 44.886232 ], "pop" : 509, "state" : "SD" }
// { "_id" : "70775", "city" : "BAINS", "loc" : [ -91.392266, 30.858658 ], "pop" : 5634, "state" : "LA" }
// { "_id" : "57265", "city" : "STRANDBURG", "loc" : [ -96.790129, 45.038872 ], "pop" : 133, "state" : "SD" }
// { "_id" : "68374", "city" : "HOLMESVILLE", "loc" : [ -96.632635, 40.220245 ], "pop" : 353, "state" : "NE" }
// Download the abstracts.csv file from ICON and import it into an abstracts collection in 
// your mydb database using the mongoimport and specifying --type csv and –- 
// headerline parameters. The abstracts collection should have 398 documents 
// containing title, authors, groups, keywords, topics, and abstract. All text value attributes.
// You can examine the schema of the documents using the findOne command.

// mongoimport --db hw --collection abstracts --type csv ~/Downloads/abstracts.csv --headerline


// {
// 	"_id" : ObjectId("5f9777619474fb96b93fd751"),
// 	"title" : "Kernelized Bayesian Transfer Learning",
// 	"authors" : "Mehmet Gönen and Adam A. Margolin",
// 	"groups" : "Novel Machine Learning Algorithms (NMLA)",
// 	"keywords" : "cross-domain learning\ndomain adaptation\nkernel methods\ntransfer learning\nvariational approximation",
// 	"topics" : "APP: Biomedical / Bioinformatics\nNMLA: Bayesian Learning\nNMLA: Kernel Methods\nNMLA: Transfer, Adaptation, Multitask Learning\nVIS: Object Recognition",
// 	"abstract" : "Transfer learning considers related but distinct tasks defined on heterogenous domains and tries to transfer knowledge between these tasks to improve generalization performance. It is particularly useful when we do not have sufficient amount of labeled training data in some tasks, which may be very costly, laborious, or even infeasible to obtain. Instead, learning the tasks jointly enables us to effectively increase the amount of labeled training data. In this paper, we formulate a kernelized Bayesian transfer learning framework that is a principled combination of kernel-based dimensionality reduction models with task-specific projection matrices to find a shared subspace and a coupled classification model for all of the tasks in this subspace. Our two main contributions are: (i) two novel probabilistic models for binary and multiclass classification, and (ii) very efficient variational approximation procedures for these models. We illustrate the generalization performance of our algorithms on two different applications. In computer vision experiments, our method outperforms the state-of-the-art algorithms on nine out of 12 benchmark supervised domain adaptation experiments defined on two object recognition data sets. In cancer biology experiments, we use our algorithm to predict mutation status of important cancer genes from gene expression profiles using two distinct cancer populations, namely, patient-derived primary tumor data and in-vitro-derived cancer cell line data. We show that we can increase our generalization performance on primary tumors using cell lines as an auxiliary data source."
// }// Create a text index on the title and authors. You can provide a name (later we will drop this index). 
// How big is the index in KBs?
db.abstracts.createIndex({ "title": "text", "authors": "text" })
// 110KB// Write the following queries using the find command (to use the text index in a query you 
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
// MongoDB only supports one text index per collection. Drop the text index for the title and 
// create another text index for all the attributes in the collection. You can specify each key 
// name as parameters or use the $** to indicate all the attributes. How does the size of this 
// index compare to the size of the collection?

db.abstracts.dropIndex("title_text_authors_text")

db.abstracts.createIndex({"$**": "text"})
// total size: 587KB
// index size: 528KB

// When using a text index, you can sort the results by an internal score computed by mongo: 
// {score: {$meta: ‘textScore’}}. Retrieve the top 10 documents with the word “approximation” 
// or “probability” in the text index, display the title and the score.
db.abstracts.aggregate(
    [
        {
            $match: {
                $text: {
                    $search: "approximation probability"
                }
            }
        },
        {
            $addFields: {
                "score": {
                    "$meta": "textScore"
                }
            }
        },
        {
            $sort: {
                score: {
                    $meta: "textScore"
                }
            }
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 1,
                score: 1,
                title: 1
            }
        }
    ]
)
// { "_id" : ObjectId("5f9777619474fb96b93fd78e"), "title" : "Using The Matrix Ridge Approximation to Speedup Determinantal Point Processes Sampling Algorithms", "score" : 2.3298295454545457 }
// { "_id" : ObjectId("5f9777619474fb96b93fd891"), "title" : "Approximate Equilibrium and Incentivizing Social Coordination", "score" : 2.0401913875598083 }
// { "_id" : ObjectId("5f9777619474fb96b93fd804"), "title" : "Explanation-Based Approximate Weighted Model Counting for Probabilistic Logics", "score" : 2.030555555555556 }
// { "_id" : ObjectId("5f9777619474fb96b93fd814"), "title" : "Approximate Lifting Techniques for Belief Propagation", "score" : 1.8644927536231883 }
// { "_id" : ObjectId("5f9777619474fb96b93fd7ef"), "title" : "Instance-based Domain Adaptation in NLP via In-target-domain Logistic Approximation", "score" : 1.817391304347826 }
// { "_id" : ObjectId("5f9777619474fb96b93fd8a6"), "title" : "Point-based POMDP solving with factored value function approximation", "score" : 1.6401785714285713 }
// { "_id" : ObjectId("5f9777619474fb96b93fd78d"), "title" : "Online (Budgeted) Social Choice", "score" : 1.4555555555555555 }
// { "_id" : ObjectId("5f9777619474fb96b93fd831"), "title" : "On Detecting Nearly Structured Preference Profiles", "score" : 1.3151515151515152 }
// { "_id" : ObjectId("5f9777619474fb96b93fd75a"), "title" : "Supervised Hashing for Image Retrieval via Image Representation Learning", "score" : 1.297778308647874 }
// { "_id" : ObjectId("5f9777619474fb96b93fd80c"), "title" : "Rounded Dynamic Programming for Tree-Structured Stochastic Network Design", "score" : 1.2692307692307692 }