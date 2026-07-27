// Case-study data — extracted verbatim from the Claude Design project (Portfolio.dc.html).
const T = (en, ro) => ({ en, ro });

const CASES = [
  {
    id: 'platform', client: 'Platform Operator', demo: 'platform',
    sector: T('Regulated B2C · white-label platform', 'B2C reglementat · platformă white-label'),
    period: T('Jun 2025 — present', 'Iun 2025 — prezent'),
    tags: ['Angular', 'NgRx', 'Micro-frontends', 'Design systems', 'PWA'],
    stack: ['Angular', 'TypeScript', 'NgRx (Store, Effects, Entity)', 'RxJS', 'Angular Material', 'SCSS', 'PWA', 'i18n', 'Jasmine/Karma', 'Claude Code + GitHub CLI'],
    oneLiner: T('One frontend serving ten consumer brands in a regulated industry — theming, gamification and payment flows in a single Angular/NgRx codebase.', 'Un singur frontend pentru zece branduri de consum într-o industrie reglementată — theming, gamificare și fluxuri de plată, într-un singur cod Angular/NgRx.'),
    context: [
      T('I develop the core frontend of a white-label consumer platform in a heavily regulated industry. Ten brands run on it across several European markets, each with its own look, its own regulatory copy and its own promotional calendar — and all of them on one codebase.', 'Dezvolt frontendul principal al unei platforme white-label de consum, într-o industrie strict reglementată. Zece branduri rulează pe ea, în mai multe piețe europene, fiecare cu propriul aspect, propriile texte de reglementare și propriul calendar de promoții — toate pe un singur cod.'),
      T('My side of the work is the modular Angular/NgRx architecture that makes that possible, plus ownership of user-facing feature areas: lobby pages, gamification and payment flows.', 'Partea mea este arhitectura modulară Angular/NgRx care face asta posibilă, plus responsabilitatea unor zone de produs: paginile de lobby, gamificarea și fluxurile de plată.'),
    ],
    challenge: [
      T('Onboarding a new brand used to mean touching code. Colors, typography, layout and copy were spread across components, so every launch was a small fork waiting to happen — and ten brands multiply every inconsistency by ten.', 'Adăugarea unui brand nou însemna atins codul. Culorile, tipografia, layoutul și textele erau împrăștiate în componente, deci fiecare lansare era un mic fork în devenire — iar zece branduri înmulțesc orice inconsecvență cu zece.'),
      T('At the same time the surface is real-time: balances, live pricing, reward states and payment confirmations all change under the user, on mobile, on unreliable connections.', 'În același timp, interfața e în timp real: balanțe, prețuri live, stări de recompensă și confirmări de plată se schimbă sub utilizator, pe mobil, pe conexiuni instabile.'),
    ],
    built: [
      { title: T('Runtime theming system', 'Sistem de theming la runtime'), body: T('Color palettes, typography and layout expressed as tokens, so a new brand is configuration rather than a code change.', 'Palete de culori, tipografie și layout exprimate ca tokenuri, astfel încât un brand nou e configurație, nu modificare de cod.') },
      { title: T('Shared component libraries', 'Librării de componente comune'), body: T('One set of components reused across every brand deployment, which is what keeps ten brands from drifting apart.', 'Un set de componente reutilizate în toate brandurile — asta ține cele zece branduri să nu se despartă în timp.') },
      { title: T('Real-time feature areas', 'Zone de produs în timp real'), body: T('Lobby, gamification and payments, with complex state managed through NgRx Store, Effects and Entity.', 'Lobby, gamificare și plăți, cu stare complexă gestionată prin NgRx Store, Effects și Entity.') },
      { title: T('Mobile-first delivery', 'Livrare mobile-first'), body: T('Responsive PWA with i18n across markets, covered by Jasmine/Karma tests.', 'PWA responsiv, cu i18n pentru toate piețele, acoperit cu teste Jasmine/Karma.') },
      { title: T('Automated pre-PR review', 'Review automat înainte de PR'), body: T('An Angular code-review pipeline (Claude Code + GitHub CLI) that flags anti-patterns before a human ever opens the diff.', 'Un pipeline de review Angular (Claude Code + GitHub CLI) care semnalează anti-pattern-uri înainte ca un om să deschidă diff-ul.') },
    ],
    metrics: [
      { label: T('Brands on one codebase', 'Branduri pe un singur cod'), before: '1', after: '10', note: T('Consumer brands live across regulated markets.', 'Branduri de consum, live în piețe reglementate.') },
      { label: T('Code-review turnaround', 'Timp de review'), before: T('baseline', 'referință'), after: '−80%', note: T('After the automated pre-PR review pipeline landed.', 'După introducerea pipeline-ului automat de review.') },
      { label: T('New brand onboarding', 'Onboarding brand nou'), before: T('code fork', 'fork de cod'), after: T('config', 'configurație'), note: T('Theming moved out of components and into tokens.', 'Themingul a ieșit din componente și a intrat în tokenuri.') },
    ],
    lessons: [
      { title: T('White-label is a discipline, not a feature', 'White-label e o disciplină, nu un feature'), body: T('The moment a brand needs "just one exception", the system starts dying. Most of the work is saying no in a way that still solves the brand\'s problem.', 'În momentul în care un brand are nevoie de „doar o excepție”, sistemul începe să moară. Cea mai mare parte a muncii e să spui nu într-un fel care totuși rezolvă problema brandului.') },
      { title: T('Automate the boring half of review', 'Automatizează jumătatea plictisitoare din review'), body: T('Letting a tool catch anti-patterns first meant humans reviewed decisions instead of formatting.', 'Lăsând un tool să prindă primul anti-pattern-urile, oamenii au ajuns să revizuiască decizii, nu formatare.') },
    ],
    arch: [
      { title: T('Brands', 'Branduri'), nodes: [
        { label: T('Brand config (×10)', 'Config brand (×10)'), note: T('Each brand is a token bundle: palette, typography, layout, market copy and legal text. No brand ships its own components.', 'Fiecare brand e un pachet de tokenuri: paletă, tipografie, layout, texte de piață și texte legale. Niciun brand nu are componente proprii.') },
        { label: T('Market / locale', 'Piață / limbă'), note: T('i18n keys and regulatory copy resolve per market, so the same feature can be compliant in several jurisdictions at once.', 'Cheile i18n și textele de reglementare se rezolvă pe piață, deci același feature poate fi conform în mai multe jurisdicții simultan.') },
      ] },
      { title: T('Shell', 'Shell'), nodes: [
        { label: T('Theming engine', 'Motor de theming'), note: T('Reads the active brand config and applies tokens at runtime — color, radius, typography, spacing, wordmark. This is the piece that turns ten launches into ten config files.', 'Citește configul brandului activ și aplică tokenurile la runtime — culoare, rotunjire, tipografie, spațiere, logo. Asta transformă zece lansări în zece fișiere de configurare.') },
        { label: T('Routing & guards', 'Rutare și guards'), note: T('Feature areas are lazy-loaded per brand entitlement; a brand without a feature never downloads its code.', 'Zonele de produs se încarcă lazy, per drepturile brandului; un brand fără un feature nu descarcă niciodată acel cod.') },
      ] },
      { title: T('Features', 'Funcționalități'), nodes: [
        { label: T('Content & discovery', 'Conținut și descoperire'), note: T('Content tiles, categories, search and personalisation — the highest-traffic surface, so it is the most carefully virtualised.', 'Tile-uri de conținut, categorii, căutare și personalizare — suprafața cu cel mai mult trafic, deci și cea mai atent virtualizată.') },
        { label: T('Gamification', 'Gamificare'), note: T('Missions, tournaments and reward states, which are the hardest to model because they change while the user is looking at them.', 'Misiuni, turnee și stări de recompensă — cel mai greu de modelat, pentru că se schimbă chiar în timp ce utilizatorul se uită la ele.') },
        { label: T('Payments', 'Plăți'), note: T('Deposit and withdrawal flows with per-market providers, optimistic UI and hard failure states.', 'Fluxuri de depunere și retragere cu furnizori pe piață, UI optimist și stări de eșec clare.') },
      ] },
      { title: T('State', 'Stare'), nodes: [
        { label: 'NgRx Store', note: T('One predictable state tree per feature area; brand switching does not mean re-teaching every component where its data lives.', 'Un arbore de stare previzibil pe zonă de produs; schimbarea brandului nu înseamnă reînvățarea fiecărei componente unde îi stau datele.') },
        { label: 'Effects / Entity', note: T('Effects isolate side effects (sockets, payment callbacks); Entity keeps large collections of games and offers normalised.', 'Effects izolează efectele secundare (socket-uri, callback-uri de plată); Entity ține colecțiile mari de jocuri și oferte normalizate.') },
        { label: T('Shared UI lib', 'Librărie UI comună'), note: T('The component layer every brand consumes — the reason a fix lands once and appears everywhere.', 'Stratul de componente pe care îl consumă toate brandurile — motivul pentru care o corecție se face o dată și apare peste tot.') },
      ] },
    ],
    demoNote: T('A brand configurator over the anonymised product: tokens, entitled modules and market copy on the left drive the whole surface on the right — flip a module and its nav item appears, switch market and the regulatory footer follows, or generate a brand from scratch in one click.', 'Un configurator de brand peste produsul anonimizat: tokenurile, modulele activate și textele de piață din stânga conduc toată interfața din dreapta — activezi un modul și îi apare intrarea în meniu, schimbi piața și footerul de reglementare se schimbă, sau generezi un brand de la zero într-un click.'),
  },
  {
    id: 'exadel', client: 'Exadel — Compliance Cockpit', demo: 'exadel',
    sector: T('Regulatory compliance · enterprise', 'Conformitate reglementară · enterprise'),
    period: T('Mar — Sep 2025', 'Mar — Sep 2025'),
    tags: ['Angular 18', 'Module Federation', 'Nx', 'Highcharts', 'NgRx'],
    stack: ['Angular 18', 'NgRx', 'RxJS', 'Nx', 'Module Federation', 'Highcharts', 'SCSS', 'i18next', 'NestJS', 'Storybook'],
    oneLiner: T('The Campaigns module of a regulatory-compliance platform used across Europe — built as an Angular micro-frontend inside an Nx monorepo.', 'Modulul de Campanii al unei platforme de conformitate folosită în toată Europa — construit ca micro-frontend Angular într-un monorepo Nx.'),
    context: [
      T('Compliance teams have to prove that their people were trained, on time, on the right regulation. The Cockpit is where they do it; I built the Campaigns module — the part that creates, schedules and manages awareness and training campaigns.', 'Echipele de conformitate trebuie să dovedească faptul că oamenii lor au fost instruiți, la timp, pe reglementarea corectă. Cockpit-ul e locul unde fac asta; eu am construit modulul de Campanii — partea care creează, programează și gestionează campaniile de conștientizare și training.'),
      T('It shipped as an independent micro-frontend, composed into the host with Module Federation, in a shared Nx monorepo alongside other teams.', 'A fost livrat ca micro-frontend independent, compus în host prin Module Federation, într-un monorepo Nx partajat cu alte echipe.'),
    ],
    challenge: [
      T('Several teams shipping into one product, on their own schedules, without stepping on each other. A single deployable would have made every release a negotiation.', 'Mai multe echipe livrează în același produs, pe propriile calendare, fără să se calce reciproc. Un singur deployable ar fi făcut din fiecare release o negociere.'),
      T('And the domain is fussy: a campaign targets employee groups that overlap, in several languages, with deadlines that regulators actually check.', 'Iar domeniul e pretențios: o campanie țintește grupuri de angajați care se suprapun, în mai multe limbi, cu termene pe care autoritățile le verifică în realitate.'),
    ],
    built: [
      { title: T('Multi-step campaign wizard', 'Wizard de campanie în mai mulți pași'), body: T('Create, schedule and manage awareness and training campaigns, with the state of a half-finished campaign surviving navigation.', 'Creezi, programezi și gestionezi campanii de conștientizare și training, iar starea unei campanii neterminate supraviețuiește navigării.') },
      { title: T('Recipient management', 'Gestionarea destinatarilor'), body: T('Employee- and group-level targeting, resolving overlaps so nobody gets the same mandatory training twice.', 'Țintire la nivel de angajat și grup, cu rezolvarea suprapunerilor, ca nimeni să nu primească același training obligatoriu de două ori.') },
      { title: T('Completion dashboards', 'Dashboarduri de finalizare'), body: T('Real-time tracking in Highcharts — the view a compliance officer opens before an audit.', 'Urmărire în timp real cu Highcharts — ecranul pe care un responsabil de conformitate îl deschide înainte de audit.') },
      { title: T('i18n for campaign content', 'i18n pentru conținut'), body: T('Campaign copy localised per organisation, not just per app shell.', 'Textele campaniei localizate pe organizație, nu doar la nivelul shell-ului.') },
      { title: T('Shared Web Components library', 'Librărie comună de Web Components'), body: T('Contributed to a cross-team Web Components + Angular library, documented in Storybook.', 'Am contribuit la o librărie Web Components + Angular pentru mai multe echipe, documentată în Storybook.') },
    ],
    metrics: [
      { label: T('Deploy independence', 'Independență la deploy'), before: T('one release train', 'un singur tren de release'), after: T('per-module', 'pe modul'), note: T('Module Federation let Campaigns ship without waiting for the host.', 'Module Federation a permis livrarea modulului Campanii fără să aștepte hostul.') },
      { label: T('Component reuse', 'Reutilizare de componente'), before: T('per-team copies', 'copii pe echipă'), after: T('shared library', 'librărie comună'), note: T('Web Components + Angular, documented in Storybook.', 'Web Components + Angular, documentate în Storybook.') },
      { label: T('Audit readiness', 'Pregătire pentru audit'), before: T('manual chasing', 'urmărire manuală'), after: T('live dashboard', 'dashboard live'), note: T('Completion tracked as it happens instead of collected after.', 'Finalizarea e urmărită pe loc, nu colectată ulterior.') },
    ],
    lessons: [
      { title: T('Micro-frontends buy autonomy, not simplicity', 'Micro-frontendurile cumpără autonomie, nu simplitate'), body: T('The wins are organisational — independent releases, clear ownership. The cost is contracts and versioning discipline, and you pay it every sprint.', 'Câștigurile sunt organizaționale — release-uri independente, responsabilitate clară. Costul e disciplina de contracte și versionare, și îl plătești în fiecare sprint.') },
      { title: T('Wizards are state machines wearing a UI', 'Wizardurile sunt automate de stare îmbrăcate în UI'), body: T('Modelling the campaign as explicit state, not as four screens, is what made validation and resumability tractable.', 'Modelarea campaniei ca stare explicită, nu ca patru ecrane, a făcut validarea și reluarea gestionabile.') },
    ],
    arch: [
      { title: T('Host', 'Host'), nodes: [
        { label: T('Cockpit shell', 'Shell Cockpit'), note: T('Owns auth, navigation and layout; knows about remotes only through a manifest, not through their code.', 'Deține autentificarea, navigarea și layoutul; știe de remote-uri doar prin manifest, nu prin codul lor.') },
      ] },
      { title: T('Remotes', 'Remote-uri'), nodes: [
        { label: T('Campaigns (mine)', 'Campanii (al meu)'), note: T('The module I built: wizard, recipient management, dashboards. Deployed on its own cadence via Module Federation.', 'Modulul construit de mine: wizard, gestionare destinatari, dashboarduri. Livrat pe propriul ritm, prin Module Federation.') },
        { label: T('Other domain modules', 'Alte module de domeniu'), note: T('Sibling remotes owned by other teams — the reason the contract between host and remote has to be boring and stable.', 'Remote-uri paralele deținute de alte echipe — motivul pentru care contractul host–remote trebuie să fie plictisitor și stabil.') },
      ] },
      { title: T('Shared', 'Comun'), nodes: [
        { label: T('Nx monorepo libs', 'Librării în monorepo Nx'), note: T('One dependency graph, enforced boundaries, affected-only builds. Nx is what keeps a shared repo from becoming a shared mess.', 'Un singur graf de dependențe, granițe impuse, build doar pe ce s-a schimbat. Nx e ce ține un repo comun să nu devină o harababură comună.') },
        { label: T('Web Components + Storybook', 'Web Components + Storybook'), note: T('Framework-agnostic components so non-Angular consumers can use them, documented so nobody has to read the source.', 'Componente agnostice de framework, ca să le poată folosi și consumatori non-Angular, documentate ca nimeni să nu fie obligat să citească sursa.') },
        { label: 'i18next', note: T('Localisation for campaign content, which is authored per organisation rather than shipped with the build.', 'Localizare pentru conținutul campaniilor, scris pe organizație, nu livrat cu buildul.') },
      ] },
      { title: T('Backend', 'Backend'), nodes: [
        { label: 'NestJS APIs', note: T('Campaign, recipient and completion services; the frontend treats completion as a stream, not a nightly report.', 'Servicii de campanii, destinatari și finalizare; frontendul tratează finalizarea ca flux, nu ca raport nocturn.') },
      ] },
    ],
    demoNote: T('The wizard, rebuilt anonymised: four steps, overlapping recipient groups resolved into a single count, and a completion ring once you launch.', 'Wizardul, refăcut anonimizat: patru pași, grupuri de destinatari suprapuse rezolvate într-un singur total și un inel de finalizare după lansare.'),
  },
  {
    id: 'mtd', client: 'MTD Technology', demo: 'mtd',
    sector: T('Automotive · vehicle software updates', 'Automotive · update-uri software pentru vehicule'),
    period: T('Mar 2024 — May 2025', 'Mar 2024 — Mai 2025'),
    tags: ['Angular', 'Ag-Grid', 'Angular Material', 'Data-dense UI'],
    stack: ['Angular', 'TypeScript', 'Ag-Grid', 'ngx-datatable', 'Angular Material', 'Bootstrap'],
    oneLiner: T('Sole frontend engineer on a mission-critical software-update management tool used across five Volkswagen Group marques.', 'Singurul inginer frontend pe un tool critic de management al update-urilor software, folosit pentru cinci mărci din Volkswagen Group.'),
    context: [
      T('The tool manages software updates for vehicles across five Volkswagen Group brands — Volkswagen, Seat, Porsche, Cupra, Bentley. I owned the entire frontend end-to-end as the only frontend engineer on it.', 'Tool-ul gestionează update-urile software pentru vehicule din cinci mărci Volkswagen Group — Volkswagen, Seat, Porsche, Cupra, Bentley. Am deținut tot frontendul, ca singur inginer frontend.'),
      T('That meant working directly with backend developers on data flow and translating stakeholder requirements into shipped screens, without a designer or a second pair of frontend hands.', 'Asta a însemnat lucru direct cu dezvoltatorii backend pe fluxul de date și traducerea cerințelor din business în ecrane livrate, fără designer și fără a doua pereche de mâini pe frontend.'),
    ],
    challenge: [
      T('Everything here is data-dense and consequential. An operator is looking at thousands of rows of vehicle, version and rollout state, and a wrong action reaches real cars.', 'Totul aici e dens în date și are consecințe. Un operator se uită la mii de rânduri de vehicule, versiuni și stări de lansare, iar o acțiune greșită ajunge la mașini reale.'),
      T('So the interface has to make state legible at a glance — what is live, what is staged, what is held — and stay fast while doing it.', 'Deci interfața trebuie să facă starea lizibilă din prima privire — ce e live, ce e pregătit, ce e blocat — și să rămână rapidă în timp ce face asta.'),
    ],
    built: [
      { title: T('Data-dense operations UI', 'UI dens de operațiuni'), body: T('Ag-Grid and ngx-datatable views over vehicle and rollout data, with Angular Material and Bootstrap for the surrounding shell.', 'Vederi Ag-Grid și ngx-datatable peste datele de vehicule și lansări, cu Angular Material și Bootstrap pentru restul interfeței.') },
      { title: T('Five-marque support', 'Suport pentru cinci mărci'), body: T('One tool covering five Volkswagen Group brands, each with its own model range and rollout rules.', 'Un singur tool pentru cinci mărci Volkswagen Group, fiecare cu gama și regulile ei de lansare.') },
      { title: T('Direct backend collaboration', 'Colaborare directă cu backendul'), body: T('Shaped the data flow with backend developers rather than consuming whatever arrived.', 'Am modelat fluxul de date împreună cu dezvoltatorii backend, în loc să consum ce venea.') },
      { title: T('Full frontend handover', 'Predare completă a frontendului'), body: T('Defined the role, interviewed and selected the incoming developer, and onboarded them for zero-disruption continuity.', 'Am definit rolul, am intervievat și selectat dezvoltatorul care a preluat, apoi l-am onboardat pentru continuitate fără întreruperi.') },
    ],
    metrics: [
      { label: T('Marques served', 'Mărci deservite'), before: '—', after: '5', note: T('Volkswagen, Seat, Porsche, Cupra, Bentley.', 'Volkswagen, Seat, Porsche, Cupra, Bentley.') },
      { label: T('Frontend team size', 'Mărimea echipei frontend'), before: '1', after: '1', note: T('Sole frontend engineer for the full engagement — spec to shipped.', 'Singur inginer frontend pe toată durata — de la spec la livrare.') },
      { label: T('Handover', 'Predare'), before: T('single point of failure', 'punct unic de eșec'), after: T('onboarded successor', 'succesor onboardat'), note: T('Role defined, candidate selected, continuity kept.', 'Rol definit, candidat selectat, continuitate păstrată.') },
    ],
    lessons: [
      { title: T('Being the only frontend means owning the questions too', 'Să fii singurul pe frontend înseamnă să deții și întrebările'), body: T('There was nobody to hand an ambiguity to. Going to the stakeholder directly was faster than guessing, every single time.', 'Nu aveam cui să pasez o ambiguitate. Să merg direct la stakeholder a fost mai rapid decât să ghicesc, de fiecare dată.') },
      { title: T('Leaving well is part of the job', 'Să pleci bine face parte din job'), body: T('Hiring and onboarding my own replacement was the difference between a contract ending and a project stalling.', 'Să recrutez și să onboardez propriul înlocuitor a fost diferența dintre un contract care se încheie și un proiect care se blochează.') },
    ],
    arch: [
      { title: T('Operators', 'Operatori'), nodes: [
        { label: T('Rollout console', 'Consolă de lansare'), note: T('The screen an operator lives in: filter by marque, inspect a model, advance or hold a rollout.', 'Ecranul în care trăiește operatorul: filtrează pe marcă, inspectează un model, avansează sau blochează o lansare.') },
      ] },
      { title: T('Frontend', 'Frontend'), nodes: [
        { label: 'Ag-Grid', note: T('Virtualised grids for the large datasets — sorting, filtering and column state that survive a page reload.', 'Griduri virtualizate pentru seturi mari de date — sortare, filtrare și stare de coloane care supraviețuiesc unui reload.') },
        { label: 'ngx-datatable', note: T('Lighter tabular views where a full grid would be overkill.', 'Vederi tabelare mai ușoare, acolo unde un grid complet ar fi exagerat.') },
        { label: T('Material + Bootstrap shell', 'Shell Material + Bootstrap'), note: T('Navigation, dialogs and forms around the data views.', 'Navigare, dialoguri și formulare în jurul vederilor de date.') },
      ] },
      { title: T('Data', 'Date'), nodes: [
        { label: T('Update service', 'Serviciu de update'), note: T('Version, campaign and rollout state per model; the frontend renders state, it never invents it.', 'Versiune, campanie și stare de lansare pe model; frontendul afișează starea, nu o inventează niciodată.') },
        { label: T('Fleet data', 'Date de flotă'), note: T('Vehicle counts per marque and model, which is what turns a percentage into a number of real cars.', 'Numărul de vehicule pe marcă și model — asta transformă un procent în număr de mașini reale.') },
      ] },
    ],
    demoNote: T('An anonymised rollout console — five marques, sortable columns, live rollout bars. The real tool is under NDA; this is its shape, not its data.', 'O consolă de lansare anonimizată — cinci mărci, coloane sortabile, bare de lansare live. Tool-ul real e sub NDA; asta e forma lui, nu datele lui.'),
  },
  {
    id: 'she', client: 'SHE Group', demo: 'she',
    sector: T('Financial · tax reporting', 'Financiar · raportare fiscală'),
    period: T('May 2024 — Mar 2025', 'Mai 2024 — Mar 2025'),
    tags: ['Angular', 'Nx', 'Angular Material', 'SCSS'],
    stack: ['Angular', 'Angular Material', 'Nx', 'SCSS', 'TypeScript'],
    oneLiner: T('Tax-report management across several frontend apps in one Nx monorepo, with reusable components feeding a code-generation tool.', 'Management de rapoarte fiscale în mai multe aplicații frontend, într-un monorepo Nx, cu componente reutilizabile care alimentau un tool de generare de cod.'),
    context: [
      T('The client needed a solution for managing tax reports, integrating closely with backend teams so the data flow stayed seamless. I also ran the client meetings where requirements were gathered.', 'Clientul avea nevoie de o soluție pentru gestionarea rapoartelor fiscale, integrată strâns cu echipele de backend, pentru un flux de date fără fricțiune. Am condus și întâlnirile cu clientul, unde se strângeau cerințele.'),
      T('Several frontend applications lived in one Nx monorepo, sharing a component layer I designed.', 'Mai multe aplicații frontend trăiau în același monorepo Nx, împărțind un strat de componente proiectat de mine.'),
    ],
    challenge: [
      T('Tax reporting is repetitive in structure and unforgiving in detail. Building each screen by hand would have been slow and inconsistent; generating them needed components predictable enough to generate against.', 'Raportarea fiscală e repetitivă în structură și neiertătoare în detalii. Construirea manuală a fiecărui ecran ar fi fost lentă și inconsecventă; generarea lor cerea componente suficient de previzibile ca să poți genera pe baza lor.'),
    ],
    built: [
      { title: T('Tax-report management', 'Management de rapoarte fiscale'), body: T('The client-facing flow for creating, reviewing and filing reports, integrated closely with backend services.', 'Fluxul pentru client de creare, verificare și depunere a rapoartelor, integrat strâns cu serviciile de backend.') },
      { title: T('Nx multi-app monorepo', 'Monorepo Nx cu mai multe aplicații'), body: T('Multiple frontend applications sharing one dependency graph and one component layer.', 'Mai multe aplicații frontend care împart un graf de dependențe și un strat de componente.') },
      { title: T('Components for code generation', 'Componente pentru generare de cod'), body: T('Reusable Angular Material + vanilla SCSS components designed to be assembled by a code-generation tool.', 'Componente reutilizabile Angular Material + SCSS vanilla, proiectate ca să fie asamblate de un tool de generare de cod.') },
      { title: T('Client-facing requirements work', 'Lucru direct cu clientul pe cerințe'), body: T('Led the meetings that kept delivery aligned with what the business actually needed.', 'Am condus întâlnirile care au ținut livrarea aliniată cu ce avea nevoie businessul.') },
    ],
    metrics: [
      { label: T('Apps in the monorepo', 'Aplicații în monorepo'), before: T('separate repos', 'repo-uri separate'), after: T('one Nx graph', 'un graf Nx'), note: T('Shared libs, enforced boundaries, affected-only builds.', 'Librării comune, granițe impuse, build doar pe ce s-a schimbat.') },
      { label: T('New screen delivery', 'Livrare de ecrane noi'), before: T('hand-written', 'scrise de mână'), after: T('generated + reviewed', 'generate + revizuite'), note: T('Codegen assembled the scaffold; humans reviewed the details.', 'Codegenul construia scheletul; oamenii revizuiau detaliile.') },
      { label: T('Requirements loop', 'Ciclul de cerințe'), before: T('relayed', 'transmise indirect'), after: T('direct', 'direct'), note: T('I ran the client meetings myself.', 'Am condus personal întâlnirile cu clientul.') },
    ],
    lessons: [
      { title: T('Generation forces good components', 'Generarea forțează componente bune'), body: T('You cannot generate against a component with special cases. Designing for codegen made the manual code better too.', 'Nu poți genera pe baza unei componente plină de cazuri speciale. Proiectarea pentru codegen a făcut și codul manual mai bun.') },
    ],
    arch: [
      { title: T('Apps', 'Aplicații'), nodes: [
        { label: T('Client tax reporting', 'Raportare fiscală client'), note: T('The main deliverable: report lifecycle from draft to filed.', 'Livrabilul principal: ciclul de viață al raportului, din draft până la depus.') },
        { label: T('Internal tools', 'Unelte interne'), note: T('Sibling apps in the same monorepo, sharing the component layer.', 'Aplicații paralele în același monorepo, care împart stratul de componente.') },
      ] },
      { title: T('Shared', 'Comun'), nodes: [
        { label: T('UI component lib', 'Librărie de componente UI'), note: T('Angular Material plus vanilla SCSS, deliberately free of special cases so a generator could compose it.', 'Angular Material plus SCSS vanilla, intenționat fără cazuri speciale, ca un generator să le poată compune.') },
        { label: T('Codegen tool', 'Tool de codegen'), note: T('Consumed those components to scaffold new screens, which is where the delivery speed came from.', 'Consuma acele componente ca să genereze ecrane noi — de acolo a venit viteza de livrare.') },
      ] },
      { title: T('Backend', 'Backend'), nodes: [
        { label: T('Reporting services', 'Servicii de raportare'), note: T('Close integration was the point: the frontend had to reflect filing state exactly, with no local guesses.', 'Integrarea strânsă era esențială: frontendul trebuia să reflecte exact starea depunerii, fără presupuneri locale.') },
      ] },
    ],
    demoNote: T('Three apps in one monorepo, a shared component layer, and report generation — the workflow, anonymised.', 'Trei aplicații într-un monorepo, un strat de componente comun și generarea rapoartelor — fluxul, anonimizat.'),
  },
  {
    id: 'be', client: 'Be | Shaping the Future', demo: 'be',
    sector: T('Banking · financial planning', 'Bancar · planificare financiară'),
    period: T('Jun 2023 — Mar 2024', 'Iun 2023 — Mar 2024'),
    tags: ['Angular 17', 'Angular Material', 'Bootstrap 5', 'Drag & drop'],
    stack: ['Angular 17', 'Angular Material', 'Bootstrap 5', 'TypeScript'],
    oneLiner: T('Financial applications for a leading Romanian bank, including a planning tool and a drag-and-drop PDF report generator.', 'Aplicații financiare pentru o bancă mare din România, printre care un tool de planificare și un generator de rapoarte PDF cu drag & drop.'),
    context: [
      T('I built financial applications for a leading Romanian bank: a financial-planning tool, and a drag-and-drop PDF generator that streamlined report creation for banking and investment professionals.', 'Am construit aplicații financiare pentru o bancă mare din România: un tool de planificare financiară și un generator de PDF cu drag & drop, care a simplificat crearea rapoartelor pentru profesioniștii din bancă și investiții.'),
      T('Working with backend and business teams, we set milestones together and shipped inside strict deadlines.', 'Lucrând cu echipele de backend și de business, am stabilit împreună milestone-urile și am livrat în termene strânse.'),
    ],
    challenge: [
      T('Advisors were assembling client reports by hand, which is slow and inconsistent — two advisors, two documents, same client situation.', 'Consultanții asamblau rapoartele pentru clienți manual, ceea ce e lent și inconsecvent — doi consultanți, două documente, aceeași situație a clientului.'),
      T('The fix had to feel like arranging a document, not filling in a form, while producing output a bank is willing to put its name on.', 'Soluția trebuia să se simtă ca aranjarea unui document, nu ca completarea unui formular, dar să producă un rezultat pe care o bancă e dispusă să și-l asume.'),
    ],
    built: [
      { title: T('Drag-and-drop PDF generator', 'Generator PDF cu drag & drop'), body: T('Advisors compose a report from blocks and see the document take shape as they arrange it.', 'Consultanții compun raportul din blocuri și văd documentul luând formă în timp ce îl aranjează.') },
      { title: T('Financial-planning tool', 'Tool de planificare financiară'), body: T('The modelling side that feeds those reports.', 'Partea de modelare care alimentează acele rapoarte.') },
      { title: T('Responsive banking UI', 'UI bancar responsiv'), body: T('Modern interfaces on Angular 17 with Angular Material and Bootstrap 5.', 'Interfețe moderne pe Angular 17, cu Angular Material și Bootstrap 5.') },
      { title: T('Milestone-driven delivery', 'Livrare pe milestone-uri'), body: T('Partnered with backend and business teams to set milestones and ship within strict deadlines.', 'Am colaborat cu echipele de backend și business pentru stabilirea milestone-urilor și livrare în termene strânse.') },
    ],
    metrics: [
      { label: T('Report assembly', 'Asamblarea raportului'), before: T('manual', 'manuală'), after: T('composed from blocks', 'compusă din blocuri'), note: T('The generator streamlined report creation for advisors.', 'Generatorul a simplificat crearea rapoartelor pentru consultanți.') },
      { label: T('Output consistency', 'Consecvența rezultatului'), before: T('advisor-dependent', 'depinde de consultant'), after: T('templated', 'pe șablon'), note: T('Same blocks, same structure, every client.', 'Aceleași blocuri, aceeași structură, pentru fiecare client.') },
      { label: T('Delivery', 'Livrare'), before: '—', after: T('on deadline', 'la termen'), note: T('Milestones set jointly with backend and business.', 'Milestone-uri stabilite împreună cu backendul și businessul.') },
    ],
    lessons: [
      { title: T('Direct manipulation beats forms', 'Manipularea directă bate formularele'), body: T('Once advisors could arrange the document instead of describing it, training more or less stopped being a topic.', 'Din momentul în care consultanții puteau aranja documentul în loc să îl descrie, trainingul a încetat aproape complet să fie o discuție.') },
    ],
    arch: [
      { title: T('Advisor', 'Consultant'), nodes: [
        { label: T('Report composer', 'Compozitor de raport'), note: T('Block palette on the left, document order in the middle, live preview on the right — arrange, do not describe.', 'Paleta de blocuri în stânga, ordinea documentului în mijloc, previzualizare live în dreapta — aranjezi, nu descrii.') },
      ] },
      { title: T('Frontend', 'Frontend'), nodes: [
        { label: T('Drag & drop engine', 'Motor drag & drop'), note: T('Block ordering and reordering as first-class state, so the preview and the PDF always agree.', 'Ordinea și reordonarea blocurilor ca stare de prim rang, ca previzualizarea și PDF-ul să fie mereu de acord.') },
        { label: T('Planning models', 'Modele de planificare'), note: T('The financial-planning tool that produces the numbers the report blocks display.', 'Tool-ul de planificare financiară care produce cifrele afișate de blocurile raportului.') },
      ] },
      { title: T('Output', 'Rezultat'), nodes: [
        { label: T('PDF pipeline', 'Pipeline PDF'), note: T('Renders the composed layout into a bank-branded document, which is where consistency stops being optional.', 'Transformă layoutul compus într-un document cu brandul băncii — aici consecvența nu mai e opțională.') },
      ] },
    ],
    demoNote: T('Add blocks, reorder them, watch the PDF preview follow. Same interaction model as the real generator, without the bank\'s branding.', 'Adaugă blocuri, reordonează-le, urmărește previzualizarea PDF. Același model de interacțiune ca generatorul real, fără brandul băncii.'),
  },
  {
    id: 'pulse', client: 'Pulse', demo: 'pulse', own: true,
    sector: T('Own product · AI fitness platform', 'Produs propriu · platformă fitness AI'),
    period: T('Next Level Tech', 'Next Level Tech'),
    tags: ['Next.js', 'Firebase', 'AI', 'White-label'],
    stack: ['Next.js', 'Firebase', 'TypeScript', 'AI workout generation'],
    oneLiner: T('An AI fitness platform I designed, built, shipped and operate solo: trainer–client workflows, generated workouts, white-label branding.', 'O platformă de fitness cu AI proiectată, construită, lansată și operată de mine singur: fluxuri antrenor–client, antrenamente generate, branding white-label.'),
    context: [
      T('Pulse is one of three products I built end-to-end on my own — design, code, ship, operate. It handles trainer–client workflows, AI-driven workout generation from a library of 70+ exercises, and white-label branding for gyms and studios.', 'Pulse e unul din trei produse construite de mine cap-coadă — design, cod, lansare, operare. Acoperă fluxurile antrenor–client, generarea de antrenamente cu AI din peste 70 de exerciții și branding white-label pentru săli și studiouri.'),
    ],
    challenge: [
      T('A generated plan that a trainer does not trust is worse than no plan. The generation has to be good enough to start from, and the trainer has to be able to override any part of it before the client ever sees it.', 'Un plan generat în care antrenorul nu are încredere e mai rău decât niciun plan. Generarea trebuie să fie suficient de bună ca punct de plecare, iar antrenorul trebuie să poată modifica orice parte înainte ca clientul să o vadă.'),
    ],
    built: [
      { title: T('Trainer–client workflows', 'Fluxuri antrenor–client'), body: T('Assignment, progression and feedback between the two roles.', 'Atribuire, progresie și feedback între cele două roluri.') },
      { title: T('AI workout generation', 'Generare de antrenamente cu AI'), body: T('Plans composed from a 70+ exercise library against goal and session length.', 'Planuri compuse dintr-o bibliotecă de peste 70 de exerciții, în funcție de obiectiv și durata sesiunii.') },
      { title: T('White-label branding', 'Branding white-label'), body: T('Gyms and studios run Pulse under their own identity.', 'Sălile și studiourile rulează Pulse sub propria identitate.') },
    ],
    metrics: [
      { label: T('Exercise library', 'Bibliotecă de exerciții'), before: '—', after: '70+', note: T('The pool generation draws from.', 'Sursa din care generează sistemul.') },
      { label: T('Team', 'Echipă'), before: '—', after: '1', note: T('Designed, built, shipped and operated solo.', 'Proiectat, construit, lansat și operat solo.') },
      { label: T('Deployment model', 'Model de livrare'), before: T('single brand', 'un singur brand'), after: T('white-label', 'white-label'), note: T('Same product, tenant branding.', 'Același produs, branding pe tenant.') },
    ],
    lessons: [
      { title: T('Ship the override before the automation', 'Livrează suprascrierea înainte de automatizare'), body: T('Generation earns trust only when the human can overrule it in one click.', 'Generarea câștigă încredere doar când omul o poate suprascrie într-un click.') },
    ],
    arch: [
      { title: T('Roles', 'Roluri'), nodes: [
        { label: T('Trainer', 'Antrenor'), note: T('Reviews and overrides generated plans, tracks client progression.', 'Revizuiește și modifică planurile generate, urmărește progresia clientului.') },
        { label: T('Client', 'Client'), note: T('Sees only the approved plan and logs sessions against it.', 'Vede doar planul aprobat și își înregistrează sesiunile pe baza lui.') },
      ] },
      { title: T('App', 'Aplicație'), nodes: [
        { label: 'Next.js', note: T('The product surface, rendered fast enough to feel native on a phone at the gym.', 'Suprafața produsului, randată suficient de rapid ca să pară nativă pe telefon, în sală.') },
        { label: T('Generation engine', 'Motor de generare'), note: T('Composes a session from the exercise library against goal, duration and equipment.', 'Compune o sesiune din biblioteca de exerciții, după obiectiv, durată și echipament.') },
        { label: T('Tenant theming', 'Theming pe tenant'), note: T('White-label identity per gym or studio.', 'Identitate white-label pentru fiecare sală sau studio.') },
      ] },
      { title: T('Platform', 'Platformă'), nodes: [
        { label: 'Firebase', note: T('Auth, data and hosting — chosen so one person can operate the whole thing.', 'Autentificare, date și hosting — alese ca o singură persoană să poată opera tot.') },
      ] },
    ],
    demoNote: T('Pick a goal, set the session length, generate — then switch the white-label tenant and watch the same plan re-brand.', 'Alege un obiectiv, setează durata, generează — apoi schimbă tenantul white-label și vezi același plan sub alt brand.'),
  },
  {
    id: 'dobby', client: 'Dobby', demo: 'dobby', own: true,
    sector: T('Own product · food ordering', 'Produs propriu · comenzi de mâncare'),
    period: T('~250 ' + 'daily active users', '~250 utilizatori activi zilnic'),
    tags: ['Angular', 'Node', 'Supabase', 'PostgreSQL'],
    stack: ['Angular', 'Node.js', 'Supabase', 'PostgreSQL', 'Real-time'],
    oneLiner: T('A food-ordering platform with real-time order updates, serving around 250 daily active users — and a database migration to keep up with them.', 'O platformă de comenzi de mâncare cu actualizări în timp real, cu aproximativ 250 de utilizatori activi zilnic — și o migrare de bază de date ca să țină pasul.'),
    context: [
      T('Dobby is the busiest of my own products: an Angular/Node/Supabase food-ordering platform with real-time order updates, serving around 250 daily active users.', 'Dobby e cel mai încărcat dintre produsele mele: o platformă de comenzi de mâncare Angular/Node/Supabase, cu actualizări în timp real și aproximativ 250 de utilizatori activi zilnic.'),
      T('As it grew I migrated it from SQLite to PostgreSQL to support the load.', 'Odată cu creșterea, am migrat de la SQLite la PostgreSQL pentru a susține încărcarea.'),
    ],
    challenge: [
      T('Real-time order state has two audiences at once — the kitchen and the customer — and they must never disagree about what is happening to an order.', 'Starea comenzii în timp real are două audiențe simultan — bucătăria și clientul — și nu trebuie niciodată să fie în dezacord despre ce se întâmplă cu o comandă.'),
      T('Growth also outran the original storage choice, so the migration had to happen without losing an order.', 'Creșterea a depășit și alegerea inițială de stocare, deci migrarea trebuia făcută fără pierderea vreunei comenzi.'),
    ],
    built: [
      { title: T('Real-time order updates', 'Actualizări în timp real'), body: T('Kitchen and customer see the same state as it changes.', 'Bucătăria și clientul văd aceeași stare, pe măsură ce se schimbă.') },
      { title: T('SQLite → PostgreSQL migration', 'Migrare SQLite → PostgreSQL'), body: T('Moved storage to support growth without downtime for users.', 'Am mutat stocarea pentru a susține creșterea, fără downtime pentru utilizatori.') },
      { title: T('Operating it, not just building it', 'Operare, nu doar construire'), body: T('Solo product: I ship it, run it and answer for it.', 'Produs solo: îl livrez, îl rulez și răspund pentru el.') },
    ],
    metrics: [
      { label: T('Daily active users', 'Utilizatori activi zilnic'), before: '—', after: '~250', note: T('The largest of my three own products.', 'Cel mai mare dintre cele trei produse proprii.') },
      { label: T('Database', 'Bază de date'), before: 'SQLite', after: 'PostgreSQL', note: T('Migrated to carry the growing load.', 'Migrat pentru a susține încărcarea în creștere.') },
      { label: T('Order state', 'Starea comenzii'), before: T('polled', 'interogată periodic'), after: T('real-time', 'în timp real'), note: T('Kitchen and customer stay in sync.', 'Bucătăria și clientul rămân sincronizați.') },
    ],
    lessons: [
      { title: T('Pick the boring database sooner', 'Alege baza de date plictisitoare mai devreme'), body: T('SQLite got Dobby to real users fast. It also set a date for a migration I could have skipped.', 'SQLite a dus Dobby rapid la utilizatori reali. Dar mi-a fixat și data unei migrări pe care aș fi putut să o evit.') },
    ],
    arch: [
      { title: T('Clients', 'Clienți'), nodes: [
        { label: T('Customer app', 'Aplicația clientului'), note: T('Order placement and live status.', 'Plasarea comenzii și status live.') },
        { label: T('Kitchen board', 'Panoul bucătăriei'), note: T('The lane view staff work from; advancing an order here is what the customer sees.', 'Vederea pe coloane cu care lucrează personalul; avansarea unei comenzi aici e ce vede clientul.') },
      ] },
      { title: T('Services', 'Servicii'), nodes: [
        { label: 'Node.js API', note: T('Order lifecycle and menu; the single writer of order state.', 'Ciclul de viață al comenzii și meniul; singurul care scrie starea comenzii.') },
        { label: T('Real-time channel', 'Canal în timp real'), note: T('Pushes state changes to both audiences at once, which is why they never disagree.', 'Trimite schimbările de stare simultan către ambele audiențe — de asta nu ajung în dezacord.') },
      ] },
      { title: T('Data', 'Date'), nodes: [
        { label: 'Supabase / PostgreSQL', note: T('The post-migration home for orders. PostgreSQL replaced SQLite when the load justified it.', 'Casa comenzilor după migrare. PostgreSQL a înlocuit SQLite când încărcarea a justificat-o.') },
      ] },
    ],
    demoNote: T('A live kitchen board: place an order, tap it forward through the lanes, watch the ages tick while you look at it.', 'Un panou de bucătărie live: plasează o comandă, avansează-o prin coloane, urmărește cum cresc timpii chiar în timp ce te uiți.'),
  },
  {
    id: 'luppy', client: 'Luppy', demo: 'luppy', own: true,
    sector: T('Own product · digital pet health platform', 'Produs propriu · platformă digitală de sănătate veterinară'),
    period: '2025',
    tags: ['Next.js', 'Firebase', 'RBAC', 'Scheduling'],
    stack: ['Next.js', 'Firebase', 'Role-based dashboards', 'Scheduling', 'Messaging'],
    oneLiner: T('The pet health booklet, digitised — one medical record, two portals: the clinic runs administration, lab results and appointments; the owner follows their pet\'s health, books visits and messages the vet.', 'Carnetul de sănătate al animalului, digitalizat — o singură fișă medicală, două portaluri: clinica gestionează administrarea, analizele și programările; proprietarul urmărește sănătatea animalului, face programări și comunică cu veterinarul.'),
    context: [
      T('Luppy replaces the paper health booklet with a living medical record. On one side, a portal for veterinarians and clinics: patient administration, consultations, treatments, lab results and the clinic\'s appointment calendar. On the other, an app for the owner: the pet\'s profile and history, upcoming appointments, and a direct line to the clinic.', 'Luppy înlocuiește carnetul de sănătate pe hârtie cu o fișă medicală vie. Pe o parte, un portal pentru veterinari și clinici: administrarea pacienților, consultații, tratamente, analize și calendarul de programări al clinicii. Pe cealaltă, o aplicație pentru proprietar: profilul și istoricul animalului, programările următoare și o linie directă de comunicare cu clinica.'),
    ],
    challenge: [
      T('One medical record, two very different readers. The vet needs clinical depth — values, dosages, differential notes; the owner needs clarity and reassurance. Both look at the same data, so the projection per role has to live in the data model, not in the UI.', 'O singură fișă medicală, doi cititori foarte diferiți. Veterinarul are nevoie de profunzime clinică — valori, dozaje, note diferențiale; proprietarul are nevoie de claritate și liniște. Amândoi se uită la aceleași date, deci proiecția pe rol trebuie să stea în modelul de date, nu în UI.'),
      T('Scheduling and communication cut across both sides: a booking has to respect the clinic\'s real capacity, and a message thread has to connect owner and clinic without leaking clinical internals.', 'Programările și comunicarea traversează ambele părți: o programare trebuie să respecte capacitatea reală a clinicii, iar un fir de mesaje trebuie să lege proprietarul de clinică fără să scurgă detalii clinice interne.'),
    ],
    built: [
      { title: T('Clinic portal — patient administration', 'Portal de clinică — administrarea pacienților'), body: T('Records, consultations and treatments, managed by vets and clinic staff with role-appropriate access.', 'Fișe, consultații și tratamente, gestionate de veterinari și personalul clinicii, cu acces potrivit rolului.') },
      { title: T('Lab results on the record', 'Analize atașate fișei'), body: T('Results attach to the medical record as they arrive — full values for the vet, a readable summary for the owner.', 'Rezultatele se atașează fișei pe măsură ce sosesc — valori complete pentru veterinar, un sumar lizibil pentru proprietar.') },
      { title: T('Appointments', 'Programări'), body: T('Owners book online against the clinic\'s calendar; the clinic confirms, reschedules and keeps the day legible.', 'Proprietarii se programează online în calendarul clinicii; clinica confirmă, reprogramează și își ține ziua lizibilă.') },
      { title: T('Owner–clinic messaging', 'Mesagerie proprietar–clinică'), body: T('A conversation thread anchored to the pet\'s record, so context never gets lost between visits.', 'Un fir de conversație ancorat în fișa animalului, ca între vizite contextul să nu se piardă.') },
      { title: T('Role-based views of one record', 'Vederi pe rol ale aceleiași fișe'), body: T('Owner, vet and clinic administrator each get their own projection — what a role cannot see, it does not receive.', 'Proprietarul, veterinarul și administratorul clinicii au fiecare propria proiecție — ce nu are voie să vadă un rol, nici nu primește.') },
    ],
    metrics: [
      { label: T('Health record', 'Carnetul de sănătate'), before: T('paper booklet', 'carnet de hârtie'), after: T('living record', 'fișă vie'), note: T('History, results and treatments in one place, for both sides.', 'Istoric, analize și tratamente într-un singur loc, pentru ambele părți.') },
      { label: T('Booking', 'Programarea'), before: T('phone calls', 'telefoane'), after: T('online', 'online'), note: T('Owners book against real clinic capacity.', 'Proprietarii se programează pe capacitatea reală a clinicii.') },
      { label: T('Roles served', 'Roluri deservite'), before: '—', after: '3', note: T('Owner, veterinarian, clinic administrator — one record each way.', 'Proprietar, veterinar, administrator de clinică — aceeași fișă, trei vederi.') },
    ],
    lessons: [
      { title: T('Permissions are a product decision', 'Permisiunile sunt o decizie de produs'), body: T('Deciding what an owner should see of a clinical note was harder — and more valuable — than any part of the implementation.', 'Decizia despre ce vede proprietarul dintr-o notă clinică a fost mai grea — și mai valoroasă — decât orice parte din implementare.') },
      { title: T('Two audiences, one truth', 'Două audiențe, un singur adevăr'), body: T('Write the record clinically once, render it differently per reader. Duplicating it per audience is how records drift apart.', 'Scrii fișa clinic o singură dată și o randezi diferit pe cititor. Duplicarea pe audiențe e felul în care fișele ajung să se contrazică.') },
    ],
    arch: [
      { title: T('Portals', 'Portaluri'), nodes: [
        { label: T('Clinic portal', 'Portal clinică'), note: T('The working surface for vets and staff: patients, consultations, results, the day\'s calendar.', 'Suprafața de lucru pentru veterinari și personal: pacienți, consultații, rezultate, calendarul zilei.') },
        { label: T('Owner app', 'Aplicația proprietarului'), note: T('The pet\'s health at a glance: history, upcoming visits, messages — clinical detail translated into clarity.', 'Sănătatea animalului dintr-o privire: istoric, vizite următoare, mesaje — detaliul clinic tradus în claritate.') },
      ] },
      { title: T('Core', 'Nucleu'), nodes: [
        { label: T('Medical record', 'Fișa medicală'), note: T('The single source of truth: consultations, treatments, lab results, documents — ordered and filterable.', 'Singura sursă de adevăr: consultații, tratamente, analize, documente — ordonate și filtrabile.') },
        { label: T('Scheduling', 'Programări'), note: T('Bookings against clinic capacity, confirmations and rescheduling on both sides.', 'Programări pe capacitatea clinicii, confirmări și reprogramări pe ambele părți.') },
        { label: T('Messaging', 'Mesagerie'), note: T('Owner–clinic threads anchored to the record, so a question always carries its context.', 'Fire proprietar–clinică ancorate în fișă, ca o întrebare să-și poarte mereu contextul.') },
      ] },
      { title: T('Platform', 'Platformă'), nodes: [
        { label: 'Firebase + RBAC', note: T('Access rules live with the data, so a role never receives what it is not allowed to see.', 'Regulile de acces stau lângă date, deci un rol nu primește niciodată ce nu are dreptul să vadă.') },
      ] },
    ],
    demoNote: T('Switch role and watch the same record change shape — then act as that role: the owner books a visit, the vet attaches a lab result, the clinic confirms the day.', 'Schimbă rolul și vezi cum aceeași fișă își schimbă forma — apoi acționează ca rolul respectiv: proprietarul cere o programare, veterinarul atașează o analiză, clinica confirmă ziua.'),
  },
  {
    id: 'horae', client: 'Horae', demo: 'horae', own: true,
    sector: T('Own product · multi-tenant production platform', 'Produs propriu · platformă multi-tenant de producție'),
    period: 'horae.ca',
    live: { url: 'https://demo.test.horae.ca', user: 'demo@horae.ca', pass: 'HoraeDemo2026!' },
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Multi-tenant', 'White-label', 'Real-time', 'RBAC'],
    stack: ['Next.js 16 (App Router)', 'React 19', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO', 'CASL', 'SwiftUI (iOS 17+)', 'Kotlin / Jetpack Compose', 'pnpm + Turborepo', 'Docker'],
    oneLiner: T('A multi-tenant production and inventory platform for confectionery businesses — recipes, production tasks, FIFO stock, orders, deliveries and multi-location transfers — one NestJS backend serving a Next.js web app plus native iOS and Android clients.', 'O platformă multi-tenant de producție și inventar pentru cofetării — rețete, taskuri de producție, stoc FIFO, comenzi, livrări și transferuri între locații — un singur backend NestJS care servește o aplicație web Next.js plus clienți nativi iOS și Android.'),
    context: [
      T('Horae is the largest thing I have built alone. It runs the day of a confectionery business end to end: recipes and costing, production tasks, stock with FIFO lots, orders, delivery notes, transfers between locations, equipment and analytics. Acadeea, the first customer, is now simply the flagship tenant — one organisation among many.', 'Horae e cel mai mare lucru construit de mine singur. Acoperă ziua unei cofetării cap-coadă: rețete și costuri, taskuri de producție, stoc cu loturi FIFO, comenzi, avize de livrare, transferuri între locații, echipamente și analize. Acadeea, primul client, e acum pur și simplu tenantul principal — o organizație între multe altele.'),
      T('One NestJS + Prisma + PostgreSQL backend owns all business logic; four thin clients consume the same REST + WebSocket contract: a Next.js 16 admin web app, a native SwiftUI iOS app, an early-stage Kotlin/Compose Android app, and inbound webhooks from eBriza and WooCommerce. I designed it, built it, deploy it and operate it.', 'Un singur backend NestJS + Prisma + PostgreSQL deține toată logica de business; patru clienți subțiri consumă același contract REST + WebSocket: o aplicație web de administrare în Next.js 16, o aplicație nativă SwiftUI pe iOS, o aplicație Android Kotlin/Compose la început de drum și webhookuri de la eBriza și WooCommerce. Eu am proiectat-o, am construit-o, o deployez și o operez.'),
    ],
    challenge: [
      T('Multi-tenancy is the part that has to be right on the first try. Around twenty-two data models carry an organisation id, and a single missed scope in a query is a data leak between two competing businesses — not a bug you patch politely.', 'Multi-tenancy e partea care trebuie să fie corectă din prima. Vreo douăzeci și două de modele de date au un id de organizație, iar un singur scope ratat într-un query e o scurgere de date între două afaceri concurente — nu un bug pe care îl repari relaxat.'),
      T('On top of that: white-label branding per tenant, dynamic database-defined roles instead of hardcoded ones, real-time task and stock updates that reach the right organisation only, and the same domain re-implemented in TypeScript, Swift and Kotlin without the three drifting apart.', 'Pe deasupra: branding white-label pe tenant, roluri dinamice definite în bază de date în loc de roluri hardcodate, actualizări în timp real de taskuri și stoc care ajung doar la organizația potrivită, și același domeniu reimplementat în TypeScript, Swift și Kotlin fără ca cele trei să se despartă în timp.'),
    ],
    built: [
      { title: T('Tenant isolation in the data layer', 'Izolarea tenantului în stratul de date'), body: T('A Prisma client extension driven by request-scoped AsyncLocalStorage injects the organisation id into every read and stamps it on every write, with per-org uniques replacing the old global ones and an enforcement level switch for rollout.', 'O extensie de client Prisma alimentată de AsyncLocalStorage pe request injectează id-ul organizației în fiecare citire și îl aplică la fiecare scriere, cu unicități pe organizație în locul celor globale și un comutator de nivel de aplicare pentru lansare.') },
      { title: T('White-label per organisation', 'White-label pe organizație'), body: T('Name, accent plus secondary and tertiary brand colors, font, logo set and app icon live on the tenant row; all clients derive their tints and chart colors from those three colors, with optional per-platform token overrides for tenants that want a fully custom look.', 'Nume, accent plus culori secundare și terțiare, font, set de logouri și iconiță de aplicație stau pe rândul tenantului; toți clienții își derivă nuanțele și culorile de grafic din acele trei culori, cu suprascrieri opționale de tokenuri pe platformă pentru tenanții care vor un aspect complet propriu.') },
      { title: T('Production chain: recipe → task → stock', 'Lanțul de producție: rețetă → task → stoc'), body: T('Recipes nest (a semi-preparat is a recipe), so cost is computed recursively; a task scales a recipe, draws raw materials down FIFO from stock lots, records exact lot attribution for traceability, and writes actual-versus-expected yield.', 'Rețetele se cuibăresc (un semipreparat e o rețetă), deci costul se calculează recursiv; un task scalează o rețetă, consumă materia primă FIFO din loturi, înregistrează atribuirea exactă a lotului pentru trasabilitate și scrie randamentul real față de cel așteptat.') },
      { title: T('Dynamic roles, not hardcoded ones', 'Roluri dinamice, nu hardcodate'), body: T('Authorization is CASL abilities computed from database-defined roles cloned per organisation, so a tenant can shape its own permission set; clients keep a permission map only to hide UI, never to enforce.', 'Autorizarea sunt abilități CASL calculate din roluri definite în baza de date și clonate pe organizație, deci un tenant își poate modela propriul set de permisiuni; clienții țin o hartă de permisiuni doar pentru a ascunde UI, niciodată pentru a impune reguli.') },
      { title: T('Org-scoped real-time', 'Timp real limitat la organizație'), body: T('Socket.IO rooms are scoped per organisation and per role, so task, stock and low-stock events reach exactly the people entitled to them — and an event with no resolvable organisation is dropped rather than broadcast.', 'Camerele Socket.IO sunt limitate pe organizație și pe rol, deci evenimentele de task, stoc și stoc scăzut ajung exact la cine are dreptul — iar un eveniment fără organizație identificabilă e aruncat, nu difuzat.') },
      { title: T('Host routing with session handoff', 'Rutare pe host cu transfer de sesiune'), body: T('Marketing sits on the apex domain, each organisation on its own subdomain; logging in on the apex mints a single-use handoff code that transfers the session to the tenant host.', 'Partea de marketing stă pe domeniul principal, fiecare organizație pe propriul subdomeniu; autentificarea pe domeniul principal generează un cod de transfer de unică folosință care mută sesiunea pe hostul tenantului.') },
      { title: T('External order ingestion', 'Preluarea comenzilor externe'), body: T('Per-integration webhooks from eBriza and WooCommerce land as external order rows, then map onto real orders through product mappings on an explicit sync step.', 'Webhookuri per integrare de la eBriza și WooCommerce ajung ca rânduri de comenzi externe, apoi se mapează pe comenzi reale prin mapări de produse, la un pas de sincronizare explicit.') },
      { title: T('Release discipline for a solo operator', 'Disciplină de release pentru un operator solo'), body: T('Release branches, conventional commits, Prisma migrations instead of destructive pushes, separate test and production environments across all four clients, and a curated Romanian changelog served from the API.', 'Branch-uri de release, conventional commits, migrări Prisma în loc de push-uri distructive, medii separate de test și producție pe toți cei patru clienți și un changelog curatoriat în română, servit din API.') },
    ],
    metrics: [
      { label: T('Clients on one contract', 'Clienți pe un singur contract'), before: '1', after: '4', note: T('Next.js web, SwiftUI iOS, Compose Android, plus external integrations — all thin over the same REST + WebSocket API.', 'Web Next.js, iOS SwiftUI, Android Compose, plus integrări externe — toate subțiri peste același API REST + WebSocket.') },
      { label: T('Tenancy model', 'Model de tenancy'), before: T('single business', 'o singură afacere'), after: T('multi-tenant', 'multi-tenant'), note: T('~22 org-scoped models; the first customer became one tenant among many.', '~22 de modele limitate pe organizație; primul client a devenit un tenant între multe altele.') },
      { label: T('Tenant branding', 'Branding pe tenant'), before: T('hardcoded theme', 'temă hardcodată'), after: T('white-label', 'white-label'), note: T('Colors, font, logos and app icon come from the organisation row.', 'Culorile, fontul, logourile și iconița vin din rândul organizației.') },
      { label: T('Authorization', 'Autorizare'), before: T('hardcoded roles', 'roluri hardcodate'), after: T('DB-defined CASL', 'CASL din baza de date'), note: T('Abilities computed per tenant; clients check abilities, not role names.', 'Abilități calculate pe tenant; clienții verifică abilități, nu nume de roluri.') },
      { label: T('Schema changes', 'Modificări de schemă'), before: T('destructive push', 'push distructiv'), after: T('migrations', 'migrări'), note: T('Both live environments baselined; deploys run migrations.', 'Ambele medii live au fost baseline-uite; deployurile rulează migrări.') },
      { label: T('Team', 'Echipă'), before: '—', after: '1', note: T('Backend, web, iOS, Android, infrastructure and operations.', 'Backend, web, iOS, Android, infrastructură și operare.') },
    ],
    lessons: [
      { title: T('Put tenancy in the data layer, not in the queries', 'Pune tenancy-ul în stratul de date, nu în query-uri'), body: T('Every place a developer could forget the organisation filter is a place they eventually will. Moving it into a Prisma extension made isolation a property of the system instead of a habit.', 'Fiecare loc în care un dezvoltator poate uita filtrul de organizație e un loc în care va uita cândva. Mutarea lui într-o extensie Prisma a făcut izolarea o proprietate a sistemului, nu un obicei.') },
      { title: T('Four clients means the contract is the product', 'Patru clienți înseamnă că produsul e contractul'), body: T('Web, iOS and Android each re-implement their own models, so anything ambiguous in the API gets interpreted three different ways. Writing the contract down — and keeping the docs current — is cheaper than reconciling three interpretations later.', 'Web, iOS și Android își reimplementează fiecare propriile modele, deci orice ambiguitate din API e interpretată în trei feluri. Scrierea contractului — și menținerea documentației la zi — e mai ieftină decât reconcilierea a trei interpretări mai târziu.') },
      { title: T('Speak the customer\'s language, literally', 'Vorbește limba clientului, la propriu'), body: T('The domain vocabulary and the interface are Romanian, including the status names in the data model. Pastry chefs work with their hands busy; translating the tool into their words removed most of the training.', 'Vocabularul domeniului și interfața sunt în română, inclusiv numele stărilor din modelul de date. Cofetarii lucrează cu mâinile ocupate; traducerea uneltei în cuvintele lor a eliminat aproape tot trainingul.') },
    ],
    arch: [
      { title: T('Clients', 'Clienți'), nodes: [
        { label: T('Web — Next.js 16', 'Web — Next.js 16'), note: T('App Router with React 19: the full admin surface — recipes, tasks, stock, orders, transfers, analytics. Host-routed, so each organisation lives on its own subdomain while marketing stays on the apex.', 'App Router cu React 19: toată suprafața de administrare — rețete, taskuri, stoc, comenzi, transferuri, analize. Rutată pe host, deci fiecare organizație stă pe propriul subdomeniu, iar marketingul rămâne pe domeniul principal.') },
        { label: T('iOS — SwiftUI', 'iOS — SwiftUI'), note: T('A production-grade native app covering every domain, built for people working with their hands busy in a kitchen. Tokens in Keychain, real-time over the WebSocket channel.', 'O aplicație nativă completă, care acoperă toate domeniile, făcută pentru oameni care lucrează cu mâinile ocupate în bucătărie. Tokenuri în Keychain, timp real prin canalul WebSocket.') },
        { label: T('Android — Compose', 'Android — Compose'), note: T('Kotlin and Jetpack Compose, early-stage: core flows only. Tokens in encrypted preferences; it consumes exactly the same REST contract.', 'Kotlin și Jetpack Compose, la început de drum: doar fluxurile principale. Tokenuri în preferințe criptate; consumă exact același contract REST.') },
        { label: T('Integrations', 'Integrări'), note: T('eBriza and WooCommerce push orders in through per-integration webhooks; they land as external order rows and become real orders on an explicit sync.', 'eBriza și WooCommerce trimit comenzi prin webhookuri per integrare; acestea ajung ca rânduri de comenzi externe și devin comenzi reale la o sincronizare explicită.') },
      ] },
      { title: T('Contract', 'Contract'), nodes: [
        { label: T('REST /api/v1', 'REST /api/v1'), note: T('JSON, paginated lists, one standard error body with a correlation id, documented in Swagger and exported as an OpenAPI spec. Every client is thin over this.', 'JSON, liste paginate, un singur corp standard de eroare cu id de corelare, documentat în Swagger și exportat ca specificație OpenAPI. Fiecare client e subțire peste asta.') },
        { label: T('Auth + handoff', 'Auth + handoff'), note: T('RS256 access tokens carrying the organisation, opaque refresh tokens with rotation, and a single-use handoff code that moves a session from the apex domain to the tenant subdomain.', 'Tokenuri de acces RS256 care conțin organizația, tokenuri de refresh opace cu rotație și un cod de transfer de unică folosință care mută sesiunea de pe domeniul principal pe subdomeniul tenantului.') },
        { label: T('Socket.IO /ws', 'Socket.IO /ws'), note: T('Org- and role-scoped rooms for task, stock, low-stock and activity events. An event that cannot resolve its organisation is dropped rather than leaked.', 'Camere limitate pe organizație și rol pentru evenimente de task, stoc, stoc scăzut și activitate. Un eveniment care nu își poate identifica organizația e aruncat, nu scurs.') },
      ] },
      { title: T('Backend', 'Backend'), nodes: [
        { label: T('NestJS modules', 'Module NestJS'), note: T('Recipes and pricing, tasks, stock, orders and deliveries, locations and transfers, equipment, analytics, organisations, integrations — one module per domain, all business logic here and nowhere else.', 'Rețete și prețuri, taskuri, stoc, comenzi și livrări, locații și transferuri, echipamente, analize, organizații, integrări — un modul pe domeniu, toată logica de business aici și nicăieri altundeva.') },
        { label: T('Tenant extension', 'Extensie de tenant'), note: T('The heart of the isolation: a Prisma extension over request-scoped AsyncLocalStorage that injects the organisation into reads and stamps it on writes, with a configurable enforcement level.', 'Inima izolării: o extensie Prisma peste AsyncLocalStorage pe request, care injectează organizația în citiri și o aplică la scrieri, cu nivel de aplicare configurabil.') },
        { label: T('CASL abilities', 'Abilități CASL'), note: T('Abilities built from database-defined roles, cached briefly per role, checked in route guards. Administrators short-circuit to manage-all; everyone else is data.', 'Abilități construite din roluri definite în baza de date, cache-uite scurt pe rol, verificate în guards. Administratorii sar direct la manage-all; restul e configurație în date.') },
      ] },
      { title: T('Data', 'Date'), nodes: [
        { label: T('PostgreSQL + Prisma', 'PostgreSQL + Prisma'), note: T('Around twenty-two org-scoped models: recipes and versions, tasks and status history, stock lots and movements, orders and delivery notes, locations and transfers, equipment. Schema changes ship as migrations.', 'Aproximativ douăzeci și două de modele limitate pe organizație: rețete și versiuni, taskuri și istoric de stări, loturi și mișcări de stoc, comenzi și avize, locații și transferuri, echipamente. Modificările de schemă se livrează ca migrări.') },
        { label: T('FIFO lots', 'Loturi FIFO'), note: T('Stock is held in lots with expiry and supplier invoice; production draws them down oldest-first and records exact lot attribution per task, which is what makes a traceability sheet possible.', 'Stocul e ținut în loturi cu expirare și factură de furnizor; producția le consumă începând cu cel mai vechi și înregistrează atribuirea exactă a lotului pe task — asta face posibilă fișa de trasabilitate.') },
        { label: T('Redis · S3 · SMTP', 'Redis · S3 · SMTP'), note: T('Cache and sessions, object storage for invoices, signatures, logos and PDFs, and mail for invitations and notifications.', 'Cache și sesiuni, stocare de obiecte pentru facturi, semnături, logouri și PDF-uri, și email pentru invitații și notificări.') },
      ] },
    ],
    demoNote: T('The production chain, rebuilt: switch tenant to watch the white-label accent take over, then move a task from to-do to done and watch FIFO stock lots draw down and the traceability line appear.', 'Lanțul de producție, refăcut: schimbă tenantul ca să vezi accentul white-label preluând interfața, apoi mută un task din de-făcut în finalizat și urmărește cum se consumă loturile FIFO și apare linia de trasabilitate.'),
  },
];

const EARLIER = [
  { period: T('Jun 2022 — Jun 2023', 'Iun 2022 — Iun 2023'), client: 'Wirtek Romania', note: T('Led frontend development of a green-energy application in a 10-person team; integrated with backend via Azure DevOps and mentored junior developers.', 'Am condus dezvoltarea frontend a unei aplicații de energie verde într-o echipă de 10; integrare cu backendul prin Azure DevOps și mentorat pentru juniori.') },
  { period: T('Nov 2021 — Nov 2022', 'Noi 2021 — Noi 2022'), client: 'Fabrit Global', note: T('Built and maintained the frontend of a sports-arena booking platform (Angular 8/5), optimising performance across mobile and desktop.', 'Am construit și întreținut frontendul unei platforme de rezervări pentru arene sportive (Angular 8/5), optimizând performanța pe mobil și desktop.') },
  { period: T('Mar 2020 — Nov 2021', 'Mar 2020 — Noi 2021'), client: 'P4B Group', note: T('Led the frontend of an Angular 12 product with a PHP backend, coordinating two other frontend developers.', 'Am condus frontendul unui produs Angular 12 cu backend PHP, coordonând alți doi dezvoltatori frontend.') },
  { period: T('Jan 2017 — Mar 2020', 'Ian 2017 — Mar 2020'), client: 'msg systems Romania', note: T('Junior frontend developer on a medical/insurance application (Angular 8, SCSS, SAP Spartacus); led the migration to production Spartacus.', 'Dezvoltator frontend junior pe o aplicație medicală/asigurări (Angular 8, SCSS, SAP Spartacus); am condus migrarea către versiunea de producție a Spartacus.') },
  { period: T('Nov 2015 — Dec 2016', 'Noi 2015 — Dec 2016'), client: T('Draexlmaier Group — Germany', 'Draexlmaier Group — Germania'), note: T('Backend developer intern: SAP ABAP training, front- and back-end features for a retail app on S/4HANA, SAPUI5 and Fiori.', 'Intern backend: training SAP ABAP, funcționalități front- și back-end pentru o aplicație de retail pe S/4HANA, SAPUI5 și Fiori.') },
];

export { T, CASES, EARLIER };
