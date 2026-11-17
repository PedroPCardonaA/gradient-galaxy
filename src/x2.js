// Per-option "why wrong" notes for q2.js (topics 3, 4, 5)
Object.assign(XP, {
"e25-2.1":[
 ["p(x) avhenger ikke av klassen – det er samme nevner for alle klasser.","p(x) does not depend on the class – it is the same denominator for every class."],
 ["Det beskriver likelihooden p(x|C=1), ikke evidensen p(x).","That describes the likelihood p(x|C=1), not the evidence p(x)."],
 null,
 ["Siden p(x) er lik for alle klasser, endrer den aldri hvilken klasse som vinner.","Since p(x) is the same for every class, it never changes which class wins."]],
"e25-2.2":[
 ["Antakelsen gjelder alle features, uansett type.","The assumption applies to all features, whatever their type."],
 ["Modellen krever ikke at dataene faktisk er uavhengige – den bare antar det.","The model does not require the data to actually be independent – it only assumes it."],
 null,
 ["Posterior kan alltid beregnes; den kan bare bli mindre treffsikker.","The posterior can always be computed; it may just be less accurate."]],
"e25-2.3":[
 ["Duplisering kopierer eksisterende punkter; den lærer ikke en ny fordeling.","Duplication copies existing points; it does not create a new distribution."],
 ["Det er undersampling som fjerner majoritetseksempler.","Undersampling is what removes majority examples."],
 ["Balanse i antall hindrer ikke overtilpasning – gjentatte kopier øker risikoen.","Balanced counts do not prevent overfitting – repeated copies increase the risk."],
 null],
"e24-8a":[
 null,
 ["100 ville gitt ubalanse i motsatt retning (B har 200).","100 would create imbalance the other way (B has 200)."],
 ["400 er dobbelt så mange som B, så det er ikke balansert.","400 is twice the size of B, so it is not balanced."],
 ["1800 er hele klasse A – ingen undersampling.","1800 is all of class A – no undersampling at all."],
 ["900 er halvparten av A, men fortsatt 4,5 ganger B.","900 is half of A, but still 4.5 times B."]],
"e24-8b":[
 ["200 er det B allerede har; da får B 400, ikke 1800.","200 is what B already has; B would reach 400, not 1800."],
 ["1800 er målet for B totalt, ikke antallet som må legges til.","1800 is B's target total, not the number to add."],
 ["100 er altfor lite for å balansere 1800 mot 200.","100 is far too few to balance 1800 against 200."],
 null,
 ["400 gir B bare 600 punkter.","400 only gives B 600 points."],
 ["2000 gir B 2200, som er flere enn A.","2000 would give B 2200, more than A."]],
"e24-10":[
 ["Vektene er byttet: w_0 hører til leddet med (1−y).","The weights are swapped: w_0 belongs to the (1−y) term."],
 ["y og y_pred er byttet – log tas av prediksjonen, ikke av labelen.","y and y_pred are swapped – the log is taken of the prediction, not the label."],
 ["Både vektene og y/y_pred er stokket feil.","Both the weights and y/y_pred are mixed up."],
 null],
"e24-11":[
 ["Forholdet er feil (1:90), og vektene er unødvendig små.","The ratio is wrong (1:90) and the weights are needlessly tiny."],
 ["Dette vekter majoritetsklassen A tyngst – motsatt av det vi vil.","This weights the majority class A most heavily – the opposite of what we want."],
 null],
"p-3.1":[
 ["90 % er sensitiviteten p(+|syk), ikke p(syk|+).","90% is the sensitivity p(+|sick), not p(sick|+)."],
 null,
 ["Den lave prevalensen gjør at de fleste positive er falske; 50 % er for høyt.","The low prevalence means most positives are false; 50% is too high."],
 ["1 % er prioren før testen; et positivt svar øker sannsynligheten.","1% is the prior before testing; a positive result raises the probability."]],
"p-3.2":[
 null,
 ["Det er likelihooden p(x|C).","That is the likelihood p(x|C)."],
 ["Det er posterior p(C|x).","That is the posterior p(C|x)."],
 ["p(x) er evidensen/normaliseringen, ikke prioren.","p(x) is the evidence/normaliser, not the prior."]],
"p-3.3":[
 ["Det handler om antall features, ikke antall lag.","It is about the number of features, not the number of layers."],
 null,
 ["Det beskriver behovet for skalering, ikke dimensjonsforbannelsen.","That describes the need for scaling, not the curse of dimensionality."],
 ["PCA fungerer i vilkårlig mange dimensjoner.","PCA works in any number of dimensions."]],
"p-3.4":[
 ["Duplisering er oversampling, ikke undersampling.","Duplicating examples is oversampling, not undersampling."],
 null,
 ["Mindre data gjør treningen raskere, ikke tregere.","Less data makes training faster, not slower."],
 ["Labels endres aldri; punkter fjernes bare.","Labels are never changed; points are only removed."]],
"p-3.5":[
 ["Naïve Bayes estimeres ved telling/statistikk, ikke gradient descent.","Naïve Bayes is fitted by counting/statistics, not gradient descent."],
 null,
 ["Prioren brukes; den er en del av modellen.","The prior is used; it is part of the model."],
 ["Den bruker alle features, multiplisert sammen.","It uses all features, multiplied together."]],
"p-3.6":[
 null,
 ["Det er undersampling, ikke vektet loss.","That is undersampling, not a weighted loss."],
 ["Det er syntetisk oversampling, ikke vektet loss.","That is synthetic oversampling, not a weighted loss."],
 ["Terskeljustering er et eget tiltak etter trening.","Threshold tuning is a separate step after training."]],
"p-3.7":[
 ["Å ignorere prioren gir maksimum likelihood, ikke Bayes-klassifikatoren.","Ignoring the prior gives maximum likelihood, not the Bayes classifier."],
 ["Bare prioren ignorerer selve datapunktet.","Using only the prior ignores the data point itself."],
 null,
 ["Klassifikatoren er deterministisk: den velger største posterior.","The classifier is deterministic: it picks the largest posterior."]],
"e25-2.4":[
 ["Ulike splitter gir ulik impurity; lavest er best.","Different splits give different impurity; lowest is best."],
 ["0.28 er høyere enn 0.07, så A gir urenere noder.","0.28 is higher than 0.07, so A leaves impurer nodes."],
 null,
 ["B har høyest impurity (0.41) – det dårligste valget.","B has the highest impurity (0.41) – the worst choice."]],
"e25-3.1":[
 null,
 ["Bootstrap endrer data, ikke arkitekturen eller dybden.","Bootstrapping changes the data, not the architecture or depth."],
 ["Ulike bootstrap-utvalg gjør modellene ulike, ikke identiske.","Different bootstrap samples make the models different, not identical."],
 ["Hver modell ser bare ~63 % unike punkter; bagging reduserer varians, ikke bias.","Each model sees only ~63% unique points; bagging reduces variance, not bias."]],
"e25-3.2":[
 ["Tilfeldige feature-utvalg gjør bruken ujevn, ikke lik.","Random feature subsets make usage uneven, not equal."],
 null,
 ["Dybde styres av hyperparametre, ikke av tilfeldigheten.","Depth is set by hyperparameters, not by the randomness."],
 ["Random forest bruker nettopp bootstrapping.","Random forests rely on bootstrapping."]],
"e25-3.3":[
 ["Vektene avhenger av feilklassifisering, ikke klassestørrelse.","Weights depend on misclassification, not class size."],
 ["Oppdateringen er systematisk, ikke tilfeldig.","The update is systematic, not random."],
 ["Riktig klassifiserte punkter får lavere vekt.","Correctly classified points get lower weight."],
 null],
"e25-3.4":[
 ["Gradient boosting for regresjon summerer prediksjoner; det er ingen majoritetsvotering.","Gradient boosting for regression sums predictions; there is no majority vote."],
 ["Residualene er systematiske feil, ikke tilfeldig støy.","Residuals are systematic errors, not random noise."],
 null,
 ["Antall runder er en hyperparameter vi velger selv.","The number of rounds is a hyperparameter we choose."]],
"e25-4.4":[
 ["Regresjonstrær velger deterministisk splitten med lavest varians.","Regression trees deterministically pick the lowest-variance split."],
 ["X gir høyere gjenværende varians (2.4).","X leaves higher remaining variance (2.4)."],
 null,
 ["Målet er å redusere varians, ikke maksimere den.","The goal is to reduce variance, not maximise it."]],
"e24-15":[
 ["Antall verdier styrer ikke valget; reduksjon i impurity gjør det.","The number of values doesn't decide; impurity reduction does."],
 ["Rekkefølgen av features er irrelevant.","The order of features is irrelevant."],
 null,
 ["Et vanlig beslutningstre velger grådig, ikke tilfeldig (det gjør random forest delvis).","A plain decision tree chooses greedily, not randomly (random forests partly do)."]],
"e24-16":[
 ["Dybde er ikke nøkkelen; mangfold og lav korrelasjon er det.","Depth is not the key; diversity and low correlation are."],
 null,
 ["Trær som lærer det samme gir korrelerte feil og lite gevinst.","Trees that learn the same thing give correlated errors and little gain."],
 ["Samme bootstrap-utvalg gir nesten identiske trær.","The same bootstrap sample gives near-identical trees."]],
"e24-17":[
 ["Gradienten gir retningen for neste tre, ikke antall trær.","The gradient gives the direction for the next tree, not the number of trees."],
 ["Trær legges til ett om gangen for å rette feil, ikke for å begrense kompleksitet.","Trees are added one at a time to correct errors, not to limit complexity."],
 ["Boosting er sekvensielt; hvert tre avhenger av de forrige.","Boosting is sequential; each tree depends on the previous ones."],
 null],
"p-4.1":[
 ["0 gjelder en ren node.","0 applies to a pure node."],
 ["1 − (0.5² + 0.5²) = 0.5, ikke 0.25.","1 − (0.5² + 0.5²) = 0.5, not 0.25."],
 null,
 ["Gini for to klasser er maks 0.5.","Gini for two classes is at most 0.5."]],
"p-4.2":[
 ["1 er entropien til en 50/50-node med to klasser.","1 is the entropy of a 50/50 two-class node."],
 null,
 ["0.5 er maks Gini, ikke entropien til en ren node.","0.5 is the max Gini, not the entropy of a pure node."],
 ["Med konvensjonen 0·log 0 = 0 er den definert og lik 0.","With the convention 0·log 0 = 0 it is defined and equals 0."]],
"p-4.3":[
 ["Dypere tre overtilpasser enda mer.","A deeper tree overfits even more."],
 null,
 ["Testsettet trengs for å måle generalisering.","The test set is needed to measure generalisation."],
 ["Gini og entropi gir nesten like trær; det løser ikke overtilpasning.","Gini and entropy give almost the same trees; that doesn't fix overfitting."]],
"p-4.4":[
 ["Det er omvendt: bagging er parallelt, boosting sekvensielt.","It's the other way round: bagging is parallel, boosting sequential."],
 null,
 ["Boosting bruker ofte grunne trær (stumps).","Boosting often uses shallow trees (stumps)."],
 ["Boosting vekter om data; bootstrap er typisk for bagging.","Boosting reweights data; bootstrapping is typical for bagging."]],
"p-4.5":[
 null,
 ["10 % er for lavt; (1−1/N)^N → e⁻¹ ≈ 0.37.","10% is too low; (1−1/N)^N → e⁻¹ ≈ 0.37."],
 ["50 % er for høyt; grensen er e⁻¹ ≈ 37 %.","50% is too high; the limit is e⁻¹ ≈ 37%."],
 ["Med tilbakelegging blir noen punkter alltid utelatt.","With replacement some points are always left out."]],
"p-4.6":[
 ["Hver split er en terskel på én feature, så grensene er ikke glatte.","Each split is a threshold on one feature, so boundaries are not smooth."],
 null,
 ["Én skrå linje er typisk for lineære modeller.","A single diagonal line is typical of linear models."],
 ["Sirkler rundt punkter likner mer på k-NN/RBF-metoder.","Circles around points are more like k-NN/RBF methods."]],
"e25-4.1":[
 null,
 ["MSE krever deriverte når vi bruker gradient descent.","MSE needs derivatives when we use gradient descent."],
 ["Sparse vekter kommer fra L1-regularisering, ikke MSE.","Sparse weights come from L1 regularisation, not MSE."],
 ["Kvadrering gir outliers stor innflytelse.","Squaring gives outliers a large influence."]],
"e25-4.2":[
 ["Prediksjoner som endrer seg med splitten tyder på høy, ikke lav, varians.","Predictions that change with the split indicate high, not low, variance."],
 ["Lav treningsfeil passer ikke med høy bias.","A very low training error does not fit high bias."],
 null,
 ["Treningsfeilen er lav, så det er ikke undertilpasning.","The training error is low, so it is not underfitting."]],
"e25-4.3":[
 ["B har lik trenings- og valideringsfeil – god generalisering.","B has similar train and validation error – good generalisation."],
 ["C viser tydelig overtilpasning.","C clearly overfits."],
 ["A undertilpasser (høy feil begge steder).","A underfits (high error in both)."],
 null],
"e24-3":[
 ["Induktivt bias er bevisste antakelser, ikke tilfeldige prosesser.","Inductive bias is deliberate assumptions, not random processes."],
 ["Over- og undertilpasning er konsekvenser, ikke definisjonen.","Over- and underfitting are consequences, not the definition."],
 null,
 ["Det er en egenskap ved modellen/algoritmen, ikke ved dataene.","It is a property of the model/algorithm, not the data."]],
"e24-18":[
 ["Begge metodene kan brukes på alle modelltyper.","Both methods work for any model type."],
 ["Datasettstørrelse er ikke den definerende forskjellen.","Dataset size is not the defining difference."],
 ["Ingen av dem bruker testdata for å lage delsett.","Neither uses test data to make subsets."],
 null,
 ["Det er omvendt: CV gir ikke-overlappende folder.","It's the other way round: CV gives non-overlapping folds."]],
"p-5.1":[
 ["Da validerer man på data modellen har sett.","Then you validate on data the model has seen."],
 null,
 ["CV splitter treningsdata; testsettet holdes urørt.","CV splits the training data; the test set is left untouched."],
 ["Det er bagging, ikke kryssvalidering.","That is bagging, not cross-validation."]],
"p-5.2":[
 ["Å tune på testsettet gir et for optimistisk sluttresultat.","Tuning on the test set gives an over-optimistic final result."],
 null,
 ["Da finnes ingen usette data å evaluere på.","Then there is no unseen data to evaluate on."],
 ["Valideringssettet og testsettet skal være separate.","The validation and test sets must be separate."]],
"p-5.3":[
 ["Overtilpasning gir lav treningsfeil, ikke høy.","Overfitting gives low training error, not high."],
 null,
 ["Høy varians gir et stort gap mellom trenings- og valideringsfeil.","High variance gives a big gap between training and validation error."],
 ["Lekkasje gir typisk for gode resultater, ikke for dårlige.","Leakage typically gives results that are too good, not too bad."]],
"p-5.4":[
 ["Kvadrering forsterker outliers.","Squaring amplifies outliers."],
 null,
 ["Summert kvadratfeil er MSE uten gjennomsnitt – like sensitiv.","Summed squared error is MSE without the mean – just as sensitive."],
 ["RMSE er bare roten av MSE og like sensitiv for outliers.","RMSE is just the square root of MSE and equally outlier-sensitive."]],
"p-5.5":[
 ["Modellen er lineær i parametrene w.","The model is linear in the parameters w."],
 null,
 ["Lineær regresjon kan ha mange features.","Linear regression can have many features."],
 ["Skalering endrer ikke om modellen er lineær.","Scaling doesn't change whether the model is linear."]],
"p-5.6":[
 ["Perfekt prediksjon gir R² = 1.","Perfect prediction gives R² = 1."],
 null,
 ["R² sier ingenting direkte om bias.","R² says nothing directly about bias."],
 ["MSE = 0 ville gitt R² = 1.","MSE = 0 would give R² = 1."]],
"p-5.7":[
 null,
 ["Det er nettopp en avveining – de går typisk i motsatt retning.","It is a trade-off – they typically move in opposite directions."],
 ["Bias og varians er ikke definert som trenings- og testfeil.","Bias and variance are not defined as training and test error."],
 ["Avveiningen handler om modellkompleksitet, ikke læringsrate.","The trade-off is about model complexity, not learning rate."]],
"p-5.8":[
 null,
 ["Regresjon er veiledet – den har targets.","Regression is supervised – it has targets."],
 ["Klassifisering kan bruke mange modelltyper.","Classification can use many model types."],
 ["Regresjon kan ha vilkårlig mange features.","Regression can have any number of features."]],
"p-5.9":[
 ["Mer trening forverrer overtilpasningen.","More training makes overfitting worse."],
 null,
 ["Testsettet skal ikke brukes til modellvalg.","The test set must not be used for model selection."],
 ["Større modell gir enda mer overtilpasning.","A bigger model overfits even more."]]
});
