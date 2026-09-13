export type LanguageCode = 'en' | 'es' | 'fr' | 'zh' | 'ar' | 'vi';

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'zh', label: '中文 (Simplified Chinese)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
];

type Dict = {
  tagline: string;
  signIn: string;
  menu: string;
  greeting: string;
  subtitle: string;
  eyebrow: string;
  footerTagline: string;
  settingsTitle: string;
};

export const TRANSLATIONS: Record<LanguageCode, Dict> = {
  en: {
    tagline: 'Confidential Support',
    signIn: 'Sign In',
    menu: 'Menu',
    greeting: 'Welcome back',
    subtitle: "Here's a gentle look at your wellness today.",
    eyebrow: 'CareSync • Your Wellness Space',
    footerTagline: 'Your session is designed with privacy and confidentiality in mind.',
    settingsTitle: 'Settings & Personalization',
  },
  es: {
    tagline: 'Apoyo Confidencial',
    signIn: 'Iniciar Sesión',
    menu: 'Menú',
    greeting: 'Bienvenido de nuevo',
    subtitle: 'Aquí tienes un vistazo suave a tu bienestar de hoy.',
    eyebrow: 'CareSync • Tu Espacio de Bienestar',
    footerTagline: 'Tu sesión está diseñada pensando en la privacidad y la confidencialidad.',
    settingsTitle: 'Configuración y Personalización',
  },
  fr: {
    tagline: 'Soutien Confidentiel',
    signIn: 'Connexion',
    menu: 'Menu',
    greeting: 'Content de vous revoir',
    subtitle: 'Voici un aperçu apaisant de votre bien-être aujourd’hui.',
    eyebrow: 'CareSync • Votre Espace Bien-être',
    footerTagline: 'Votre session est conçue dans le respect de la confidentialité.',
    settingsTitle: 'Paramètres et Personnalisation',
  },
  zh: {
    tagline: '保密支持',
    signIn: '登录',
    menu: '菜单',
    greeting: '欢迎回来',
    subtitle: '这是您今天健康状况的温和概览。',
    eyebrow: 'CareSync • 您的健康空间',
    footerTagline: '您的会话在设计上充分考虑了隐私和保密性。',
    settingsTitle: '设置与个性化',
  },
  ar: {
    tagline: 'دعم سري',
    signIn: 'تسجيل الدخول',
    menu: 'القائمة',
    greeting: 'مرحبًا بعودتك',
    subtitle: 'إليك نظرة لطيفة على صحتك اليوم.',
    eyebrow: 'CareSync • مساحتك الصحية',
    footerTagline: 'تم تصميم جلستك مع مراعاة الخصوصية والسرية.',
    settingsTitle: 'الإعدادات والتخصيص',
  },
  vi: {
    tagline: 'Hỗ Trợ Bảo Mật',
    signIn: 'Đăng Nhập',
    menu: 'Menu',
    greeting: 'Chào mừng trở lại',
    subtitle: 'Đây là cái nhìn nhẹ nhàng về sức khỏe của bạn hôm nay.',
    eyebrow: 'CareSync • Không Gian Sức Khỏe Của Bạn',
    footerTagline: 'Phiên của bạn được thiết kế chú trọng đến quyền riêng tư và bảo mật.',
    settingsTitle: 'Cài Đặt & Cá Nhân Hóa',
  },
};

export const t = (lang: LanguageCode): Dict => TRANSLATIONS[lang] || TRANSLATIONS.en;
