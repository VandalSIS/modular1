import type { Locale } from "./site";

export type Currency = "EUR";

export type ProductCategory = "carcase" | "containere" | "speciale";

export interface ProductSpec {
  /** Stable slug used for routing & analytics */
  slug: string;
  category: ProductCategory;
  /** Display name per locale */
  name: Record<Locale, string>;
  /** Optional model designation (e.g. "Model 1") */
  model?: Record<Locale, string>;
  /** Indicative price in EUR, undefined => "ofertă individuală" */
  priceFrom?: number;
  currency?: Currency;
  /** Dimensions in millimetres (Length × Width × Height) */
  dimensions?: { length: number; width: number; height: number };
  /** Available exterior colours */
  colors?: string[];
  /** Long form description per locale (markdown-light) */
  description: Record<Locale, string>;
  /** Short tagline shown on cards */
  tagline: Record<Locale, string>;
  /** Cover image path under /public */
  cover: string;
  /** Additional gallery images */
  gallery?: string[];
  /** Bullet list of features per locale */
  features: Record<Locale, string[]>;
  /** Suggested use-cases per locale */
  applications: Record<Locale, string[]>;
}

/**
 * Source of truth: CONTAINERE.numbers (extracted June 2026).
 * All prices, dimensions, materials, descriptions come straight from the spreadsheet.
 */
export const products: readonly ProductSpec[] = [
  // ───────── CARCASE ─────────
  {
    slug: "carcasa-compct",
    category: "carcase",
    name: { ro: "Carcasă COMPCT", ru: "Каркас COMPCT" },
    model: { ro: "model compact", ru: "компактная модель" },
    priceFrom: 1375,
    currency: "EUR",
    dimensions: { length: 4000, width: 3000, height: 2800 },
    colors: ["Graphite", "Negru", "Alb"],
    cover: "/projects/carcase-frame-white-01.jpg",
    gallery: ["/projects/carcase-frame-white-01.jpg", "/projects/carcase-frame-01.jpg", "/projects/carcase-frame-02.jpg"],
    tagline: {
      ro: "Schelet metalic 4×3 m — soluția compactă pentru spații rapide.",
      ru: "Металлический каркас 4×3 м — компактное решение для быстрых пространств.",
    },
    description: {
      ro: "Carcasă metalică ideală pentru construcția rapidă de spații locuibile, birouri mobile, containere de șantier sau spații comerciale temporare. Vagonul poate fi completat cu pereți, podea și geamuri, în funcție de preferințe și buget.",
      ru: "Металлический каркас, идеально подходящий для быстрого строительства жилых помещений, мобильных офисов, строительных контейнеров или временных коммерческих пространств. Конструкция может быть дополнена стенами, полом и окнами по предпочтениям и бюджету.",
    },
    features: {
      ro: [
        "Dimensiuni: 4000 × 3000 × 2800 mm",
        "Oțel galvanizat acoperit cu zinc",
        "Lățimea stâlpului: 160 mm",
        "Rezistent la rugină",
        "Configurabil cu pereți, podea, geamuri",
      ],
      ru: [
        "Размеры: 4000 × 3000 × 2800 мм",
        "Оцинкованная сталь с цинковым покрытием",
        "Ширина стойки: 160 мм",
        "Устойчивость к коррозии",
        "Настраивается стенами, полом, окнами",
      ],
    },
    applications: {
      ro: ["Containere de locuit", "Birouri de șantier", "Spații comerciale mobile", "Puncte de vânzare temporare", "Ateliere sau depozite mici"],
      ru: ["Жилые контейнеры", "Строительные офисы", "Мобильные коммерческие пространства", "Временные торговые точки", "Мастерские или малые склады"],
    },
  },
  {
    slug: "carcasa-standart",
    category: "carcase",
    name: { ro: "Carcasă Standart", ru: "Каркас Стандарт" },
    model: { ro: "model standard", ru: "стандартная модель" },
    priceFrom: 1750,
    currency: "EUR",
    dimensions: { length: 6000, width: 3000, height: 2800 },
    colors: ["Graphite", "Negru", "Alb"],
    cover: "/projects/carcase-frame-02.jpg",
    gallery: ["/projects/carcase-frame-02.jpg", "/projects/carcase-frame-white-01.jpg", "/projects/carcase-frame-01.jpg"],
    tagline: {
      ro: "Cel mai popular schelet — 6×3 m, raport optim spațiu/preț.",
      ru: "Самый популярный каркас — 6×3 м, оптимальное соотношение пространства и цены.",
    },
    description: {
      ro: "Schelet de 18 m² potrivit pentru construcția rapidă de spații locuibile, birouri mobile, containere de șantier sau spații comerciale temporare. Vagonul poate fi completat cu pereți, podea și geamuri, în funcție de preferințe și buget.",
      ru: "Каркас 18 м², подходит для быстрого строительства жилых помещений, мобильных офисов, строительных контейнеров или временных торговых пространств. Может быть дополнен стенами, полом и окнами по предпочтениям и бюджету.",
    },
    features: {
      ro: [
        "Dimensiuni: 6000 × 3000 × 2800 mm",
        "Oțel galvanizat acoperit cu zinc",
        "Lățimea stâlpului: 160 mm",
        "Rezistent la rugină",
        "Configurabil complet (pereți, podea, geamuri)",
      ],
      ru: [
        "Размеры: 6000 × 3000 × 2800 мм",
        "Оцинкованная сталь с цинковым покрытием",
        "Ширина стойки: 160 мм",
        "Устойчивость к коррозии",
        "Полная настройка (стены, пол, окна)",
      ],
    },
    applications: {
      ro: ["Containere de locuit", "Birouri de șantier", "Spații comerciale mobile", "Puncte de vânzare temporare", "Ateliere și depozite"],
      ru: ["Жилые контейнеры", "Строительные офисы", "Мобильные коммерческие пространства", "Временные торговые точки", "Мастерские и склады"],
    },
  },
  {
    slug: "carcasa-casuta",
    category: "carcase",
    name: { ro: "Carcasă tip \u201eCăsuță\u201d", ru: "Каркас типа «Домик»" },
    model: { ro: "design căsuță", ru: "дизайн домик" },
    priceFrom: 2150,
    currency: "EUR",
    dimensions: { length: 6000, width: 3000, height: 2800 },
    colors: ["Graphite", "Negru", "Alb"],
    cover: "/projects/carcase-frame-03.jpg",
    gallery: ["/projects/carcase-frame-03.jpg", "/projects/container-exterior-01.jpg"],
    tagline: {
      ro: "Acoperiș tip șarpantă — estetică reziden­țială pe un cadru robust.",
      ru: "Скатная крыша — жилой эстетический каркас.",
    },
    description: {
      ro: "Schelet 6×3 m cu acoperiș tip șarpantă, ideal pentru case de vacanță, cabane sau case modulare permanente. Estetica rezidențială întâlnește durabilitatea industrială.",
      ru: "Каркас 6×3 м со скатной крышей, идеально подходит для дачных домов, кабин или постоянных модульных домов. Жилая эстетика встречается с промышленной долговечностью.",
    },
    features: {
      ro: [
        "Dimensiuni: 6000 × 3000 × 2800 mm",
        "Acoperiș tip șarpantă (înclinație 15–22°)",
        "Oțel galvanizat acoperit cu zinc",
        "Lățimea stâlpului: 160 mm",
        "Aspect rezidențial",
      ],
      ru: [
        "Размеры: 6000 × 3000 × 2800 мм",
        "Скатная крыша (наклон 15–22°)",
        "Оцинкованная сталь с цинковым покрытием",
        "Ширина стойки: 160 мм",
        "Жилой внешний вид",
      ],
    },
    applications: {
      ro: ["Case de vacanță", "Cabane forestiere", "Glamping", "Anexe rezidențiale"],
      ru: ["Дачные дома", "Лесные кабины", "Глэмпинг", "Жилые пристройки"],
    },
  },
  {
    slug: "carcasa-caseta",
    category: "carcase",
    name: { ro: "Carcasă Mare tip \u201eCasetă\u201d", ru: "Большой каркас «Кассета»" },
    model: { ro: "format mare", ru: "большой формат" },
    priceFrom: 2250,
    currency: "EUR",
    dimensions: { length: 8000, width: 3000, height: 2800 },
    colors: ["Graphite", "Negru", "Alb"],
    cover: "/projects/carcase-frame-black-01.jpg",
    gallery: ["/projects/carcase-frame-black-01.jpg", "/projects/carcase-frame-02.jpg", "/projects/carcase-frame-03.jpg"],
    tagline: {
      ro: "24 m² — spațiu generos pentru locuit sau workspace.",
      ru: "24 м² — просторное пространство для жилья или работы.",
    },
    description: {
      ro: "Cel mai mare schelet din gama standard. 24 m² de teren utilizabil pentru locuințe modulare, atelier, studio sau punct comercial extins.",
      ru: "Самый большой каркас в стандартной линейке. 24 м² полезной площади для модульного жилья, мастерской, студии или расширенной торговой точки.",
    },
    features: {
      ro: [
        "Dimensiuni: 8000 × 3000 × 2800 mm",
        "Oțel galvanizat acoperit cu zinc",
        "Lățimea stâlpului: 160 mm",
        "Suprafață utilă 24 m²",
        "Configurabil cu compartimentare interioară",
      ],
      ru: [
        "Размеры: 8000 × 3000 × 2800 мм",
        "Оцинкованная сталь с цинковым покрытием",
        "Ширина стойки: 160 мм",
        "Полезная площадь 24 м²",
        "Настраивается с внутренним разделением",
      ],
    },
    applications: {
      ro: ["Case modulare", "Birouri mai mari", "Ateliere", "Magazine extinse", "Cazare pentru muncitori"],
      ru: ["Модульные дома", "Большие офисы", "Мастерские", "Расширенные магазины", "Жильё для рабочих"],
    },
  },
  {
    slug: "carcasa-la-comanda",
    category: "carcase",
    name: { ro: "Carcasă la comandă", ru: "Каркас под заказ" },
    cover: "/projects/product-render-01.jpg",
    tagline: {
      ro: "Dimensiuni custom, materiale și finisaje la alegerea ta.",
      ru: "Индивидуальные размеры, материалы и отделка на ваш выбор.",
    },
    description: {
      ro: "Scrie-ne dimensiunile tale și revenim cu o ofertă personalizată. Producem carcase peste 8 m, multi-modul (L-shape, U-shape) sau cu specificații tehnice speciale (zone seismice, izolație ranforsată, vânt puternic).",
      ru: "Напишите нам размеры — мы вернёмся с индивидуальным предложением. Изготавливаем каркасы свыше 8 м, мультимодульные (L-образные, U-образные) или со специальными техническими требованиями (сейсмические зоны, усиленная изоляция, сильный ветер).",
    },
    features: {
      ro: [
        "Orice dimensiune între 4 și 14 m lungime",
        "Multi-modul (L, U, T)",
        "Specificații pentru zone climatice extreme",
        "Etaj suplimentar pe cerere",
      ],
      ru: [
        "Любые размеры от 4 до 14 м длины",
        "Мультимодульные (L, U, T)",
        "Спецификации для экстремальных климатических зон",
        "Дополнительный этаж по запросу",
      ],
    },
    applications: {
      ro: ["Vile modulare", "Hub-uri turistice", "Sedii companii", "Construcții publice"],
      ru: ["Модульные виллы", "Туристические хабы", "Корпоративные офисы", "Общественные здания"],
    },
  },

  // ───────── CONTAINERE GATA FĂCUTE ─────────
  {
    slug: "container-standart-model-1",
    category: "containere",
    name: { ro: "Container Standart — Model 1", ru: "Контейнер Стандарт — Модель 1" },
    model: { ro: "Model 1", ru: "Модель 1" },
    priceFrom: 4500,
    currency: "EUR",
    dimensions: { length: 5950, width: 3000, height: 2800 },
    colors: ["Graphite", "Alb"],
    cover: "/projects/container-glass-facade-01.jpg",
    gallery: [
      "/projects/container-glass-facade-01.jpg",
      "/projects/container-crane-lift-01.jpg",
      "/projects/container-exterior-01.jpg",
      "/projects/container-interior-01.jpg",
    ],
    tagline: {
      ro: "Container la cheie cu ușă din sticlă — ideal pentru birou sau punct comercial.",
      ru: "Контейнер «под ключ» со стеклянной дверью — идеально для офиса или торговой точки.",
    },
    description: {
      ro: "Vagon modular tip container — ideal pentru birouri, șantiere sau spații comerciale temporare. Construcție robustă, panouri sandwich termoizolante, ușă exterioară cu sticlă și 2 geamuri pentru lumină exterioară.",
      ru: "Модульный вагон-контейнер — идеален для офисов, строек или временных коммерческих пространств. Прочная конструкция, теплоизоляционные сэндвич-панели, наружная стеклянная дверь и 2 окна для естественного освещения.",
    },
    features: {
      ro: [
        "Dimensiuni: 5,95 × 3 × 2,8 m",
        "Cadru din oțel vopsit electrostatic",
        "Pereți panouri sandwich termo & fonoizolante",
        "Ușă exterioară cu sticlă",
        "2 geamuri exterioare",
        "Podea izolată",
      ],
      ru: [
        "Размеры: 5,95 × 3 × 2,8 м",
        "Стальной каркас с порошковой покраской",
        "Сэндвич-панели тепло- и звукоизоляционные",
        "Стеклянная наружная дверь",
        "2 наружных окна",
        "Утеплённый пол",
      ],
    },
    applications: {
      ro: ["Birou pe șantier", "Punct de pază", "Vestiar / magazie", "Spațiu de vânzare temporar"],
      ru: ["Строительный офис", "Пункт охраны", "Раздевалка / склад", "Временная торговая точка"],
    },
  },
  {
    slug: "container-standart-model-2",
    category: "containere",
    name: { ro: "Container Standart — Model 2", ru: "Контейнер Стандарт — Модель 2" },
    model: { ro: "Model 2", ru: "Модель 2" },
    priceFrom: 4500,
    currency: "EUR",
    dimensions: { length: 5950, width: 3000, height: 2800 },
    colors: ["Graphite", "Alb"],
    cover: "/projects/container-office-grey-01.jpg",
    gallery: [
      "/projects/container-office-grey-01.jpg",
      "/projects/container-white-front-01.jpg",
      "/projects/container-interior-02.jpg",
      "/projects/container-exterior-01.jpg",
    ],
    tagline: {
      ro: "Configurație robustă cu ușă metalică — pentru șantier și pază.",
      ru: "Прочная конфигурация с металлической дверью — для стройплощадки и охраны.",
    },
    description: {
      ro: "Identic ca dimensiuni cu Modelul 1, dar cu ușă exterioară metalică plină. Soluția preferată pentru locații expuse, șantiere sau spații de depozitare unde securitatea contează.",
      ru: "Идентичный по размерам Модели 1, но с цельной металлической наружной дверью. Предпочтительное решение для открытых локаций, стройплощадок или складских помещений, где важна безопасность.",
    },
    features: {
      ro: [
        "Dimensiuni: 5,95 × 3 × 2,8 m",
        "Cadru din oțel vopsit electrostatic",
        "Pereți panouri sandwich termo & fonoizolante",
        "Ușă exterioară metalică",
        "2 geamuri exterioare",
      ],
      ru: [
        "Размеры: 5,95 × 3 × 2,8 м",
        "Стальной каркас с порошковой покраской",
        "Сэндвич-панели тепло- и звукоизоляционные",
        "Металлическая наружная дверь",
        "2 наружных окна",
      ],
    },
    applications: {
      ro: ["Birou pe șantier", "Punct de pază securizat", "Vestiar / depozit", "Spațiu comercial"],
      ru: ["Строительный офис", "Защищённый пункт охраны", "Раздевалка / склад", "Коммерческое пространство"],
    },
  },
  {
    slug: "container-standart-model-3",
    category: "containere",
    name: { ro: "Container Standart — Model 3", ru: "Контейнер Стандарт — Модель 3" },
    model: { ro: "Model 3 cu baie", ru: "Модель 3 с санузлом" },
    // TODO: confirm priceFrom for Model 3 (Excel left blank)
    dimensions: { length: 5950, width: 3000, height: 2800 },
    colors: ["Graphite", "Alb"],
    cover: "/projects/container-detail-01.jpg",
    gallery: ["/projects/container-detail-01.jpg", "/projects/container-exterior-01.jpg", "/projects/container-interior-01.jpg"],
    tagline: {
      ro: "Cu cameră separată de baie — duș, WC și lavoar inclus.",
      ru: "С отдельной ванной комнатой — душ, туалет и умывальник в комплекте.",
    },
    description: {
      ro: "Container complet echipat cu cameră separată de baie (duș, WC, lavoar). Soluție completă pentru cazare temporară sau permanentă pe șantier, fără utilități externe.",
      ru: "Контейнер с полностью оборудованной отдельной ванной комнатой (душ, туалет, умывальник). Полное решение для временного или постоянного проживания на стройке без внешних коммуникаций.",
    },
    features: {
      ro: [
        "Dimensiuni: 5,95 × 3 × 2,8 m",
        "Cameră separată cu baie (duș / WC / lavoar)",
        "Ușă exterioară metalică",
        "Panouri sandwich termo & fonoizolante",
        "2 geamuri exterioare",
      ],
      ru: [
        "Размеры: 5,95 × 3 × 2,8 м",
        "Отдельная ванная комната (душ / туалет / умывальник)",
        "Металлическая наружная дверь",
        "Тепло- и звукоизоляционные сэндвич-панели",
        "2 наружных окна",
      ],
    },
    applications: {
      ro: ["Cazare șantier", "Casă mobilă", "Punct de pază cu utilități", "Cabană de vacanță minimală"],
      ru: ["Жильё на стройке", "Мобильный дом", "Охрана с удобствами", "Минимальная дачная кабина"],
    },
  },
  {
    slug: "container-standart-model-3-mobilat",
    category: "containere",
    name: { ro: "Container Model 3 — Mobilat", ru: "Контейнер Модель 3 — Меблированный" },
    model: { ro: "Model 3 mobilat", ru: "Модель 3 меблированная" },
    priceFrom: 6300,
    currency: "EUR",
    dimensions: { length: 5950, width: 3000, height: 2800 },
    colors: ["Graphite", "Alb"],
    cover: "/projects/container-bunks-01.jpg",
    gallery: [
      "/projects/container-bunks-01.jpg",
      "/projects/container-interior-02.jpg",
      "/projects/container-interior-01.jpg",
      "/projects/container-detail-01.jpg",
    ],
    tagline: {
      ro: "La cheie pentru 4 muncitori — baie + 2 paturi etajate incluse.",
      ru: "«Под ключ» для 4 рабочих — санузел + 2 двухъярусные кровати.",
    },
    description: {
      ro: "Versiunea completă: tot ce conține Modelul 3, plus 2 paturi suprapuse (total 4 locuri de dormit). Mobilier inclus. Conectare la apă și curent — locuit imediat.",
      ru: "Полная версия: всё, что есть в Модели 3, плюс 2 двухъярусные кровати (всего 4 спальных места). Мебель включена. Подключение к воде и электричеству — можно жить сразу.",
    },
    features: {
      ro: [
        "Toate caracteristicile Modelului 3",
        "2 paturi etajate (4 locuri de dormit)",
        "Cameră separată cu baie (duș / WC / lavoar)",
        "Mobilier de bază inclus",
        "Gata de utilizare la livrare",
      ],
      ru: [
        "Все характеристики Модели 3",
        "2 двухъярусные кровати (4 спальных места)",
        "Отдельная ванная (душ / туалет / умывальник)",
        "Базовая мебель в комплекте",
        "Готов к использованию при доставке",
      ],
    },
    applications: {
      ro: ["Cazare 4 muncitori", "Cabană de vacanță echipată", "Punct de pază cu dormit", "Modul turistic"],
      ru: ["Жильё для 4 рабочих", "Оборудованная дачная кабина", "Охрана с ночлегом", "Туристический модуль"],
    },
  },

  // ───────── SPECIALE ─────────
  {
    slug: "chiosc-magazin",
    category: "speciale",
    name: { ro: "Chioșc / Magazin", ru: "Киоск / Магазин" },
    cover: "/projects/product-render-01.jpg",
    tagline: {
      ro: "Punct comercial mobil, configurat după nevoile tale.",
      ru: "Мобильная торговая точка, настроенная под ваши нужды.",
    },
    description: {
      ro: "Oferta se calculează individual. Tu descrii spațiul comercial dorit — vitrină, ușă, panouri, podea, acoperiș, culoarea carcasei — iar noi îți construim chioșcul perfect. Soluție mobilă pentru piețe, festivaluri, parcuri sau retail urban.",
      ru: "Цена рассчитывается индивидуально. Вы описываете желаемое торговое пространство — витрина, дверь, панели, пол, крыша, цвет каркаса — а мы строим идеальный киоск. Мобильное решение для рынков, фестивалей, парков или городского ритейла.",
    },
    features: {
      ro: ["Geamuri și ușă personalizate", "Panouri sandwich exterioare", "Podea izolată", "Acoperiș cu opțiuni", "Coloare carcasă la alegere"],
      ru: ["Окна и дверь по индивидуальному заказу", "Внешние сэндвич-панели", "Утеплённый пол", "Опции крыши", "Цвет каркаса на выбор"],
    },
    applications: {
      ro: ["Cafenea mobilă", "Florărie de stradă", "Patiserie", "Tutungerie", "Pop-up retail"],
      ru: ["Мобильное кафе", "Уличный цветочный", "Кондитерская", "Табачный киоск", "Pop-up ритейл"],
    },
  },
  {
    slug: "punct-sanitar",
    category: "speciale",
    name: { ro: "Punct sanitar / WC", ru: "Санитарный пункт / WC" },
    cover: "/projects/wc-women-cabins.jpg",
    gallery: [
      "/projects/wc-women-cabins.jpg",
      "/projects/wc-men-interior.jpg",
      "/projects/wc-men-interior-02.jpg",
      "/projects/wc-accessible.jpg",
    ],
    tagline: {
      ro: "Toalete publice modulare — pentru evenimente, parcuri, șantiere.",
      ru: "Модульные общественные туалеты — для мероприятий, парков, стройплощадок.",
    },
    description: {
      ro: "Oferta se calculează individual în funcție de numărul de cabine, racordare la apă/canalizare, finisaje. Construim puncte sanitare modulare cu 1–8 cabine, cu sau fără rampă de acces persoane cu dizabilități.",
      ru: "Цена рассчитывается индивидуально в зависимости от количества кабин, подключения к воде/канализации, отделки. Строим модульные санитарные пункты на 1–8 кабин, с пандусом для людей с ограниченными возможностями или без него.",
    },
    features: {
      ro: ["1–8 cabine modulare", "Racord apă/canalizare", "Ventilație activă", "Finisaje rezistente", "Variantă cu rampă de acces"],
      ru: ["1–8 модульных кабин", "Подключение воды/канализации", "Активная вентиляция", "Прочная отделка", "Версия с пандусом"],
    },
    applications: {
      ro: ["Festivaluri", "Parcuri publice", "Șantiere mari", "Plaje", "Camping"],
      ru: ["Фестивали", "Общественные парки", "Большие стройки", "Пляжи", "Кемпинги"],
    },
  },
  {
    slug: "punct-paza",
    category: "speciale",
    name: { ro: "Punct de pază", ru: "Пост охраны" },
    cover: "/projects/container-site-01.jpg",
    tagline: {
      ro: "Cabine de pază 2×2 m până la 3×3 m — pentru orice perimetru.",
      ru: "Будки охраны 2×2 м до 3×3 м — для любого периметра.",
    },
    description: {
      ro: "Oferta se calculează individual. Construim puncte de pază compacte pentru intrări de complex, parcări, depozite. Vizibilitate panoramică, izolație, sistem electric pregătit.",
      ru: "Цена рассчитывается индивидуально. Строим компактные посты охраны для въездов в комплексы, парковок, складов. Панорамный обзор, изоляция, готовая электросистема.",
    },
    features: {
      ro: ["Geamuri panoramice", "Spațiu pentru monitor / centrală alarme", "Izolație termică completă", "Iluminat LED", "Aspect arhitectural agreabil"],
      ru: ["Панорамные окна", "Место для монитора / центра тревоги", "Полная теплоизоляция", "LED освещение", "Приятный архитектурный вид"],
    },
    applications: {
      ro: ["Intrări complexe rezidențiale", "Parcări corporate", "Depozite", "Posturi de control rutier"],
      ru: ["Въезды в жилые комплексы", "Корпоративные парковки", "Склады", "Дорожные посты контроля"],
    },
  },
];

export function getProduct(slug: string): ProductSpec | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: ProductCategory): ProductSpec[] {
  return products.filter((p) => p.category === category);
}
