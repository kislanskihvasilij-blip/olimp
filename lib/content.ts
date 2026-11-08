/**
 * Контент сайта ДОК «Олимпиец» (Анапа).
 *
 * Факты из профиля @olimpiec_anapa: более 5 га территории, 300 м до моря
 * и собственного пляжа, спортгородок с двумя стадионами, 5-разовое питание,
 * ежегодные «Олимпийские игры».
 *
 * ВНИМАНИЕ: телефон, e-mail, цены, даты смен и отзывы — демонстрационные.
 * Перед запуском замените их реальными данными комплекса.
 */

/** Фото из Instagram @olimpiec_anapa, сжатые до 1080 px, лежат в public/photos. */
const photo = (name: string): string => `/photos/${name}.jpg`;

/** Все фотографии сайта в одном месте: чтобы заменить снимок, положите файл в public/photos. */
export const PHOTOS = {
  beachRun: photo("beach-run"),
  girlSea: photo("girl-sea"),
  beachPlay: photo("beach-play"),
  territory: photo("territory"),
  eveningSquare: photo("evening-square"),
  friendship: photo("friendship"),
  football: photo("football"),
  olympicGames: photo("olympic-games"),
  stadium: photo("stadium"),
  beachWarmup: photo("beach-warmup"),
  dance: photo("dance"),
  cheer: photo("cheer"),
  group: photo("group"),
  fireShow: photo("fire-show"),
  education: photo("education"),
  vocal: photo("vocal"),
  stageShow: photo("stage-show"),
} as const;

/** Фон hero для WebGL-ряби (локальный файл — без CORS-ограничений). */
export const HERO_PHOTO = PHOTOS.beachRun;

export const SITE = {
  name: "Олимпиец",
  short: "ДОК «Олимпиец»",
  fullName: "Детский оздоровительный комплекс «Олимпиец»",
  city: "Анапа",
  phone: "+7 (900) 000-00-00",
  phoneHref: "tel:+79000000000",
  email: "info@dk-olimpiec.ru",
  address: "Анапа, Краснодарский край",
  hours: "пн–пт, 8:00–17:00",
  directorHours: "вт, чт — 9:00–11:00",
  instagram: "https://www.instagram.com/olimpiec_anapa/",
  mapUrl: `https://yandex.ru/maps/?text=${encodeURIComponent("детский лагерь Олимпиец Анапа")}`,
} as const;

export type NavItem = { href: `#${string}`; label: string };

export const NAV: NavItem[] = [
  { href: "#kanikuly", label: "Каникулы" },
  { href: "#o-komplekse", label: "О комплексе" },
  { href: "#putevki", label: "Путёвки" },
  { href: "#sport", label: "Спорт" },
  { href: "#znaniya", label: "Знания" },
  { href: "#partneram", label: "Партнёрам" },
  { href: "#otzyvy", label: "Отзывы" },
  { href: "#voprosy", label: "Вопросы" },
  { href: "#kontakty", label: "Контакты" },
];

export type Shift = { title: string; dates: string; tag: string; photo: string };

export const SHIFTS: Shift[] = [
  { title: "Олимпийский старт", dates: "01.06 — 21.06", tag: "лето", photo: PHOTOS.football },
  { title: "Морской бриз", dates: "24.06 — 14.07", tag: "лето", photo: PHOTOS.beachRun },
  { title: "Звёздный экспресс", dates: "17.07 — 06.08", tag: "лето", photo: PHOTOS.stageShow },
  { title: "Чемпионы лета", dates: "09.08 — 29.08", tag: "лето", photo: PHOTOS.olympicGames },
  { title: "Золотая осень", dates: "26.10 — 04.11", tag: "осень", photo: PHOTOS.territory },
  { title: "Новогодняя сказка", dates: "28.12 — 08.01", tag: "зима", photo: PHOTOS.eveningSquare },
  { title: "Весенний разгон", dates: "23.03 — 01.04", tag: "весна", photo: PHOTOS.friendship },
];

export const SHIFT_TITLES: readonly string[] = SHIFTS.map((shift) => shift.title);

export type Season = {
  key: string;
  label: string;
  title: string;
  months: string;
  text: string;
  photo: string;
  alt: string;
};

export const SEASONS: Season[] = [
  {
    key: "summer",
    label: "Лето",
    title: "Летние каникулы",
    months: "июнь — август",
    text: "Самое жаркое время для приключений: море в 300 метрах, спорт, вечерние костры и смены, после которых ребёнок возвращается окрепшим.",
    photo: PHOTOS.beachPlay,
    alt: "Девочки в жёлтых кепках играют в песке на пляже",
  },
  {
    key: "autumn",
    label: "Осень",
    title: "Осенние каникулы",
    months: "конец октября",
    text: "Тёплые встречи и новые открытия: программы для творческого и интеллектуального роста, чтобы вернуться к учёбе с новыми силами.",
    photo: PHOTOS.territory,
    alt: "Тенистая аллея на территории «Олимпийца»",
  },
  {
    key: "winter",
    label: "Зима",
    title: "Новогодние каникулы",
    months: "28 декабря — 8 января",
    text: "Утренники, встреча с Дедом Морозом, ёлка и сюрпризы каждый день — время чудес и настоящей сказки для каждого ребёнка.",
    photo: PHOTOS.eveningSquare,
    alt: "Вечерний праздник на площади лагеря",
  },
  {
    key: "spring",
    label: "Весна",
    title: "Весенние каникулы",
    months: "конец марта",
    text: "Свежий воздух, просыпающаяся природа и яркая программа — лучший момент, чтобы перезагрузиться и набраться здоровья.",
    photo: PHOTOS.friendship,
    alt: "Девочка с плакатом «Дружба важнее всего» среди деревьев",
  },
];

/** Если задан text — показывается он, иначе value со счётчиком. */
export type Stat = { value: number; text?: string; prefix?: string; suffix?: string; label: string };

export const ABOUT_STATS: Stat[] = [
  { value: 5, prefix: ">", label: "гектаров детского счастья" },
  { value: 300, label: "метров до моря и своего пляжа" },
  { value: 5, label: "приёмов пищи в день" },
  { value: 17, text: "7–17", label: "лет — возраст участников" },
];

export type AdvantageId = "team" | "approach" | "infra" | "daily";

export const ADVANTAGES: { id: AdvantageId; label: string; title: string; text: string }[] = [
  {
    id: "team",
    label: "Команда",
    title: "Профессионалы, которые любят детей",
    text: "Вожатые, тренеры и медики с опытом работы с детьми. Регулярно учимся новым методикам развития и безопасности.",
  },
  {
    id: "approach",
    label: "Подход",
    title: "Индивидуальный маршрут",
    text: "Замечаем таланты каждого ребёнка и помогаем раскрыть их — через кружки, спорт и сцену.",
  },
  {
    id: "infra",
    label: "Инфраструктура",
    title: "Всё рядом и под присмотром",
    text: "Собственный пляж, спортгородок, медпункт и столовая с пятиразовым питанием — на одной зелёной территории.",
  },
  {
    id: "daily",
    label: "Каждый день",
    title: "Праздник по расписанию",
    text: "Концерты, спектакли, дискотеки и турниры — каждый день смены наполнен событиями.",
  },
];

export type Program = {
  index: string;
  title: string;
  text: string;
  price: string;
  duration: string;
  photo: string;
  alt: string;
};

export const PROGRAMS: Program[] = [
  {
    index: "01",
    title: "Оздоровительные смены",
    text: "Море, солнце, режим и медицинское сопровождение — программа, после которой ребёнок возвращается окрепшим.",
    price: "от 48 900 ₽",
    duration: "21 день",
    photo: PHOTOS.cheer,
    alt: "Ребята в кепках радуются на пляже",
  },
  {
    index: "02",
    title: "Лагерные смены",
    text: "Вожатые, отрядные дела, спорт, дискотеки и общелагерные события — классическая смена, о которой рассказывают весь год.",
    price: "от 39 900 ₽",
    duration: "21 день",
    photo: PHOTOS.group,
    alt: "Отряд «Олимпийца» на общей фотографии",
  },
  {
    index: "03",
    title: "Организованные группы",
    text: "Спортивные сборы, тематические выезды и школьные поездки: подстроим программу, питание и расписание под ваш запрос.",
    price: "по запросу",
    duration: "от 5 дней",
    photo: PHOTOS.stadium,
    alt: "Стадион спортгородка «Олимпийца»",
  },
  {
    index: "04",
    title: "Каникулы межсезонья",
    text: "Короткие смены на осенние, зимние и весенние каникулы — отдых и праздники без потери учебного ритма.",
    price: "от 24 900 ₽",
    duration: "10 дней",
    photo: PHOTOS.fireShow,
    alt: "Вечернее огненное шоу на открытии игр",
  },
];

export const SPORTS: { title: string; note: string; photo: string; alt: string }[] = [
  { title: "Море", note: "плавание с инструктором", photo: PHOTOS.beachRun, alt: "Ребята бегут по пляжу к морю" },
  { title: "Олимпийские игры", note: "каждый год", photo: PHOTOS.olympicGames, alt: "Мальчик на церемонии Олимпийских игр лагеря" },
  { title: "Футбол", note: "турнир отрядов", photo: PHOTOS.football, alt: "Футбольная тренировка на поле спортгородка" },
  { title: "Спортгородок", note: "два стадиона", photo: PHOTOS.stadium, alt: "Стадион спортгородка «Олимпийца»" },
  { title: "Зарядка у моря", note: "каждое утро", photo: PHOTOS.beachWarmup, alt: "Массовая зарядка на пляже" },
  { title: "Танцы", note: "флешмобы и батлы", photo: PHOTOS.dance, alt: "Девочки танцуют на площадке" },
];

export const SPORT_WORDS = ["плавание", "футбол", "олимпийские игры", "эстафеты", "волейбол", "зарядка", "танцы"];

export const CLUBS = ["робототехника", "шахматы", "театр", "вокал", "рисование", "английский", "журналистика", "экология", "хореография"];

export const KNOWLEDGE: { title: string; text: string; photo: string; alt: string }[] = [
  {
    title: "Учёба без скуки",
    text: "Занятия в течение смены: школьные предметы, языки и основы перспективных профессий в формате игры.",
    photo: PHOTOS.education,
    alt: "Ребята с плакатами «Мы победим» на мероприятии",
  },
  {
    title: "Вокал и творчество",
    text: "Вокал, танцы, рисование и рукоделие — студии, где каждый находит свой голос, а домой едут собственные работы.",
    photo: PHOTOS.vocal,
    alt: "Вожатая поёт в микрофон на празднике",
  },
  {
    title: "Сцена «Олимпийца»",
    text: "Театральная студия, вокал и хореография. Каждая смена заканчивается большим концертом.",
    photo: PHOTOS.stageShow,
    alt: "Ребята в костюмах на вечернем представлении",
  },
];

export const PARTNER_OFFERS: { index: string; title: string; text: string }[] = [
  {
    index: "01",
    title: "Тематические выезды и спортивные сборы",
    text: "Проведите сборы, соревнования или собственную программу на нашей базе: площадки, проживание, питание и сопровождение возьмём на себя.",
  },
  {
    index: "02",
    title: "Долгосрочные договоры с организациями",
    text: "Организуйте отдых детей сотрудников: тематические смены, фестивали и программы под ваши задачи с понятной отчётностью.",
  },
];

/** ПРИМЕРЫ отзывов для вёрстки — замените реальными отзывами родителей перед запуском. */
export const REVIEWS: { quote: string; name: string; meta: string }[] = [
  {
    quote: "Сын вернулся загорелый, окрепший и с кучей друзей. Уже спрашивает, когда снова в «Олимпиец».",
    name: "Анна",
    meta: "мама Миши, 10 лет",
  },
  {
    quote: "Медики всегда на связи, а вожатые каждый день присылают фото. Спокойно и за ребёнка, и за его здоровье.",
    name: "Ольга",
    meta: "мама Вари, 8 лет",
  },
  {
    quote: "Приезжали командой на сборы: площадки в отличном состоянии, кормят пять раз в день, тренерам всё понравилось.",
    name: "Игорь",
    meta: "тренер спортивной школы",
  },
  {
    quote: "Дочь впервые вышла на сцену и спела на закрытии смены. Плакали все — и мы, и вожатые.",
    name: "Марина",
    meta: "мама Сони, 12 лет",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Сколько стоит путёвка и что в неё входит?",
    a: "Стоимость зависит от смены и программы. В путёвку входят проживание, пятиразовое питание, программа мероприятий, страховка и медицинское сопровождение.",
  },
  {
    q: "Можно ли навещать ребёнка во время смены?",
    a: "Да, в родительские дни по графику смены. Каждый день вожатые публикуют фото и новости в закрытом чате отряда.",
  },
  {
    q: "Какой возраст детей вы принимаете?",
    a: "Детей от 7 до 17 лет. Отряды собираем по возрасту, чтобы каждому было интересно в своей компании.",
  },
  {
    q: "Какие документы нужны для заезда?",
    a: "Путёвка, копия свидетельства о рождении или паспорта, полис ОМС, медицинская справка по форме 079/у и справка об эпидокружении.",
  },
  {
    q: "Как ребёнок доберётся до комплекса?",
    a: "Организуем групповой трансфер с вожатыми. Можно привезти ребёнка самостоятельно в день заезда.",
  },
];

export const CHILD_AGES: readonly string[] = Array.from({ length: 11 }, (_, i) => String(i + 7));
