import React, { useState } from 'react';
import { Language, translations } from '../data/translations';

interface OrientationProps {
  lang: Language;
  subScreen: 'form' | 'sent' | 'counselor';
  onChangeSubScreen: (sub: 'form' | 'sent' | 'counselor') => void;
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const OrientationScreens: React.FC<OrientationProps> = ({
  lang,
  subScreen,
  onChangeSubScreen,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[lang].orientation;
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [contactPref, setContactPref] = useState<
    'presencial' | 'plataforma' | 'llamada'
  >('presencial');
  const [counselorFilter, setCounselorFilter] = useState<
    'all' | 'nueva' | 'revision' | 'atendida'
  >('all');

  const [requests, setRequests] = useState([
    {
      id: '#4829',
      grade: 'Grado 10°',
      status: 'nueva' as 'nueva' | 'revision' | 'atendida',
      time: 'Hoy, 10:30 AM',
      topic: 'Estrés académico y exámenes finales',
      topicIcon: 'help_center',
      excerpt:
        '"Me siento abrumado con las entregas grupales de esta semana y me cuesta concentrarme para descansar..."',
    },
    {
      id: '#3912',
      grade: 'Grado 11°',
      status: 'revision' as 'nueva' | 'revision' | 'atendida',
      time: 'Ayer, 04:15 PM',
      topic: 'Apoyo socioemocional y orientación vocacional',
      topicIcon: 'favorite',
      excerpt:
        '"Solicito un espacio presencial o virtual para revisar opciones universitarias y manejo de expectativas familiares."',
    },
    {
      id: '#5104',
      grade: 'Grado 9°',
      status: 'nueva' as 'nueva' | 'revision' | 'atendida',
      time: 'Ayer, 11:20 AM',
      topic: 'Convivencia y relaciones en el aula',
      topicIcon: 'diversity_3',
      excerpt:
        '"Quisiera mediar en un malentendido surgido en el recreo con compañeros de clase para evitar distanciamiento."',
    },
    {
      id: '#2980',
      grade: 'Grado 10°',
      status: 'atendida' as 'nueva' | 'revision' | 'atendida',
      time: '12 Feb, 09:00 AM',
      topic: 'Manejo de ansiedad ante presentaciones',
      topicIcon: 'spa',
      excerpt:
        'Sesión de respiración completada • Plan de seguimiento enviado',
    },
  ]);

  const handleCycleStatus = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== id) return req;
        const nextStatus =
          req.status === 'nueva'
            ? 'revision'
            : req.status === 'revision'
            ? 'atendida'
            : 'nueva';
        onShowToast(`${req.id} → ${nextStatus.toUpperCase()}`);
        return { ...req, status: nextStatus };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(t.sentTitle);
    onChangeSubScreen('sent');
  };

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Sub-navigation bar to switch between Request Form, Sent Receipt, and Counselor Panel */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl mb-space-md overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => onChangeSubScreen('form')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md whitespace-nowrap transition-all cursor-pointer ${
            subScreen === 'form'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {t.subTabForm}
        </button>
        <button
          type="button"
          onClick={() => onChangeSubScreen('sent')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md whitespace-nowrap transition-all cursor-pointer ${
            subScreen === 'sent'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {t.subTabSent}
        </button>
        <button
          type="button"
          onClick={() => onChangeSubScreen('counselor')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md whitespace-nowrap transition-all cursor-pointer ${
            subScreen === 'counselor'
              ? 'bg-primary text-on-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {t.subTabCounselor}
        </button>
      </div>

      {/* 1. SOLICITAR ORIENTACIÓN (FORM) */}
      {subScreen === 'form' && (
        <div className="flex flex-col w-full">
          <div className="relative overflow-hidden bg-surface-container-low rounded-xl p-space-md shadow-sm mb-space-md">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"></div>
            <div className="absolute right-4 top-4 text-primary opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[72px]">
                flutter
              </span>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full shadow-sm mb-space-xs">
                <span className="material-symbols-outlined text-[15px] text-tertiary">
                  verified_user
                </span>
                <span className="font-label-sm text-tertiary font-semibold tracking-wide">
                  {t.badge}
                </span>
              </div>
              <h1 className="font-headline-lg-mobile text-on-surface font-bold tracking-tight mt-1">
                {t.title}
              </h1>
              <p className="font-body-md text-on-surface-variant mt-1">
                {t.subtitle}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-md shadow-sm"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="motivoSelect"
                className="flex items-center gap-1.5 font-title-md text-on-surface font-medium"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  psychology
                </span>
                <span>{t.reasonLabel}</span>
              </label>
              <div className="relative">
                <select
                  id="motivoSelect"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full h-12 pl-3.5 pr-10 bg-surface-container-low text-on-surface font-body-md rounded-lg appearance-none transition-colors outline-none focus:bg-surface focus:shadow-md cursor-pointer"
                >
                  <option value="" disabled>
                    {t.reasonPlaceholder}
                  </option>
                  <option value="apoyo-emocional">{t.reason1}</option>
                  <option value="estres-escolar">{t.reason2}</option>
                  <option value="situacion-personal">{t.reason3}</option>
                  <option value="convivencia">{t.reason4}</option>
                  <option value="otro">{t.reason5}</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-on-surface-variant px-1">
                {t.reasonHint}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="orientadorMensaje"
                  className="flex items-center gap-1.5 font-title-md text-on-surface font-medium"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    chat_bubble_outline
                  </span>
                  <span>{t.msgLabel}</span>
                </label>
                <span className="font-label-sm text-on-surface-variant">
                  {message.length} / 600
                </span>
              </div>
              <textarea
                id="orientadorMensaje"
                rows={5}
                maxLength={600}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.msgPlaceholder}
                className="w-full p-3.5 bg-surface-container-low text-on-surface font-body-md rounded-lg resize-none outline-none focus:bg-surface focus:shadow-md transition-all placeholder:text-outline-variant"
              />
              <div className="flex items-center gap-1 px-1 text-primary">
                <span className="material-symbols-outlined text-[15px]">
                  favorite
                </span>
                <span className="font-label-sm">{t.msgHint}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 font-title-md text-on-surface font-medium">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  contact_support
                </span>
                <span>{t.prefLabel}</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    id: 'presencial' as const,
                    icon: 'person_pin_circle',
                    title: t.pref1Title,
                    sub: t.pref1Sub,
                  },
                  {
                    id: 'plataforma' as const,
                    icon: 'forum',
                    title: t.pref2Title,
                    sub: t.pref2Sub,
                  },
                  {
                    id: 'llamada' as const,
                    icon: 'video_call',
                    title: t.pref3Title,
                    sub: t.pref3Sub,
                  },
                ].map((opt) => {
                  const active = contactPref === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setContactPref(opt.id)}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all text-left cursor-pointer ${
                        active
                          ? 'bg-primary-fixed text-on-primary-fixed-variant shadow-sm'
                          : 'bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[22px] text-primary">
                          {opt.icon}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-lg font-semibold">
                            {opt.title}
                          </span>
                          <span className="font-label-sm text-on-surface-variant">
                            {opt.sub}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-primary-container text-on-primary rounded-lg font-label-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
                <span>{t.submitBtn}</span>
              </button>
            </div>
          </form>

          <div className="mt-space-md p-space-md bg-surface-container rounded-xl flex items-start gap-space-sm shadow-xs">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center shrink-0 text-primary mt-0.5">
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-label-lg text-on-surface font-semibold">
                {t.trustTitle}
              </h3>
              <p className="font-body-sm text-on-surface-variant mt-0.5">
                {t.trustDesc}
              </p>
            </div>
          </div>

          <div className="mt-space-md text-center px-4">
            <p className="font-body-sm text-on-surface-variant">
              {t.crisisQuestion}
            </p>
            <button
              type="button"
              onClick={() => onShowToast('Línea de auxilio 24/7: 106 / 911')}
              className="inline-flex items-center gap-1 text-secondary font-label-md font-semibold hover:underline mt-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                call
              </span>
              {t.crisisLink}
            </button>
          </div>
        </div>
      )}

      {/* 2. SOLICITUD ENVIADA (RECEIPT) */}
      {subScreen === 'sent' && (
        <div className="flex flex-col w-full max-w-md mx-auto items-center text-center px-space-xs py-space-md space-y-space-lg">
          <div className="relative flex items-center justify-center pt-space-xs">
            <div className="absolute w-28 h-28 bg-primary-fixed-dim/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-20 h-20 bg-surface-container-lowest rounded-full shadow-[0_8px_30px_rgba(20,184,166,0.18)] flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[32px]">
                  task_alt
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-tertiary-fixed text-on-tertiary-fixed p-1.5 rounded-full shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[15px]">
                  spa
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-space-xs px-space-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low text-tertiary rounded-full font-label-sm font-semibold tracking-wide uppercase">
              <span className="material-symbols-outlined text-[14px]">
                lock
              </span>
              {t.sentBadge}
            </span>
            <h1 className="font-headline-lg-mobile text-on-surface font-bold tracking-tight">
              {t.sentTitle}
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {t.sentDesc}
            </p>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_6px_24px_-4px_rgba(20,184,166,0.08),0_2px_8px_-1px_rgba(15,23,42,0.03)] text-left space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex flex-col">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  {t.trackingLabel}
                </span>
                <span className="font-title-md text-primary font-mono tracking-tight font-bold">
                  #ET-8492
                </span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-surface-container-high text-primary rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary mr-1"></span>
                <span className="font-label-sm font-semibold">
                  {t.statusReview}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-md space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    calendar_today
                  </span>
                  {t.dateSentLabel}
                </span>
                <span className="font-label-md text-on-surface font-medium">
                  {t.dateSentValue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    psychology
                  </span>
                  {t.counselorLabel}
                </span>
                <span className="font-label-md text-on-surface font-medium">
                  {t.counselorValue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    forum
                  </span>
                  {t.prefChosenLabel}
                </span>
                <span className="font-label-md text-on-surface font-medium">
                  {t.prefChosenValue}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-space-sm bg-surface-container/60 rounded-lg">
              <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
                volunteer_activism
              </span>
              <p className="font-body-sm text-on-surface-variant leading-snug">
                {t.reassuranceText}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-space-sm pt-space-xs">
            <button
              type="button"
              onClick={() => onChangeSubScreen('counselor')}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg font-semibold shadow-[0_4px_16px_rgba(20,184,166,0.25)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{t.viewRequestBtn}</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="w-full h-12 rounded-lg bg-surface-container-low text-on-surface font-label-lg font-semibold hover:bg-surface-container transition-all active:scale-[0.98] flex items-center justify-center cursor-pointer"
            >
              {t.backHomeBtn}
            </button>
          </div>

          <div className="w-full bg-secondary-fixed/30 rounded-xl p-space-md text-left shadow-sm flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  phone_in_talk
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-secondary font-semibold">
                  {t.needTalkNow}
                </span>
                <span className="font-body-sm text-on-secondary-container">
                  {t.helplineAvailable}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Llamando a línea de contención 24/7...')}
              className="px-3.5 py-2 bg-secondary text-on-secondary rounded-full font-label-md font-semibold shrink-0 shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.callBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. PANEL DE ORIENTACIÓN (ÁREA PROFESIONAL) */}
      {subScreen === 'counselor' && (
        <div className="flex flex-col w-full gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-container text-primary">
                <span className="material-symbols-outlined text-[18px]">
                  psychology
                </span>
              </span>
              <span className="font-label-md text-primary font-semibold tracking-wide uppercase">
                {t.profBadge}
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-on-surface font-bold tracking-tight">
              {t.profTitle}
            </h1>
            <p className="font-body-md text-on-surface-variant leading-snug">
              {t.profDesc}
            </p>
          </div>

          <div className="flex items-center gap-space-sm p-space-md rounded-xl bg-surface-container-low text-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-primary shrink-0">
              verified_user
            </span>
            <span className="font-label-md text-on-surface-variant">
              {t.profProtocol}
            </span>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-3 gap-space-xs sm:gap-space-sm">
            <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(20,184,166,0.06)] relative overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-primary-container mb-space-xs animate-pulse"></div>
              <span className="font-headline-lg-mobile text-primary font-bold tracking-tight">
                05
              </span>
              <span className="font-label-sm text-on-surface-variant mt-1 leading-tight font-medium">
                {t.metricNew}
              </span>
            </div>
            <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(0,99,152,0.06)] relative overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-secondary mb-space-xs"></div>
              <span className="font-headline-lg-mobile text-secondary font-bold tracking-tight">
                03
              </span>
              <span className="font-label-sm text-on-surface-variant mt-1 leading-tight font-medium">
                {t.metricReview}
              </span>
            </div>
            <div className="flex flex-col p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(0,108,75,0.06)] relative overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-tertiary mb-space-xs"></div>
              <span className="font-headline-lg-mobile text-tertiary font-bold tracking-tight">
                28
              </span>
              <span className="font-label-sm text-on-surface-variant mt-1 leading-tight font-medium">
                {t.metricResolved}
              </span>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
            {[
              { id: 'all' as const, label: t.tabAll, dot: null },
              {
                id: 'nueva' as const,
                label: t.tabNew,
                dot: 'bg-primary-container',
              },
              {
                id: 'revision' as const,
                label: t.tabReview,
                dot: 'bg-secondary',
              },
              {
                id: 'atendida' as const,
                label: t.tabResolved,
                dot: 'bg-tertiary',
              },
            ].map((tab) => {
              const active = counselorFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCounselorFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-4 h-9 rounded-full font-label-md whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {tab.dot ? (
                    <span className={`w-2 h-2 rounded-full ${tab.dot}`}></span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">
                      tune
                    </span>
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Recent Requests */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  inbox
                </span>
                <h2 className="font-headline-sm text-on-surface font-semibold tracking-tight">
                  {t.recentTitle}
                </h2>
              </div>
              <span className="font-label-sm text-on-surface-variant font-medium bg-surface-container px-2.5 py-1 rounded-full">
                {t.updatedBadge}
              </span>
            </div>

            {requests
              .filter(
                (r) =>
                  counselorFilter === 'all' || r.status === counselorFilter
              )
              .map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col gap-space-sm p-space-md rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(20,184,166,0.08)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-space-xs">
                    {req.status === 'nueva' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Nueva
                      </span>
                    )}
                    {req.status === 'revision' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        En revisión
                      </span>
                    )}
                    {req.status === 'atendida' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm font-medium">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          check_circle
                        </span>
                        Atendida
                      </span>
                    )}
                    <span className="font-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">
                        schedule
                      </span>
                      {req.time}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        badge
                      </span>
                      <span className="font-title-md text-on-surface font-semibold">
                        Estudiante {req.id} • {req.grade}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mt-1">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 mt-0.5">
                        {req.topicIcon}
                      </span>
                      <p className="font-body-md text-on-surface">
                        {req.topic}
                      </p>
                    </div>
                    <p className="font-body-sm text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg mt-1 leading-relaxed">
                      {req.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-space-sm pt-2 mt-1">
                    <button
                      type="button"
                      onClick={() =>
                        onShowToast(`Abriendo expediente ${req.id}...`)
                      }
                      className="flex-1 h-11 px-space-md rounded-lg bg-primary text-on-primary font-label-lg flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                      {req.status === 'atendida'
                        ? t.viewDossierBtn
                        : t.viewReqBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCycleStatus(req.id)}
                      className="flex-1 h-11 px-space-md rounded-lg bg-surface-container-low text-secondary font-label-lg flex items-center justify-center gap-2 transition-colors hover:bg-surface-container active:scale-[0.98] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        cached
                      </span>
                      {t.updateStatusBtn}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-space-md p-space-md rounded-xl bg-gradient-to-r from-surface-container-low to-surface-container text-on-surface mt-space-xs">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-on-primary-fixed shadow-sm">
              <span className="material-symbols-outlined text-[24px]">
                self_improvement
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md font-semibold text-primary">
                {t.counselorPauseTitle}
              </span>
              <p className="font-body-sm text-on-surface-variant leading-tight mt-0.5">
                {t.counselorPauseDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
