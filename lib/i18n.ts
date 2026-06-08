import { site, type Locale } from "./site";

export type { Locale };

export const localeMeta: Record<Locale, { label: string; flag: string; htmlLang: string }> = {
  ro: { label: "Română", flag: "RO", htmlLang: "ro-MD" },
  ru: { label: "Русский", flag: "RU", htmlLang: "ru-MD" },
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (site.locales as readonly string[]).includes(value);

export interface Dictionary {
  nav: {
    home: string;
    carcase: string;
    containere: string;
    portofoliu: string;
    proces: string;
    despre: string;
    oferta: string;
    callCta: string;
  };
  common: {
    quote: string;
    learnMore: string;
    viewAll: string;
    seeProject: string;
    seeProducts: string;
    seeProcess: string;
    contact: string;
    fromPrice: string;
    onRequest: string;
    eur: string;
    sqm: string;
    closeMenu: string;
    openMenu: string;
    backToTop: string;
    next: string;
    previous: string;
    submit: string;
    skipNav: string;
  };
  home: {
    heroEyebrow: string;
    heroTitleA: string;
    heroTitleB: string;
    heroLead: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    directionsTitle: string;
    directionsLead: string;
    directionCarcaseTitle: string;
    directionCarcaseLead: string;
    directionCarcaseBullets: string[];
    directionContainereTitle: string;
    directionContainereLead: string;
    directionContainereBullets: string[];
    statsTitle: string;
    statsLead: string;
    stat1Value: number;
    stat1Suffix: string;
    stat1Label: string;
    stat2Value: number;
    stat2Suffix: string;
    stat2Label: string;
    stat3Value: number;
    stat3Suffix: string;
    stat3Label: string;
    stat4Value: number;
    stat4Suffix: string;
    stat4Label: string;
    processTitle: string;
    processLead: string;
    portfolioTitle: string;
    portfolioLead: string;
    testimonialsTitle: string;
    testimonialsLead: string;
    testimonial1Quote: string;
    testimonial1Author: string;
    testimonial1Role: string;
    testimonial2Quote: string;
    testimonial2Author: string;
    testimonial2Role: string;
    testimonial3Quote: string;
    testimonial3Author: string;
    testimonial3Role: string;
    ctaTitle: string;
    ctaLead: string;
    faqTitle: string;
    faqLead: string;
    faq: { q: string; a: string }[];
  };
  carcase: {
    eyebrow: string;
    title: string;
    lead: string;
    catalogTitle: string;
    catalogLead: string;
    specsTitle: string;
    advantagesTitle: string;
    advantages: { title: string; description: string }[];
    materialsTitle: string;
    materialsLead: string;
    materials: { name: string; description: string }[];
    ctaTitle: string;
    ctaLead: string;
  };
  containere: {
    eyebrow: string;
    title: string;
    lead: string;
    categories: { title: string; description: string }[];
    includedTitle: string;
    includedLead: string;
    included: string[];
    comparatorTitle: string;
    comparatorLead: string;
    comparatorCarcasaTitle: string;
    comparatorContainerTitle: string;
    comparatorRows: { label: string; carcasa: string; container: string }[];
    ctaTitle: string;
    ctaLead: string;
  };
  portofoliu: {
    eyebrow: string;
    title: string;
    lead: string;
    filterAll: string;
    filterByType: string;
    filterByArea: string;
    sortByYear: string;
    detailsLabel: string;
    durationLabel: string;
    areaLabel: string;
    yearLabel: string;
    finishesLabel: string;
    nothingFound: string;
  };
  proces: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; duration: string; description: string }[];
    ctaTitle: string;
    ctaLead: string;
  };
  despre: {
    eyebrow: string;
    title: string;
    lead: string;
    storyTitle: string;
    storyBody: string;
    valuesTitle: string;
    values: { title: string; description: string }[];
    workshopTitle: string;
    workshopLead: string;
    whyTitle: string;
    whyLead: string;
    whyPoints: { title: string; description: string }[];
  };
  quickLead: {
    eyebrow: string;
    title: string;
    lead: string;
    inlineTitle: string;
    inlineLead: string;
    triggerLabel: string;
    triggerLabelProject: string;
    name: string;
    contact: string;
    contactHint: string;
    interest: string;
    interestOptions: { value: string; label: string }[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successLead: string;
    errorLead: string;
    fullFormCta: string;
    close: string;
    forProject: string;
  };
  oferta: {
    eyebrow: string;
    title: string;
    lead: string;
    step: string;
    of: string;
    progress: string;
    step1Title: string;
    step1Lead: string;
    projectType: string;
    projectTypeOptions: { value: string; label: string }[];
    step2Title: string;
    step2Lead: string;
    area: string;
    areaHint: string;
    locationRaion: string;
    locationCity: string;
    deadline: string;
    deadlineOptions: { value: string; label: string }[];
    step3Title: string;
    step3Lead: string;
    budget: string;
    budgetHint: string;
    budgetOptions: { value: string; label: string }[];
    step4Title: string;
    step4Lead: string;
    fullName: string;
    phone: string;
    email: string;
    message: string;
    attachments: string;
    attachmentsHint: string;
    consent: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successLead: string;
    errorTitle: string;
    errorLead: string;
    validationRequired: string;
    validationEmail: string;
    validationPhone: string;
    calculatorTitle: string;
    calculatorLead: string;
    calculatorEstimate: string;
    contactBlockTitle: string;
    contactBlockLead: string;
    configuratorTitle: string;
    configuratorLead: string;
    configuratorLength: string;
    configuratorWidth: string;
    configuratorHeight: string;
    configuratorColor: string;
    configuratorWindows: string;
    configuratorDoor: string;
    configuratorReset: string;
    configuratorSendToQuote: string;
    configuratorSavePng: string;
    colorWhite: string;
    colorGraphite: string;
    colorBlack: string;
    doorGlass: string;
    doorMetal: string;
    doorDouble: string;
    yes: string;
    no: string;
    instructionsTitle: string;
    instructionsLead: string;
    estimatedReply: string;
  };
  footer: {
    tagline: string;
    contactTitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    productsTitle: string;
    companyTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    cookies: string;
    rights: string;
    builtBy: string;
  };
  errors: {
    pageNotFoundTitle: string;
    pageNotFoundLead: string;
    backHome: string;
  };
}

const ro: Dictionary = {
  nav: {
    home: "Acasă",
    carcase: "Carcase",
    containere: "Containere",
    portofoliu: "Portofoliu",
    proces: "Proces",
    despre: "Despre",
    oferta: "Cere ofertă",
    callCta: "Sună-ne",
  },
  common: {
    quote: "Cere ofertă",
    learnMore: "Află mai mult",
    viewAll: "Vezi toate",
    seeProject: "Vezi proiectul",
    seeProducts: "Vezi modelele",
    seeProcess: "Vezi procesul",
    contact: "Contact",
    fromPrice: "De la",
    onRequest: "Ofertă individuală",
    eur: "€",
    sqm: "m²",
    closeMenu: "Închide meniul",
    openMenu: "Deschide meniul",
    backToTop: "Sus",
    next: "Următorul",
    previous: "Precedent",
    submit: "Trimite",
    skipNav: "Sari la conținut",
  },
  home: {
    heroEyebrow: "Construcții modulare · Republica Moldova",
    heroTitleA: "Spații moderne,",
    heroTitleB: "ridicate într-o lună.",
    heroLead:
      "Modus Construct proiectează și livrează carcase modulare și containere la cheie — pentru locuit, birou, comerț sau pază. De la concept la cheile în mână, fără compromisuri.",
    heroCtaPrimary: "Cere ofertă",
    heroCtaSecondary: "Vezi portofoliul",
    directionsTitle: "Două direcții, un singur partener",
    directionsLead:
      "Indiferent dacă vrei doar scheletul sau livrarea completă — avem soluția potrivită pentru proiectul tău.",
    directionCarcaseTitle: "Carcase modulare",
    directionCarcaseLead:
      "Scheleturi din oțel galvanizat pentru clienții care vor să își personalizeze singuri spațiul.",
    directionCarcaseBullets: [
      "Dimensiuni 4×3, 6×3, 8×3 m sau la comandă",
      "Oțel galvanizat acoperit cu zinc",
      "Rezistent la rugină, durabil în timp",
      "Livrabil oriunde în Moldova",
    ],
    directionContainereTitle: "Containere la cheie",
    directionContainereLead:
      "Case, birouri, magazine, cabane și puncte de pază — complet echipate, gata de mutat.",
    directionContainereBullets: [
      "Panouri sandwich termo & fonoizolante",
      "Baie, mobilier, instalații (opțional)",
      "Geamuri, uși și finisaje la alegere",
      "Livrare în 7–35 zile",
    ],
    statsTitle: "Cifre care vorbesc",
    statsLead: "Doi ani de muncă concentrată — și un standard pe care nu îl negociem.",
    stat1Value: 60,
    stat1Suffix: "+",
    stat1Label: "Proiecte realizate",
    stat2Value: 1200,
    stat2Suffix: "m²",
    stat2Label: "Suprafață construită",
    stat3Value: 14,
    stat3Suffix: " zile",
    stat3Label: "Durată medie livrare",
    stat4Value: 100,
    stat4Suffix: "%",
    stat4Label: "Clienți recomandând",
    processTitle: "Cum lucrăm",
    processLead:
      "Un proces clar, în 6 pași — de la primul mesaj până la cheile în mână.",
    portfolioTitle: "Lucrări recente",
    portfolioLead: "Câteva proiecte care arată ce putem face împreună.",
    testimonialsTitle: "Ce spun clienții",
    testimonialsLead: "Sinceritatea unui partener bun se vede în mărturii reale.",
    testimonial1Quote:
      "Comandasem un birou modular pentru un șantier de 6 luni. L-au livrat în 9 zile, montaj inclus. Recomand cu încredere.",
    testimonial1Author: "Ion Vasilachi",
    testimonial1Role: "Director, Vasilachi Construct",
    testimonial2Quote:
      "Carcasa de 6×3 m a venit fix pe dimensiuni și fix la timp. Am închis-o singur și acum am o casă de vacanță în pădure.",
    testimonial2Author: "Daniel P.",
    testimonial2Role: "Proprietar, Bălți",
    testimonial3Quote:
      "Container cu baie pentru 4 muncitori. Calitatea panourilor sandwich e excelentă, iarna nu am avut nicio problemă.",
    testimonial3Author: "Andrei Cîrnu",
    testimonial3Role: "Şef de șantier, Orhei",
    ctaTitle: "Vrei să discutăm despre proiectul tău?",
    ctaLead:
      "Trimite-ne câteva detalii și revenim cu o ofertă personalizată în maxim 48 de ore.",
    faqTitle: "Întrebări frecvente",
    faqLead: "Cele mai des întâlnite întrebări la care răspundem zilnic.",
    faq: [
      {
        q: "În cât timp primesc oferta?",
        a: "Revenim cu o ofertă scrisă în 24–48 de ore lucrătoare. Dacă ai și o schiță sau plan al terenului, putem coti chiar mai rapid.",
      },
      {
        q: "Aveți prețuri fixe?",
        a: "Avem prețuri de pornire pentru carcase și containerele standard, dar fiecare proiect e unic. Finisajele, dotările și logistica influențează prețul final — de aceea cotăm individual.",
      },
      {
        q: "Livrați în toată Moldova?",
        a: "Da. Avem atelier în Chișinău și livrăm cu transport propriu în toate raioanele Republicii Moldova. Pentru proiecte mai mari putem livra și în România/Ucraina.",
      },
      {
        q: "Care e durata standard de execuție?",
        a: "O carcasă simplă: 7–10 zile lucrătoare. Un container la cheie: 14–21 zile. O vilă multi-modul: 30–45 zile.",
      },
      {
        q: "Pot vizita atelierul?",
        a: "Cu plăcere. Sediul nostru e pe str. Petru Rareș 62, Chișinău. Sună-ne în prealabil la 069 216 780 și ne sincronizăm.",
      },
      {
        q: "Ce garanție oferiți?",
        a: "Carcasa: 5 ani împotriva ruginii și deformării. Container la cheie: 2 ani pentru manoperă și instalații, garanție producător pentru panouri sandwich.",
      },
    ],
  },
  carcase: {
    eyebrow: "Direcția 1",
    title: "Carcase modulare",
    lead:
      "Scheletul oricărei construcții modulare durabile. Oțel galvanizat, asamblare rapidă, dimensiuni standard sau la comandă.",
    catalogTitle: "Modele disponibile",
    catalogLead:
      "Patru tipodimensiuni standard + opțiunea de fabricare la comandă pentru proiectele atipice.",
    specsTitle: "Specificații tehnice",
    advantagesTitle: "De ce o carcasă de la Modus",
    advantages: [
      {
        title: "Oțel galvanizat premium",
        description:
          "Acoperire de zinc dublu strat, rezistentă la rugină timp de zeci de ani, fără întreținere.",
      },
      {
        title: "Asamblare rapidă",
        description:
          "Sudăm secțiunile în atelier și montăm pe șantier în 2–4 zile, indiferent de model.",
      },
      {
        title: "Standarde europene",
        description:
          "Profil stâlp 160 mm, calcul static conform EN 1993. Rezistent la vânt 120 km/h și zăpadă 100 kg/m².",
      },
      {
        title: "Flexibilitate totală",
        description:
          "Decizi singur cu ce o închizi — sandwich panel, OSB, lemn, beton ușor. Compatibil cu orice anvelopă.",
      },
    ],
    materialsTitle: "Materiale folosite",
    materialsLead:
      "Lucrăm doar cu furnizori europeni verificați și ținem evidența fiecărui lot de oțel folosit.",
    materials: [
      {
        name: "Oțel galvanizat S350GD",
        description:
          "Grad superior pentru profile structurale. Acoperire Z275 g/m² zinc — rezistent la rugină.",
      },
      {
        name: "Vopsea pulbere electrostatică",
        description:
          "Finisaj exterior 80 µm grosime, gamă RAL completă. Rezistă la UV, ploi acide, ger -40°C.",
      },
      {
        name: "Şuruburi inox A2",
        description:
          "Toate elementele de îmbinare sunt inox, fără rugină în timp. Garanție 30 de ani pe corpul șurubului.",
      },
      {
        name: "Suduri certificate ISO 3834",
        description:
          "Procedeu MIG/MAG cu sudori autorizați. Fiecare cordon de sudură este inspectat vizual înainte de livrare.",
      },
    ],
    ctaTitle: "Comandă carcasa pentru proiectul tău",
    ctaLead:
      "Spune-ne dimensiunile, locul de livrare și termenul — revenim cu un calcul exact în 48 de ore.",
  },
  containere: {
    eyebrow: "Direcția 2",
    title: "Containere gata făcute",
    lead:
      "Soluții modulare la cheie pentru locuit, birou, comerț, pază sau sanitare. Mobilier, instalații și finisaje incluse.",
    categories: [
      {
        title: "Containere de locuit",
        description:
          "Module 6×3 m sau 8×3 m, izolație completă, baie opțională. Mobilier inclus pe versiunile premium.",
      },
      {
        title: "Birouri modulare",
        description:
          "Cu vitrine mari, ușă cu sticlă, prize și iluminat LED — ready-to-work la livrare.",
      },
      {
        title: "Magazine & chioșcuri",
        description:
          "Vitrine personalizate, tejghea, podea industrială. Configurăm orice front comercial.",
      },
      {
        title: "Cabane de vacanță",
        description:
          "Acoperiș tip șarpantă, geamuri panoramice, terasă opțională — pentru pădure, lac sau munte.",
      },
      {
        title: "Vile modulare",
        description:
          "2–4 module conectate, plan deschis. Bucătărie, baie, dormitoare — locuințe permanente.",
      },
      {
        title: "Puncte sanitare & pază",
        description:
          "WC-uri modulare cu 1–8 cabine, cabine de pază 2×2 — 3×3 m, racordări gata făcute.",
      },
    ],
    includedTitle: "Ce este inclus în orice container la cheie",
    includedLead:
      "Lucrurile pe care nu trebuie să le ceri — pentru că vin standard.",
    included: [
      "Cadru oțel vopsit electrostatic",
      "Pereți panouri sandwich 60–100 mm",
      "Podea izolată cu finisaj PVC sau laminat",
      "Acoperiș cu hidroizolație",
      "2 geamuri PVC cu termopan",
      "Ușă exterioară (metal sau cu sticlă)",
      "Instalație electrică completă (prize, întrerupătoare, tablou)",
      "Iluminat LED interior",
      "Transport până la 50 km de Chișinău",
    ],
    comparatorTitle: "Carcasă sau container la cheie?",
    comparatorLead:
      "Cele două direcții servesc clienți foarte diferiți. Iată cum alegi corect:",
    comparatorCarcasaTitle: "Carcasă",
    comparatorContainerTitle: "Container la cheie",
    comparatorRows: [
      {
        label: "Preț de start",
        carcasa: "De la 1375 €",
        container: "De la 4500 €",
      },
      {
        label: "Timp livrare",
        carcasa: "7–10 zile",
        container: "14–21 zile",
      },
      {
        label: "Pentru cine",
        carcasa: "Constructori, DIY-ers",
        container: "Clienți care vor cheia în mână",
      },
      {
        label: "Ce primești",
        carcasa: "Schelet metalic gata de închis",
        container: "Spațiu finisat, mobilat, gata de mutat",
      },
      {
        label: "Mobilier inclus",
        carcasa: "Nu",
        container: "Opțional (versiunea mobilată)",
      },
      {
        label: "Garanție",
        carcasa: "5 ani structură",
        container: "2 ani complet · 5 ani structură",
      },
    ],
    ctaTitle: "Configurăm containerul tău în 24 de ore",
    ctaLead:
      "Trimite-ne tipul, dimensiunile și dotările dorite — primești o ofertă fermă în 48 de ore.",
  },
  portofoliu: {
    eyebrow: "Lucrările noastre",
    title: "Portofoliu",
    lead:
      "Proiecte livrate pe teren — case, cabane, birouri, puncte comerciale și sanitare. Filtrează după tip, mărime sau dată.",
    filterAll: "Toate",
    filterByType: "Tip proiect",
    filterByArea: "Suprafață",
    sortByYear: "An",
    detailsLabel: "Detalii proiect",
    durationLabel: "Durată",
    areaLabel: "Suprafață",
    yearLabel: "An",
    finishesLabel: "Finisaje",
    nothingFound: "Nu am găsit proiecte cu aceste filtre.",
  },
  proces: {
    eyebrow: "Cum funcționează",
    title: "Procesul în 6 pași",
    lead:
      "De la primul mesaj până la cheile în mână. Transparent, predictibil, fără surprize.",
    steps: [
      {
        title: "01 · Discuție inițială",
        duration: "Ziua 1",
        description:
          "Ne trimiți câteva detalii prin formular sau ne suni. Vorbim 15–20 minute despre nevoile tale, terenul disponibil și termenul dorit.",
      },
      {
        title: "02 · Cotare & ofertă",
        duration: "Zilele 2–3",
        description:
          "Pregătim o ofertă scrisă cu specificații, schiță 3D și preț ferm. Discutăm alternative și optimizări dacă e nevoie.",
      },
      {
        title: "03 · Contract & avans",
        duration: "Zilele 4–6",
        description:
          "Semnăm contractul cu calendar de livrare. Avans 50% pentru lansarea producției, rest la livrare.",
      },
      {
        title: "04 · Producție în atelier",
        duration: "7–14 zile",
        description:
          "Tăiem, sudăm, asamblăm și finisăm în atelierul nostru din Chișinău. Trimitem poze cu progresul.",
      },
      {
        title: "05 · Transport & montaj",
        duration: "Zilele 14–18",
        description:
          "Livrăm cu camion propriu și macara. Montaj pe teren în 1–3 zile, conexiuni la utilități incluse.",
      },
      {
        title: "06 · Predare & garanție",
        duration: "Ziua finală",
        description:
          "Inspecție finală împreună cu tine. Semnăm procesul-verbal, primești manual de utilizare și certificat de garanție.",
      },
    ],
    ctaTitle: "Vrei să pornim primul pas?",
    ctaLead: "Completează formularul și revenim cu o ofertă în 48 de ore.",
  },
  despre: {
    eyebrow: "Cine suntem",
    title: "Despre Modus Construct",
    lead:
      "Modus — Soluții Modulare pentru Afacerea și Proiectele Tale. Bine ați venit la partenerul dumneavoastră de încredere în domeniul construcțiilor modulare în Republica Moldova.",
    storyTitle: "Povestea noastră",
    storyBody:
      "De la înființarea noastră în anul 2024, ne-am propus să redefinim modul în care spațiile pot fi create, adaptate și utilizate, oferind soluții flexibile, durabile și eficiente pentru o gamă variată de necesități. Specializarea noastră principală constă în comercializarea de carcase și containere modulare de înaltă calitate. Înțelegem că fiecare afacere sau proiect are cerințe unice, de aceea punem la dispoziția clienților noștri o diversitate de mărimi și configurații. Fie că aveți nevoie de un spațiu pentru o cafenea modernă, un birou mobil, un punct comercial sau o unitate de depozitare, containerele noastre reprezintă soluția ideală pentru a vă optimiza spațiul rapid și economic.",
    valuesTitle: "Ce ne ghidează",
    values: [
      {
        title: "Versatilitate",
        description:
          "Oferim containere adaptabile pentru multiple destinații, de la spații comerciale la unități tehnice.",
      },
      {
        title: "Calitate și durabilitate",
        description:
          "Produsele noastre sunt concepute să reziste și să ofere confort, respectând cele mai înalte standarde de construcție modulară.",
      },
      {
        title: "Eficiență",
        description:
          "Credem în soluții rapide, care să permită demararea activității dumneavoastră într-un timp minim.",
      },
      {
        title: "Transparență",
        description:
          "Prețuri clare, calendare ferme, suport pe toată durata proiectului. Niciun cost ascuns.",
      },
    ],
    workshopTitle: "Atelierul nostru",
    workshopLead:
      "Pe str. Petru Rareș 62, în zona centru a Chișinăului — vino să vezi cum lucrăm.",
    whyTitle: "De ce Modus Construct",
    whyLead: "Ce primești când lucrezi cu noi",
    whyPoints: [
      {
        title: "Atelier propriu în Chișinău",
        description:
          "Producem local, fără intermediari. Poți vizita atelierul oricând și verifica calitatea în timpul producției.",
      },
      {
        title: "Livrare în toată Moldova",
        description:
          "Transport și descărcare cu macara incluse, în orice raion al țării. Modulul ajunge gata de utilizare.",
      },
      {
        title: "Termen ferm 4–8 săptămâni",
        description:
          "Producem după grafic stabilit din contract. Comunicăm săptămânal stadiul lucrărilor.",
      },
      {
        title: "Garanție de structură",
        description:
          "Oferim garanție scrisă pentru carcasa metalică și suport tehnic post-livrare pentru orice intervenție.",
      },
      {
        title: "Configurație personalizată",
        description:
          "Adaptăm dimensiunile, ferestrele, izolația și finisajele exact pe nevoile proiectului tău.",
      },
      {
        title: "Preț transparent",
        description:
          "Ofertă detaliată pe poziții, fără costuri ascunse. Plata eșalonată conform stadiilor de execuție.",
      },
    ],
  },
  quickLead: {
    eyebrow: "Solicitare rapidă",
    title: "Cere ofertă în 30 de secunde",
    lead: "Lasă-ne datele și revenim în maxim 24 de ore cu o estimare personalizată.",
    inlineTitle: "Te interesează acest proiect?",
    inlineLead: "Trimite-ne câteva detalii și revenim cu o ofertă similară pentru tine.",
    triggerLabel: "Cere ofertă rapid",
    triggerLabelProject: "Cere ofertă pentru acest proiect",
    name: "Nume",
    contact: "Email sau telefon",
    contactHint: "Cum preferi să te contactăm",
    interest: "Ce te interesează?",
    interestOptions: [
      { value: "carcasa", label: "Carcasă modulară" },
      { value: "container", label: "Container la cheie" },
      { value: "casa", label: "Casă modulară" },
      { value: "birou", label: "Birou / pavilion comercial" },
      { value: "sanitar", label: "Punct sanitar / WC" },
      { value: "altul", label: "Altceva / nu sunt sigur" },
    ],
    message: "Detalii (opțional)",
    messagePlaceholder: "Suprafață aproximativă, locație, termen…",
    submit: "Trimite cererea",
    submitting: "Se trimite…",
    successTitle: "Mulțumim!",
    successLead: "Am primit cererea ta. Te contactăm în maxim 24 de ore.",
    errorLead: "Ceva n-a mers. Încearcă din nou sau scrie-ne pe WhatsApp.",
    fullFormCta: "Vreau să completez formularul detaliat",
    close: "Închide",
    forProject: "Pentru proiectul",
  },
  oferta: {
    eyebrow: "Începem împreună",
    title: "Cere o ofertă",
    lead:
      "Patru pași simpli. Maxim 3 minute. Primești o ofertă personalizată în 48 de ore.",
    step: "Pasul",
    of: "din",
    progress: "completat",
    step1Title: "Tipul proiectului",
    step1Lead: "Ce ai în plan să construim?",
    projectType: "Selectează tipul",
    projectTypeOptions: [
      { value: "carcasa", label: "Carcasă modulară" },
      { value: "container-standard", label: "Container standard la cheie" },
      { value: "container-mobilat", label: "Container mobilat (cazare)" },
      { value: "casa-modulara", label: "Casă modulară" },
      { value: "cabana", label: "Cabană / casă de vacanță" },
      { value: "birou", label: "Birou mobil / pe șantier" },
      { value: "magazin", label: "Magazin / chioșc" },
      { value: "paza", label: "Punct de pază" },
      { value: "sanitar", label: "Punct sanitar / WC public" },
      { value: "altul", label: "Altceva (descriu mai jos)" },
    ],
    step2Title: "Detalii proiect",
    step2Lead: "Câteva date despre dimensiuni și locație.",
    area: "Suprafață aproximativă",
    areaHint: "Glisează sau scrie suprafața dorită",
    locationRaion: "Raion / municipiu",
    locationCity: "Localitate",
    deadline: "Când ai nevoie de proiect?",
    deadlineOptions: [
      { value: "asap", label: "Cât mai repede" },
      { value: "1m", label: "În 1 lună" },
      { value: "3m", label: "În 2–3 luni" },
      { value: "6m", label: "În 4–6 luni" },
      { value: "flex", label: "Sunt flexibil" },
    ],
    step3Title: "Buget orientativ",
    step3Lead: "Opțional, dar ne ajută să recomandăm soluția potrivită.",
    budget: "Interval buget",
    budgetHint: "Selectează intervalul care se potrivește cel mai bine planurilor tale",
    budgetOptions: [
      { value: "sub-2000", label: "Sub 2.000 €" },
      { value: "2000-5000", label: "2.000–5.000 €" },
      { value: "5000-10000", label: "5.000–10.000 €" },
      { value: "10000-20000", label: "10.000–20.000 €" },
      { value: "20000+", label: "Peste 20.000 €" },
      { value: "nu-stiu", label: "Nu am încă o estimare" },
    ],
    step4Title: "Datele tale de contact",
    step4Lead:
      "Promitem să nu te spamăm — folosim datele doar pentru a-ți trimite oferta.",
    fullName: "Nume și prenume",
    phone: "Telefon",
    email: "Email",
    message: "Mesaj suplimentar (opțional)",
    attachments: "Atașează fișiere (plan teren, schițe, poze)",
    attachmentsHint: "PDF, JPG, PNG · maxim 10 MB per fișier · până la 5 fișiere",
    consent:
      "Sunt de acord cu prelucrarea datelor mele personale conform politicii de confidențialitate.",
    submit: "Trimite cererea",
    submitting: "Se trimite...",
    successTitle: "Mulțumim! Am primit cererea ta.",
    successLead:
      "Revenim cu o ofertă personalizată în maxim 48 de ore. Te redirecționăm către pagina principală în 5 secunde...",
    errorTitle: "A apărut o problemă",
    errorLead:
      "Nu am reușit să trimitem mesajul tău acum. Te rugăm să încerci din nou sau să ne suni direct la",
    validationRequired: "Acest câmp este obligatoriu",
    validationEmail: "Te rugăm să introduci o adresă de email validă",
    validationPhone: "Te rugăm să introduci un număr de telefon valid",
    calculatorTitle: "Calculator orientativ",
    calculatorLead:
      "Glisează suprafața pentru a vedea intervalul de preț pentru proiecte similare.",
    calculatorEstimate: "Proiectele similare costă între",
    contactBlockTitle: "Sau ne contactezi direct",
    contactBlockLead:
      "Vino la atelier sau scrie-ne — răspundem zilnic între 09:00 și 18:00.",
    configuratorTitle: "Configurator 3D — proiectează-ți containerul",
    configuratorLead:
      "Glisează dimensiunile, alege culoarea, geamurile și ușa. Trimitem configurația ta direct la ofertă.",
    configuratorLength: "Lungime",
    configuratorWidth: "Lățime",
    configuratorHeight: "Înălțime",
    configuratorColor: "Culoare exterior",
    configuratorWindows: "Număr geamuri",
    configuratorDoor: "Tip ușă",
    configuratorReset: "Resetează",
    configuratorSendToQuote: "Folosește această configurație",
    configuratorSavePng: "Salvează imaginea",
    colorWhite: "Alb",
    colorGraphite: "Grafit",
    colorBlack: "Negru",
    doorGlass: "Cu sticlă",
    doorMetal: "Metalică",
    doorDouble: "Dublă",
    yes: "Da",
    no: "Nu",
    instructionsTitle: "Cum funcționează",
    instructionsLead:
      "Trimite cererea, primești răspuns de la noi în 24–48 ore. Discutăm la telefon și ne aliniem pe detalii. Semnăm contractul. Începem.",
    estimatedReply: "Răspuns garantat în 48 ore",
  },
  footer: {
    tagline:
      "Construcții modulare livrate la cheie sau sub formă de carcase. Atelier Chișinău, livrare în toată Moldova.",
    contactTitle: "Contact",
    addressLabel: "Adresă",
    phoneLabel: "Telefon",
    emailLabel: "Email",
    hoursLabel: "Program",
    productsTitle: "Produse",
    companyTitle: "Companie",
    legalTitle: "Legal",
    privacy: "Politica de confidențialitate",
    terms: "Termeni și condiții",
    cookies: "Politica de cookies",
    rights: "Toate drepturile rezervate.",
    builtBy: "Site by Modus Construct",
  },
  errors: {
    pageNotFoundTitle: "Pagina nu există",
    pageNotFoundLead:
      "Linkul pe care l-ai urmat e probabil unul vechi. Mergi înapoi la pagina principală pentru a o lua de la capăt.",
    backHome: "Înapoi la pagina principală",
  },
};

const ru: Dictionary = {
  nav: {
    home: "Главная",
    carcase: "Каркасы",
    containere: "Контейнеры",
    portofoliu: "Портфолио",
    proces: "Процесс",
    despre: "О нас",
    oferta: "Запрос",
    callCta: "Позвоните",
  },
  common: {
    quote: "Запросить смету",
    learnMore: "Подробнее",
    viewAll: "Все",
    seeProject: "Открыть проект",
    seeProducts: "Все модели",
    seeProcess: "Процесс",
    contact: "Контакты",
    fromPrice: "от",
    onRequest: "Цена по запросу",
    eur: "€",
    sqm: "м²",
    closeMenu: "Закрыть меню",
    openMenu: "Открыть меню",
    backToTop: "Наверх",
    next: "Далее",
    previous: "Назад",
    submit: "Отправить",
    skipNav: "Перейти к содержимому",
  },
  home: {
    heroEyebrow: "Модульное строительство · Молдова",
    heroTitleA: "Современные пространства,",
    heroTitleB: "построенные за месяц.",
    heroLead:
      "Modus Construct проектирует и поставляет модульные каркасы и готовые контейнеры — для жилья, офиса, торговли или охраны. От идеи до ключей в руках — без компромиссов.",
    heroCtaPrimary: "Запросить смету",
    heroCtaSecondary: "Смотреть портфолио",
    directionsTitle: "Два направления, один партнёр",
    directionsLead:
      "Нужен ли вам только каркас или полная сдача под ключ — у нас есть подходящее решение для вашего проекта.",
    directionCarcaseTitle: "Модульные каркасы",
    directionCarcaseLead:
      "Каркасы из оцинкованной стали для клиентов, которые хотят самостоятельно отделать пространство.",
    directionCarcaseBullets: [
      "Размеры 4×3, 6×3, 8×3 м или на заказ",
      "Оцинкованная сталь с цинковым покрытием",
      "Устойчивость к коррозии, долгий срок службы",
      "Доставка по всей Молдове",
    ],
    directionContainereTitle: "Контейнеры под ключ",
    directionContainereLead:
      "Дома, офисы, магазины, кабины и охранные посты — полностью оборудованные, готовые к заселению.",
    directionContainereBullets: [
      "Сэндвич-панели тепло- и звукоизоляционные",
      "Санузел, мебель, инженерия (опционально)",
      "Окна, двери и отделка на выбор",
      "Поставка 7–35 дней",
    ],
    statsTitle: "Цифры, которые говорят",
    statsLead: "Два года сосредоточенной работы — и стандарт, на котором мы не идём на компромиссы.",
    stat1Value: 60,
    stat1Suffix: "+",
    stat1Label: "Реализованных проектов",
    stat2Value: 1200,
    stat2Suffix: "м²",
    stat2Label: "Построенная площадь",
    stat3Value: 14,
    stat3Suffix: " дней",
    stat3Label: "Средний срок поставки",
    stat4Value: 100,
    stat4Suffix: "%",
    stat4Label: "Клиентов рекомендуют",
    processTitle: "Как мы работаем",
    processLead:
      "Чёткий процесс из 6 шагов — от первого сообщения до ключей в руках.",
    portfolioTitle: "Последние работы",
    portfolioLead: "Несколько проектов, которые показывают, что мы можем сделать вместе.",
    testimonialsTitle: "Что говорят клиенты",
    testimonialsLead: "Искренность хорошего партнёра видна в реальных отзывах.",
    testimonial1Quote:
      "Заказал модульный офис для стройки на 6 месяцев. Доставили за 9 дней, монтаж включён. Рекомендую с уверенностью.",
    testimonial1Author: "Ион Василаки",
    testimonial1Role: "Директор, Vasilachi Construct",
    testimonial2Quote:
      "Каркас 6×3 м пришёл точно по размерам и точно в срок. Закрыл сам и теперь у меня дача в лесу.",
    testimonial2Author: "Даниэль П.",
    testimonial2Role: "Владелец, Бельцы",
    testimonial3Quote:
      "Контейнер с санузлом для 4 рабочих. Качество сэндвич-панелей превосходное, зимой не было проблем.",
    testimonial3Author: "Андрей Кырну",
    testimonial3Role: "Прораб, Орхей",
    ctaTitle: "Хотите обсудить ваш проект?",
    ctaLead:
      "Отправьте нам несколько деталей — мы вернёмся с персональным предложением за 48 часов.",
    faqTitle: "Частые вопросы",
    faqLead: "Самые частые вопросы, на которые мы отвечаем каждый день.",
    faq: [
      {
        q: "Через сколько я получу предложение?",
        a: "Возвращаемся с письменным предложением в течение 24–48 рабочих часов. Если у вас есть эскиз или план участка, можем оценить ещё быстрее.",
      },
      {
        q: "У вас фиксированные цены?",
        a: "У нас есть стартовые цены на каркасы и стандартные контейнеры, но каждый проект уникален. Отделка, оснащение и логистика влияют на финальную цену — поэтому мы рассчитываем индивидуально.",
      },
      {
        q: "Вы доставляете по всей Молдове?",
        a: "Да. У нас цех в Кишинёве и доставляем собственным транспортом во все районы Республики Молдова. Для крупных проектов можем доставить в Румынию/Украину.",
      },
      {
        q: "Каков стандартный срок изготовления?",
        a: "Простой каркас: 7–10 рабочих дней. Контейнер под ключ: 14–21 день. Многомодульная вилла: 30–45 дней.",
      },
      {
        q: "Могу посетить цех?",
        a: "С удовольствием. Наш офис на ул. Петру Рареш 62, Кишинёв. Позвоните заранее по 069 216 780 — согласуем визит.",
      },
      {
        q: "Какую гарантию вы даёте?",
        a: "Каркас: 5 лет против коррозии и деформации. Контейнер под ключ: 2 года на работу и инженерию, гарантия производителя на сэндвич-панели.",
      },
    ],
  },
  carcase: {
    eyebrow: "Направление 1",
    title: "Модульные каркасы",
    lead:
      "Каркас любой долговечной модульной конструкции. Оцинкованная сталь, быстрая сборка, стандартные или индивидуальные размеры.",
    catalogTitle: "Доступные модели",
    catalogLead:
      "Четыре стандартных типоразмера + опция изготовления под заказ для нестандартных проектов.",
    specsTitle: "Технические характеристики",
    advantagesTitle: "Почему каркас от Modus",
    advantages: [
      {
        title: "Премиум оцинкованная сталь",
        description:
          "Двухслойное цинковое покрытие, устойчивое к коррозии в течение десятилетий, без обслуживания.",
      },
      {
        title: "Быстрая сборка",
        description:
          "Свариваем секции в цеху и монтируем на стройке за 2–4 дня, независимо от модели.",
      },
      {
        title: "Европейские стандарты",
        description:
          "Профиль стойки 160 мм, статический расчёт по EN 1993. Выдерживает ветер 120 км/ч и снег 100 кг/м².",
      },
      {
        title: "Полная гибкость",
        description:
          "Решаете сами, чем закрыть — сэндвич-панель, OSB, дерево, лёгкий бетон. Совместим с любым ограждением.",
      },
    ],
    materialsTitle: "Используемые материалы",
    materialsLead:
      "Работаем только с проверенными европейскими поставщиками и ведём учёт каждой партии используемой стали.",
    materials: [
      {
        name: "Оцинкованная сталь S350GD",
        description:
          "Высший класс для конструктивных профилей. Покрытие Z275 г/м² цинк — устойчивое к коррозии.",
      },
      {
        name: "Порошковая электростатическая краска",
        description:
          "Внешняя отделка толщиной 80 мкм, полная палитра RAL. Устойчива к УФ, кислотным дождям, морозу -40°C.",
      },
      {
        name: "Болты нерж. A2",
        description:
          "Все соединительные элементы из нержавейки, без коррозии со временем. Гарантия 30 лет на корпус болта.",
      },
      {
        name: "Сертифицированные сварки ISO 3834",
        description:
          "Процедура MIG/MAG с квалифицированными сварщиками. Каждый шов визуально инспектируется перед поставкой.",
      },
    ],
    ctaTitle: "Закажите каркас для вашего проекта",
    ctaLead:
      "Скажите нам размеры, место поставки и срок — вернёмся с точным расчётом за 48 часов.",
  },
  containere: {
    eyebrow: "Направление 2",
    title: "Готовые контейнеры",
    lead:
      "Модульные решения под ключ для жилья, офиса, торговли, охраны или санитарии. Мебель, инженерия и отделка включены.",
    categories: [
      {
        title: "Жилые контейнеры",
        description:
          "Модули 6×3 м или 8×3 м, полная теплоизоляция, опциональный санузел. Мебель включена в премиум-версиях.",
      },
      {
        title: "Модульные офисы",
        description:
          "С большими витринами, стеклянной дверью, розетками и LED-освещением — ready-to-work при поставке.",
      },
      {
        title: "Магазины и киоски",
        description:
          "Индивидуальные витрины, прилавок, промышленный пол. Конфигурируем любой коммерческий фронт.",
      },
      {
        title: "Дачные кабины",
        description:
          "Скатная крыша, панорамные окна, опциональная терраса — для леса, озера или гор.",
      },
      {
        title: "Модульные виллы",
        description:
          "2–4 соединённых модуля, открытый план. Кухня, санузел, спальни — постоянное жильё.",
      },
      {
        title: "Санитарные и охранные посты",
        description:
          "Модульные WC с 1–8 кабинами, охранные кабины 2×2 — 3×3 м, готовые подключения.",
      },
    ],
    includedTitle: "Что включено в любой контейнер под ключ",
    includedLead:
      "То, что вам не нужно просить — потому что это стандарт.",
    included: [
      "Стальной каркас с порошковой покраской",
      "Сэндвич-панели стен 60–100 мм",
      "Утеплённый пол с ПВХ или ламинатом",
      "Крыша с гидроизоляцией",
      "2 ПВХ-окна со стеклопакетом",
      "Внешняя дверь (металл или стекло)",
      "Полная электропроводка (розетки, выключатели, щиток)",
      "Внутреннее LED-освещение",
      "Транспорт до 50 км от Кишинёва",
    ],
    comparatorTitle: "Каркас или контейнер под ключ?",
    comparatorLead:
      "Два направления обслуживают очень разных клиентов. Вот как выбрать правильно:",
    comparatorCarcasaTitle: "Каркас",
    comparatorContainerTitle: "Контейнер под ключ",
    comparatorRows: [
      {
        label: "Стартовая цена",
        carcasa: "от 1375 €",
        container: "от 4500 €",
      },
      {
        label: "Срок поставки",
        carcasa: "7–10 дней",
        container: "14–21 дней",
      },
      {
        label: "Для кого",
        carcasa: "Строители, DIY-ers",
        container: "Клиенты, желающие ключ в руки",
      },
      {
        label: "Что получаете",
        carcasa: "Готовый к отделке металлический каркас",
        container: "Отделанное, меблированное пространство, готовое к заселению",
      },
      {
        label: "Мебель включена",
        carcasa: "Нет",
        container: "Опционально (меблированная версия)",
      },
      {
        label: "Гарантия",
        carcasa: "5 лет на структуру",
        container: "2 года полная · 5 лет на структуру",
      },
    ],
    ctaTitle: "Сконфигурируем ваш контейнер за 24 часа",
    ctaLead:
      "Отправьте нам тип, размеры и желаемое оснащение — получите твёрдое предложение за 48 часов.",
  },
  portofoliu: {
    eyebrow: "Наши работы",
    title: "Портфолио",
    lead:
      "Реализованные проекты — дома, кабины, офисы, торговые и санитарные точки. Фильтруйте по типу, размеру или дате.",
    filterAll: "Все",
    filterByType: "Тип проекта",
    filterByArea: "Площадь",
    sortByYear: "Год",
    detailsLabel: "Детали проекта",
    durationLabel: "Срок",
    areaLabel: "Площадь",
    yearLabel: "Год",
    finishesLabel: "Отделка",
    nothingFound: "Не нашли проектов с этими фильтрами.",
  },
  proces: {
    eyebrow: "Как это работает",
    title: "Процесс из 6 шагов",
    lead:
      "От первого сообщения до ключей в руках. Прозрачно, предсказуемо, без сюрпризов.",
    steps: [
      {
        title: "01 · Первый разговор",
        duration: "День 1",
        description:
          "Вы отправляете несколько деталей через форму или звоните. Говорим 15–20 минут о ваших нуждах, доступной территории и желаемом сроке.",
      },
      {
        title: "02 · Расчёт и предложение",
        duration: "Дни 2–3",
        description:
          "Готовим письменное предложение со спецификациями, 3D-эскизом и твёрдой ценой. Обсуждаем альтернативы и оптимизации при необходимости.",
      },
      {
        title: "03 · Договор и аванс",
        duration: "Дни 4–6",
        description:
          "Подписываем договор с календарём поставки. Аванс 50% для запуска производства, остаток при поставке.",
      },
      {
        title: "04 · Производство в цеху",
        duration: "7–14 дней",
        description:
          "Режем, сваривам, собираем и отделываем в нашем цеху в Кишинёве. Присылаем фото с прогрессом.",
      },
      {
        title: "05 · Транспорт и монтаж",
        duration: "Дни 14–18",
        description:
          "Доставляем собственным грузовиком и краном. Монтаж на стройке за 1–3 дня, подключения к инженерии включены.",
      },
      {
        title: "06 · Сдача и гарантия",
        duration: "Финальный день",
        description:
          "Финальная инспекция вместе с вами. Подписываем акт, получаете руководство пользователя и сертификат гарантии.",
      },
    ],
    ctaTitle: "Хотите начать первый шаг?",
    ctaLead: "Заполните форму и мы вернёмся с предложением за 48 часов.",
  },
  despre: {
    eyebrow: "Кто мы",
    title: "О Modus Construct",
    lead:
      "Modus — Модульные решения для вашего бизнеса и проектов. Добро пожаловать к вашему надёжному партнёру в области модульного строительства в Республике Молдова.",
    storyTitle: "Наша история",
    storyBody:
      "С момента основания в 2024 году мы поставили перед собой задачу переосмыслить способ создания, адаптации и использования пространств, предлагая гибкие, долговечные и эффективные решения для разнообразных нужд. Наша основная специализация — продажа высококачественных модульных каркасов и контейнеров. Мы понимаем, что у каждого бизнеса или проекта свои уникальные требования, поэтому предлагаем клиентам разнообразие размеров и конфигураций. Будь то пространство для современного кафе, мобильный офис, торговая точка или складская единица — наши контейнеры являются идеальным решением для оптимизации пространства быстро и экономично.",
    valuesTitle: "Что нас направляет",
    values: [
      {
        title: "Универсальность",
        description:
          "Предлагаем контейнеры, адаптируемые для разных назначений, от коммерческих помещений до технических единиц.",
      },
      {
        title: "Качество и долговечность",
        description:
          "Наша продукция сделана, чтобы служить и обеспечивать комфорт, соблюдая высочайшие стандарты модульного строительства.",
      },
      {
        title: "Эффективность",
        description:
          "Мы верим в быстрые решения, позволяющие начать вашу деятельность в минимальные сроки.",
      },
      {
        title: "Прозрачность",
        description:
          "Чёткие цены, твёрдые графики, поддержка на протяжении всего проекта. Никаких скрытых расходов.",
      },
    ],
    workshopTitle: "Наш цех",
    workshopLead:
      "На ул. Петру Рареш 62, в центре Кишинёва — приходите посмотреть, как мы работаем.",
    whyTitle: "Почему Modus Construct",
    whyLead: "Что вы получаете, работая с нами",
    whyPoints: [
      {
        title: "Собственный цех в Кишинёве",
        description:
          "Производим локально, без посредников. Можете в любое время посетить цех и проверить качество в процессе изготовления.",
      },
      {
        title: "Доставка по всей Молдове",
        description:
          "Транспорт и разгрузка краном включены, в любой район страны. Модуль прибывает готовым к использованию.",
      },
      {
        title: "Чёткий срок 4–8 недель",
        description:
          "Производим по графику из договора. Еженедельно сообщаем о статусе работ.",
      },
      {
        title: "Гарантия на конструкцию",
        description:
          "Предоставляем письменную гарантию на металлический каркас и техподдержку после поставки.",
      },
      {
        title: "Индивидуальная конфигурация",
        description:
          "Адаптируем размеры, окна, утепление и отделку точно под нужды вашего проекта.",
      },
      {
        title: "Прозрачная цена",
        description:
          "Детальное предложение по позициям, без скрытых расходов. Поэтапная оплата по стадиям выполнения.",
      },
    ],
  },
  quickLead: {
    eyebrow: "Быстрая заявка",
    title: "Заявка за 30 секунд",
    lead: "Оставьте данные — перезвоним в течение 24 часов с персональной оценкой.",
    inlineTitle: "Заинтересовал этот проект?",
    inlineLead: "Отправьте несколько деталей — подготовим аналогичное предложение для вас.",
    triggerLabel: "Быстрая заявка",
    triggerLabelProject: "Запросить такой же проект",
    name: "Имя",
    contact: "Email или телефон",
    contactHint: "Как с вами связаться",
    interest: "Что вас интересует?",
    interestOptions: [
      { value: "carcasa", label: "Модульный каркас" },
      { value: "container", label: "Контейнер «под ключ»" },
      { value: "casa", label: "Модульный дом" },
      { value: "birou", label: "Офис / коммерческий павильон" },
      { value: "sanitar", label: "Санитарный пункт / WC" },
      { value: "altul", label: "Другое / не уверен" },
    ],
    message: "Детали (опционально)",
    messagePlaceholder: "Примерная площадь, локация, сроки…",
    submit: "Отправить заявку",
    submitting: "Отправка…",
    successTitle: "Спасибо!",
    successLead: "Мы получили вашу заявку. Свяжемся с вами в течение 24 часов.",
    errorLead: "Что-то пошло не так. Попробуйте снова или напишите нам в WhatsApp.",
    fullFormCta: "Заполнить полную форму",
    close: "Закрыть",
    forProject: "По проекту",
  },
  oferta: {
    eyebrow: "Начинаем вместе",
    title: "Запросить предложение",
    lead:
      "Четыре простых шага. Максимум 3 минуты. Получите персональное предложение за 48 часов.",
    step: "Шаг",
    of: "из",
    progress: "завершено",
    step1Title: "Тип проекта",
    step1Lead: "Что планируете построить?",
    projectType: "Выберите тип",
    projectTypeOptions: [
      { value: "carcasa", label: "Модульный каркас" },
      { value: "container-standard", label: "Стандартный контейнер под ключ" },
      { value: "container-mobilat", label: "Меблированный контейнер (жильё)" },
      { value: "casa-modulara", label: "Модульный дом" },
      { value: "cabana", label: "Кабина / дачный дом" },
      { value: "birou", label: "Мобильный / строительный офис" },
      { value: "magazin", label: "Магазин / киоск" },
      { value: "paza", label: "Пост охраны" },
      { value: "sanitar", label: "Санитарный пункт / общественный WC" },
      { value: "altul", label: "Другое (опишу ниже)" },
    ],
    step2Title: "Детали проекта",
    step2Lead: "Несколько данных о размерах и локации.",
    area: "Приблизительная площадь",
    areaHint: "Передвигайте или впишите желаемую площадь",
    locationRaion: "Район / муниципалитет",
    locationCity: "Населённый пункт",
    deadline: "Когда нужен проект?",
    deadlineOptions: [
      { value: "asap", label: "Как можно быстрее" },
      { value: "1m", label: "Через 1 месяц" },
      { value: "3m", label: "Через 2–3 месяца" },
      { value: "6m", label: "Через 4–6 месяцев" },
      { value: "flex", label: "Я гибок" },
    ],
    step3Title: "Ориентировочный бюджет",
    step3Lead: "Опционально, но помогает нам предложить подходящее решение.",
    budget: "Бюджетный диапазон",
    budgetHint: "Выберите интервал, наиболее подходящий вашим планам",
    budgetOptions: [
      { value: "sub-2000", label: "Менее 2.000 €" },
      { value: "2000-5000", label: "2.000–5.000 €" },
      { value: "5000-10000", label: "5.000–10.000 €" },
      { value: "10000-20000", label: "10.000–20.000 €" },
      { value: "20000+", label: "Свыше 20.000 €" },
      { value: "nu-stiu", label: "У меня пока нет оценки" },
    ],
    step4Title: "Ваши контактные данные",
    step4Lead:
      "Обещаем не спамить — используем данные только чтобы прислать предложение.",
    fullName: "Имя и фамилия",
    phone: "Телефон",
    email: "Email",
    message: "Дополнительное сообщение (опционально)",
    attachments: "Приложите файлы (план участка, эскизы, фото)",
    attachmentsHint: "PDF, JPG, PNG · максимум 10 МБ на файл · до 5 файлов",
    consent:
      "Я согласен с обработкой моих персональных данных согласно политике конфиденциальности.",
    submit: "Отправить запрос",
    submitting: "Отправка...",
    successTitle: "Спасибо! Мы получили ваш запрос.",
    successLead:
      "Вернёмся с персональным предложением в течение 48 часов. Перенаправляем на главную через 5 секунд...",
    errorTitle: "Возникла проблема",
    errorLead:
      "Не удалось отправить сообщение прямо сейчас. Пожалуйста, попробуйте ещё раз или позвоните нам напрямую",
    validationRequired: "Это поле обязательно",
    validationEmail: "Пожалуйста, введите корректный email",
    validationPhone: "Пожалуйста, введите корректный номер телефона",
    calculatorTitle: "Ориентировочный калькулятор",
    calculatorLead:
      "Передвигайте площадь, чтобы увидеть ценовой диапазон похожих проектов.",
    calculatorEstimate: "Похожие проекты стоят между",
    contactBlockTitle: "Или свяжитесь с нами напрямую",
    contactBlockLead:
      "Приходите в цех или напишите — отвечаем каждый день с 09:00 до 18:00.",
    configuratorTitle: "3D-конфигуратор — спроектируйте контейнер",
    configuratorLead:
      "Передвигайте размеры, выбирайте цвет, окна и дверь. Отправим вашу конфигурацию прямо в запрос.",
    configuratorLength: "Длина",
    configuratorWidth: "Ширина",
    configuratorHeight: "Высота",
    configuratorColor: "Цвет фасада",
    configuratorWindows: "Количество окон",
    configuratorDoor: "Тип двери",
    configuratorReset: "Сбросить",
    configuratorSendToQuote: "Использовать эту конфигурацию",
    configuratorSavePng: "Сохранить изображение",
    colorWhite: "Белый",
    colorGraphite: "Графит",
    colorBlack: "Чёрный",
    doorGlass: "Стеклянная",
    doorMetal: "Металлическая",
    doorDouble: "Двойная",
    yes: "Да",
    no: "Нет",
    instructionsTitle: "Как это работает",
    instructionsLead:
      "Отправьте запрос, получите ответ за 24–48 часов. Поговорим по телефону и согласуем детали. Подпишем договор. Начинаем.",
    estimatedReply: "Гарантированный ответ за 48 часов",
  },
  footer: {
    tagline:
      "Модульные конструкции под ключ или в виде каркасов. Цех в Кишинёве, доставка по всей Молдове.",
    contactTitle: "Контакты",
    addressLabel: "Адрес",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    hoursLabel: "Часы работы",
    productsTitle: "Продукты",
    companyTitle: "Компания",
    legalTitle: "Юр. информация",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    cookies: "Политика cookies",
    rights: "Все права защищены.",
    builtBy: "Сайт от Modus Construct",
  },
  errors: {
    pageNotFoundTitle: "Страница не найдена",
    pageNotFoundLead:
      "Ссылка, по которой вы перешли, вероятно устарела. Вернитесь на главную страницу.",
    backHome: "На главную",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ro, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localizedHref(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function alternateLocales(locale: Locale): Locale[] {
  return site.locales.filter((l) => l !== locale);
}
