/**
 * Контент сайта ДК «Олимпиец» (Анапа).
 *
 * Факты из профиля @olimpiec_anapa: более 5 га территории, 300 м до моря
 * и собственного пляжа, спортгородок, 5-разовое питание.
 *
 * ВНИМАНИЕ: телефон, e-mail, цены, даты смен и отзывы — демонстрационные.
 * Перед запуском замените их реальными данными комплекса.
 */

/** Фото Unsplash с базовой обрезкой; ресайз под экран делает next/image. */
const unsplash = (id: string, width = 2400): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const HERO_PHOTO_ID = "1473116763249-2faaef81ccda";
const HERO_TEXTURE_WIDTH = 1600;

/**
 * Все фотографии сайта в одном месте.
 * Чтобы поставить реальные фото «Олимпийца», положите файлы в public/photos
 * и замените значение, например: heroSea: "/photos/beach.jpg".
 */
export const PHOTOS = {
  heroSea: unsplash(HERO_PHOTO_ID),
  kidField: unsplash("1489710437720-ebb67ec84dd2"),
  girlSea: unsplash("1471286174890-9c112ffca5b4"),
  forest: unsplash("1441974231531-c6227db76b6e"),
  lights: unsplash("1492684223066-81342ee5ff30"),
  park: unsplash("1519331379826-f10be5486c6f"),
  swimmer: unsplash("1530549387789-4c1017266635"),
  runner: unsplash("1461896836934-ffe607ba8211"),
  football: unsplash("1574629810360-7efbbe195018"),
  basketball: unsplash("1546519638-68e109498ffc"),
  tennis: unsplash("1622279457486-62dcc4a431d6"),
  climbing: unsplash("1522163182402-834f871fd851"),
  doctor: unsplash("1576091160399-112ba8d25d1d"),
  friends: unsplash("1529156069898-49953e39b3ac"),
  campfire: unsplash("1475483768296-6163e08872a1"),
  classroom: unsplash("1509062522246-3755977927d7"),
  drawing: unsplash("1516627145497-ae6968895b74"),
  stage: unsplash("1503095396549-807759245b35"),
  concert: unsplash("1514525253161-7a46d19cd819"),
} as const;

/**
 * Фон hero для WebGL-ряби. Текстура 1600px: под рябью детали не видны, а мобильным легче.
 * Своё фото — укажите путь, например "/photos/hero.jpg" (внешний URL должен отдаваться с CORS).
 */
export const HERO_PHOTO = unsplash(HERO_PHOTO_ID, HERO_TEXTURE_WIDTH);

export const SITE = {
  name: "Олимпиец",
  short: "ДК «Олимпиец»",
  fullName: "Детский оздоровительный комплекс «Олимпиец»",
  city: "Анапа",
  season: "Сезон 2027",
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
  { title: "Морской бриз", dates: "24.06 — 14.07", tag: "лето", photo: PHOTOS.swimmer },
  { title: "Звёздный экспресс", dates: "17.07 — 06.08", tag: "лето", photo: PHOTOS.concert },
  { title: "Чемпионы лета", dates: "09.08 — 29.08", tag: "лето", photo: PHOTOS.runner },
  { title: "Золотая осень", dates: "26.10 — 04.11", tag: "осень", photo: PHOTOS.forest },
  { title: "Новогодняя сказка", dates: "28.12 — 08.01", tag: "зима", photo: PHOTOS.lights },
  { title: "Весенний разгон", dates: "23.03 — 01.04", tag: "весна", photo: PHOTOS.park },
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
    photo: PHOTOS.girlSea,
    alt: "Девочка в спортивной футболке на берегу моря",
  },
  {
    key: "autumn",
    label: "Осень",
    title: "Осенние каникулы",
    months: "конец октября",
    text: "Тёплые встречи и новые открытия: программы для творческого и интеллектуального роста, чтобы вернуться к учёбе с новыми силами.",
    photo: PHOTOS.forest,
    alt: "Солнечный осенний лес",
  },
  {
    key: "winter",
    label: "Зима",
    title: "Новогодние каникулы",
    months: "28 декабря — 8 января",
    text: "Утренники, встреча с Дедом Морозом, ёлка и сюрпризы каждый день — время чудес и настоящей сказки для каждого ребёнка.",
    photo: PHOTOS.lights,
    alt: "Праздничные огни и искры",
  },
  {
    key: "spring",
    label: "Весна",
    title: "Весенние каникулы",
    months: "конец марта",
    text: "Свежий воздух, просыпающаяся природа и яркая программа — лучший момент, чтобы перезагрузиться и набраться здоровья.",
    photo: PHOTOS.park,
    alt: "Зелёный весенний парк",
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
    photo: PHOTOS.doctor,
    alt: "Врач со стетоскопом",
  },
  {
    index: "02",
    title: "Лагерные смены",
    text: "Вожатые, отрядные дела, спорт, дискотеки и общелагерные события — классическая смена, о которой рассказывают весь год.",
    price: "от 39 900 ₽",
    duration: "21 день",
    photo: PHOTOS.friends,
    alt: "Друзья сидят вместе на закате",
  },
  {
    index: "03",
    title: "Организованные группы",
    text: "Спортивные сборы, тематические выезды и школьные поездки: подстроим программу, питание и расписание под ваш запрос.",
    price: "по запросу",
    duration: "от 5 дней",
    photo: PHOTOS.football,
    alt: "Футбольный мяч на поле",
  },
  {
    index: "04",
    title: "Каникулы межсезонья",
    text: "Короткие смены на осенние, зимние и весенние каникулы — отдых и праздники без потери учебного ритма.",
    price: "от 24 900 ₽",
    duration: "10 дней",
    photo: PHOTOS.campfire,
    alt: "Костёр вечером",
  },
];

export const SPORTS: { title: string; note: string; photo: string; alt: string }[] = [
  { title: "Плавание", note: "в море с инструктором", photo: PHOTOS.swimmer, alt: "Пловец в воде" },
  { title: "Лёгкая атлетика", note: "старты и эстафеты", photo: PHOTOS.runner, alt: "Бегун на старте беговой дорожки" },
  { title: "Футбол", note: "турнир отрядов", photo: PHOTOS.football, alt: "Футбольный мяч на газоне" },
  { title: "Баскетбол", note: "стритбол 3×3", photo: PHOTOS.basketball, alt: "Баскетбольный мяч у кольца" },
  { title: "Теннис", note: "ракетка для каждого", photo: PHOTOS.tennis, alt: "Теннисист на корте" },
  { title: "Активный отдых", note: "походы и экскурсии", photo: PHOTOS.climbing, alt: "Скалолаз на скале" },
];

export const SPORT_WORDS = ["плавание", "футбол", "баскетбол", "теннис", "лёгкая атлетика", "волейбол", "эстафеты", "зарядка"];

export const CLUBS = ["робототехника", "шахматы", "театр", "вокал", "рисование", "английский", "журналистика", "экология", "хореография"];

export const KNOWLEDGE: { title: string; text: string; photo: string; alt: string }[] = [
  {
    title: "Учёба без скуки",
    text: "Занятия в течение смены: школьные предметы, языки и основы перспективных профессий в формате игры.",
    photo: PHOTOS.classroom,
    alt: "Дети на занятии в классе",
  },
  {
    title: "Творческая мастерская",
    text: "Рисование, лепка, дизайн и рукоделие — мастер-классы, после которых домой едут собственные работы.",
    photo: PHOTOS.drawing,
    alt: "Дети рисуют за столом",
  },
  {
    title: "Сцена «Олимпийца»",
    text: "Театральная студия, вокал и хореография. Каждая смена заканчивается большим концертом.",
    photo: PHOTOS.stage,
    alt: "Театральная сцена с красным занавесом",
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
