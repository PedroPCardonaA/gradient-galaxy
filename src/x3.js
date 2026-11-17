// Per-option explanations for q3.js (topics 6, 7, 8). null = correct option (see w).
Object.assign(XP, {
"e25-5.1":[
 ["Heaviside gir bare 0 eller 1, aldri negative verdier.","Heaviside only outputs 0 or 1, never negative values."],
 ["Funksjonen virker på én skalar (den vektede summen) og avhenger ikke av antall features.","The function acts on one scalar (the weighted sum) and does not depend on the number of features."],
 null,
 ["Outputen er alltid 0 eller 1, altså innenfor [0,1].","The output is always 0 or 1, i.e. inside [0,1]."]],
"e25-5.2":[
 ["Perceptronet kan godt lære problemer med to features, så lenge de er lineært separerbare (f.eks. AND/OR).","A perceptron can learn two-feature problems as long as they are linearly separable (e.g. AND/OR)."],
 null,
 ["Perceptronet bruker nettopp binære labels via step-funksjonen.","The perceptron uses exactly binary labels via the step function."],
 ["Bias kan ha hvilken som helst verdi; den løser ikke XOR uansett.","The bias can take any value; it doesn't solve XOR regardless."]],
"e25-5.3":[
 ["Sigmoid-output kan fortsatt terskles (f.eks. ved 0.5) for binær klassifisering.","A sigmoid output can still be thresholded (e.g. at 0.5) for binary classification."],
 ["Sigmoid er en ikke-lineær funksjon, så nevronet blir ikke-lineært i input.","The sigmoid is non-linear, so the neuron becomes non-linear in its input."],
 ["Sigmoid gir kontinuerlige verdier i (0,1), ikke bare 0 eller 1.","The sigmoid gives continuous values in (0,1), not just 0 or 1."],
 null],
"e25-5.4":[
 null,
 ["Det er tilfeldig søk; backprop beregner gradienter systematisk.","That is random search; backprop computes gradients systematically."],
 ["Backprop har ingenting med å gjøre aktiveringer like.","Backprop has nothing to do with making activations equal."],
 ["Backprop endrer ikke arkitekturen; den beregner gradienter for vektene.","Backprop doesn't change the architecture; it computes gradients for the weights."]],
"e24-19":[
 ["Det er forward pass. Backprop går motsatt vei og beregner gradienter.","That is the forward pass. Backprop goes the other way and computes gradients."],
 ["Antall lag er et arkitekturvalg, ikke noe backprop gjør.","The number of layers is an architecture choice, not something backprop does."],
 null,
 ["Initialisering skjer før treningen, ikke gjennom backprop.","Initialisation happens before training, not through backprop."]],
"p-6.1":[
 ["Ikke-lineariteter gjør ikke treningen raskere; de gjør modellen mer uttrykksfull.","Non-linearities don't speed up training; they make the model more expressive."],
 null,
 ["Det er softmax i output-laget som sørger for sum 1, ikke skjulte aktiveringer.","Softmax in the output layer makes outputs sum to 1, not hidden activations."],
 ["Keras tillater lineære lag; dette er et matematisk, ikke et bibliotekskrav.","Keras allows linear layers; this is a mathematical, not a library, requirement."]],
"p-6.2":[
 ["Dette er sigmoid-funksjonen.","This is the sigmoid function."],
 ["Dette er Heaviside step-funksjonen.","This is the Heaviside step function."],
 ["Dette er tanh, en annen S-formet aktiveringsfunksjon.","This is tanh, another S-shaped activation."],
 null],
"p-6.3":[
 null,
 ["Én sigmoid-node passer bare for binær klassifisering.","A single sigmoid node only suits binary classification."],
 ["Klassenumre er nominelle; å regressere 0–9 innfører en meningsløs rekkefølge.","Class numbers are nominal; regressing 0–9 imposes a meaningless order."],
 ["ReLU gir ikke sannsynligheter som summerer til 1.","ReLU doesn't give probabilities that sum to 1."]],
"p-6.4":[
 ["ReLU er ubegrenset oppover og gir ikke en sannsynlighet i [0,1].","ReLU is unbounded above and doesn't give a probability in [0,1]."],
 null,
 ["Lineær output brukes for regresjon og er ikke begrenset til [0,1].","Linear output is for regression and isn't bounded to [0,1]."],
 ["Heaviside er ikke deriverbar, så nettverket kan ikke trenes med gradienter.","Heaviside isn't differentiable, so the network can't be trained with gradients."]],
"p-6.5":[
 ["Boligpriser er ikke begrenset til (0,1).","House prices aren't confined to (0,1)."],
 ["Softmax brukes for klassesannsynligheter, ikke kontinuerlige verdier.","Softmax is for class probabilities, not continuous values."],
 null,
 ["Heaviside gir bare 0/1 og passer ikke for regresjon.","Heaviside only gives 0/1 and doesn't suit regression."]],
"p-6.6":[
 ["12 teller bare vektene (4·3) og glemmer de 3 bias-leddene.","12 counts only the weights (4·3) and forgets the 3 biases."],
 ["7 = 4 + 3 legger sammen antall noder, ikke koblinger.","7 = 4 + 3 adds node counts, not connections."],
 ["16 har ingen naturlig sammenheng med 4 input og 3 noder.","16 has no natural link to 4 inputs and 3 units."],
 null],
"p-6.7":[
 ["Treningen skjer i model.fit(...).","Training happens in model.fit(...)."],
 null,
 ["Lagring gjøres med model.save(...).","Saving is done with model.save(...)."],
 ["Prediksjoner lages med model.predict(...).","Predictions are made with model.predict(...)."]],
"p-6.8":[
 ["Et skjult lag fjerner ikke støy i dataene; det transformerer representasjonen.","A hidden layer doesn't remove noise from data; it transforms the representation."],
 ["Laget sorterer ikke punkter; det avbilder dem til et nytt rom.","The layer doesn't sort points; it maps them into a new space."],
 null,
 ["Det velger ikke features eksplisitt; alle input brukes i vektede summer.","It doesn't explicitly select features; all inputs enter weighted sums."]],
"p-6.9":[
 null,
 ["Det er backward pass (backpropagation).","That is the backward pass (backpropagation)."],
 ["En epoke er én gjennomgang av hele treningssettet, med mange forward og backward passes.","An epoch is one pass over the training set, with many forward and backward passes."],
 ["Vektoppdatering er optimaliseringssteget etter backprop.","Weight updates are the optimisation step after backprop."]],
"p-6.10":[
 ["Teoremet sier ingenting om optimalisering eller globale minima.","The theorem says nothing about optimisation or global minima."],
 null,
 ["Stor kapasitet gjør tvert imot overtilpasning mulig.","Large capacity actually makes overfitting possible."],
 ["Representasjonskraft gjør ikke modellen tolkbar.","Representational power doesn't make the model interpretable."]],
"p-6.11":[
 ["Sigmoid er glatt og deriverbar overalt.","The sigmoid is smooth and differentiable everywhere."],
 ["Sigmoid gir verdier i (0,1), aldri negative.","The sigmoid outputs values in (0,1), never negative."],
 ["Problemet er produktet av små deriverte, ikke valget av læringsrate.","The problem is the product of small derivatives, not the learning rate."],
 null],
"e25-6.1":[
 ["K-means bryr seg om avstand fra punkter til sin sentroide, ikke mellom sentroider.","K-means cares about point-to-own-centroid distances, not between centroids."],
 null,
 ["Silhouette er en evalueringsmetrikk, ikke det k-means optimerer.","Silhouette is an evaluation metric, not what k-means optimises."],
 ["Calinski–Harabasz er også bare en evalueringsscore.","Calinski–Harabasz is also just an evaluation score."]],
"e25-6.2":[
 ["Den tilfeldige samplingen gir ingen garanti om like avstander.","Random sampling gives no guarantee of equal distances."],
 ["Varians per punkt inngår ikke; vekten er kvadrert avstand.","Per-point variance doesn't enter; the weight is squared distance."],
 ["Tvert imot: punkter langt unna får størst sannsynlighet.","On the contrary: far points get the highest probability."],
 null],
"e25-6.3":[
 ["Det finnes ingen enkelt metrikk som alltid gir riktig k.","No single metric always gives the right k."],
 ["K-means krever at k er gitt på forhånd; den velger ikke k selv.","K-means needs k given in advance; it doesn't choose k itself."],
 null,
 ["Klynger trenger ikke samsvare med klasser, og vi har ofte ingen labels.","Clusters needn't match classes, and we often have no labels."]],
"e25-6.4":[
 ["Antall naboer avgjør kjernepunkter, men ikke om to punkter er i samme klynge.","Neighbour counts decide core points, not whether two points share a cluster."],
 ["DBSCAN bruker ingen sentroider.","DBSCAN uses no centroids."],
 ["Voronoi-regioner hører til k-means, ikke DBSCAN.","Voronoi regions belong to k-means, not DBSCAN."],
 null],
"e24-22a":[
 null,
 ["Tetthetsbasert er DBSCAN; k-means bruker sentroider.","Density-based is DBSCAN; k-means uses centroids."],
 ["Hierarkiske metoder bygger et tre av sammenslåinger; k-means gjør ikke det.","Hierarchical methods build a merge tree; k-means doesn't."],
 ["Fordelingsbaserte metoder (f.eks. GMM) tilpasser sannsynlighetsfordelinger.","Distribution-based methods (e.g. GMM) fit probability distributions."]],
"e24-22b":[
 ["DBSCAN har ingen sentroider.","DBSCAN has no centroids."],
 ["DBSCAN bygger ikke et hierarki av sammenslåinger.","DBSCAN doesn't build a hierarchy of merges."],
 null,
 ["DBSCAN tilpasser ingen sannsynlighetsfordeling.","DBSCAN doesn't fit a probability distribution."]],
"e24-27":[
 ["DBSCAN bruker de samme ε og min_samples overalt, noe som er en svakhet ved varierende tetthet.","DBSCAN uses the same ε and min_samples everywhere, a weakness with varying density."],
 ["Kjernepunkter defineres nettopp via ε, så de er sensitive for ε.","Core points are defined via ε, so they are sensitive to ε."],
 ["DBSCAN har ingen parameter for antall klynger i det hele tatt.","DBSCAN has no number-of-clusters parameter at all."],
 null],
"e24-29":[
 ["K-means krever at vi oppgir k, så en hypotese om k er nyttig.","K-means requires k, so a hypothesis about k is useful."],
 ["Ulik skala ødelegger avstandene; da må vi skalere først.","Different scales distort distances; we must scale first."],
 null,
 ["K-means lager konvekse (Voronoi) klynger og sliter med slike former.","K-means makes convex (Voronoi) clusters and struggles with such shapes."]],
"e24-30":[
 null,
 ["For lav min_points ville gitt færre støypunkter og større klynger.","Too low min_points would give fewer noise points and larger clusters."],
 ["For høy ε ville slått sammen alt til få store klynger.","Too high ε would merge everything into a few big clusters."],
 ["DBSCAN har ingen parameter for antall klynger.","DBSCAN has no number-of-clusters parameter."]],
"p-7.1":[
 ["Inertia synker alltid når k øker, så laveste inertia gir bare k = n.","Inertia always falls as k grows, so the lowest inertia just gives k = n."],
 null,
 ["Antall features har ingenting med antall klynger å gjøre.","The number of features has nothing to do with the number of clusters."],
 ["Det er ikke albuemetoden, og DBSCAN kan gi et helt annet antall.","That isn't the elbow method, and DBSCAN may find a very different number."]],
"p-7.2":[
 ["K-means tar reelle tall fint.","K-means handles real numbers fine."],
 ["Skalering bestemmer ikke k.","Scaling doesn't determine k."],
 null,
 ["K-means++ har ikke noe krav om [0,1]; det handler om relative skalaer.","K-means++ has no [0,1] requirement; it's about relative scales."]],
"p-7.3":[
 null,
 ["K-means lager konvekse klynger og deler halvmånene med en rett grense.","K-means makes convex clusters and splits the moons with a straight boundary."],
 ["K-means++ endrer bare initialiseringen; klyngene er fortsatt konvekse.","K-means++ only changes initialisation; clusters stay convex."],
 ["PCA er dimensjonsreduksjon og klynger ikke dataene.","PCA is dimensionality reduction and doesn't cluster the data."]],
"p-7.4":[
 ["DBSCAN har ingen sentroider.","DBSCAN has no centroids."],
 null,
 ["Punkter på kanten er typisk grensepunkter (border points), ikke kjernepunkter.","Points at the edge are typically border points, not core points."],
 ["Et punkt langt fra alle andre er støy, ikke et kjernepunkt.","A point far from everything is noise, not a core point."]],
"p-7.5":[
 ["Det beskriver hierarkisk clustering, ikke k-means.","That describes hierarchical clustering, not k-means."],
 ["Det er gradient descent, ikke k-means.","That is gradient descent, not k-means."],
 ["K-means fjerner ikke outliers og holder k fast.","K-means removes no outliers and keeps k fixed."],
 null],
"e25-7.1":[
 ["Komponentene forklarer ulik mengde varians, sortert synkende.","Components explain different amounts of variance, sorted in decreasing order."],
 null,
 ["Ortogonalitet gir tvert imot ukorrelerte komponenter.","Orthogonality gives uncorrelated components, the opposite."],
 ["Ortogonalitet fjerner redundans, den tvinger den ikke fram.","Orthogonality removes redundancy rather than forcing it."]],
"e25-7.2":[
 ["T-SNE er ikke-lineær og lærer ingen global avbildning.","t-SNE is non-linear and learns no global mapping."],
 ["T-SNE beregner ingen projeksjonsmatrise i det hele tatt.","t-SNE computes no projection matrix at all."],
 null,
 ["T-SNE bevarer lokale naboskap, ikke globale avstander.","t-SNE preserves local neighbourhoods, not global distances."]],
"e25-7.3":[
 ["Målet er å bevare naboskap, ikke å endre dem.","The goal is to preserve neighbourhoods, not change them."],
 ["Fjerne punkter skal forbli fjerne, ikke havne tett sammen.","Distant points should stay apart, not end up together."],
 ["T-SNE garanterer ingen lineær separerbarhet.","t-SNE guarantees no linear separability."],
 null],
"e25-7.4":[
 ["Tvert imot: anomalier isoleres med få splitt, altså grunne stier.","On the contrary: anomalies are isolated with few splits, i.e. short paths."],
 null,
 ["Isolation Forest bruker ingen sentroider; den teller splitt.","Isolation Forest uses no centroids; it counts splits."],
 ["Isolation Forest er uveiledet og bruker ingen labels.","Isolation Forest is unsupervised and uses no labels."]],
"e24-21":[
 ["Mange falske positive påvirker presisjon, ikke recall direkte.","Many false positives hurt precision, not recall directly."],
 ["Det kan være én årsak, men det er ikke hva falske positive betyr.","That may be one cause, but it isn't what false positives mean."],
 null,
 ["Det beskriver falske negative.","That describes false negatives."]],
"e24-23":[
 null,
 ["Isolation Forest klassifiserer ikke; den er uveiledet og isolerer punkter.","Isolation Forest doesn't classify; it is unsupervised and isolates points."],
 ["Den bygger trær med tilfeldige splitt, ikke lineære modeller.","It builds trees with random splits, not linear models."],
 ["Den reduserer ikke dimensjoner.","It does not reduce dimensions."]],
"e24-24":[
 ["PCA reduserer ikke variansen; den bevarer mest mulig av den.","PCA doesn't reduce the variance; it keeps as much of it as possible."],
 ["Når vi dropper komponenter, mister vi noe informasjon.","When we drop components, we lose some information."],
 ["Komponentene er ukorrelerte, ikke korrelerte.","The components are uncorrelated, not correlated."],
 null],
"e24-25":[
 ["Sentrum er gjennomsnittet, som trekkes fra før PCA.","The centre is the mean, which is subtracted before PCA."],
 ["Antall komponenter vi beholder er et valg, ikke komponentene selv.","How many we keep is a choice, not the components themselves."],
 null,
 ["Dette er en vag formulering uten presis betydning i PCA.","This is vague wording with no precise meaning in PCA."]],
"e24-26":[
 ["T-SNE kan vise klynger visuelt, men er ikke en clusteringalgoritme.","t-SNE may show clusters visually but isn't a clustering algorithm."],
 null,
 ["T-fordelingen brukes for likheter i lavdimensjonalt rom, ikke som en test.","The t-distribution is used for low-dimensional similarities, not as a test."],
 ["T-SNE er uveiledet og gjør ingen klassifisering.","t-SNE is unsupervised and does no classification."]],
"e24-28":[
 ["KL måler forskjell mellom sannsynlighetsfordelinger, ikke korrelasjon.","KL measures a difference between distributions, not correlation."],
 ["KL er tapsfunksjonen, ikke et triks for å slå PCA.","KL is the loss function, not a trick to beat PCA."],
 ["Antall naboer styres av perplexity, ikke av KL.","The number of neighbours is set by perplexity, not by KL."],
 null],
"n-8.1":[
 ["Høy varians i dataene er ikke det KL-verdien måler.","High data variance isn't what the KL value measures."],
 null,
 ["Høy KL betyr dårlig, ikke optimal, embedding.","High KL means a poor, not optimal, embedding."],
 ["Perplexity kan påvirke, men høy KL betyr i seg selv at naboskap ikke er bevart.","Perplexity may matter, but high KL itself means neighbourhoods aren't preserved."]],
"n-8.2":[
 ["(2,1) og (1,2) er ikke ortogonale (prikkprodukt 4), men egenvektorer til en symmetrisk matrise må være det.","(2,1) and (1,2) aren't orthogonal (dot product 4), but a symmetric matrix's eigenvectors must be."],
 ["(1,2) gir A·v = (9, 6), som ikke er 6·(1,2).","(1,2) gives A·v = (9, 6), which isn't 6·(1,2)."],
 null,
 ["(4/5, 1) og (1, 0) er verken normaliserte eller egenvektorer for A.","(4/5, 1) and (1, 0) are neither normalised nor eigenvectors of A."]],
"p-8.1":[
 ["60 % er bare første komponent (6/10).","60% is only the first component (6/10)."],
 ["67 % får vi ved å dele 6 på 9; vi må dele (6+3) på totalen 10.","67% comes from 6/9; we must divide (6+3) by the total 10."],
 null,
 ["30 % er bare den andre komponenten (3/10).","30% is only the second component (3/10)."]],
"p-8.2":[
 null,
 ["PCA fungerer på kontinuerlige features.","PCA works on continuous features."],
 ["Vi trenger fortsatt egenvektorer; standardisering endrer bare skalaen.","We still need eigenvectors; standardisation only changes scale."],
 ["PCA tåler negative verdier; dataene sentreres til og med rundt 0.","PCA handles negative values; data is even centred around 0."]],
"p-8.3":[
 ["T-SNE er stokastisk uansett fordeling.","t-SNE is stochastic regardless of the distribution."],
 ["T-fordelingen gir fortsatt ingen avbildning for nye punkter.","The t-distribution still gives no mapping for new points."],
 ["T-SNE bevarer ikke globale avstander eksakt.","t-SNE doesn't preserve global distances exactly."],
 null],
"p-8.4":[
 ["Antall dimensjoner settes med n_components.","The number of dimensions is set with n_components."],
 null,
 ["Læringsraten er en egen hyperparameter.","The learning rate is a separate hyperparameter."],
 ["T-SNE har ingen parameter for antall klynger.","t-SNE has no number-of-clusters parameter."]],
"p-8.5":[
 ["En liten klynge kan være en ekte, sjelden gruppe; størrelse alene definerer ikke anomalier.","A small cluster may be a real, rare group; size alone doesn't define anomalies."],
 ["Antall anomalier er ukjent, og k beskriver klynger, ikke anomalier.","The number of anomalies is unknown, and k describes clusters, not anomalies."],
 null,
 ["Jo, avstand til nærmeste sentroide pluss en persentilterskel er en vanlig metode.","It can: distance to the nearest centroid plus a percentile threshold is a common method."]]
});
