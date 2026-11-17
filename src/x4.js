// Per-option "why wrong" notes for q4.js (topics 9–11). null = the correct option (explained by w).
Object.assign(XP, {
"e25-8.1":[
 ["Det er det motsatte: Markov-egenskapen sier at historien ikke trengs.","That is the opposite: the Markov property says the history is not needed."],
 ["Neste tilstand avhenger nettopp av handlingen; i kurset er miljøene til og med deterministiske.","The next state does depend on the action; in the course the environments are even deterministic."],
 null,
 ["Belønningen er et resultat av overgangen, ikke det som bestemmer neste tilstand; handlingen gjør det.","The reward is an outcome of the transition, not what determines the next state; the action is."]],
"e25-8.2":[
 ["En policy ser på tilstanden, ikke bare forrige belønning.","A policy looks at the state, not just the previous reward."],
 ["Det beskriver læringsoppdateringen (Q-læring), ikke policyen.","That describes the learning update (Q-learning), not the policy."],
 ["Det er en verdifunksjon V(s), ikke en policy.","That is a value function V(s), not a policy."],
 null],
"e25-8.3":[
 null,
 ["Utforskning betyr nettopp å gjøre «feil» innimellom; ingen garanti for feilfri læring.","Exploration means making 'mistakes' now and then; there is no guarantee of error-free learning."],
 ["Det er ren grådighet (ε = 0), det motsatte av utforskning.","That is pure greed (ε = 0), the opposite of exploration."],
 ["Det er rollen til en liten γ, ikke ε.","That would be a small γ, not ε."]],
"e25-8.4":[
 ["Det er ε i ε-greedy som styrer tilfeldige handlinger.","ε in ε-greedy controls random actions."],
 ["γ vekter framtidige belønninger; den avgjør ikke om policyen er stokastisk.","γ weights future rewards; it does not decide whether the policy is stochastic."],
 null,
 ["Bare γ = 0 ignorerer framtiden; γ tvinger ingenting generelt.","Only γ = 0 ignores the future; γ does not force that in general."]],
"e25-9.1":[
 ["Utforskning håndteres av ε-greedy, ikke target-nettverket.","Exploration is handled by ε-greedy, not the target network."],
 null,
 ["Target-nettverket stabiliserer målene, men gir ingen garanti mot overtilpasning.","The target network stabilises targets but gives no guarantee against overfitting."],
 ["Handlingen velges fortsatt med policyen (f.eks. ε-greedy over Q-nettverket).","Actions are still chosen with the policy (e.g. ε-greedy over the Q-network)."]],
"e25-9.2":[
 null,
 ["Tvert imot: bufferet viser gamle overganger på nytt, noe som motvirker glemming.","On the contrary: the buffer replays old transitions, which counters forgetting."],
 ["Tilfeldig sampling gir ingen garanti for lik frekvens per state–action-par.","Random sampling gives no guarantee of equal frequency per state–action pair."],
 ["Agenten må fortsatt utforske for å samle nye, nyttige overganger.","The agent still needs to explore to collect new, useful transitions."]],
"e25-9.3":[
 ["DQN bruker fortsatt γ i treningsmålet.","DQN still uses γ in its training target."],
 ["Policyen kan fortsatt være ε-greedy; nettverket tvinger ikke determinisme.","The policy can still be ε-greedy; the network does not force determinism."],
 ["Et DQN gir typisk én output per handling, altså alle Q-verdier samtidig.","A DQN typically has one output per action, i.e. all Q-values at once."],
 null],
"e25-9.4":[
 ["Med γ > 0 tar agenten hensyn til framtidige belønninger.","With γ > 0 the agent does account for future rewards."],
 null,
 ["Reward hacking handler om en feilspesifisert belønning, ikke antall mål.","Reward hacking is about a misspecified reward, not the number of goals."],
 ["Oppdateringsregelen bruker γ·max Q(s′,a) og fjerner ikke framtiden.","The update rule uses γ·max Q(s′,a) and does not remove the future."]],
"e25-10.4":[
 ["np.take henter elementer på gitte indekser (her indeks 32), ikke en tilfeldig batch.","np.take fetches elements at given indices (here index 32), not a random batch."],
 ["sort() sorterer listen på stedet og returnerer None.","sort() sorts the list in place and returns None."],
 null,
 ["Slicing gir de 32 første (og dermed korrelerte) overgangene, ikke et tilfeldig utvalg.","Slicing gives the first 32 (correlated) transitions, not a random sample."]],
"e24-31":[
 ["Det er Q-funksjonen, ikke policyen.","That is the Q-function, not the policy."],
 ["Det er kumulativ belønning, målet agenten maksimerer.","That is the cumulative reward, the goal the agent maximises."],
 ["Verdi tar med framtidig belønning, og uansett er dette en verdi, ikke en strategi.","Value includes future reward, and either way this is a value, not a strategy."],
 null],
"e24-32":[
 ["γ har ingenting med «catastrophic forgetting» å gjøre.","γ has nothing to do with catastrophic forgetting."],
 null,
 ["Det skjer ved lav γ: da teller umiddelbar reward mest.","That happens with a low γ: the immediate reward then counts most."],
 ["Vekten på gamle Q-verdier styres av (1 − α), ikke γ.","The weight on old Q-values is controlled by (1 − α), not γ."]],
"e24-33":[
 ["Loss kan svinge eller øke selv om Q oppdateres, f.eks. når målene flytter seg.","Loss can fluctuate or rise even as Q is updated, e.g. when targets move."],
 ["Reward kan øke selv om loss øker, f.eks. når agenten oppdager nye tilstander.","Reward can rise while loss rises, e.g. when the agent discovers new states."],
 ["Loss måler feil i Q-estimatet; det er ikke negativ reward.","Loss measures error in the Q-estimate; it is not negative reward."],
 null],
"n-9.1":[
 ["V(s) inkluderer forventede framtidige belønninger, ikke bare den nåværende.","V(s) includes expected future rewards, not just the current one."],
 ["Med Markov-egenskapen trengs ikke historien.","With the Markov property the history is not needed."],
 null,
 ["Verdien varierer mellom tilstander; Markov-egenskapen sier ingenting om konstant verdi.","Value varies between states; the Markov property says nothing about constant value."]],
"p-9.1":[
 ["Dette glemmer å legge til den beholdte delen (1−α)·Q = 1.","This forgets to add the kept part (1−α)·Q = 1."],
 ["4.6 er selve målet R + γ·max Q; med α = 0.5 blandes det med gammel Q.","4.6 is the target R + γ·max Q itself; with α = 0.5 it is mixed with the old Q."],
 null,
 ["Regnefeil: 0.5·2 + 0.5·(1 + 0.9·4) = 1 + 2.3 = 3.3.","Arithmetic slip: 0.5·2 + 0.5·(1 + 0.9·4) = 1 + 2.3 = 3.3."]],
"p-9.2":[
 null,
 ["Det skjer ved α = 1.","That happens with α = 1."],
 ["Å ignorere framtiden er γ = 0, ikke α = 0.","Ignoring the future is γ = 0, not α = 0."],
 ["Handlingsvalg styres av policyen/ε, ikke α.","Action choice is controlled by the policy/ε, not α."]],
"p-9.3":[
 ["16 er bare antall tilstander; hver tilstand har 4 handlinger.","16 is only the number of states; each state has 4 actions."],
 ["Tabellen er et produkt, ikke en sum: 16 × 4.","The table is a product, not a sum: 16 × 4."],
 null,
 ["256 = 16 × 16; handlingsrommet har bare 4 handlinger.","256 = 16 × 16; the action space has only 4 actions."]],
"p-9.4":[
 ["Q-tabellens størrelse er |S|·|A| og endres ikke av ε.","The Q-table size is |S|·|A| and does not change with ε."],
 null,
 ["ε og γ er uavhengige parametre.","ε and γ are independent parameters."],
 ["Rewarden kommer fra miljøet; ε påvirker ikke fortegnet.","The reward comes from the environment; ε does not affect its sign."]],
"p-9.5":[
 null,
 ["Reward er umiddelbar tilbakemelding; Q-verdi er forventet langsiktig verdi.","Reward is immediate feedback; a Q-value is expected long-term value."],
 ["Omvendt: miljøet gir reward, mens Q må læres.","The other way round: the environment gives reward, Q must be learned."],
 ["Reward kan gis i alle steg, ikke bare i terminaltilstander.","Reward can be given at every step, not only in terminal states."]],
"p-9.6":[
 ["Det er env.reset().","That is env.reset()."],
 ["Miljøet vet ingenting om Q-tabellen; agenten oppdaterer den.","The environment knows nothing about the Q-table; the agent updates it."],
 ["Agenten/policyen velger handling; step utfører den.","The agent/policy picks the action; step executes it."],
 null],
"e24-34":[
 ["LIME er lokal: den forklarer én prediksjon, ikke modellen globalt.","LIME is local: it explains one prediction, not the model globally."],
 null,
 ["LIME endrer ikke modellen; den bygger en separat surrogat.","LIME does not change the model; it builds a separate surrogate."],
 ["Surrogaten brukes som forklaring, ikke som erstatning for nettverket.","The surrogate is used as an explanation, not as a replacement for the network."]],
"e24-35a":[
 ["Embarked_S har små SHAP-verdier tett rundt 0.","Embarked_S has small SHAP values close to 0."],
 ["Pclass er nummer to; spredningen er mindre enn for Sex.","Pclass is second; its spread is smaller than Sex."],
 ["Age har noen ekstreme punkter, men lavere gjennomsnittlig |SHAP| enn Sex.","Age has a few extreme points but lower mean |SHAP| than Sex."],
 null],
"e24-35b":[
 ["Røde (høye) Pclass-punkter ligger til venstre for 0, altså negativ SHAP.","Red (high) Pclass points lie left of 0, i.e. negative SHAP."],
 null,
 ["Et beeswarm-plott viser ikke korrelasjon mellom features.","A beeswarm plot does not show correlation between features."],
 ["Høy Pclass trekker ned, og ingen enkeltfeature avgjør alltid prediksjonen.","High Pclass pulls down, and no single feature always decides the prediction."]],
"e24-36":[
 ["Summen blir 3.5, men effektivitet krever sum = v(1,2,3) = 3.","The sum is 3.5, but efficiency requires sum = v(1,2,3) = 3."],
 ["Summen blir 1/2 + 3/2 + 1/2 = 2.5 ≠ 3, så effektivitetsaksiomet brytes.","The sum is 1/2 + 3/2 + 1/2 = 2.5 ≠ 3, so the efficiency axiom fails."],
 ["Summen blir 3, men φ₂ og φ₃ er byttet om; regn ut de marginale bidragene.","The sum is 3, but φ₂ and φ₃ are swapped; compute the marginal contributions."],
 null],
"n-10.1":[
 ["Det er en lokal forklaring.","That is a local explanation."],
 null,
 ["Det beskriver modellagnostisk, ikke global.","That describes model-agnostic, not global."],
 ["Global/lokal sier hva forklaringen dekker, ikke om den kommer med et treffsikkerhetsmål.","Global/local is about scope, not about coming with an accuracy measure."]],
"p-10.1":[
 null,
 ["Notatene skiller dem: passiv vs. aktiv egenskap.","The notes distinguish them: passive vs. active property."],
 ["Omvendt: lineære modeller er tolkbare, nevrale nettverk trenger forklaringsmetoder.","Reversed: linear models are interpretable, neural networks need explanation methods."],
 ["Å kunne printe parametre er transparens, ikke tolkbarhet eller forklarbarhet.","Being able to print parameters is transparency, not interpretability or explainability."]],
"p-10.2":[
 ["Post-hoc sier når forklaringen lages, ikke hvilken datatype.","Post-hoc says when the explanation is made, not which data type."],
 ["Innebygd forklarbarhet er det motsatte av post-hoc.","Built-in explainability is the opposite of post-hoc."],
 null,
 ["Post-hoc-metoder forklarer alle prediksjoner, riktige som gale.","Post-hoc methods explain any prediction, right or wrong."]],
"p-10.3":[
 ["Gradienter er modellspesifikk informasjon.","Gradients are model-specific information."],
 null,
 ["Det er modellspesifikt (f.eks. TreeExplainer).","That is model-specific (e.g. TreeExplainer)."],
 ["Modellagnostiske metoder kan forklare alle features.","Model-agnostic methods can explain all features."]],
"p-10.4":[
 ["φ₀ er ikke en SHAP-verdi for en feature; og det er effektivitet, ikke symmetri.","φ₀ is not a feature's SHAP value; and the axiom is efficiency, not symmetry."],
 ["φ₀ er ikke modellens bias, men snittprediksjonen på bakgrunnsdata.","φ₀ is not the model's bias but the mean prediction over background data."],
 ["φ₀ er en prediksjonsverdi, ikke et antall; nullspiller-aksiomet gir summen ikke.","φ₀ is a prediction value, not a count; the null-player axiom does not give the sum."],
 null],
"p-10.5":[
 null,
 ["Det er hele kostnaden hans alene; de 3 første km deles på tre.","That is his full stand-alone cost; the first 3 km are split three ways."],
 ["10/3 er en lik fordeling av totalen; Shapley tar hensyn til marginale bidrag.","10/3 splits the total equally; Shapley accounts for marginal contributions."],
 ["Han bidrar til kostnaden når han kjører alene, så φ₁ > 0.","He adds cost when riding alone, so φ₁ > 0."]],
"p-10.6":[
 ["Shapley-verdier er spillteori og trenger ingen nevrale nettverk.","Shapley values are game theory and need no neural network."],
 ["Shapley-verdier fungerer for alle typer features.","Shapley values work for any feature type."],
 null,
 ["SHAP forklarer prediksjoner og trenger ikke labels.","SHAP explains predictions and needs no labels."]],
"p-10.7":[
 ["Det beskriver KernelExplainer.","That describes KernelExplainer."],
 null,
 ["Det er DeepExplainer/GradientExplainer.","That is DeepExplainer/GradientExplainer."],
 ["Lokale lineære surrogater er LIME (og til dels KernelExplainer).","Local linear surrogates are LIME (and partly KernelExplainer)."]],
"p-10.8":[
 ["Superpiksler senker «oppløsningen» på forklaringen, ikke øker den.","Superpixels lower the explanation's resolution, they don't raise it."],
 ["SHAP fungerer på fargebilder.","SHAP works on colour images."],
 ["SHAP forklarer en ferdig trent modell; treningen påvirkes ikke.","SHAP explains an already-trained model; training is unaffected."],
 null],
"p-10.9":[
 null,
 ["Det er en avveining for selve modellen f, ikke for LIME.","That is a trade-off for the model f itself, not for LIME."],
 ["Bias/varians gjelder f; LIME-leddene gjelder surrogaten g.","Bias/variance concerns f; the LIME terms concern the surrogate g."],
 ["Precision/recall er klassifiseringsmetrikker, ikke LIME-ledd.","Precision/recall are classification metrics, not LIME terms."]],
"p-10.10":[
 ["Målet er å etterligne f, ikke dataene, så sanne targets brukes ikke.","The goal is to mimic f, not the data, so true targets are not used."],
 ["Tilfeldige labels ville gitt en meningsløs surrogat.","Random labels would give a meaningless surrogate."],
 null,
 ["Bakgrunnsdatasett hører til SHAP, ikke LIME-labels.","Background datasets belong to SHAP, not LIME labels."]],
"p-10.11":[
 ["Den trente modellen er fast mellom kjøringene.","The trained model is fixed between runs."],
 null,
 ["LIME er lokal, og global/lokal forklarer ikke tilfeldighet.","LIME is local, and global/local does not explain randomness."],
 ["Normalisering er deterministisk og gir ikke variasjon.","Normalisation is deterministic and gives no variation."]],
"p-10.12":[
 ["Å snitte vekter gir ingen retning for et bestemt konsept.","Averaging weights gives no direction for a specific concept."],
 ["CAV bruker aktiveringer i et indre lag, ikke PCA på input.","A CAV uses activations in an inner layer, not PCA on the input."],
 ["SHAP er feature-attribusjon; CAV kommer fra en lineær probe.","SHAP is feature attribution; a CAV comes from a linear probe."],
 null],
"p-10.13":[
 null,
 ["TCAV oppsummerer en hel klasse og er global, ikke én prediksjon.","TCAV summarises a whole class and is global, not one prediction."],
 ["TCAV-skåren er en andel input, ikke forklart varians.","The TCAV score is a share of inputs, not explained variance."],
 ["Probens treffsikkerhet sier om konseptet er representert; TCAV er noe annet, og global.","Probe accuracy says whether the concept is represented; TCAV is something else, and global."]],
"p-10.14":[
 ["Teoremet sier bare «ikke mer», ikke «strengt mindre».","The theorem only says 'not more', not 'strictly less'."],
 null,
 ["Teoremet sier ingenting om generalisering.","The theorem says nothing about generalisation."],
 ["Det motsatte: informasjonen om input kan ikke øke.","The opposite: information about the input cannot increase."]],
"e24-37":[
 ["Høyrisikosystemer er tillatt med strenge krav; det er uakseptabel risiko som forbys.","High-risk systems are allowed under strict requirements; unacceptable risk is what is banned."],
 null,
 ["Helse hører inn under eksisterende kategorier (f.eks. høy risiko), ikke en egen.","Health falls under existing categories (e.g. high risk), not its own."],
 ["Den gjelder alle som tilbyr AI-systemer i EU, uansett hvor de holder til (Art. 2).","It applies to anyone offering AI systems in the EU, wherever they are based (Art. 2)."]],
"e24-38":[
 ["Velgjørenhet forbyr ikke kommersielle mål.","Beneficence does not forbid commercial goals."],
 ["Tilgjengelighet handler mer om rettferdighet (justice).","Accessibility relates more to justice."],
 null,
 ["Feilfri drift er et robusthetskrav, ikke definisjonen av velgjørenhet.","Error-free operation is a robustness requirement, not the definition of beneficence."]],
"e24-39a":[
 ["Full kontroll over egne data styrker autonomi.","Full control over one's data strengthens autonomy."],
 ["Menneskelig godkjenning bevarer menneskets beslutningsmakt.","Human approval preserves human decision power."],
 ["Effektivitet er ikke et autonomispørsmål.","Efficiency is not an autonomy issue."],
 null],
"e24-39b":[
 null,
 ["Å kunne velge bort er nettopp autonomi.","Being able to opt out is exactly autonomy."],
 ["Forklaringer gir informerte valg og støtter autonomi.","Explanations enable informed choice and support autonomy."],
 ["Mulighet til å overstyre bevarer meta-autonomi.","The ability to override preserves meta-autonomy."]],
"n-11.1":[
 ["Unntaket gjelder bruken; sivil bruk omfattes uansett opprinnelig formål.","The exemption covers the use; civilian use is covered whatever the original purpose."],
 null,
 ["Militær bruk er unntatt uavhengig av om aktøren er offentlig eller privat.","Military use is exempt whether the actor is public or private."],
 ["AI Act omfatter også systemer utenfor høyrisiko (f.eks. transparens); den gjelder fortsatt.","The AI Act also covers non-high-risk systems (e.g. transparency); it still applies."]],
"n-11.2":[
 ["Forordningen gjelder alle som plasserer modeller på EU-markedet, uansett hvor de er etablert.","The regulation applies to anyone placing models on the EU market, wherever established."],
 ["Åpen kildekode fritar fra dokumentasjonskrav, men ikke fra opphavsrettskravene.","Open source exempts from documentation duties but not from the copyright duties."],
 null,
 ["Adversarial testing og hendelsesrapportering gjelder bare modeller med systemisk risiko.","Adversarial testing and incident reporting apply only to models with systemic risk."]],
"p-11.1":[
 ["Transparenskrav gjelder f.eks. chatboter, ikke sosial scoring.","Transparency duties apply to e.g. chatbots, not social scoring."],
 ["Sosial scoring som gir urimelig behandling er forbudt, ikke bare høy risiko.","Social scoring causing unjustified treatment is banned, not merely high risk."],
 null,
 ["Sosial scoring er eksplisitt listet i Artikkel 5.","Social scoring is explicitly listed in Article 5."]],
"p-11.2":[
 null,
 ["Rekruttering er ikke forbudt; det er høyrisiko med strenge krav.","Recruitment is not banned; it is high-risk with strict requirements."],
 ["Arbeidsliv er eksplisitt nevnt i Anneks 3.","Employment is explicitly listed in Annex 3."],
 ["Systemisk risiko gjelder GPAI-modeller, ikke bruksområder som rekruttering.","Systemic risk concerns GPAI models, not use cases like recruitment."]],
"p-11.3":[
 ["En chatbot er ikke automatisk høyrisiko; Artikkel 50 handler om transparens.","A chatbot is not automatically high-risk; Article 50 is about transparency."],
 null,
 ["Chatboter er tillatt.","Chatbots are allowed."],
 ["AI Act krever ikke åpen kildekode.","The AI Act does not require open source."]],
"p-11.4":[
 ["Antall brukere er et av kriteriene Kommisjonen kan bruke, men ikke presumsjonsgrensen.","User count is one criterion the Commission may use, but not the presumption threshold."],
 ["Bruksområde avgjør høyrisiko for systemer, ikke systemisk risiko for modeller.","Use case decides high risk for systems, not systemic risk for models."],
 ["Åpen kildekode endrer ikke om en modell har systemisk risiko.","Open source does not change whether a model has systemic risk."],
 null],
"p-11.5":[
 null,
 ["Det er taket for de fleste andre brudd.","That is the cap for most other breaches."],
 ["Bøtene er langt høyere enn 1 million euro.","Fines are far higher than €1 million."],
 ["20 M€/4 % er GDPR-taket, ikke AI Acts forbudsbrudd.","€20M/4% is the GDPR cap, not the AI Act's prohibition breaches."]],
"p-11.6":[
 ["Det beskriver et direktiv, ikke en forordning.","That describes a directive, not a regulation."],
 ["En forordning er bindende lov.","A regulation is binding law."],
 null,
 ["AI Act gjelder både offentlig og privat sektor.","The AI Act applies to both public and private sectors."]],
"p-11.7":[
 ["Per november 2026 er den verken innlemmet i EØS-avtalen eller norsk lov.","As of November 2026 it is neither in the EEA Agreement nor Norwegian law."],
 ["Norge arbeider med å innføre den gjennom en KI-lov.","Norway is working to adopt it through an AI Act (KI-loven)."],
 ["Den gjelder ikke i Norge ennå, verken for offentlige eller private.","It does not apply in Norway yet, for public or private bodies."],
 null],
"p-11.8":[
 null,
 ["Systemet kan ta beslutninger; kravet er at et menneske kan overvåke og overstyre.","The system may decide; the requirement is that a human can oversee and override."],
 ["Datakvalitet er Artikkel 10, ikke menneskelig tilsyn.","Data quality is Article 10, not human oversight."],
 ["En chatbot har ingenting med menneskelig tilsyn å gjøre.","A chatbot has nothing to do with human oversight."]],
"p-11.9":[
 ["Det handler om EU-domstolen, ikke Brussels-effekten.","That is about the EU Court, not the Brussels effect."],
 null,
 ["Brussels-effekten handler om regler, ikke hvor forskning skjer.","The Brussels effect is about rules, not where research happens."],
 ["Mange frykter tvert imot konkurranseulemper av reguleringen.","Many actually fear competitive disadvantages from regulation."]],
"p-11.10":[
 ["1. august 2024 er da AI Act trådte i kraft.","1 August 2024 is when the AI Act entered into force."],
 ["2. februar 2025 er da AI Acts forbud begynte å gjelde.","2 February 2025 is when the AI Act's prohibitions began to apply."],
 null,
 ["GDPR ble vedtatt i 2016, men gjelder fra 25. mai 2018.","The GDPR was adopted in 2016 but applies from 25 May 2018."]],
"p-11.11":[
 ["Beneficence er hentet fra bioetikken.","Beneficence comes from bioethics."],
 ["Non-maleficence er hentet fra bioetikken.","Non-maleficence comes from bioethics."],
 ["Justice er hentet fra bioetikken.","Justice comes from bioethics."],
 null],
"p-11.12":[
 null,
 ["Treffsikkerhet og robusthet er tekniske krav (Art. 15), ikke forklarbarhet.","Accuracy and robustness are technical requirements (Art. 15), not explicability."],
 ["Rettferdighet hører til justice; personvern til non-maleficence.","Fairness belongs to justice; privacy to non-maleficence."],
 ["Åpen kildekode er verken nødvendig eller nok for forklarbarhet.","Open source is neither necessary nor sufficient for explicability."]],
"p-11.13":[
 ["Justice gjelder AI-systemer generelt, ikke bare rettsvesenet.","Justice applies to AI systems in general, not only the legal system."],
 null,
 ["Det er omvendt: justice er bredere.","It is the other way round: justice is broader."],
 ["Notatene understreker at de er forskjellige.","The notes stress that they differ."]],
"p-11.14":[
 ["Notatene understreker at det å ikke skade er noe annet enn å gjøre godt.","The notes stress that not harming differs from doing good."],
 ["Også utilsiktet skade bryter med non-maleficence.","Unintended harm also violates non-maleficence."],
 null,
 ["Prinsippet er hentet fra medisinsk etikk, men brukes for AI generelt.","The principle comes from medical ethics but is applied to AI in general."]]
});
