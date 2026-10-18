// Case-study data — extracted verbatim from the Claude Design project (Portfolio.dc.html).
const T = (en, ro) => ({ en, ro });

const CASES = [
  {
    id: 'platform', client: 'Platform Operator', demo: 'platform',
    sector: T('Regulated B2C · white-label platform', 'B2C reglementat · platformă white-label'),
    period: T('Jun 2025 — present', 'Iun 2025 — prezent'),
    tags: ['Angular', 'NgRx', 'Micro-frontends', 'Design systems', 'PWA'],
    stack: ['Angular', 'TypeScript', 'NgRx (Store, Effects, Entity)', 'RxJS', 'Angular Material', 'SCSS', 'PWA', 'i18n', 'Jasmine/Karma', 'Claude Code + GitHub CLI'],
    oneLiner: T('Core Angular/NgRx frontend of a regulated consumer platform: lobby pages, gamification, payment flows and an automated pre-PR code review that cut review time by 80%.', 'Frontendul principal Angular/NgRx al unei platforme de consum reglementate: pagini de lobby, gamificare, fluxuri de plată și un review automat înainte de PR care a redus timpul de review cu 80%.'),
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
    id: 'dobby', client: 'Dobby', demo: null, own: true,
    sector: T('Own product · group food ordering', 'Produs propriu · comenzi de grup'),
    period: T('2.0 in build, 2026', '2.0 în lucru, 2026'),
    tags: ['SwiftUI', 'Express 5', 'Prisma', 'PostgreSQL'],
    stack: ['SwiftUI (iOS 17+)', 'XcodeGen', 'Express 5', 'TypeScript', 'Prisma 6', 'PostgreSQL 16', 'zod', 'JWT', 'AES-256-GCM', 'Universal Links'],
    oneLiner: T('Group ordering on top of Bolt Food, Wolt and Glovo: one person orders, everyone adds their items from a shared link, and the bill is split to the ban with a clear “you owe X to Y”.', 'Comenzi de grup peste Bolt Food, Wolt și Glovo: o persoană comandă, toți își adaugă produsele dintr-un link comun, iar nota se împarte la ban, cu un „îi datorezi X lui Y” clar.'),
    context: [
      T('Dobby started as an office catering app — Angular, Node and SQLite, later PostgreSQL — that served around 250 people a day. When the office lunch moved to the delivery apps, the real problem moved with it: one person orders for twelve, then spends the afternoon chasing money.', 'Dobby a început ca aplicație de catering pentru birou — Angular, Node și SQLite, apoi PostgreSQL — folosită de aproximativ 250 de oameni pe zi. Când prânzul de la birou s-a mutat pe aplicațiile de livrare, problema reală s-a mutat odată cu el: o persoană comandă pentru doisprezece, apoi își petrece după-amiaza alergând după bani.'),
      T('Dobby 2.0 is a rebuild around that moment. The host pastes a restaurant link and shares a code; friends add what they want; the host locks the list, places the real order in the delivery app, enters fees and discounts, and Dobby does the arithmetic and the reminders.', 'Dobby 2.0 e o reconstrucție în jurul acelui moment. Gazda lipește linkul restaurantului și trimite un cod; prietenii adaugă ce vor; gazda închide lista, plasează comanda reală în aplicația de livrare, introduce taxele și reducerile, iar Dobby face calculele și amintirile.'),
    ],
    challenge: [
      T('Money between friends is awkward precisely because the numbers have to be exact. Delivery fees, service fees and discounts must split proportionally or equally and still add up to the receipt, to the ban, every time.', 'Banii între prieteni sunt delicați tocmai pentru că cifrele trebuie să fie exacte. Taxa de livrare, taxa de serviciu și reducerile trebuie împărțite proporțional sau egal și tot să dea totalul de pe bon, la ban, de fiecare dată.'),
      T('And Dobby must never touch the money: it only tells people who to pay and how, so payment details have to be stored safely and shown only to the people who owe.', 'Iar Dobby nu trebuie să atingă niciodată banii: le spune doar oamenilor cui plătesc și cum, deci datele de plată trebuie stocate în siguranță și arătate doar celor care datorează.'),
    ],
    built: [
      { title: T('An explicit order lifecycle', 'Un ciclu de viață explicit'), body: T('Open, locked, settling, closed — every transition is an endpoint with its own rules, so a list cannot change after the real order was placed.', 'Deschisă, închisă, în decontare, finalizată — fiecare tranziție e un endpoint cu regulile lui, deci lista nu se mai poate schimba după ce comanda reală a fost plasată.') },
      { title: T('Exact splits', 'Împărțire exactă'), body: T('Proportional or equal, with largest-remainder rounding so the shares always sum to the receipt.', 'Proporțional sau egal, cu rotunjire după cel mai mare rest, ca părțile să dea mereu totalul de pe bon.') },
      { title: T('Pay how you like', 'Plătești cum vrei'), body: T('Revolut, IBAN (validated), RoPay, PayPal or cash; details encrypted with AES-256-GCM; the host confirms each payment.', 'Revolut, IBAN (validat), RoPay, PayPal sau cash; detaliile criptate cu AES-256-GCM; gazda confirmă fiecare plată.') },
      { title: T('Links that open the app', 'Linkuri care deschid aplicația'), body: T('A short code and a public landing page per order; the restaurant name and image come from the link itself.', 'Un cod scurt și o pagină publică pentru fiecare comandă; numele și imaginea restaurantului vin chiar din link.') },
    ],
    metrics: [
      { label: T('v1 daily users', 'Utilizatori zilnici v1'), before: '—', after: '~250', note: T('The office catering version, before the rebuild.', 'Versiunea de catering pentru birou, înainte de reconstrucție.') },
      { label: T('Money handled', 'Bani gestionați'), before: '—', after: '0', note: T('Dobby only says who owes whom; payments happen elsewhere.', 'Dobby spune doar cine cui datorează; plățile se fac în altă parte.') },
      { label: T('API tests', 'Teste de API'), before: '—', after: '27', note: T('Run against a real PostgreSQL, not mocks.', 'Rulate pe un PostgreSQL real, nu pe mock-uri.') },
    ],
    lessons: [
      { title: T('Rebuild around the moment that hurts', 'Reconstruiește în jurul momentului care doare'), body: T('v1 solved ordering. The pain had moved to settling up, so 2.0 is built around the split, not the menu.', 'v1 rezolva comanda. Durerea se mutase la decontare, așa că 2.0 e construit în jurul împărțirii, nu al meniului.') },
      { title: T('Pick the boring database sooner', 'Alege baza de date plictisitoare mai devreme'), body: T('SQLite got v1 to real users fast and then set a date for a migration I could have skipped.', 'SQLite a dus v1 rapid la utilizatori reali și apoi mi-a fixat data unei migrări pe care aș fi putut s-o evit.') },
    ],
    arch: [
      { title: T('Clients', 'Clienți'), nodes: [
        { label: 'iOS — SwiftUI', note: T('Home, new order, the order itself, settle and profile; deep links open an order straight from a shared code.', 'Acasă, comandă nouă, comanda, decontare și profil; deep linkurile deschid comanda direct din codul trimis.') },
        { label: T('Public order page', 'Pagina publică a comenzii'), note: T('A landing page per code for people without the app yet.', 'O pagină pentru fiecare cod, pentru cine nu are încă aplicația.') },
      ] },
      { title: 'API', nodes: [
        { label: 'Express 5 + zod', note: T('Guest auth, profile, payment methods, orders, items, lock, finalize, settlement; validation at every edge.', 'Autentificare de oaspete, profil, metode de plată, comenzi, produse, închidere, finalizare, decontare; validare la fiecare intrare.') },
        { label: T('Link unfurl', 'Previzualizare link'), note: T('Reads the restaurant name and image from the delivery app link.', 'Citește numele și imaginea restaurantului din linkul aplicației de livrare.') },
      ] },
      { title: T('Data', 'Date'), nodes: [
        { label: 'PostgreSQL + Prisma', note: T('Orders, items, shares and payments; payment details are ciphertext.', 'Comenzi, produse, părți și plăți; datele de plată sunt criptate.') },
      ] },
    ],
    demoNote: null,
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
      T('One NestJS + Prisma + PostgreSQL backend owns all business logic; four thin clients consume the same REST + WebSocket contract: a Next.js 16 admin web app, a native SwiftUI iOS app, a Kotlin/Compose Android app, and inbound webhooks from eBriza and WooCommerce. I designed it, built it, deploy it and operate it.', 'Un singur backend NestJS + Prisma + PostgreSQL deține toată logica de business; patru clienți subțiri consumă același contract REST + WebSocket: o aplicație web de administrare în Next.js 16, o aplicație nativă SwiftUI pe iOS, o aplicație Android Kotlin/Compose și webhookuri de la eBriza și WooCommerce. Eu am proiectat-o, am construit-o, o deployez și o operez.'),
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
        { label: T('Android — Compose', 'Android — Compose'), note: T('Kotlin and Jetpack Compose, covering almost every domain; a few admin screens stay web-only. Tokens in encrypted preferences; it consumes exactly the same REST contract.', 'Kotlin și Jetpack Compose, acoperă aproape toate domeniile; câteva ecrane de administrare rămân doar pe web. Tokenuri în preferințe criptate; consumă exact același contract REST.') },
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
  {
    id: 'alfred', client: 'Alfred', demo: 'alfred', own: true,
    sector: T('Own product · personal AI assistant', 'Produs propriu · asistent personal cu AI'),
    period: T('2025 — present', '2025 — prezent'),
    tags: ['SwiftUI', 'macOS', 'Node', 'PostgreSQL', 'Claude API', 'Agentic', 'Encryption'],
    stack: ['SwiftUI (iOS 17+)', 'macOS (Catalyst-free)', 'WidgetKit', 'App Intents', 'Node 20 + Express', 'Prisma', 'PostgreSQL', 'AES-256-GCM', 'Claude API (tool use)', 'APNs', 'node-cron', 'Docker'],
    oneLiner: T('A private, single-user life assistant — workouts, nutrition, goals, budget, journal — with a Claude agent that reads the data, acts on it through tools and talks back when something drifts. Everything encrypted at rest, on my own server.', 'Un asistent personal privat, single-user — antrenamente, nutriție, obiective, buget, jurnal — cu un agent Claude care citește datele, acționează prin tool-uri și intervine când ceva deviază. Totul criptat la repaus, pe serverul meu.'),
    context: [
      T('Alfred is the tool I open most: a personal assistant built for exactly one user, on iPhone, Mac and a small web client, over a Node/Prisma/PostgreSQL API that I host myself. It logs gym sessions against a push/pull/legs plan with a progression engine, meals and water, habits and chores, a journal with mood signals, a goals-and-reviews layer and the household budget.', 'Alfred e unealta pe care o deschid cel mai des: un asistent personal făcut pentru exact un utilizator, pe iPhone, Mac și un client web mic, peste un API Node/Prisma/PostgreSQL găzduit de mine. Loghează sesiuni de sală pe un plan push/pull/legs cu motor de progresie, mese și apă, obiceiuri și treburi, un jurnal cu semnale de stare, un strat de obiective și recenzii și bugetul casei.'),
      T('The interesting part is the assistant. A Claude-powered agent runs a manual tool-use loop over a registry of typed tools — log a set, add an expense, complete a task, read exercise progression, summarise the month — and a reflection loop runs deterministic checks over the real data (budget pace, stagnating lifts, postponed tasks, mood decline) and raises observations the user has to acknowledge, dismiss with a reason, or turn into a task.', 'Partea interesantă e asistentul. Un agent bazat pe Claude rulează o buclă manuală de tool-use peste un registru de tool-uri tipizate — loghează o serie, adaugă o cheltuială, închide un task, citește progresia unui exercițiu, rezumă luna — iar o buclă de reflecție rulează verificări deterministe peste datele reale (ritmul bugetului, exerciții stagnante, taskuri amânate, scăderea stării) și ridică observații pe care utilizatorul trebuie să le confirme, să le respingă cu motiv sau să le transforme în task.'),
    ],
    challenge: [
      T('This is the most personal data I own — income, health, what I ate, how I slept. It had to be unreadable to anyone with a database dump, including the hosting provider, while still being queryable enough for an AI to reason over it.', 'Sunt cele mai personale date pe care le am — venit, sănătate, ce am mâncat, cum am dormit. Trebuiau să fie ilizibile pentru oricine ar avea un dump al bazei, inclusiv furnizorul de hosting, dar suficient de interogabile ca un AI să poată raționa peste ele.'),
      T('And an assistant that invents numbers is worse than no assistant. It had to read figures through tools, say “I have no way to know” when no tool covers a question, and never celebrate or coach generically.', 'Iar un asistent care inventează cifre e mai rău decât niciun asistent. Trebuia să citească cifrele prin tool-uri, să spună „nu am de unde să știu” când niciun tool nu acoperă întrebarea și să nu felicite sau să dea sfaturi generice.'),
    ],
    built: [
      { title: T('Encryption at rest, aggregation in the app', 'Criptare la repaus, agregare în aplicație'), body: T('Amounts, titles, notes and reference blobs are AES-256-GCM encrypted before they reach PostgreSQL, with a key separate from the auth token; every analytics tool aggregates in the app layer because the database cannot.', 'Sumele, titlurile, notele și blob-urile de referință sunt criptate AES-256-GCM înainte să ajungă în PostgreSQL, cu o cheie separată de tokenul de autentificare; fiecare tool de analiză agregă în aplicație, pentru că baza de date nu poate.') },
      { title: T('Agentic assistant with a typed tool registry', 'Asistent agentic cu registru de tool-uri tipizate'), body: T('A hand-rolled tool-use loop (max six rounds) over tools for tasks, budget lines, subscriptions, workouts, journal and books; cheap model for chat and mutations, deep model for document analysis and reviews — every request logs which one served it.', 'O buclă de tool-use scrisă de mână (maximum șase runde) peste tool-uri pentru taskuri, linii de buget, abonamente, antrenamente, jurnal și cărți; model ieftin pentru chat și mutații, model adânc pentru analiză de documente și recenzii — fiecare request loghează care l-a servit.') },
      { title: T('Reflection loop → observations', 'Buclă de reflecție → observații'), body: T('Daily and weekly cron passes run deterministic checks over the data and emit at most three observations with encrypted evidence; critical ones push to the phone. No plain close: acknowledge, dismiss with a reason, or act.', 'Treceri cron zilnice și săptămânale rulează verificări deterministe peste date și emit cel mult trei observații cu dovezi criptate; cele critice ajung push pe telefon. Fără închidere simplă: confirmi, respingi cu motiv sau acționezi.') },
      { title: T('Progression engine for the gym', 'Motor de progresie pentru sală'), body: T('Work sets pre-filled from the last session of that exact slot, warm-up sets excluded from the math, “raise the weight” suggested when every set hits the top of its range, stagnation flagged after three flat sessions.', 'Seriile de lucru precompletate din ultima sesiune a aceluiași slot, seriile de încălzire excluse din calcul, „urcă greutatea” sugerat când fiecare serie atinge capătul intervalului, stagnarea semnalată după trei sesiuni plate.') },
      { title: T('Goals, weekly reviews, calendar feed', 'Obiective, recenzii săptămânale, calendar'), body: T('A five-step weekly review that refuses a sixth next-week task, markdown import/export that round-trips, and a webcal feed Apple Calendar subscribes to without headers.', 'O recenzie săptămânală în cinci pași care refuză al șaselea task, import/export markdown care face dus-întors fără pierderi și un feed webcal la care Apple Calendar se abonează fără headere.') },
      { title: T('Prompt regression suite', 'Suită de regresie pentru prompt'), body: T('Ten scenarios assert the assistant’s first action against system-prompt changes: reads figures via tools, admits what it cannot know, refers medical questions to a doctor, refuses to propose goals.', 'Zece scenarii verifică prima acțiune a asistentului la schimbări de system prompt: citește cifrele prin tool-uri, admite ce nu poate ști, trimite întrebările medicale la medic, refuză să propună obiective.') },
      { title: T('A job hunt that runs itself', 'O căutare de job care se ține singură'), body: T('A pipeline from lead to offer fed by public job feeds, mail classification and the Job Check browser extension, which researches a company and drops the verdict on the lead. Alfred drafts the messages; it never logs into a job board.', 'Un pipeline de la lead la ofertă alimentat de feeduri publice de joburi, clasificarea mailurilor și extensia de browser Job Check, care cercetează compania și pune verdictul pe lead. Alfred scrie mesajele; nu intră niciodată în conturi pe site-urile de joburi.') },
      { title: T('Inside Claude, too', 'Și din Claude'), body: T('An MCP connector with OAuth 2.1 exposes the same tools to claude.ai and Claude Desktop, scoped to one owner.', 'Un conector MCP cu OAuth 2.1 expune aceleași tool-uri în claude.ai și Claude Desktop, limitate la un singur proprietar.') },
      { title: T('Native everywhere, one API', 'Nativ peste tot, un singur API'), body: T('SwiftUI on iPhone and Mac with widgets, a share extension and App Intents; a React web app for the desk. Every feature ships on all of them together.', 'SwiftUI pe iPhone și Mac, cu widget-uri, extensie de share și App Intents; o aplicație web React pentru birou. Fiecare funcție se livrează pe toate deodată.') },
    ],
    metrics: [
      { label: T('Readable in a DB dump', 'Lizibil într-un dump al bazei'), before: T('everything', 'tot'), after: T('nothing', 'nimic'), note: T('AES-256-GCM on every sensitive field, key separate from auth.', 'AES-256-GCM pe fiecare câmp sensibil, cheie separată de autentificare.') },
      { label: T('Assistant tools', 'Tool-uri ale asistentului'), before: T('free text', 'text liber'), after: '135', note: T('Typed read and write tools; the model never guesses a number.', 'Tool-uri tipizate de citire și scriere; modelul nu ghicește niciodată o cifră.') },
      { label: T('Platforms', 'Platforme'), before: '1', after: '5', note: T('iPhone, Mac, web, a claude.ai connector and the Job Check browser extension.', 'iPhone, Mac, web, un conector claude.ai și extensia de browser Job Check.') },
      { label: T('Prompt regressions caught', 'Regresii de prompt prinse'), before: T('by hand', 'manual'), after: T('10 scenarios', '10 scenarii'), note: T('Run before any system-prompt change.', 'Rulate înaintea oricărei schimbări de system prompt.') },
      { label: T('Users', 'Utilizatori'), before: '—', after: '1', note: T('Built for exactly one person, which is the point.', 'Făcut pentru exact o persoană — asta e ideea.') },
    ],
    lessons: [
      { title: T('Make the model read, never remember', 'Pune modelul să citească, nu să-și amintească'), body: T('Every number the assistant says comes from a tool call it made in that turn. The day I let it answer from context, it started being confidently wrong about my own budget.', 'Fiecare cifră pe care o spune asistentul vine dintr-un apel de tool făcut în acea tură. În ziua în care l-am lăsat să răspundă din context, a început să greșească cu încredere despre propriul meu buget.') },
      { title: T('Observations need a cost to dismiss', 'Observațiile trebuie să coste ceva la respingere'), body: T('A nudge you can swipe away is noise. Requiring a reason to dismiss turned the reflection loop from a notification feed into a conversation with myself.', 'Un ghiont pe care îl poți da la o parte e zgomot. Cerând un motiv la respingere, bucla de reflecție a devenit din feed de notificări o conversație cu mine însumi.') },
      { title: T('Encrypt first, then design the queries', 'Criptează întâi, apoi proiectează interogările'), body: T('Once amounts are ciphertext the database cannot sum them. Deciding that early forced every analytics path into the app layer, which turned out to be the right place for the business rules anyway.', 'Odată ce sumele sunt text cifrat, baza de date nu le mai poate aduna. Decizia luată devreme a împins toată analiza în aplicație — care s-a dovedit oricum locul potrivit pentru regulile de business.') },
    ],
    arch: [
      { title: T('Clients', 'Clienți'), nodes: [
        { label: 'iPhone + Mac — SwiftUI', note: T('The daily surface: today, workout logging, meals and water, chat. Widgets and App Intents for the fast paths, a share extension for capturing from anywhere.', 'Suprafața zilnică: azi, logare antrenament, mese și apă, chat. Widget-uri și App Intents pentru căile rapide, extensie de share pentru captură de oriunde.') },
        { label: T('Web client', 'Client web'), note: T('A single-file SPA served by the API itself for desk use; same bearer token, same-origin calls, CORS stays off.', 'Un SPA dintr-un singur fișier servit chiar de API pentru birou; același bearer token, apeluri same-origin, CORS rămâne oprit.') },
      ] },
      { title: T('Assistant', 'Asistent'), nodes: [
        { label: T('Tool-use loop', 'Bucla de tool-use'), note: T('Manual agentic loop, max six rounds, over a typed registry; each mutation returns a one-line summary the UI shows as an action chip.', 'Buclă agentică manuală, maximum șase runde, peste un registru tipizat; fiecare mutație întoarce un rezumat de o linie pe care UI-ul îl arată ca chip de acțiune.') },
        { label: T('Model routing', 'Rutare de modele'), note: T('A fast model for chat and mutations, a deep one when an attachment or a review is involved; the choice is logged per request.', 'Un model rapid pentru chat și mutații, unul adânc când e implicat un atașament sau o recenzie; alegerea e logată per request.') },
        { label: T('Reflection loop', 'Bucla de reflecție'), note: T('Deterministic checks on a schedule, not an LLM guessing: budget pace, postponed tasks, training gaps, mood decline, stale metrics. Evidence stored encrypted.', 'Verificări deterministe pe program, nu un LLM care ghicește: ritmul bugetului, taskuri amânate, pauze de antrenament, scăderea stării, metrici învechite. Dovezile stau criptate.') },
      ] },
      { title: T('API', 'API'), nodes: [
        { label: 'Node + Express + Prisma', note: T('One module per life domain; business rules as pure, unit-tested functions; node-cron for digests, nudges and the reflection passes.', 'Un modul pe domeniu de viață; reguli de business ca funcții pure, testate unitar; node-cron pentru rezumate, ghionturi și trecerile de reflecție.') },
        { label: T('Auth + rate limits', 'Auth + limite'), note: T('A single high-entropy bearer token compared in constant time, generic 401s, per-IP limits and a brute-force limiter. Nothing public except health and the calendar feed.', 'Un singur bearer token cu entropie mare comparat în timp constant, 401 generice, limite per IP și limitator de forță brută. Nimic public în afară de health și feed-ul de calendar.') },
      ] },
      { title: T('Data', 'Date'), nodes: [
        { label: 'PostgreSQL + AES-256-GCM', note: T('Sensitive fields are ciphertext in the database; the app decrypts only for authenticated responses and aggregates in memory.', 'Câmpurile sensibile sunt text cifrat în bază; aplicația decriptează doar pentru răspunsuri autentificate și agregă în memorie.') },
        { label: 'APNs · webcal · Docker', note: T('Push for due tasks, digests and critical observations; an .ics feed for Apple Calendar; everything in containers on a box I run.', 'Push pentru taskuri scadente, rezumate și observații critice; un feed .ics pentru Apple Calendar; totul în containere pe o mașină pe care o administrez eu.') },
      ] },
    ],
    demoNote: T('The assistant, anonymised: pick a message and watch it call tools before it answers — then see the reflection loop raise an observation you have to deal with.', 'Asistentul, anonimizat: alege un mesaj și urmărește cum apelează tool-uri înainte să răspundă — apoi vezi bucla de reflecție ridicând o observație de care trebuie să te ocupi.'),
  },
  {
    id: 'jobcheck', client: 'Job Check', demo: null, own: true,
    sector: T('Own product · browser extension, part of Alfred', 'Produs propriu · extensie de browser, parte din Alfred'),
    period: T('v3.3, daily use', 'v3.3, folosită zilnic'),
    tags: ['Manifest V3', 'Chrome / Arc', 'Claude', 'Alfred API'],
    stack: ['Chrome Extension MV3', 'Service worker queue', 'Content script + side panel', 'chrome.storage', 'Anthropic / OpenAI / Gemini / OpenRouter', 'Alfred API (Node, Claude with web search)'],
    oneLiner: T('A browser extension that reads a job post where you find it and answers one question — apply, maybe, or skip — after checking hard constraints and researching the company. Every yes lands in Alfred’s job pipeline.', 'O extensie de browser care citește un anunț de job acolo unde îl găsești și răspunde la o singură întrebare — aplic, poate, sau nu — după ce verifică constrângerile dure și cercetează compania. Fiecare „da” ajunge în pipeline-ul de joburi din Alfred.'),
    context: [
      T('Job hunting has a boring, expensive middle: opening forty tabs, reading every post to find the one sentence that says “hybrid, Munich, three days a week”, then searching the company on four review sites. Job Check does that middle while you keep browsing.', 'Căutarea unui job are o parte de mijloc plictisitoare și scumpă: deschizi patruzeci de taburi, citești fiecare anunț ca să găsești propoziția care spune „hibrid, München, trei zile pe săptămână”, apoi cauți compania pe patru site-uri de recenzii. Job Check face partea asta în timp ce tu navighezi mai departe.'),
      T('You add the job on the page, or a whole search list at once. A background queue analyses three at a time and sorts them into matches, to clarify, in progress, applied and not worth it — each with a fit score, the posting quoted where it matters, and a researched view of the company.', 'Adaugi jobul de pe pagină sau o listă întreagă de rezultate dintr-odată. O coadă în fundal analizează câte trei deodată și le sortează în potrivite, de clarificat, în lucru, aplicate și nu merită — fiecare cu scor de potrivire, anunțul citat acolo unde contează și o imagine cercetată a companiei.'),
    ],
    challenge: [
      T('An AI that says “great fit!” to a role you legally cannot take is worse than useless. Eligibility — location, remote rules, visa, language — has to be checked first and quoted from the posting, not inferred.', 'Un AI care spune „potrivire excelentă!” pentru un rol pe care legal nu îl poți lua e mai rău decât inutil. Eligibilitatea — locație, reguli de remote, viză, limbă — trebuie verificată prima și citată din anunț, nu dedusă.'),
      T('And research is expensive. Most posts can be ruled out for free, so the tool must spend tokens only on the jobs that survive the cheap checks.', 'Iar cercetarea costă. Majoritatea anunțurilor pot fi eliminate gratis, deci unealta trebuie să cheltuie tokeni doar pe joburile care trec de verificările ieftine.'),
    ],
    built: [
      { title: T('Verdicts you can audit', 'Verdicte pe care le poți verifica'), body: T('DA / POATE / NU with a 0–100 score, the eligibility line quoted from the post, fit point by point, company size and funding, what reviewers and the press say, interview process, salary estimate, questions for the recruiter, and sources.', 'DA / POATE / NU cu scor 0–100, linia de eligibilitate citată din anunț, potrivirea punct cu punct, mărimea și finanțarea companiei, ce spun recenziile și presa, procesul de interviu, estimarea de salariu, întrebări pentru recruiter și surse.') },
      { title: T('A queue that survives the browser', 'O coadă care rezistă browserului'), body: T('A service-worker queue runs three analyses in parallel and picks up where it stopped after the worker sleeps; the toolbar badge counts what is left, then the good matches.', 'O coadă în service worker rulează trei analize în paralel și continuă de unde a rămas după ce workerul adoarme; badge-ul din toolbar numără ce a rămas, apoi potrivirile bune.') },
      { title: T('Zero-token filters first', 'Întâi filtre fără tokeni'), body: T('On-site and hybrid roles, excluded companies and past employers are dropped locally before any AI call; an optional quick check runs before the full research.', 'Rolurile on-site și hibride, companiile excluse și foștii angajatori sunt eliminați local, înainte de orice apel AI; o verificare rapidă opțională rulează înaintea cercetării complete.') },
      { title: T('Bring your own model, or use Alfred', 'Modelul tău sau Alfred'), body: T('Any of Anthropic, OpenAI, Gemini, OpenRouter or an OpenAI-compatible API, detected from the key — or sign in to Alfred and run the check server-side with web search.', 'Anthropic, OpenAI, Gemini, OpenRouter sau orice API compatibil OpenAI, detectat din cheie — sau te autentifici în Alfred și analiza rulează pe server, cu căutare web.') },
      { title: T('Two-way sync with Alfred Jobs', 'Sincronizare în ambele sensuri cu Alfred Jobs'), body: T('Yes and maybe become leads with the verdict on their timeline; marking applied moves the lead, dismissing closes it; the CV and profile import back from Alfred, and “Apply” uses Alfred’s cover-letter tools.', '„Da” și „poate” devin leaduri cu verdictul pe istoric; marcarea ca aplicat mută leadul, respingerea îl închide; CV-ul și profilul se importă din Alfred, iar „Aplică” folosește uneltele de scrisori din Alfred.') },
    ],
    metrics: [
      { label: T('Reading a post for eligibility', 'Citirea unui anunț pentru eligibilitate'), before: T('by hand', 'manual'), after: T('quoted', 'citat'), note: T('The deciding sentence is shown, not paraphrased.', 'Propoziția decisivă e arătată, nu parafrazată.') },
      { label: T('Parallel analyses', 'Analize în paralel'), before: '1', after: '3', note: T('Queued in the background while you browse.', 'În coadă, în fundal, cât navighezi.') },
      { label: T('Job boards logged into', 'Conturi folosite pe site-uri de joburi'), before: '—', after: '0', note: T('Public post data only; nothing is submitted on your behalf.', 'Doar date publice din anunțuri; nimic nu e trimis în numele tău.') },
    ],
    lessons: [
      { title: T('Make the model quote, not judge', 'Pune modelul să citeze, nu să judece'), body: T('Verdicts became trustworthy the moment each one had to show the sentence from the post it was based on.', 'Verdictele au devenit de încredere din momentul în care fiecare a trebuit să arate propoziția din anunț pe care se bazează.') },
      { title: T('The cheapest call is the one you skip', 'Cel mai ieftin apel e cel pe care nu-l faci'), body: T('A local filter for the obvious no’s cut the cost of a search page more than any prompt tuning did.', 'Un filtru local pentru „nu”-urile evidente a redus costul unei pagini de rezultate mai mult decât orice optimizare de prompt.') },
    ],
    arch: [
      { title: T('In the browser', 'În browser'), nodes: [
        { label: T('Content script', 'Content script'), note: T('Reads the current job, docks the panel beside the page and, on supported boards, collects a whole results list.', 'Citește jobul curent, lipește panoul lângă pagină și, pe site-urile suportate, colectează o listă întreagă de rezultate.') },
        { label: T('Side panel + list', 'Panou lateral + listă'), note: T('The queue grouped by verdict, the verdict detail, and the apply / applied / dismiss actions.', 'Coada grupată pe verdict, detaliul verdictului și acțiunile aplică / am aplicat / respinge.') },
        { label: T('Service worker', 'Service worker'), note: T('The analysis queue, retries and the badge; everything persisted in chrome.storage so nothing is lost when it sleeps.', 'Coada de analize, reîncercările și badge-ul; totul salvat în chrome.storage, ca nimic să nu se piardă când adoarme.') },
      ] },
      { title: T('Engines', 'Motoare'), nodes: [
        { label: T('Own key', 'Cheie proprie'), note: T('Direct calls to the provider the key belongs to.', 'Apeluri directe la furnizorul căruia îi aparține cheia.') },
        { label: 'Alfred', note: T('A server-side check with web search on Alfred’s subscription, polled until done; results filed as leads.', 'O analiză pe serverul Alfred, cu căutare web, pe abonamentul Alfred, interogată până e gata; rezultatele intră ca leaduri.') },
      ] },
    ],
    demoNote: null,
  },
  {
    id: 'pickup', client: 'Scheduled Pickup', demo: null, own: true,
    sector: T('Client work · WooCommerce plugin', 'Proiect pentru client · plugin WooCommerce'),
    period: T('v0.10, 2026', 'v0.10, 2026'),
    tags: ['WordPress', 'WooCommerce', 'PHP 8.1', 'Blocks'],
    stack: ['PHP 8.1', 'WordPress 6.6+', 'WooCommerce 9+ (HPOS)', 'Cart/Checkout Blocks', 'Classic checkout', 'WP REST API', 'PHPUnit', 'wp-env', 'i18n (ro_RO)'],
    oneLiner: T('A WooCommerce plugin that gives every product a pickup date: the customer picks a valid day on the product page, and the date follows the line through cart, checkout, order, emails and the shop’s admin.', 'Un plugin WooCommerce care dă fiecărui produs o dată de ridicare: clientul alege o zi validă pe pagina produsului, iar data urmează linia prin coș, checkout, comandă, emailuri și adminul magazinului.'),
    context: [
      T('A Cluj confectionery — the same business that runs on Horae — takes cake and pastry orders online, and every product has its own lead time: a cozonac only before Christmas, a custom cake with three days’ notice, macarons any day. A free-text “delivery date” field at checkout was producing impossible dates and phone calls.', 'O cofetărie din Cluj — aceeași afacere care rulează pe Horae — primește online comenzi de torturi și prăjituri, iar fiecare produs are propriul termen: cozonacul doar înainte de Crăciun, tortul personalizat cu trei zile înainte, macarons în orice zi. Un câmp text liber „data livrării” din checkout producea date imposibile și telefoane.'),
      T('The plugin replaces that field with rules. Reusable pickup profiles describe when something can be collected; they attach to a category or a product, and the storefront only ever offers dates that are actually possible.', 'Pluginul înlocuiește acel câmp cu reguli. Profilurile de ridicare reutilizabile descriu când se poate ridica ceva; se atașează unei categorii sau unui produs, iar magazinul oferă doar date care chiar sunt posibile.'),
    ],
    challenge: [
      T('WooCommerce has two checkouts — classic and Blocks — and a shipping system that was never designed for “this cake on Saturday at the shop, those macarons delivered on Monday”. The plugin has to work with both checkouts and split one order into correctly charged delivery groups.', 'WooCommerce are două checkouturi — clasic și Blocks — și un sistem de livrare care n-a fost gândit pentru „tortul ăsta sâmbătă la magazin, macaronsurile astea livrate luni”. Pluginul trebuie să meargă cu ambele checkouturi și să împartă o comandă în grupuri de livrare taxate corect.'),
    ],
    built: [
      { title: T('Pickup profiles with a live preview', 'Profiluri de ridicare cu previzualizare live'), body: T('Earliest and latest day, weekdays, allowed periods or fixed dates, exclusions and a same-day cut-off; the editor shows exactly which dates the rules produce.', 'Cea mai apropiată și cea mai îndepărtată zi, zilele săptămânii, perioade permise sau date fixe, excluderi și ora limită pentru aceeași zi; editorul arată exact ce date rezultă din reguli.') },
      { title: T('Inheritance that matches how shops think', 'Moștenire așa cum gândește magazinul'), body: T('Product beats subcategory beats category beats the global default — one profile for “Cakes”, an exception for one cake.', 'Produsul bate subcategoria, care bate categoria, care bate setarea globală — un profil pentru „Torturi”, o excepție pentru un singur tort.') },
      { title: T('Delivery methods and per-group shipping', 'Moduri de livrare și transport pe grup'), body: T('Several methods per order, each linked to a WooCommerce shipping method; the cart splits into one package per method and date, each with its own shipping line. Methods can skip the date entirely, like national courier.', 'Mai multe moduri per comandă, fiecare legat de o metodă de livrare WooCommerce; coșul se împarte într-un pachet per mod și dată, fiecare cu propria linie de transport. Unele moduri pot să nu ceară dată, ca livrarea prin curier național.') },
      { title: T('The date everywhere it matters', 'Data peste tot unde contează'), body: T('Cart, mini-cart, both checkouts, order items, thank-you page, My Account and every WooCommerce email.', 'Coș, mini-coș, ambele checkouturi, articolele comenzii, pagina de mulțumire, Contul meu și toate emailurile WooCommerce.') },
      { title: T('A pickups board for the shop', 'Un panou de ridicări pentru magazin'), body: T('WooCommerce → Pickups: today, tomorrow, upcoming, past or a range, grouped by day with product, quantity, method, customer and phone; plus a pickup column and date filter on the orders list.', 'WooCommerce → Ridicări: azi, mâine, următoarele, trecute sau un interval, grupate pe zile cu produs, cantitate, mod, client și telefon; plus o coloană și un filtru pe dată în lista de comenzi.') },
      { title: T('Built to be integrated', 'Făcut pentru integrare'), body: T('A shortcode for page builders, a public availability endpoint, filters, actions and a JS refresh event, and order meta with external method ids so Horae can import pickups.', 'Un shortcode pentru page buildere, un endpoint public de disponibilitate, filtre, acțiuni și un eveniment JS de refresh, plus meta pe comandă cu id-uri externe ale modurilor, ca Horae să poată importa ridicările.') },
    ],
    metrics: [
      { label: T('Impossible dates at checkout', 'Date imposibile la checkout'), before: T('free text', 'text liber'), after: '0', note: T('Only dates the rules allow can be chosen.', 'Se pot alege doar datele permise de reguli.') },
      { label: T('Rule levels', 'Niveluri de reguli'), before: '1', after: '4', note: T('Global, category, subcategory, product.', 'Global, categorie, subcategorie, produs.') },
      { label: T('Checkouts supported', 'Checkouturi suportate'), before: '—', after: '2', note: T('Classic and Blocks, HPOS-compatible.', 'Clasic și Blocks, compatibil HPOS.') },
    ],
    lessons: [
      { title: T('Validate where WooCommerce forgets to', 'Validează unde uită WooCommerce'), body: T('Adding to the cart programmatically skips WooCommerce’s own validation hook, so the date is enforced again when the cart item is built.', 'Adăugarea programatică în coș sare peste hookul de validare al WooCommerce, așa că data e verificată din nou când se construiește linia din coș.') },
      { title: T('Scope down before you build', 'Restrânge înainte să construiești'), body: T('The client’s first list was a clone of a pro plugin with slots, fees and capacity. Asking what the shop actually does every day cut it to dates and methods — and shipped it in days.', 'Prima listă a clientului era o clonă a unui plugin pro, cu sloturi, taxe și capacitate. Întrebând ce face magazinul de fapt în fiecare zi, am redus-o la date și moduri de livrare — și am livrat-o în câteva zile.') },
    ],
    arch: [
      { title: T('Storefront', 'Magazin'), nodes: [
        { label: T('Product field', 'Câmpul de pe produs'), note: T('Method choice and a calendar that only offers valid days, pre-filled when there is a single option.', 'Alegerea modului și un calendar care oferă doar zile valide, precompletat când există o singură opțiune.') },
        { label: T('Cart and checkout', 'Coș și checkout'), note: T('Line meta for classic and Blocks, and shipping packages split by method and date.', 'Meta pe linie pentru clasic și Blocks, și pachete de livrare împărțite pe mod și dată.') },
      ] },
      { title: T('Domain', 'Domeniu'), nodes: [
        { label: T('Rule resolver', 'Rezolvarea regulilor'), note: T('Walks product → subcategory → category → global and returns the allowed dates; covered by unit tests.', 'Parcurge produs → subcategorie → categorie → global și întoarce datele permise; acoperit de teste unitare.') },
      ] },
      { title: 'Admin', nodes: [
        { label: T('Profiles and methods', 'Profiluri și moduri'), note: T('Custom post types with live previews.', 'Tipuri de conținut proprii, cu previzualizare live.') },
        { label: T('Pickups board', 'Panoul de ridicări'), note: T('The shop’s daily list, plus the orders column and filter.', 'Lista zilnică a magazinului, plus coloana și filtrul din comenzi.') },
        { label: T('REST + order meta', 'REST + meta pe comandă'), note: T('Availability for themes and apps; method ids and dates for Horae’s import.', 'Disponibilitate pentru teme și aplicații; id-urile modurilor și datele pentru importul în Horae.') },
      ] },
    ],
    demoNote: null,
  },
  {
    id: 'ironpulse', client: 'Iron Pulse', demo: null, own: true,
    sector: T('Own product · coaching platform for personal trainers', 'Produs propriu · platformă de coaching pentru antrenori'),
    period: T('iOS on TestFlight', 'iOS pe TestFlight'),
    tags: ['SwiftUI', 'NestJS', 'Offline-first', 'Multi-tenant'],
    stack: ['SwiftUI (iOS 17+)', 'Local database + sync', 'NestJS', 'Prisma', 'PostgreSQL', 'Next.js (trainer web)', 'UUIDv7', 'pnpm + Turborepo', 'Docker'],
    oneLiner: T('A coaching platform that replaces the printed workout sheet: trainers prescribe and watch progress, clients log every set live in the gym — with or without signal.', 'O platformă de coaching care înlocuiește foaia de antrenament tipărită: antrenorii prescriu și urmăresc progresul, clienții își loghează fiecare serie live în sală — cu sau fără semnal.'),
    context: [
      T('Most personal trainers still run their practice on paper: an A4 sheet per client, filled in with a pen between sets, retyped into a spreadsheet if at all. Progress is invisible until someone flips back through the pages.', 'Majoritatea antrenorilor personali își țin încă practica pe hârtie: o foaie A4 per client, completată cu pixul între serii, rescrisă într-un tabel dacă se mai rescrie. Progresul e invizibil până când cineva răsfoiește înapoi paginile.'),
      T('Iron Pulse gives each trainer their own branded, isolated practice. The trainer builds programs and sees clients ranked by what needs attention; the client gets their own app to log sets, attendance and measurements while they train.', 'Iron Pulse îi dă fiecărui antrenor propria practică, cu brandul lui, izolată de ceilalți. Antrenorul construiește programe și își vede clienții ordonați după ce cere atenție; clientul are propria aplicație în care își loghează seriile, prezența și măsurătorile în timp ce se antrenează.'),
    ],
    challenge: [
      T('Gyms are often basements. The app has to work completely offline mid-workout, resume a session interrupted by a phone call, and reconcile afterwards without ever losing or silently overwriting a logged set.', 'Sălile sunt adesea la subsol. Aplicația trebuie să meargă complet offline în mijlocul antrenamentului, să reia o sesiune întreruptă de un telefon și să se sincronizeze după, fără să piardă sau să suprascrie vreodată pe tăcute o serie logată.'),
      T('And a trainer with thirty clients does not want an alphabetical list — they want to know who has disappeared, who has plateaued and who is in the gym right now.', 'Iar un antrenor cu treizeci de clienți nu vrea o listă alfabetică — vrea să știe cine a dispărut, cine a stagnat și cine e acum în sală.'),
    ],
    built: [
      { title: T('Offline-first sync', 'Sincronizare offline-first'), body: T('A local database mirrors the server; push and pull with per-entity conflict rules, client-generated time-ordered ids, and the next workout computed on the device.', 'O bază locală oglindește serverul; push și pull cu reguli de conflict pe entitate, id-uri generate pe client și ordonate în timp, iar următorul antrenament e calculat pe dispozitiv.') },
      { title: T('Logged data is never overwritten', 'Datele logate nu se suprascriu niciodată'), body: T('Every entry records who entered it, when and from which device; later changes are appended as corrections.', 'Fiecare înregistrare păstrează cine a introdus-o, când și de pe ce dispozitiv; modificările ulterioare se adaugă drept corecturi.') },
      { title: T('Real prescriptions', 'Prescripții reale'), body: T('Warm-ups, drop sets, rest-pause, supersets and tempo, assembled in a phone builder or a keyboard-first web builder, and published to the client with conflicts resolved first.', 'Încălzire, drop seturi, rest-pause, superseturi și tempo, puse cap la cap într-un constructor pe telefon sau într-unul web condus din tastatură, și publicate către client după rezolvarea conflictelor.') },
      { title: T('Signals, not lists', 'Semnale, nu liste'), body: T('The trainer’s panel ranks clients by absence, plateau and “in the gym now”, with the chart behind each signal one tap away.', 'Panoul antrenorului ordonează clienții după absență, platou și „în sală acum”, cu graficul din spatele fiecărui semnal la o atingere distanță.') },
      { title: T('A tenant per trainer', 'Un tenant per antrenor'), body: T('Each trainer’s clients, library and branding are isolated by a data-layer extension, so a query that forgets the filter still cannot leak.', 'Clienții, biblioteca și brandul fiecărui antrenor sunt izolate printr-o extensie în stratul de date, așa că un query care uită filtrul tot nu poate scurge date.') },
    ],
    metrics: [
      { label: T('Workout sheet', 'Foaia de antrenament'), before: T('paper', 'hârtie'), after: T('live app', 'aplicație live'), note: T('Logged by the client, set by set.', 'Logată de client, serie cu serie.') },
      { label: T('Signal needed in the gym', 'Semnal necesar în sală'), before: '—', after: '0', note: T('Fully offline, reconciled afterwards.', 'Complet offline, sincronizat după.') },
      { label: T('Logged sets overwritten', 'Serii logate suprascrise'), before: '—', after: '0', note: T('Corrections are appended, never replaced.', 'Corecturile se adaugă, nu înlocuiesc.') },
    ],
    lessons: [
      { title: T('Design the offline case first', 'Proiectează întâi cazul offline'), body: T('Treating “no signal” as the normal state, not an error, decided the data model, the ids and the sync — and made the online case trivial.', 'Tratând „fără semnal” ca stare normală, nu ca eroare, s-au decis modelul de date, id-urile și sincronizarea — iar cazul online a devenit banal.') },
      { title: T('Sort is not filter', 'Sortarea nu e filtrare'), body: T('A trainer wants to see every client, ordered by urgency, and narrow the list only when they choose to. Making those two separate controls shaped the whole panel.', 'Un antrenor vrea să-și vadă toți clienții, ordonați după urgență, și să restrângă lista doar când alege el. Separarea celor două controale a dat forma întregului panou.') },
    ],
    arch: [
      { title: T('Apps', 'Aplicații'), nodes: [
        { label: T('Client — iOS', 'Client — iOS'), note: T('Today, live logging, attendance, measurements and progress; works without a connection.', 'Azi, logare live, prezență, măsurători și progres; merge fără conexiune.') },
        { label: T('Trainer — iOS', 'Antrenor — iOS'), note: T('Panel of signals, clients, builder, assign and publish, in-session measurements.', 'Panoul de semnale, clienți, constructor, atribuire și publicare, măsurători în sesiune.') },
        { label: T('Trainer — web', 'Antrenor — web'), note: T('The desk: a three-panel, keyboard-driven builder and client sheets.', 'Biroul: un constructor în trei panouri, condus din tastatură, și fișele clienților.') },
      ] },
      { title: 'Sync', nodes: [
        { label: T('Local store', 'Stocare locală'), note: T('Mirrors the server schema so every screen reads locally.', 'Oglindește schema serverului, ca fiecare ecran să citească local.') },
        { label: T('Push / pull', 'Push / pull'), note: T('A cursor per device, conflict rules per entity, corrections appended.', 'Un cursor per dispozitiv, reguli de conflict pe entitate, corecturi adăugate.') },
      ] },
      { title: T('Backend', 'Backend'), nodes: [
        { label: 'NestJS + Prisma', note: T('Tenancy enforced in the data layer; one contract for iOS and web.', 'Tenancy impus în stratul de date; un singur contract pentru iOS și web.') },
      ] },
    ],
    demoNote: null,
  },
];

const EARLIER = [
  { period: T('Jun 2022 — Jun 2023', 'Iun 2022 — Iun 2023'), client: 'Wirtek Romania', note: T('Led frontend development of a green-energy application in a 10-person team; integrated with backend via Azure DevOps and mentored junior developers.', 'Am condus dezvoltarea frontend a unei aplicații de energie verde într-o echipă de 10; integrare cu backendul prin Azure DevOps și mentorat pentru juniori.') },
  { period: T('Nov 2021 — Nov 2022', 'Noi 2021 — Noi 2022'), client: 'Fabrit Global', note: T('Built and maintained the frontend of a sports-arena booking platform (Angular 8/5), optimising performance across mobile and desktop.', 'Am construit și întreținut frontendul unei platforme de rezervări pentru arene sportive (Angular 8/5), optimizând performanța pe mobil și desktop.') },
  { period: T('Mar 2020 — Nov 2021', 'Mar 2020 — Noi 2021'), client: 'P4B Group', note: T('Led the frontend of an Angular 12 product with a PHP backend, coordinating two other frontend developers.', 'Am condus frontendul unui produs Angular 12 cu backend PHP, coordonând alți doi dezvoltatori frontend.') },
  { period: T('Jan 2017 — Mar 2020', 'Ian 2017 — Mar 2020'), client: 'msg systems Romania', note: T('Junior frontend developer on a medical/insurance application (Angular 8, SCSS, SAP Spartacus); led the migration to production Spartacus.', 'Dezvoltator frontend junior pe o aplicație medicală/asigurări (Angular 8, SCSS, SAP Spartacus); am condus migrarea către versiunea de producție a Spartacus.') },
  { period: T('Nov 2015 — Dec 2016', 'Noi 2015 — Dec 2016'), client: T('Draexlmaier Group — Germany', 'Draexlmaier Group — Germania'), note: T('Backend developer intern: SAP ABAP training, front- and back-end features for a retail app on S/4HANA, SAPUI5 and Fiori.', 'Intern backend: training SAP ABAP, funcționalități front- și back-end pentru o aplicație de retail pe S/4HANA, SAPUI5 și Fiori.') },
];

// What is inside each product, app by app — high level, for the case pages.
const APPS = {
  horae: [
    { name: T('Web app', 'Aplicația web'), tech: 'Next.js 16 · React 19', items: [
      T('Dashboard for the day: production, deliveries, stock alerts, expiring lots', 'Panoul zilei: producție, livrări, alerte de stoc, loturi care expiră'),
      T('Production board and calendar; recipes with nested costing and versions', 'Tabla și calendarul de producție; rețete cu cost cuibărit și versiuni'),
      T('Stock across locations: lots, expiry, movements, low stock, stock reviews', 'Stoc pe locații: loturi, expirări, mișcări, stoc scăzut, revizii de stoc'),
      T('Orders, delivery calendar, transfers, sales-to-stock from eBriza and WooCommerce', 'Comenzi, calendar de livrări, transferuri, vânzări → stoc din eBriza și WooCommerce'),
      T('Statistics, users and roles, branding, backups, activity log', 'Statistici, utilizatori și roluri, branding, backupuri, jurnal de activitate'),
    ] },
    { name: 'iOS', tech: 'SwiftUI · iOS 17+', items: [
      T('Every domain of the web app, built for hands busy in a kitchen', 'Toate domeniile aplicației web, pentru mâini ocupate în laborator'),
      T('Tasks with yield capture as production finishes', 'Taskuri cu înregistrarea randamentului la finalizare'),
      T('Orders, deliveries and transfers between locations', 'Comenzi, livrări și transferuri între locații'),
      T('Real-time updates, notifications, in-app tutorial and help', 'Actualizări în timp real, notificări, tutorial și ajutor în aplicație'),
    ] },
    { name: 'Android', tech: 'Kotlin · Jetpack Compose', items: [
      T('Dashboard, recipes with cost breakdown, create and edit', 'Panou, rețete cu defalcarea costului, creare și editare'),
      T('Tasks, stock movements, transfers, sales-to-stock confirmation', 'Taskuri, mișcări de stoc, transferuri, confirmarea vânzărilor în stoc'),
      T('Orders with signature, users and roles, bulk actions', 'Comenzi cu semnătură, utilizatori și roluri, acțiuni în masă'),
      T('A few admin screens stay web-only', 'Câteva ecrane de administrare rămân doar pe web'),
    ] },
    { name: 'API', tech: 'NestJS · Prisma · PostgreSQL', items: [
      T('One module per domain; all business logic lives here', 'Un modul pe domeniu; toată logica de business stă aici'),
      T('Tenant isolation in the data layer, CASL roles from the database', 'Izolarea tenanților în stratul de date, roluri CASL din baza de date'),
      T('Org-scoped real-time over Socket.IO', 'Timp real limitat la organizație, prin Socket.IO'),
      T('eBriza and WooCommerce webhooks, invitations, backups, changelog, OpenAPI', 'Webhookuri eBriza și WooCommerce, invitații, backupuri, changelog, OpenAPI'),
    ] },
  ],
  alfred: [
    { name: 'iPhone', tech: 'SwiftUI · WidgetKit · App Intents', items: [
      T('Today: eating window, shopping list, macros, lesson of the day', 'Azi: fereastra de mâncat, lista de cumpărături, macro-uri, lecția zilei'),
      T('Workout logging with the progression engine', 'Logarea antrenamentelor, cu motorul de progresie'),
      T('Chat with the assistant, with attachments', 'Chat cu asistentul, cu atașamente'),
      T('Vault: money, payments, documents, jobs', 'Vault: bani, plăți, documente, joburi'),
      T('Widgets, share extension, Siri shortcuts', 'Widgeturi, extensie de share, scurtături Siri'),
    ] },
    { name: 'Mac', tech: 'SwiftUI', items: [
      T('Native sidebar app with every module', 'Aplicație nativă cu sidebar și toate modulele'),
      T('Menu bar extra next to the clock', 'Extra în bara de meniu, lângă ceas'),
    ] },
    { name: T('Web app', 'Aplicația web'), tech: 'React · Vite', items: [
      T('The desk version: home, chat, plan, body, learn, vault, goals', 'Versiunea de birou: acasă, chat, plan, corp, învățare, vault, obiective'),
      T('Job pipeline from lead to offer, with drafts and timelines', 'Pipeline de joburi de la lead la ofertă, cu ciorne și istoric'),
      T('Courses, flashcards, music playlists, a public blog', 'Cursuri, flashcarduri, playlisturi, un blog public'),
    ] },
    { name: 'API', tech: 'Node · Express · Prisma · PostgreSQL', items: [
      T('22 modules behind one API, 135 assistant tools', '22 de module în spatele unui API, 135 de tool-uri pentru asistent'),
      T('Encryption at rest with AES-256-GCM', 'Criptare la repaus cu AES-256-GCM'),
      T('Reflection loop, digests and reminders on a schedule, push to the phone', 'Bucla de reflecție, rezumate și amintiri programate, push pe telefon'),
      T('Google Calendar, Gmail and IMAP triage, Apple Health, BNR rates', 'Google Calendar, triere Gmail și IMAP, Apple Health, cursuri BNR'),
    ] },
    { name: T('Connectors', 'Conectori'), tech: 'MCP · browser extension', items: [
      T('claude.ai and Claude Desktop connector over OAuth 2.1', 'Conector pentru claude.ai și Claude Desktop, prin OAuth 2.1'),
      T('Job Check extension files verdicts as leads', 'Extensia Job Check trimite verdictele ca leaduri'),
      T('Calendar feed Apple Calendar subscribes to', 'Feed de calendar la care se abonează Apple Calendar'),
    ] },
  ],
  jobcheck: [
    { name: T('Side panel', 'Panoul lateral'), tech: 'Content script · iframe', items: [
      T('The job on the current page, with apply / applied / dismiss', 'Jobul de pe pagina curentă, cu aplică / am aplicat / respinge'),
      T('The queue grouped by verdict and sorted by fit', 'Coada grupată pe verdict și sortată după potrivire'),
      T('Full verdict: eligibility quote, fit, company, salary, sources', 'Verdictul complet: citatul de eligibilitate, potrivire, companie, salariu, surse'),
    ] },
    { name: T('Background', 'În fundal'), tech: 'Service worker', items: [
      T('Analysis queue, three at a time, survives restarts', 'Coada de analize, câte trei deodată, rezistă repornirilor'),
      T('Toolbar badge: jobs left, then good matches', 'Badge în toolbar: joburi rămase, apoi potrivirile bune'),
      T('Collects whole result lists from supported boards', 'Colectează liste întregi de rezultate de pe site-urile suportate'),
    ] },
    { name: T('Settings', 'Setări'), tech: 'chrome.storage', items: [
      T('Engine: own key for any major provider, or Alfred', 'Motor: cheie proprie pentru orice furnizor major, sau Alfred'),
      T('Profile and CV, imported from Alfred', 'Profil și CV, importate din Alfred'),
      T('Token savers: local filters, excluded and past companies, quick check', 'Economie de tokeni: filtre locale, companii excluse și trecute, verificare rapidă'),
    ] },
    { name: T('Alfred side', 'Partea din Alfred'), tech: 'Alfred API', items: [
      T('Server-side check with web search', 'Analiză pe server, cu căutare web'),
      T('Yes and maybe become leads; applied and dismissed stay in sync', '„Da” și „poate” devin leaduri; aplicat și respins rămân sincronizate'),
      T('Cover letter and message drafts from the panel', 'Scrisori de intenție și mesaje direct din panou'),
    ] },
  ],
  dobby: [
    { name: 'iOS', tech: 'SwiftUI · iOS 17+', items: [
      T('One-question onboarding: your name', 'Onboarding dintr-o întrebare: cum te cheamă'),
      T('Home: orders you host, orders you owe on, history', 'Acasă: comenzi organizate, comenzi la care datorezi, istoric'),
      T('New order from a Wolt, Glovo or Bolt Food link, with a deadline', 'Comandă nouă dintr-un link Wolt, Glovo sau Bolt Food, cu oră limită'),
      T('The order: everyone’s items, countdown, lock the list', 'Comanda: produsele tuturor, numărătoare inversă, închiderea listei'),
      T('Settle: who you owe, how to pay, host confirms', 'Decontare: cui datorezi, cum plătești, gazda confirmă'),
      T('Profile with encrypted payment methods; deep links', 'Profil cu metode de plată criptate; deep links'),
    ] },
    { name: 'API', tech: 'Express 5 · Prisma · PostgreSQL', items: [
      T('Guest accounts, profiles, payment methods with IBAN check', 'Conturi de oaspete, profiluri, metode de plată cu verificare IBAN'),
      T('Order lifecycle: open, locked, settling, closed', 'Ciclul comenzii: deschisă, închisă, în decontare, finalizată'),
      T('Exact proportional or equal splits', 'Împărțire exactă, proporțională sau egală'),
      T('Link previews and a public page per order code', 'Previzualizări de link și o pagină publică per cod de comandă'),
    ] },
    { name: T('Next', 'Urmează'), tech: T('planned', 'planificat'), items: [
      T('Android app and a web join page', 'Aplicația Android și o pagină web de join'),
      T('Push reminders and a share extension', 'Amintiri push și o extensie de share'),
    ] },
  ],
  pickup: [
    { name: T('Storefront', 'Magazinul'), tech: T('classic + Blocks', 'clasic + Blocks'), items: [
      T('Method choice and a calendar of valid days on the product page', 'Alegerea modului și un calendar cu zile valide pe pagina produsului'),
      T('Date and method on every cart line, mini-cart and checkout', 'Data și modul pe fiecare linie din coș, mini-coș și checkout'),
      T('Shipping charged per method and day', 'Transport taxat pe mod și zi'),
      T('Thank-you page, My Account and every email', 'Pagina de mulțumire, Contul meu și toate emailurile'),
    ] },
    { name: T('Shop admin', 'Adminul magazinului'), tech: 'WooCommerce', items: [
      T('Pickup profiles with a live preview of the dates', 'Profiluri de ridicare cu previzualizare live a datelor'),
      T('Assignment per category, subcategory or product', 'Atribuire pe categorie, subcategorie sau produs'),
      T('Delivery methods linked to shipping, with optional no-date', 'Moduri de livrare legate de transport, opțional fără dată'),
      T('Pickups board by day; orders column and date filter', 'Panou de ridicări pe zile; coloană și filtru pe dată în comenzi'),
    ] },
    { name: T('For developers', 'Pentru dezvoltatori'), tech: 'PHP · REST', items: [
      T('Shortcode for page builders', 'Shortcode pentru page buildere'),
      T('Public availability endpoint per product', 'Endpoint public de disponibilitate per produs'),
      T('Filters, actions and a JS refresh event', 'Filtre, acțiuni și un eveniment JS de refresh'),
      T('Order meta that Horae reads on import', 'Meta pe comandă pe care Horae o citește la import'),
    ] },
  ],
  ironpulse: [
    { name: T('Client app', 'Aplicația clientului'), tech: 'SwiftUI · offline-first', items: [
      T('Today’s workout, resumed if it was interrupted', 'Antrenamentul de azi, reluat dacă a fost întrerupt'),
      T('Live set logging, “machine is taken”, session tally', 'Logare live pe serii, „aparatul e ocupat”, bilanțul sesiunii'),
      T('Attendance, measurements, progress per exercise', 'Prezență, măsurători, progres pe exercițiu'),
      T('Branded with the trainer’s identity', 'Cu brandul antrenorului'),
    ] },
    { name: T('Trainer app', 'Aplicația antrenorului'), tech: 'SwiftUI', items: [
      T('Panel of clients ranked by urgency signals', 'Panoul clienților, ordonați după semnale de urgență'),
      T('Client sheet: program, last sessions, plateaus', 'Fișa clientului: program, ultimele sesiuni, platouri'),
      T('Day builder, assign and publish, templates', 'Constructor de zi, atribuire și publicare, șabloane'),
      T('In-session measurements and invitations', 'Măsurători în sesiune și invitații'),
    ] },
    { name: T('Trainer web', 'Web pentru antrenor'), tech: 'Next.js', items: [
      T('Keyboard-first three-panel program builder', 'Constructor de program în trei panouri, condus din tastatură'),
      T('Client list, sheets and progress charts', 'Lista clienților, fișe și grafice de progres'),
    ] },
    { name: 'API', tech: 'NestJS · Prisma · PostgreSQL', items: [
      T('A tenant per trainer, isolated in the data layer', 'Un tenant per antrenor, izolat în stratul de date'),
      T('Push/pull sync with per-entity conflict rules', 'Sincronizare push/pull cu reguli de conflict pe entitate'),
      T('Append-only corrections with author and device', 'Corecturi adăugate, cu autor și dispozitiv'),
    ] },
  ],
}

export { T, CASES, EARLIER, APPS };
