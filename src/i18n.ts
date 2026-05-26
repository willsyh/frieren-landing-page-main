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
  },
  ko: {
    translation: {
      "Welcome to React": "React 및 react-i18next에 오신 것을 환영합니다",
      "Home": "홈",
      "About": "소개",
      "Characters": "캐릭터",
      "Gallery": "갤러리",
      "Music": "음악",
      "AMV": "AMV",
      "AMVCollection": "AMV 컬렉션",
      "AMVDescription": "좋아하는 순간이 담긴 멋진 애니메이션 뮤직 비디오를 만나보세요",
      "SeeAllAMVs": "모든 AMV 보기",
      "ShowLess": "간략히 보기",
      "FrierenDesc": "차분함과 지혜로 세상을 탐험하는 엘프 마법사.",
      "FernDesc": "프리렌의 제자이자 함께 여행하는 마법사.",
      "StarkDesc": "전설적인 전사 아이젠의 제자였던 젊은 병사."
    }
  },
  ja: {
    translation: {
      "Welcome to React": "Reactとreact-i18nextへようこそ",
      "Home": "ホーム",
      "About": "紹介",
      "Characters": "キャラクター",
      "Gallery": "ギャラリー",
      "Music": "音楽",
      "AMV": "AMV",
      "AMVCollection": "AMVコレクション",
      "AMVDescription": "お気に入りの瞬間をフィーチャーした素晴らしいアニメミュージックビデオを発見しよう",
      "SeeAllAMVs": "すべてのAMVを見る",
      "ShowLess": "少なく表示",
      "FrierenDesc": "落ち着きと知恵で世界を旅するエルフの魔法使い。",
      "FernDesc": "フリーレンの弟子で一緒に旅をする魔法使い。",
      "StarkDesc": "伝説の戦士アイゼンの弟子だった若い兵士。"
    }
  },
  zh: {
    translation: {
      "Welcome to React": "欢迎来到React和react-i18next",
      "Home": "首页",
      "About": "关于",
      "Characters": "角色",
      "Gallery": "画廊",
      "Music": "音乐",
      "AMV": "AMV",
      "AMVCollection": "AMV合集",
      "AMVDescription": "发现精彩的动漫音乐视频，展现你最喜欢的瞬间",
      "SeeAllAMVs": "查看所有AMV",
      "ShowLess": "收起",
      "FrierenDesc": "一位以冷静和智慧探索世界的精灵魔法师。",
      "FernDesc": "弗里连的徒弟，一起旅行的魔法师。",
      "StarkDesc": "曾是传奇战士艾森的学生的年轻士兵。"
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