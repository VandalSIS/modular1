import type { Locale } from "./site";

export type ProjectType = "carcasa" | "container" | "magazin" | "casa" | "cabana" | "birou" | "sanitar" | "paza";

export interface PortfolioProject {
  slug: string;
  type: ProjectType;
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  area: number; // m²
  duration: Record<Locale, string>; // e.g. "21 zile"
  year: number;
  cover: string;
  gallery: string[];
  description: Record<Locale, string>;
  finishes: Record<Locale, string[]>;
}

/**
 * Featured portfolio entries. Mix of real photos from CONTAINERE.numbers
 * and TODO placeholders to be replaced when client supplies more imagery.
 */
export const portfolio: readonly PortfolioProject[] = [
  {
    slug: "carcasa-residential-balti",
    type: "carcasa",
    title: { ro: "Carcasă rezidențială — Bălți", ru: "Жилой каркас — Бельцы" },
    location: { ro: "Bălți, Republica Moldova", ru: "Бельцы, Молдова" },
    area: 18,
    duration: { ro: "12 zile", ru: "12 дней" },
    year: 2025,
    cover: "/projects/carcase-frame-white-01.jpg",
    gallery: ["/projects/carcase-frame-white-01.jpg", "/projects/carcase-frame-01.jpg", "/projects/carcase-frame-02.jpg"],
    description: {
      ro: "Schelet metalic 6×3 m livrat și asamblat pe teren privat. Clientul a închis singur structura cu panouri sandwich și a creat o casă de vacanță minimalistă.",
      ru: "Металлический каркас 6×3 м, доставлен и собран на частном участке. Клиент сам закрыл конструкцию сэндвич-панелями и создал минималистичный дачный дом.",
    },
    finishes: {
      ro: ["Oțel galvanizat", "Vopsea electrostatică grafit", "Pregătit pentru sandwich panel"],
      ru: ["Оцинкованная сталь", "Порошковая покраска графит", "Готов под сэндвич-панели"],
    },
  },
  {
    slug: "container-birou-santier-chisinau",
    type: "birou",
    title: { ro: "Birou de șantier — Centru Chișinău", ru: "Строительный офис — Центр Кишинёва" },
    location: { ro: "Chișinău, sect. Centru", ru: "Кишинёв, центр" },
    area: 18,
    duration: { ro: "7 zile", ru: "7 дней" },
    year: 2025,
    cover: "/projects/container-glass-facade-01.jpg",
    gallery: [
      "/projects/container-glass-facade-01.jpg",
      "/projects/container-crane-lift-01.jpg",
      "/projects/container-exterior-01.jpg",
      "/projects/container-interior-01.jpg",
    ],
    description: {
      ro: "Birou modular livrat la cheie pentru un dezvoltator rezidențial. Ușă cu sticlă, 2 geamuri, panouri sandwich, podea izolată — gata de mutat în 7 zile.",
      ru: "Модульный офис «под ключ» для жилого застройщика. Стеклянная дверь, 2 окна, сэндвич-панели, утеплённый пол — готов к заселению за 7 дней.",
    },
    finishes: {
      ro: ["Sandwich panel 80 mm", "Ușă glisantă cu sticlă", "Pardoseală PVC"],
      ru: ["Сэндвич-панель 80 мм", "Раздвижная стеклянная дверь", "ПВХ пол"],
    },
  },
  {
    slug: "container-cazare-orhei",
    type: "container",
    title: { ro: "Cazare 4 muncitori — Orhei", ru: "Жильё для 4 рабочих — Орхей" },
    location: { ro: "Orhei, raionul Orhei", ru: "Орхей, Орхейский район" },
    area: 18,
    duration: { ro: "10 zile", ru: "10 дней" },
    year: 2025,
    cover: "/projects/container-bunks-01.jpg",
    gallery: [
      "/projects/container-bunks-01.jpg",
      "/projects/container-interior-02.jpg",
      "/projects/container-interior-01.jpg",
      "/projects/container-white-front-01.jpg",
    ],
    description: {
      ro: "Container mobilat tip Model 3, cu 2 paturi etajate (4 locuri de dormit), baie separată (duș, WC, lavoar) și încălzire electrică. Soluție completă pentru o echipă de constructori.",
      ru: "Меблированный контейнер Модель 3, с 2 двухъярусными кроватями (4 места), отдельной ванной (душ, туалет, умывальник) и электрическим отоплением. Полное решение для строительной бригады.",
    },
    finishes: {
      ro: ["Sandwich panel 100 mm", "Mobilier MDF", "Baie cu plăci ceramice"],
      ru: ["Сэндвич-панель 100 мм", "Мебель МДФ", "Ванная с керамической плиткой"],
    },
  },
  {
    slug: "carcasa-mare-cabana-codru",
    type: "cabana",
    title: { ro: "Cabană tip \u201eCaseta\u201d \u2014 Codru", ru: "Кабина типа «Кассета» — Кодру" },
    location: { ro: "Codru, Chișinău", ru: "Кодру, Кишинёв" },
    area: 24,
    duration: { ro: "18 zile", ru: "18 дней" },
    year: 2025,
    cover: "/projects/carcase-frame-black-01.jpg",
    gallery: ["/projects/carcase-frame-black-01.jpg", "/projects/container-site-01.jpg", "/projects/carcase-frame-02.jpg"],
    description: {
      ro: "Carcasă mare 8×3 m amplasată pe o pădure privată. Clientul a continuat singur închiderea, izolarea și instalarea geamurilor mari panoramice spre pădure.",
      ru: "Большой каркас 8×3 м, размещённый в частном лесу. Клиент сам завершил закрытие, утепление и установку больших панорамных окон в сторону леса.",
    },
    finishes: {
      ro: ["Cadru oțel galvanizat", "Vopsea grafit", "Pregătit pentru îmbrăcăminte lemn"],
      ru: ["Каркас оцинкованная сталь", "Графитовая краска", "Подготовлен под деревянную обшивку"],
    },
  },
  {
    slug: "chiosc-cafenea-centru",
    type: "magazin",
    title: { ro: "Chioșc cafenea — bd. Ștefan cel Mare", ru: "Киоск кафе — бул. Штефан чел Маре" },
    location: { ro: "Chișinău, sect. Centru", ru: "Кишинёв, центр" },
    area: 12,
    duration: { ro: "21 zile", ru: "21 день" },
    year: 2025,
    cover: "/projects/container-glass-facade-01.jpg",
    gallery: ["/projects/container-glass-facade-01.jpg", "/projects/product-render-01.jpg", "/projects/container-exterior-01.jpg"],
    description: {
      ro: "Chioșc comercial 4×3 m cu vitrină frontală mare, ușă glisantă, podea PVC industrial. Punct de servire cafea pentru o cafenea boutique din centru.",
      ru: "Коммерческий киоск 4×3 м с большой фронтальной витриной, раздвижной дверью, промышленным ПВХ полом. Точка обслуживания кофе для бутик-кафе в центре.",
    },
    finishes: {
      ro: ["Vitrină panoramică", "Ușă glisantă alu-sticlă", "Tejghea blat solid"],
      ru: ["Панорамная витрина", "Раздвижная дверь алю-стекло", "Стойка из массива"],
    },
  },
  {
    slug: "container-magazie-cricova",
    type: "container",
    title: { ro: "Magazie sigură — Cricova", ru: "Защищённый склад — Криково" },
    location: { ro: "Cricova, mun. Chișinău", ru: "Криково, Кишинёв" },
    area: 18,
    duration: { ro: "5 zile", ru: "5 дней" },
    year: 2025,
    cover: "/projects/container-office-grey-01.jpg",
    gallery: ["/projects/container-office-grey-01.jpg", "/projects/container-white-front-01.jpg", "/projects/carcase-frame-03.jpg"],
    description: {
      ro: "Container 6×3 m cu ușă metalică plină, fără geamuri, lacăt european. Magazie pentru utilaje de viticultură.",
      ru: "Контейнер 6×3 м со сплошной металлической дверью, без окон, евро-замком. Склад для виноградарского оборудования.",
    },
    finishes: {
      ro: ["Ușă oțel 3 mm", "Sandwich panel 60 mm", "Pardoseală beton"],
      ru: ["Стальная дверь 3 мм", "Сэндвич-панель 60 мм", "Бетонный пол"],
    },
  },
  // TODO: replace placeholder entries with new client photos once delivered.
  {
    slug: "container-villa-vatra",
    type: "casa",
    title: { ro: "Vilă modulară pe 2 module — Vatra", ru: "Модульная вилла на 2 модуля — Ватра" },
    location: { ro: "Vatra, mun. Chișinău", ru: "Ватра, Кишинёв" },
    area: 48,
    duration: { ro: "35 zile", ru: "35 дней" },
    year: 2024,
    cover: "/projects/container-white-front-01.jpg",
    gallery: ["/projects/container-white-front-01.jpg", "/projects/container-interior-01.jpg", "/projects/container-interior-02.jpg"],
    description: {
      ro: "Două module 8×3 m alăturate, conectate printr-un coridor central. Living, bucătărie, dormitor, baie. Locuință permanentă pentru o familie tânără.",
      ru: "Два модуля 8×3 м, соединённые центральным коридором. Гостиная, кухня, спальня, ванная. Постоянное жильё для молодой семьи.",
    },
    finishes: {
      ro: ["Sandwich 100 mm", "Pardoseală laminat", "Bucătărie integrată"],
      ru: ["Сэндвич 100 мм", "Ламинированный пол", "Встроенная кухня"],
    },
  },
  {
    slug: "punct-sanitar-parc-ialoveni",
    type: "sanitar",
    title: { ro: "Punct sanitar public \u2014 parc Ialoveni", ru: "Санитарный пункт \u2014 парк Яловень" },
    location: { ro: "Ialoveni, raionul Ialoveni", ru: "Яловень, Яловенский район" },
    area: 12,
    duration: { ro: "14 zile", ru: "14 дней" },
    year: 2025,
    cover: "/projects/wc-women-cabins.jpg",
    gallery: [
      "/projects/wc-women-cabins.jpg",
      "/projects/wc-men-interior.jpg",
      "/projects/wc-men-interior-02.jpg",
      "/projects/wc-accessible.jpg",
    ],
    description: {
      ro: "Toaletă publică modulară cu 3 departamente \u2014 femei, bărbați, persoane cu dizabilități. 4 cabine + pisoare, lavoare cu apă curentă, ventilație și iluminare LED. Finisaje rezistente, ușoare la întreținere.",
      ru: "Модульный общественный туалет с 3 отделениями \u2014 женское, мужское, для людей с ограниченными возможностями. 4 кабины + писсуары, умывальники с проточной водой, вентиляция и LED-освещение. Прочная отделка, простая в обслуживании.",
    },
    finishes: {
      ro: ["Panouri PVC vertical", "Pardoseală laminat hidrofug", "Sanitară completă"],
      ru: ["Вертикальные ПВХ панели", "Влагостойкий ламинат", "Полная сантехника"],
    },
  },
  {
    slug: "post-paza-perimetru-singera",
    type: "paza",
    title: { ro: "Post pază 2×2 m \u2014 Sîngera", ru: "Пост охраны 2×2 м \u2014 Сынджера" },
    location: { ro: "Sîngera, mun. Chișinău", ru: "Сынджера, Кишинёв" },
    area: 4,
    duration: { ro: "5 zile", ru: "5 дней" },
    year: 2025,
    cover: "/projects/container-guard-01.jpg",
    gallery: ["/projects/container-guard-01.jpg", "/projects/container-exterior-01.jpg"],
    description: {
      ro: "Cabină de pază compactă 2×2 m cu geam panoramic, ușă cu sticlă termopan și panouri sandwich. Soluție rapidă pentru perimetrul unei unități logistice.",
      ru: "Компактная будка охраны 2×2 м с панорамным окном, стеклянной дверью и сэндвич-панелями. Быстрое решение для периметра логистического объекта.",
    },
    finishes: {
      ro: ["Sandwich panel 60 mm", "Geam termopan", "Cadru oțel grafit"],
      ru: ["Сэндвич-панель 60 мм", "Стеклопакет", "Графитовый стальной каркас"],
    },
  },
  {
    slug: "livrare-modul-macara-rascani",
    type: "container",
    title: { ro: "Livrare modul cu macara \u2014 Rîșcani", ru: "Доставка модуля краном \u2014 Рышканы" },
    location: { ro: "Chișinău, sect. Rîșcani", ru: "Кишинёв, Рышкановка" },
    area: 18,
    duration: { ro: "1 zi (instalare)", ru: "1 день (монтаж)" },
    year: 2025,
    cover: "/projects/container-crane-lift-01.jpg",
    gallery: ["/projects/container-crane-lift-01.jpg", "/projects/container-glass-facade-01.jpg", "/projects/container-exterior-01.jpg"],
    description: {
      ro: "Modul birou 6×3 m cu vitrină panoramică, livrat și amplasat cu macara hidraulică între blocuri rezidențiale. Instalare completă în 6 ore.",
      ru: "Офисный модуль 6×3 м с панорамной витриной, доставлен и установлен гидравлическим краном между жилыми домами. Полная установка за 6 часов.",
    },
    finishes: {
      ro: ["Vitrină 5 panouri", "Cadru oțel grafit", "Transport + macara incluse"],
      ru: ["Витрина 5 секций", "Графитовый стальной каркас", "Транспорт + кран включены"],
    },
  },
];

export const projectTypes: { slug: ProjectType; label: Record<Locale, string> }[] = [
  { slug: "carcasa", label: { ro: "Carcase", ru: "Каркасы" } },
  { slug: "container", label: { ro: "Containere", ru: "Контейнеры" } },
  { slug: "casa", label: { ro: "Case", ru: "Дома" } },
  { slug: "cabana", label: { ro: "Cabane", ru: "Кабины" } },
  { slug: "birou", label: { ro: "Birouri", ru: "Офисы" } },
  { slug: "magazin", label: { ro: "Magazine / Chioșcuri", ru: "Магазины / Киоски" } },
  { slug: "sanitar", label: { ro: "Sanitare / WC", ru: "Санитарные / WC" } },
  { slug: "paza", label: { ro: "Pază", ru: "Охрана" } },
];

export function getProject(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug);
}
