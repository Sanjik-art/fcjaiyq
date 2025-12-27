(function () {
  'use strict';

  // Translation dictionary with support for page-specific strings (pages.news)
  const translations = {
    kk: {
      more_info: 'Толығырақ',
      years: 'жыл',
      pos_goalkeepers: 'Қақпашылар',
      pos_defenders: 'Қорғаушылар',
      pos_midfielders: 'Жартылай қорғаушылар',
      pos_forwards: 'Шабуылшылар',
      home: 'Басты бет',
      team: 'Құрама',
      news: 'Жаңалықтар',
      fixtures: 'Матчтар',
      tickets: 'Билеттер',
      contact: 'Байланыс',
      welcome: 'Қош келдіңіз!',
      intro: 'FC JAIYQ клубының ресми сайтына кірдіңіз.',
      title: 'FC JAIYQ | Басты бет',
      stats_title: 'Статистика',
      stat_matches: 'Матчтар',
      stat_wins: 'Жеңіс',
      stat_draws: 'Тең',
      stat_losses: 'Жеңіліс',
      recent_news: 'Соңғы жаңалықтар',
      coaching_staff: 'Бапкерлер құрамы',
      head_coach: 'Бас бапкер',
      age: 'Жасы',
      citizenship: 'Азаматтығы',
      news_item1_title: 'Жаңа маусым басталды',
      news_item1_text: 'Біздің команда жаңа маусымды жеңіспен бастады. Тағы да көп жаңалықтар алда.',
      read_more: 'Толығырақ →',
      upcoming_matches: 'Алдағы матчтар',
      get_tickets: 'Билеттерді сатып алыңыз',
      tickets_subtitle: 'Билеттерді сатып алу үшін төменгі түймені басыңыз',
      price: 'Баға',
      buy_button: 'Сатып алу',
      pages: {
        news: {
          title: 'FC JAIYQ | Жаңалықтар',
          heading: 'Жаңалықтар',
          intro: 'Жергілікті және халықаралық матчтар туралы соңғы ақпарат.',
          item1_title: 'Жаңа маусым басталды',
          item1_text: 'Біздің команда жаңа маусымды жеңіспен бастады. Тағы да көп жаңалықтар алда.'
        }
      }
    },
    ru: {
      more_info: 'Подробнее',
      years: 'лет',
      pos_goalkeepers: 'Вратари',
      pos_defenders: 'Защитники',
      pos_midfielders: 'Полузащитники',
      pos_forwards: 'Нападающие',
      home: 'Главная',
      team: 'Команда',
      news: 'Новости',
      fixtures: 'Матчи',
      tickets: 'Билеты',
      contact: 'Контакты',
      welcome: 'Добро пожаловать!',
      intro: 'Вы на официальном сайте клуба FC JAIYQ.',
      title: 'FC JAIYQ | Главная',
      stats_title: 'Статистика',
      stat_matches: 'Матчи',
      stat_wins: 'Побед',
      stat_draws: 'Ничьих',
      stat_losses: 'Поражений',
      recent_news: 'Последние новости',
  coaching_staff: 'Тренерский штаб',
  head_coach: 'Главный тренер',
  age: 'Возраст',
  citizenship: 'Гражданство',
      news_item1_title: 'Новый сезон начался',
      news_item1_text: 'Наша команда начала новый сезон с победы. Еще много новостей впереди.',
      read_more: 'Подробнее →',
      upcoming_matches: 'Предстоящие матчи',
      get_tickets: 'Купите билеты',
      tickets_subtitle: 'Нажмите кнопку ниже, чтобы купить билеты на матчи',
      price: 'Цена',
      buy_button: 'Купить',
      pages: {
        news: {
          title: 'FC JAIYQ | Новости',
          heading: 'Новости',
          intro: 'Последние новости о местных и международных матчах.',
          item1_title: 'Новый сезон начался',
          item1_text: 'Наша команда начала новый сезон с победы. Еще много новостей впереди.'
        }
      }
    }
  };

  const STORAGE_KEY = 'jaiyq_lang';

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }

  function translatePage(lang) {
    const dict = translations[lang] || translations.kk;

    // Get optional page-specific dictionary (body[data-page] = "news" etc.)
    const page = document.body ? document.body.dataset.page : null;
    const pageDict = page && dict.pages && dict.pages[page] ? dict.pages[page] : null;

    // Update elements with data-key — prefer page-specific keys first
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (!key) return;
      if (pageDict && pageDict[key]) {
        el.textContent = pageDict[key];
      } else if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update document title: prefer page-specific title, then global title
    if (pageDict && pageDict.title) {
      document.title = pageDict.title;
    } else if (dict.title) {
      document.title = dict.title;
    }
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    translatePage(lang);
    saveLanguage(lang);
  }

  function initLanguageSwitcher() {
    // Wire up buttons that have onclick="setLanguage('xx')" or data-lang attributes
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', e => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });

    // Also support inline onclicks (existing pages use onclick="setLanguage('kk')")
    // Expose setLanguage globally so inline handlers keep working.
    window.setLanguage = setLanguage;

    // Initialize language from storage or browser default
    const saved = getSavedLanguage();

    if (saved && translations[saved]) {
      translatePage(saved);
      return;
    }

    // fallback: use browser language if it starts with 'ru' or 'kk'
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('ru')) {
      translatePage('ru');
      saveLanguage('ru');
    } else {
      // default to Kazakh (kk)
      translatePage('kk');
      saveLanguage('kk');
    }
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

})();
