import React, { useState } from 'react';
import { ASSETS, Language, translations } from '../data/translations';

interface HomeProps {
  lang: Language;
  onNavigate: (screen: string) => void;
  isLoggedIn: boolean;
  userName: string;
  onShowToast: (msg: string) => void;
}

export const WelcomeScreen: React.FC<HomeProps> = ({
  lang,
  onNavigate,
  isLoggedIn,
  userName,
  onShowToast,
}) => {
  const t = translations[lang].welcome;
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <section className="flex flex-col items-center text-center pt-space-xs pb-space-lg">
        {/* Top Micro Bar con Logo y Botón de Inicio de Sesión */}
        <div className="w-full flex items-center justify-between mb-space-lg px-space-xs">
          <div className="flex items-center gap-space-xs">
            <img
              alt="Expresa Te Logo"
              className="w-10 h-10 object-contain rounded-xl shadow-sm"
              src={ASSETS.homeLogoSmall}
            />
            <div className="flex flex-col text-left">
              <span className="font-title-md text-on-surface leading-tight">
                Expresa Te
              </span>
              <span className="font-label-sm text-tertiary">
                {t.communitySub}
              </span>
            </div>
          </div>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => onNavigate('perfil')}
              className="flex items-center gap-1.5 h-9 px-3.5 bg-primary-fixed/40 text-primary rounded-full font-label-md active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              <span>{userName}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="flex items-center gap-1.5 h-9 px-3.5 bg-surface-container-low text-secondary rounded-full font-label-md active:scale-95 transition-transform hover:bg-secondary-fixed/50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                login
              </span>
              <span>{t.loginBtn}</span>
            </button>
          )}
        </div>

        {/* Logo Original de Expresa Te con insignia 100% Seguro */}
        <div className="relative w-36 h-36 flex items-center justify-center my-space-xs">
          <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-white">
            <img
              alt="Expresa Te Logo"
              className="w-full h-full object-contain"
              src={ASSETS.loginEmblem}
            />
          </div>
          <div className="absolute -bottom-1 right-4 z-20 bg-surface-container-lowest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-tertiary text-[14px]">
              lock
            </span>
            <span className="font-label-sm text-tertiary font-medium">
              {t.safeBadge}
            </span>
          </div>
        </div>

        <h1 className="font-headline-xl-mobile text-on-surface tracking-tight mt-space-sm mb-space-xs">
          {t.heroTitle}
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-sm px-space-xs">
          {t.heroDesc}
        </p>

        {/* Selector Rápido de Estado Emocional */}
        <div className="w-full flex items-center justify-center gap-2 mt-space-md mb-space-md overflow-x-auto pb-1">
          {[
            { id: 'calma', emoji: '🌱', label: t.moodCalm },
            { id: 'inquieto', emoji: '🌊', label: t.moodThoughtful },
            { id: 'abrumado', emoji: '🌧️', label: t.moodOverwhelmed },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedMood(m.id);
                onShowToast(`${m.emoji} ${m.label}`);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all cursor-pointer active:scale-95 ${
                selectedMood === m.id
                  ? 'bg-primary-fixed text-on-primary-fixed shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="text-base">{m.emoji}</span>
              <span className="font-label-md whitespace-nowrap">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Botones de Acción Principales */}
        <div className="w-full flex flex-col sm:flex-row gap-space-sm mt-space-xs">
          <button
            type="button"
            onClick={() => onNavigate('recursos')}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-lg shadow-md shadow-primary/20 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              auto_stories
            </span>
            <span>{t.exploreResources}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('orientacion')}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-surface-container-high text-secondary font-label-lg hover:bg-secondary-fixed active:scale-[0.98] transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              support_agent
            </span>
            <span>{t.requestGuidance}</span>
          </button>
        </div>
      </section>

      {/* Sección: Encuentra Recursos para tu Bienestar */}
      <section className="w-full pt-space-md pb-space-lg">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <h2 className="font-title-lg text-on-surface tracking-tight">
              {t.findResourcesTitle}
            </h2>
            <p className="font-body-sm text-on-surface-variant">
              {t.findResourcesSub}
            </p>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">
            psychology_alt
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <article
            onClick={() => onNavigate('recursos')}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(20,184,166,0.08)] flex gap-space-md items-start hover:bg-surface-container-low/60 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex-shrink-0 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">air</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h3 className="font-title-md text-on-surface truncate">
                  {t.card1Title}
                </h3>
                <span className="font-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed flex-shrink-0">
                  {t.card1Tag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant line-clamp-2 mb-space-xs">
                {t.card1Desc}
              </p>
              <div className="flex items-center gap-1 text-primary font-label-md">
                <span>{t.card1Action}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>

          <article
            onClick={() => onNavigate('recursos')}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(0,99,152,0.08)] flex gap-space-md items-start hover:bg-surface-container-low/60 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex-shrink-0 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[26px]">
                balance
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h3 className="font-title-md text-on-surface truncate">
                  {t.card2Title}
                </h3>
                <span className="font-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed flex-shrink-0">
                  {t.card2Tag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant line-clamp-2 mb-space-xs">
                {t.card2Desc}
              </p>
              <div className="flex items-center gap-1 text-secondary font-label-md">
                <span>{t.card2Action}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>

          <article
            onClick={() => onNavigate('recursos')}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(0,187,132,0.08)] flex gap-space-md items-start hover:bg-surface-container-low/60 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex-shrink-0 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[26px]">
                diversity_1
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h3 className="font-title-md text-on-surface truncate">
                  {t.card3Title}
                </h3>
                <span className="font-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex-shrink-0">
                  {t.card3Tag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant line-clamp-2 mb-space-xs">
                {t.card3Desc}
              </p>
              <div className="flex items-center gap-1 text-tertiary font-label-md">
                <span>{t.card3Action}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Sección: ¿Necesitas hablar con alguien? */}
      <section className="w-full pt-space-xs pb-space-lg">
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-secondary-fixed/40 blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-start">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary mb-space-sm shadow-sm">
              <span className="material-symbols-outlined text-[22px]">
                forum
              </span>
            </div>
            <h2 className="font-headline-sm text-on-surface tracking-tight mb-space-xs">
              {t.talkTitle}
            </h2>
            <p className="font-body-md text-on-surface-variant mb-space-md">
              {t.talkDesc}
            </p>
            <div className="w-full grid grid-cols-2 gap-2 mb-space-md">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  verified_user
                </span>
                <span>{t.anonBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  schedule
                </span>
                <span>{t.warmReply}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('orientacion')}
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg flex items-center justify-center gap-2 shadow-md shadow-primary/25 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                chat_bubble
              </span>
              <span>{t.requestGuidance}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Micro-carrusel de Pausa Consciente */}
      <section className="w-full pb-space-lg">
        <div className="bg-surface-container-lowest rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm">
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed flex-shrink-0 ${
                isBreathing ? 'animate-pulse' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                self_improvement
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-on-surface">{t.pauseTitle}</h4>
              <p className="font-body-sm text-on-surface-variant">
                {isBreathing ? t.pauseActive : t.pauseDesc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsBreathing(!isBreathing);
              onShowToast(isBreathing ? t.pauseDesc : t.pauseActive);
            }}
            aria-label="Iniciar pausa de respiración"
            className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isBreathing ? 'pause_circle' : 'play_circle'}
            </span>
          </button>
        </div>
      </section>

      {/* Footer Institucional Sutil */}
      <footer className="w-full flex flex-col items-center text-center pt-space-xs pb-space-sm">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-title-md text-on-surface font-semibold">
            Expresa Te
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-label-sm text-on-surface-variant">
            {t.institutionalSpace}
          </span>
        </div>
        <p className="font-body-sm text-on-surface-variant italic">{t.quote}</p>
        <div className="flex items-center gap-4 mt-space-sm font-label-sm text-on-surface-variant">
          <button
            type="button"
            onClick={() => onNavigate('perfil')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {t.privacy}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('orientacion')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {t.crisisLine}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onNavigate('panel-orientador')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {t.counselors}
          </button>
        </div>
      </footer>
    </div>
  );
};

export const StudentDashboardScreen: React.FC<HomeProps> = ({
  lang,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[lang].studentHome;
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const moods = [
    {
      id: 'Tranquilo',
      label: t.mood1,
      icon: 'self_improvement',
      color: 'text-primary',
      advice: t.advice1,
    },
    {
      id: 'Ansioso',
      label: t.mood2,
      icon: 'air',
      color: 'text-secondary',
      advice: t.advice2,
    },
    {
      id: 'Motivado',
      label: t.mood3,
      icon: 'bolt',
      color: 'text-tertiary',
      advice: t.advice3,
    },
    {
      id: 'Agobiado',
      label: t.mood4,
      icon: 'wb_cloudy',
      color: 'text-secondary-container',
      advice: t.advice4,
    },
  ];

  const activeMoodObj = moods.find((m) => m.id === selectedMood);

  return (
    <div className="flex flex-col w-full pb-6 space-y-space-lg">
      {/* Confidencialidad & Seguridad Banner */}
      <aside
        aria-label="Aviso de privacidad"
        className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl text-primary"
      >
        <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
          <span className="material-symbols-outlined text-[18px]">
            verified_user
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-label-md text-primary font-semibold">
            {t.privacyTitle}
          </p>
          <p className="font-body-sm text-on-surface-variant truncate">
            {t.privacySub}
          </p>
        </div>
      </aside>

      {/* Saludo Cálido y Empático */}
      <section className="flex flex-col space-y-space-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-secondary w-fit">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm">{t.badge}</span>
        </div>
        <h1 className="font-headline-lg-mobile text-on-surface tracking-tight">
          {t.greetingPrefix} <span className="text-primary">Expresa Te</span>
        </h1>
        <p className="font-body-md text-on-surface-variant">{t.greetingDesc}</p>
      </section>

      {/* Check-in Emocional Rápido */}
      <section className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              sentiment_satisfied
            </span>
            <h2 className="font-title-md text-on-surface">{t.checkinTitle}</h2>
          </div>
          {savedFeedback && (
            <span className="font-label-sm text-tertiary transition-all">
              {t.checkinSaved}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
          {moods.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMood(m.id);
                  setSavedFeedback(true);
                  setTimeout(() => setSavedFeedback(false), 3000);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl active:scale-95 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary-fixed text-on-primary-fixed shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center mb-1 ${m.color} shadow-xs`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {m.icon}
                  </span>
                </div>
                <span className="font-label-md font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>

        {activeMoodObj && (
          <div className="p-3 rounded-lg bg-surface-container text-on-surface-variant font-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">
              favorite
            </span>
            <span>{activeMoodObj.advice}</span>
          </div>
        )}
      </section>

      {/* Accesos Directos Principales */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-title-lg text-on-surface">{t.exploreTitle}</h2>
          <span className="font-label-sm text-on-surface-variant">
            {t.quickActions}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-space-sm">
          <button
            type="button"
            onClick={() => onNavigate('recursos')}
            className="group relative flex items-start gap-space-md p-space-lg bg-surface-container-lowest hover:bg-surface-container-low rounded-xl shadow-sm transition-all active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">
                local_library
              </span>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-on-surface group-hover:text-primary transition-colors">
                  {t.resTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm">
                  {t.resTag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                {t.resDesc}
              </p>
            </div>
            <div className="self-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                arrow_forward
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('autocuidado')}
            className="group relative flex items-start gap-space-md p-space-lg bg-surface-container-lowest hover:bg-surface-container-low rounded-xl shadow-sm transition-all active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">spa</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-on-surface group-hover:text-tertiary transition-colors">
                  {t.selfTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm">
                  {t.selfTag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                {t.selfDesc}
              </p>
            </div>
            <div className="self-center text-on-surface-variant group-hover:text-tertiary transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                arrow_forward
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('orientacion')}
            className="group relative flex items-start gap-space-md p-space-lg bg-surface-container-lowest hover:bg-surface-container-low rounded-xl shadow-sm transition-all active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">
                chat
              </span>
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <h3 className="font-title-md text-on-surface group-hover:text-secondary transition-colors">
                  {t.oriTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm">
                  {t.oriTag}
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                {t.oriDesc}
              </p>
            </div>
            <div className="self-center text-on-surface-variant group-hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                arrow_forward
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Sección: Recomendado para ti */}
      <section className="space-y-space-sm pt-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              auto_awesome
            </span>
            <h2 className="font-title-lg text-on-surface">{t.recTitle}</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('recursos')}
            className="font-label-md text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            {t.seeAll}{' '}
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>

        <div className="flex flex-col space-y-space-sm">
          <article
            onClick={() => onNavigate('autocuidado')}
            className="flex items-stretch bg-surface-container-lowest rounded-xl shadow-sm p-3 gap-space-md group hover:bg-surface-container-low transition-all cursor-pointer"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
              <img
                alt={t.rec1Title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={ASSETS.recBreathing}
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-on-surface/75 backdrop-blur-sm text-on-primary font-label-sm">
                3 min
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="space-y-1">
                <span className="font-label-sm text-primary font-medium uppercase tracking-wider">
                  {t.rec1Cat}
                </span>
                <h3 className="font-title-md text-on-surface leading-snug line-clamp-2">
                  {t.rec1Title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 text-on-surface-variant font-body-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    pace
                  </span>{' '}
                  {t.rec1Meta}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowToast('Guardado en tus favoritos');
                  }}
                  className="material-symbols-outlined text-primary text-[20px]"
                >
                  bookmark_border
                </span>
              </div>
            </div>
          </article>

          <article
            onClick={() => onNavigate('recursos')}
            className="flex items-stretch bg-surface-container-lowest rounded-xl shadow-sm p-3 gap-space-md group hover:bg-surface-container-low transition-all cursor-pointer"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
              <img
                alt={t.rec2Title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={ASSETS.recStudy}
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-on-surface/75 backdrop-blur-sm text-on-primary font-label-sm">
                5 min
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="space-y-1">
                <span className="font-label-sm text-secondary font-medium uppercase tracking-wider">
                  {t.rec2Cat}
                </span>
                <h3 className="font-title-md text-on-surface leading-snug line-clamp-2">
                  {t.rec2Title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 text-on-surface-variant font-body-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    menu_book
                  </span>{' '}
                  {t.rec2Meta}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowToast('Guardado en tus favoritos');
                  }}
                  className="material-symbols-outlined text-secondary text-[20px]"
                >
                  bookmark_border
                </span>
              </div>
            </div>
          </article>

          <article
            onClick={() => onNavigate('orientacion')}
            className="flex items-stretch bg-surface-container-lowest rounded-xl shadow-sm p-3 gap-space-md group hover:bg-surface-container-low transition-all cursor-pointer"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
              <img
                alt={t.rec3Title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={ASSETS.recSupport}
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-on-surface/75 backdrop-blur-sm text-on-primary font-label-sm">
                {t.guideBadge}
              </span>
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div className="space-y-1">
                <span className="font-label-sm text-tertiary font-medium uppercase tracking-wider">
                  {t.rec3Cat}
                </span>
                <h3 className="font-title-md text-on-surface leading-snug line-clamp-2">
                  {t.rec3Title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 text-on-surface-variant font-body-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    record_voice_over
                  </span>{' '}
                  {t.rec3Meta}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowToast('Guardado en tus favoritos');
                  }}
                  className="material-symbols-outlined text-tertiary text-[20px]"
                >
                  bookmark_border
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Tarjeta de Refuerzo Positivo Diario */}
      <section className="p-space-lg bg-surface-container rounded-xl flex items-center gap-space-md">
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
          <span className="material-symbols-outlined text-[24px]">
            emoji_objects
          </span>
        </div>
        <div className="flex flex-col">
          <p className="font-label-md text-primary font-semibold">
            {t.dailyReminderTitle}
          </p>
          <p className="font-body-sm text-on-surface-variant">
            {t.dailyReminderQuote}
          </p>
        </div>
      </section>
    </div>
  );
};
