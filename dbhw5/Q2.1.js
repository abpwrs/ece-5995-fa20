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
// }