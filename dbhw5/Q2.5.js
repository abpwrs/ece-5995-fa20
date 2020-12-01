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