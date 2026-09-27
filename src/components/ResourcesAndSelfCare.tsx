import React, { useState } from 'react';
import { Language, translations } from '../data/translations';

interface ScreenProps {
  lang: Language;
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const ResourcesScreen: React.FC<ScreenProps> = ({
  lang,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[lang].resources;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<{
    title: string;
    tag: string;
    desc: string;
    duration: string;
  } | null>(null);

  const categories = [
    { id: 'all', icon: 'apps', label: t.catAll },
    { id: 'ansiedad', icon: 'air', label: t.catAnxiety },
    { id: 'academico', icon: 'school', label: t.catAcademic },
    { id: 'convivencia', icon: 'diversity_1', label: t.catCoexistence },
    { id: 'emociones', icon: 'sentiment_satisfied', label: t.catEmotions },
  ];

  const resourcesList = [
    {
      id: 'ansiedad',
      cat: 'ansiedad',
      icon: 'air',
      iconBg: 'bg-primary-fixed/40 text-primary',
      tag: t.c1Tag,
      tagColor: 'text-primary',
      duration: '4 min',
      title: t.c1Title,
      desc: t.c1Desc,
      footIcon: 'verified_user',
      footColor: 'text-tertiary',
      footText: t.c1Foot,
      btnClass:
        'bg-primary-container text-on-primary shadow-[0_2px_8px_rgba(20,184,166,0.2)]',
    },
    {
      id: 'academico',
      cat: 'academico',
      icon: 'menu_book',
      iconBg: 'bg-secondary-fixed text-secondary',
      tag: t.c2Tag,
      tagColor: 'text-secondary',
      duration: '6 min',
      title: t.c2Title,
      desc: t.c2Desc,
      footIcon: 'tips_and_updates',
      footColor: 'text-secondary',
      footText: t.c2Foot,
      btnClass:
        'bg-surface-container-low text-secondary hover:bg-secondary-fixed/50',
    },
    {
      id: 'convivencia',
      cat: 'convivencia',
      icon: 'groups_3',
      iconBg: 'bg-tertiary-fixed text-tertiary',
      tag: t.c3Tag,
      tagColor: 'text-tertiary',
      duration: '5 min',
      title: t.c3Title,
      desc: t.c3Desc,
      footIcon: 'security',
      footColor: 'text-tertiary',
      footText: t.c3Foot,
      btnClass:
        'bg-surface-container-low text-tertiary hover:bg-tertiary-fixed/50',
    },
    {
      id: 'emociones',
      cat: 'emociones',
      icon: 'self_improvement',
      iconBg: 'bg-surface-container-high text-primary',
      tag: t.c4Tag,
      tagColor: 'text-primary',
      duration: '8 min',
      title: t.c4Title,
      desc: t.c4Desc,
      footIcon: 'favorite',
      footColor: 'text-primary',
      footText: t.c4Foot,
      btnClass:
        'bg-surface-container-low text-primary hover:bg-primary-fixed/40',
    },
  ];

  const filtered = resourcesList.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full gap-y-space-md">
      {/* Header Content Greeting & Subtitle */}
      <div className="flex flex-col pt-space-xs pb-space-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/30 text-primary w-fit mb-space-xs">
          <span className="material-symbols-outlined text-[15px]">
            auto_stories
          </span>
          <span className="font-label-sm tracking-wide font-semibold uppercase">
            {t.badge}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-on-surface tracking-tight">
          {t.title}
        </h1>
        <p className="font-body-md text-on-surface-variant mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-space-sm">
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full h-12 pl-11 pr-4 bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md rounded-xl shadow-[0_2px_12px_rgba(20,184,166,0.04)] focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 h-9 px-4 rounded-full font-label-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-primary-container text-on-primary shadow-[0_2px_8px_rgba(20,184,166,0.25)]'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource List Container */}
      <div className="flex flex-col gap-y-3.5 mt-1">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group relative bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(20,184,166,0.06),0_2px_6px_-1px_rgba(15,23,42,0.04)] flex flex-col gap-3 transition-all duration-200 hover:shadow-[0_8px_24px_-4px_rgba(20,184,166,0.12)]"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {item.icon}
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-label-sm font-semibold uppercase tracking-wider ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-label-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">
                      schedule
                    </span>{' '}
                    {item.duration}
                  </span>
                </div>
                <h2 className="font-title-lg text-on-surface font-semibold truncate mt-0.5">
                  {item.title}
                </h2>
              </div>
            </div>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              {item.desc}
            </p>
            <div className="flex items-center justify-between pt-1 mt-auto">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm">
                <span
                  className={`material-symbols-outlined text-[16px] ${item.footColor}`}
                >
                  {item.footIcon}
                </span>
                <span>{item.footText}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSelectedResource({
                    title: item.title,
                    tag: item.tag,
                    desc: item.desc,
                    duration: item.duration,
                  })
                }
                className={`h-9 px-4 rounded-full font-label-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer ${item.btnClass}`}
              >
                <span>{t.viewResource}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Support Card (Orientador de Apoyo) */}
      <div className="relative overflow-hidden mt-space-sm bg-gradient-to-br from-surface-container to-surface-container-low rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(0,99,152,0.06)]">
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-primary-fixed/30 pointer-events-none blur-2xl"></div>
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">
              chat_bubble_outline
            </span>
          </div>
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <span className="font-title-md text-on-surface leading-snug">
              {t.notFoundTitle}
            </span>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              {t.notFoundDesc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('orientacion')}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-secondary text-on-secondary font-label-md shadow-[0_4px_14px_rgba(0,99,152,0.25)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send
                </span>
                <span>{t.talkCounselor}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reassurance Footer Pill */}
      <div className="flex items-center justify-center gap-1.5 py-1 text-on-surface-variant opacity-80">
        <span className="material-symbols-outlined text-[14px] text-tertiary">
          lock
        </span>
        <span className="font-label-sm">{t.privateFooter}</span>
      </div>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div
          onClick={() => setSelectedResource(null)}
          className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-primary uppercase font-semibold tracking-wider">
                {selectedResource.tag} • {selectedResource.duration}
              </span>
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
            <h3 className="font-title-lg text-on-surface font-semibold">
              {selectedResource.title}
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {selectedResource.desc}
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center gap-2 text-primary font-label-md">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              <span>{t.privateFooter}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="flex-1 h-11 rounded-lg bg-surface-container text-on-surface font-label-lg cursor-pointer"
              >
                {translations[lang].selfcare.modalBack}
              </button>
              <button
                type="button"
                onClick={() => {
                  onShowToast(`Recurso abierto: ${selectedResource.title}`);
                  setSelectedResource(null);
                }}
                className="flex-1 h-11 rounded-lg bg-primary text-on-primary font-label-lg cursor-pointer"
              >
                {translations[lang].selfcare.modalStartNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SelfCareScreen: React.FC<ScreenProps> = ({
  lang,
  onShowToast,
}) => {
  const t = translations[lang].selfcare;
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalActivity, setModalActivity] = useState<{
    title: string;
    detail: string;
  } | null>(null);
  const [breathingActive, setBreathingActive] = useState(true);

  const activities = [
    {
      id: 1,
      category: 'mente',
      title: t.a1Title,
      tag: t.a1Tag,
      desc: t.a1Desc,
      detail: t.a1Detail,
      iconBg: 'bg-primary/10 text-primary',
      svg: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M3 12c3-4 6-4 9 0s6 4 9 0"></path>
          <path d="M5 8c2.5-3 5-3 7 0s4.5 3 7 0"></path>
          <path d="M7 16c2-2 4-2 5 0s3 2 5 0"></path>
        </svg>
      ),
    },
    {
      id: 2,
      category: 'mente',
      title: t.a2Title,
      tag: t.a2Tag,
      desc: t.a2Desc,
      detail: t.a2Detail,
      iconBg: 'bg-secondary-container/20 text-secondary',
      svg: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M8 12a4 4 0 0 1 8 0"></path>
          <path d="M12 7v1"></path>
          <circle cx="9" cy="15" fill="currentColor" r="1"></circle>
          <circle cx="15" cy="15" fill="currentColor" r="1"></circle>
        </svg>
      ),
    },
    {
      id: 3,
      category: 'rutinas',
      title: t.a3Title,
      tag: t.a3Tag,
      desc: t.a3Desc,
      detail: t.a3Detail,
      iconBg: 'bg-tertiary-container/20 text-tertiary',
      svg: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
          <path d="M7.5 4.5l-2-2"></path>
          <path d="M16.5 4.5l2-2"></path>
        </svg>
      ),
    },
    {
      id: 4,
      category: 'rutinas',
      title: t.a4Title,
      tag: t.a4Tag,
      desc: t.a4Desc,
      detail: t.a4Detail,
      iconBg: 'bg-secondary-fixed/50 text-secondary',
      svg: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          <path d="M12 12c-1.5 1.5-1.5 3 0 4.5"></path>
        </svg>
      ),
    },
    {
      id: 5,
      category: 'reflexion',
      title: t.a5Title,
      tag: t.a5Tag,
      desc: t.a5Desc,
      detail: t.a5Detail,
      iconBg: 'bg-primary-fixed/40 text-primary',
      svg: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M12 20a3.5 3.5 0 0 1-3.5-3.5c0-1.5 1-2.5 3.5-4.5 2.5 2 3.5 3 3.5 4.5A3.5 3.5 0 0 1 12 20z"></path>
          <path d="M12 12C9 9 5 8 2 9c0 4 3 8 7 8 1 0 2-.5 3-2"></path>
          <path d="M12 12c3-3 7-4 10-3 0 4-3 8-7 8-1 0-2-.5-3-2"></path>
          <path d="M12 4v4"></path>
        </svg>
      ),
    },
  ];

  const filtered = activities.filter(
    (a) => activeFilter === 'all' || a.category === activeFilter
  );

  return (
    <div className="flex flex-col w-full gap-space-lg pb-6">
      {/* Introducción / Header de Sección */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-highest p-space-lg shadow-sm">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/25 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-space-xs">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-primary">
            <span className="material-symbols-outlined text-[16px]">eco</span>
            <span className="font-label-sm font-semibold tracking-wide uppercase">
              {t.badge}
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-on-surface tracking-tight mt-1">
            {t.title}
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Indicador de Pulso y Calma rápida */}
        <div className="mt-space-md pt-space-md flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-3 px-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <span
                className={`material-symbols-outlined text-[20px] ${
                  breathingActive ? 'animate-pulse' : ''
                }`}
              >
                air
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface font-semibold">
                {t.breatheTitle}
              </span>
              <span className="font-label-sm text-on-surface-variant">
                {t.breatheSub}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setBreathingActive(!breathingActive);
              onShowToast(t.breatheSub);
            }}
            className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md active:scale-95 transition-transform flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>{breathingActive ? t.pauseBtn : t.startBtn}</span>
            <span className="material-symbols-outlined text-[16px]">
              {breathingActive ? 'play_arrow' : 'pause'}
            </span>
          </button>
        </div>
      </section>

      {/* Filtros sutiles de bienestar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: t.filterAll },
          { id: 'mente', label: t.filterMind },
          { id: 'rutinas', label: t.filterRoutines },
          { id: 'reflexion', label: t.filterReflection },
        ].map((f) => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full font-label-md whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Lista de Tarjetas Interactivas de Autocuidado */}
      <div className="flex flex-col gap-space-md">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm transition-all duration-200 hover:shadow-md flex flex-col gap-space-md group"
          >
            <div className="flex items-start gap-space-md">
              <div
                className={`w-13 h-13 p-3 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105`}
              >
                {item.svg}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h2 className="font-title-md text-on-surface font-semibold truncate">
                    {item.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-secondary font-label-sm whitespace-nowrap">
                    {item.tag}
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <button
                type="button"
                onClick={() =>
                  setModalActivity({ title: item.title, detail: item.detail })
                }
                className="flex-1 h-11 px-4 rounded-lg bg-surface-container text-on-surface font-label-md font-semibold transition-all active:scale-[0.98] hover:bg-surface-container-high flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  info
                </span>
                <span>{t.viewActivity}</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast(`${t.beginActivity}: ${item.title}`)}
                className="flex-1 h-11 px-4 rounded-lg bg-primary-container text-on-primary font-label-md font-semibold shadow-sm transition-all active:scale-[0.98] hover:brightness-105 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  play_arrow
                </span>
                <span>{t.beginActivity}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Recordatorio Confidencial */}
      <section className="mt-space-sm p-space-md rounded-xl bg-surface-container-low flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">spa</span>
        </div>
        <p className="font-label-md text-on-surface-variant">{t.reminder}</p>
      </section>

      {/* Modal Interactivo Dinámico para 'Ver Actividad' */}
      {modalActivity && (
        <div
          onClick={() => setModalActivity(null)}
          className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">
                  self_improvement
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalActivity(null)}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
            <div>
              <h3 className="font-title-lg text-on-surface font-semibold mb-2">
                {modalActivity.title}
              </h3>
              <p className="font-body-md text-on-surface-variant">
                {modalActivity.detail}
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center gap-2 text-primary font-label-md">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              <span>{t.privateNote}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalActivity(null)}
                className="flex-1 h-12 rounded-lg bg-surface-container text-on-surface font-label-lg font-semibold cursor-pointer"
              >
                {t.modalBack}
              </button>
              <button
                type="button"
                onClick={() => {
                  onShowToast(`${t.beginActivity}: ${modalActivity.title}`);
                  setModalActivity(null);
                }}
                className="flex-1 h-12 rounded-lg bg-primary text-on-primary font-label-lg font-semibold shadow-sm hover:bg-primary/90 cursor-pointer"
              >
                {t.modalStartNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
