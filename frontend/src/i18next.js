import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// English
import home from "./locales/en/home.json"
import about from "./locales/en/about.json"
import common from "./locales/en/common.json"
import project from "./locales/en/project.json"
import news from "./locales/en/news.json"
import contact from "./locales/en/contact.json"
import term from "./locales/en/term.json"
import user from "./locales/en/user.json"
import fundraiser from "./locales/en/fundraiser.json"
import admin from "./locales/en/admin.json"

// Amharic
import homeAM from "./locales/am/home.json"
import aboutAM from "./locales/am/about.json"
import commonAM from "./locales/am/common.json"
import projectAM from "./locales/am/project.json"
import newsAM from "./locales/am/news.json"
import contactAM from "./locales/am/contact.json"
import termAM from "./locales/am/term.json"
import userAM from "./locales/am/user.json"
import fundraiserAM from "./locales/am/fundraiser.json"
import adminAM from "./locales/am/admin.json"

// Oromiffa
import homeOR from "./locales/or/home.json"
import aboutOR from "./locales/or/about.json"
import commonOR from "./locales/or/common.json"
import projectOR from "./locales/or/project.json"
import newsOR from "./locales/or/news.json"
import contactOR from "./locales/or/contact.json"
// Tigirigna
import homeTR from "./locales/tr/home.json"
import aboutTR from "./locales/tr/about.json"
import commonTR from "./locales/tr/common.json"
import projectTR from "./locales/tr/project.json"
import newsTR from "./locales/tr/news.json"
import contactTR from "./locales/tr/contact.json"

const languages = ['en', 'am'];

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    whitelist: languages,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    partialBundledLanguages: true,
    ns: ['common'],
    resources: {
      'en': {
        common,
        home,
        about,
        project,
        contact,
        news,
        term,
        user,
        fundraiser,
        admin
     },
      'am': {
        common: commonAM,
        home: homeAM,
        about: aboutAM,
        project: projectAM,
        contact: contactAM,
        news: newsAM,
        term: termAM,
        user: userAM,
        fundraiser: fundraiserAM,
        admin: adminAM
      },
      'or': {
        common: commonOR,
        home: homeOR,
        about: aboutOR,
        project: projectOR,
        contact: contactOR,
        news: newsOR
      },
      'tr': {
        common: commonTR,
        home: homeTR,
        about: aboutOR,
        project: projectTR,
        contact: contactTR,
        news: newsTR
      },
    }

  
   
  });

 

export default i18n;