import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Home": "Home",
      "About": "About",
      "Characters": "Characters",
      "Gallery": "Gallery",
      "Music": "Music",
      "AMV": "AMV",
      "AMVCollection": "AMV Collection",
      "AMVDescription": "Discover amazing Anime Music Videos featuring your favorite moments",
      "SeeAllAMVs": "See All AMVs",
      "ShowLess": "Show Less",
      "FrierenDesc": "An elf mage who explores the world with calmness and wisdom.",
      "FernDesc": "a wizard, Frieren's apprentice who travels with her.",
      "StarkDesc": "a young soldier who was a student of the legendary warrior Eisen."
    }
  },
  id: {
    translation: {
      "Welcome to React": "Selamat datang di React dan react-i18next",
      "Home": "Beranda",
      "About": "Tentang",
      "Characters": "Karakter",
      "Gallery": "Galeri",
      "Music": "Musik",
      "AMV": "AMV",
      "AMVCollection": "Koleksi AMV",
      "AMVDescription": "Temukan Video Musik Anime yang luar biasa menampilkan momen favorit Anda",
      "SeeAllAMVs": "Lihat Semua AMV",
      "ShowLess": "Tampilkan Lebih Sedikit",
      "FrierenDesc": "Seorang penyihir elf yang menjelajahi dunia dengan ketenangan dan kebijaksanaan.",
      "FernDesc": "seorang penyihir, murid Frieren yang bepergian bersamanya.",
      "StarkDesc": "seorang prajurit muda yang merupakan murid dari pejuang legendaris Eisen."
    }
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'en', // language to use, more info here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;