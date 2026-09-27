import React, { useState } from 'react';
import { ASSETS, Language, translations } from '../data/translations';

interface LoginScreenProps {
  lang: Language;
  accountDeleted: boolean;
  onLoginSuccess: (email: string) => void;
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  lang,
  accountDeleted,
  onLoginSuccess,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[lang].login;
  const [identifier, setIdentifier] = useState('c.rodriguez@colegio.edu.co');
  const [password, setPassword] = useState('Bienestar2026');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [authError, setAuthError] = useState<
    'none' | 'wrong_password' | 'unregistered'
  >('none');

  // Registered accounts unless deleted
  const registeredEmails = accountDeleted
    ? ['orientador@colegio.edu.co']
    : [
        'c.rodriguez@colegio.edu.co',
        'camila',
        'camila@colegio.edu',
        'estudiante@colegio.edu',
        'orientador@colegio.edu.co',
      ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = identifier.trim().toLowerCase();

    if (!registeredEmails.includes(cleanUser)) {
      setAuthError('unregistered');
      return;
    }

    if (password !== 'Bienestar2026' && password !== '12345678') {
      setAuthError('wrong_password');
      return;
    }

    setAuthError('none');
    onShowToast(t.successLogin);
    onLoginSuccess(cleanUser);
  };

  const triggerQuickTest = (
    mode: 'valid' | 'wrong_password' | 'unregistered'
  ) => {
    if (mode === 'valid') {
      setIdentifier('c.rodriguez@colegio.edu.co');
      setPassword('Bienestar2026');
      setShowPassword(true);
      setAuthError('none');
    } else if (mode === 'wrong_password') {
      setIdentifier('c.rodriguez@colegio.edu.co');
      setPassword('ClaveErronea999');
      setShowPassword(true);
      setAuthError('wrong_password');
    } else {
      setIdentifier('usuario.no.existe@colegio.edu');
      setPassword('Bienestar2026');
      setShowPassword(true);
      setAuthError('unregistered');
    }
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Visual Brand Anchor */}
        <div className="relative w-full flex flex-col items-center pt-space-md pb-space-sm">
          <div className="absolute -top-6 w-56 h-56 bg-primary-fixed/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-space-sm flex items-center justify-center">
            <img
              alt="Expresa Te Logo"
              className="w-full h-full object-contain"
              src={ASSETS.loginEmblem}
            />
          </div>
          <div className="text-center px-space-xs">
            <h1 className="font-headline-lg-mobile text-on-surface tracking-tight">
              {t.welcomePrefix}{' '}
              <span className="text-primary font-headline-lg-mobile">
                Expresa Te
              </span>
            </h1>
            <p className="font-body-md text-on-surface-variant mt-1.5 leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Security & Confidentiality Pill Badge */}
        <div className="my-space-sm w-full flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low text-primary shadow-sm">
            <span className="material-symbols-outlined text-primary text-[17px]">
              verified_user
            </span>
            <span className="font-label-sm font-medium tracking-normal text-on-surface-variant">
              {t.badge}
            </span>
          </div>
        </div>

        {/* Interactive Quick-Tester Bar for Login States */}
        <div className="w-full bg-surface-container-low rounded-xl p-3 mb-space-md border border-outline-variant/30">
          <p className="font-label-sm text-on-surface-variant font-semibold mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">
              science
            </span>
            <span>{t.demoBoxTitle}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => triggerQuickTest('valid')}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm font-semibold hover:bg-primary-fixed/40 transition-colors text-left truncate cursor-pointer shadow-2xs"
            >
              ✓ {t.demoValidBtn}
            </button>
            <button
              type="button"
              onClick={() => triggerQuickTest('wrong_password')}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-error font-label-sm font-semibold hover:bg-error-container/40 transition-colors text-left truncate cursor-pointer shadow-2xs"
            >
              ✕ {t.demoWrongPwdBtn}
            </button>
            <button
              type="button"
              onClick={() => triggerQuickTest('unregistered')}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-secondary font-label-sm font-semibold hover:bg-secondary-fixed/40 transition-colors text-left truncate cursor-pointer shadow-2xs"
            >
              ? {t.demoUnregisteredBtn}
            </button>
          </div>
        </div>

        {/* Sign In Card Structure */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md">
          {/* Dynamic Validation Error Banner */}
          {authError === 'wrong_password' && (
            <div
              role="alert"
              className="mb-space-md p-3.5 rounded-xl bg-error-container text-on-error-container flex items-start gap-2.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px] text-error shrink-0 mt-0.5">
                lock_reset
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-lg font-bold">
                  {t.errorWrongPasswordTitle}
                </span>
                <span className="font-body-sm mt-0.5">
                  {t.errorWrongPassword}
                </span>
              </div>
            </div>
          )}

          {authError === 'unregistered' && (
            <div
              role="alert"
              className="mb-space-md p-3.5 rounded-xl bg-error-container text-on-error-container flex items-start gap-2.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px] text-error shrink-0 mt-0.5">
                person_off
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-lg font-bold">
                  {t.errorUnregisteredTitle}
                </span>
                <span className="font-body-sm mt-0.5">
                  {t.errorUnregistered}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-space-md">
            {/* Input: Email / Identifier */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="identifier"
                className="font-label-lg text-on-surface font-semibold flex items-center justify-between"
              >
                <span>{t.userLabel}</span>
                <span className="font-label-sm text-on-surface-variant font-normal">
                  {t.institutionalTag}
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  alternate_email
                </span>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (authError !== 'none') setAuthError('none');
                  }}
                  placeholder={t.userPlaceholder}
                  className={`w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface rounded-lg font-body-md placeholder:text-outline-variant outline-none transition-all ${
                    authError === 'unregistered'
                      ? 'ring-2 ring-error bg-error-container/10'
                      : 'focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container'
                  }`}
                />
              </div>
            </div>

            {/* Input: Password with Show/Hide Password button */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-label-lg text-on-surface font-semibold"
                >
                  {t.pwdLabel}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast(
                      'Clave de demostración: Bienestar2026'
                    )
                  }
                  className="font-label-md text-secondary hover:underline transition-colors py-0.5 cursor-pointer"
                >
                  {t.forgotPwd}
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError !== 'none') setAuthError('none');
                  }}
                  placeholder="••••••••"
                  className={`w-full h-12 pl-11 pr-12 bg-surface-container-low text-on-surface rounded-lg font-body-md placeholder:text-outline-variant outline-none transition-all ${
                    authError === 'wrong_password'
                      ? 'ring-2 ring-error bg-error-container/10'
                      : 'focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.hidePwd : t.showPwd}
                  title={showPassword ? t.hidePwd : t.showPwd}
                  className="absolute right-2.5 text-outline hover:text-primary p-1.5 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Session Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    remember
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    check
                  </span>
                </div>
                <span className="font-body-sm text-on-surface-variant">
                  {t.rememberDevice}
                </span>
              </label>
              <span
                className="material-symbols-outlined text-outline text-[18px]"
                title="Conexión encriptada de punto a punto"
              >
                lock_person
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-space-sm">
              <button
                type="submit"
                className="relative w-full h-12 rounded-lg bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-container font-title-md font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all duration-200 group cursor-pointer"
              >
                <span>{t.submitBtn}</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {/* Return Navigation Link */}
          <div className="mt-space-lg text-center">
            <button
              type="button"
              onClick={() => onNavigate('inicio')}
              className="inline-flex items-center gap-1.5 font-label-lg text-on-surface-variant hover:text-primary transition-colors py-1 px-3 rounded-full hover:bg-surface-container-low cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span>{t.backHome}</span>
            </button>
          </div>
        </div>

        {/* Soft Ambient Supportive Help Line */}
        <div
          onClick={() => onNavigate('orientacion')}
          className="mt-space-xl w-full bg-surface-container-low rounded-xl p-space-md flex items-center gap-3.5 shadow-sm cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
            <span className="material-symbols-outlined text-[20px]">
              support_agent
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-on-surface font-semibold truncate">
              {t.helpTitle}
            </p>
            <p className="font-body-sm text-on-surface-variant truncate">
              {t.helpSub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfileScreenProps {
  lang: Language;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userName: string;
  userEmail: string;
  userGrade: string;
  onUpdateProfile: (name: string, grade: string) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  lang,
  darkMode,
  onToggleDarkMode,
  userName,
  userEmail,
  userGrade,
  onUpdateProfile,
  onLogout,
  onDeleteAccount,
  onShowToast,
}) => {
  const t = translations[lang].profile;
  const [selfcareReminders, setSelfcareReminders] = useState(true);
  const [anonMode, setAnonMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editGrade, setEditGrade] = useState(userGrade);
  const [confirmModal, setConfirmModal] = useState<
    'none' | 'logout' | 'delete'
  >('none');

  const handleSaveEdit = () => {
    onUpdateProfile(editName.trim() || userName, editGrade.trim() || userGrade);
    setIsEditing(false);
    onShowToast('Datos de perfil actualizados');
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-space-md">
      <div className="flex flex-col pt-space-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-lg-mobile text-on-surface font-bold tracking-tight">
              {t.title}
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-0.5">
              {t.subtitle}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              verified_user
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-container-low rounded-xl p-space-md flex items-center gap-space-md shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]">lock</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-md text-primary font-semibold">
            {t.protectedTitle}
          </p>
          <p className="font-body-sm text-on-surface-variant truncate">
            {t.protectedSub}
          </p>
        </div>
      </div>

      {/* Información básica */}
      <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
        <div className="flex items-center justify-between">
          <span className="font-title-md text-on-surface font-semibold">
            {t.basicInfo}
          </span>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 font-label-md text-primary font-semibold bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                edit
              </span>
              {t.editData}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveEdit}
              className="inline-flex items-center gap-1 font-label-md text-on-primary font-semibold bg-primary px-3 py-1.5 rounded-full hover:opacity-90 transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
              {t.saveData}
            </button>
          )}
        </div>

        <div className="flex items-center gap-space-md">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-fixed to-primary-container flex items-center justify-center text-on-primary-container font-title-lg font-bold shadow-inner">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary text-[14px] shadow-sm">
              <span className="material-symbols-outlined text-[14px]">
                shield
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low text-on-surface font-title-md outline-none ring-2 ring-primary/50"
              />
            ) : (
              <div className="flex items-center gap-space-xs">
                <span className="font-title-md text-on-surface font-semibold truncate">
                  {userName}
                </span>
                <span className="bg-primary-fixed/40 text-on-primary-fixed-variant font-label-sm px-2 py-0.5 rounded-full">
                  {t.pseudonym}
                </span>
              </div>
            )}
            <p className="font-body-sm text-on-surface-variant truncate mt-0.5">
              {t.confidentialId}
            </p>
          </div>
        </div>

        <div className="space-y-space-sm pt-space-xs">
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-space-sm min-w-0 flex-1">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  school
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-sm text-on-surface-variant">
                  {t.gradeLabel}
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                    className="w-full h-8 px-2 mt-0.5 rounded bg-surface-container-lowest text-on-surface font-body-sm outline-none ring-1 ring-primary"
                  />
                ) : (
                  <span className="font-body-sm text-on-surface font-medium truncate">
                    {userGrade}
                  </span>
                )}
              </div>
            </div>
            <span className="font-label-sm text-tertiary bg-surface-container-lowest px-2.5 py-1 rounded-full font-medium ml-2">
              {t.activeBadge}
            </span>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[18px]">
                  alternate_email
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-on-surface-variant">
                  {t.emailLabel}
                </span>
                <span className="font-body-sm text-on-surface font-medium truncate">
                  {userEmail}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-tertiary">
              check_circle
            </span>
          </div>
        </div>
      </section>

      {/* Configuración de cuenta */}
      <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
        <span className="font-title-md text-on-surface font-semibold block">
          {t.accountSettings}
        </span>
        <div className="space-y-space-sm">
          <div className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  spa
                </span>
              </div>
              <div>
                <p className="font-label-lg text-on-surface">
                  {t.selfcareReminders}
                </p>
                <p className="font-body-sm text-on-surface-variant">
                  {t.selfcareRemindersSub}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={selfcareReminders}
              onClick={() => setSelfcareReminders(!selfcareReminders)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                selfcareReminders ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`w-5 h-5 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${
                  selfcareReminders ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          <div
            onClick={() => onShowToast('Canal de avisos: Solo chat interno')}
            className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  forum
                </span>
              </div>
              <div>
                <p className="font-label-lg text-on-surface">
                  {t.orientationAlerts}
                </p>
                <p className="font-body-sm text-on-surface-variant">
                  {t.orientationAlertsSub}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="font-label-sm">{t.chatOnly}</span>
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </div>
          </div>

          <div
            onClick={onToggleDarkMode}
            className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  {darkMode ? 'dark_mode' : 'light_mode'}
                </span>
              </div>
              <div>
                <p className="font-label-lg text-on-surface">{t.displayMode}</p>
                <p className="font-body-sm text-on-surface-variant">
                  {darkMode ? t.displayModeDarkSub : t.displayModeLightSub}
                </p>
              </div>
            </div>
            <span className="font-label-md text-primary font-medium bg-surface-container-low px-2.5 py-1 rounded-full">
              {darkMode
                ? translations[lang].header.darkMode
                : translations[lang].header.lightMode}
            </span>
          </div>
        </div>
      </section>

      {/* Privacidad y Seguridad */}
      <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
        <div className="flex items-center justify-between">
          <span className="font-title-md text-on-surface font-semibold">
            {t.privacySecurity}
          </span>
          <span className="material-symbols-outlined text-primary text-[20px]">
            security
          </span>
        </div>

        <div className="space-y-space-sm">
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low/70">
            <div className="flex items-center gap-space-sm pr-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  visibility_off
                </span>
              </div>
              <div>
                <p className="font-label-lg text-on-surface">{t.anonMode}</p>
                <p className="font-body-sm text-on-surface-variant">
                  {t.anonModeSub}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={anonMode}
              onClick={() => setAnonMode(!anonMode)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative flex items-center shrink-0 cursor-pointer ${
                anonMode ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`w-5 h-5 bg-surface-container-lowest rounded-full transition-transform shadow-sm ${
                  anonMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-full bg-tertiary-fixed/50 text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  verified
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-label-lg text-on-surface truncate">
                  {t.encryption}
                </p>
                <p className="font-body-sm text-on-surface-variant">
                  {t.encryptionSub}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-tertiary/10 text-tertiary px-2.5 py-1 rounded-full shrink-0">
              <span className="material-symbols-outlined text-[14px]">
                lock
              </span>
              <span className="font-label-sm font-semibold">
                {t.verifiedBadge}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onShowToast(
                'Protocolo ético escolar Ley 1581 de Protección de Datos'
              )
            }
            className="w-full flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors text-on-surface group text-left cursor-pointer"
          >
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">
                  description
                </span>
              </div>
              <div>
                <p className="font-label-lg group-hover:text-primary transition-colors">
                  {t.policy}
                </p>
                <p className="font-body-sm text-on-surface-variant">
                  {t.policySub}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">
              open_in_new
            </span>
          </button>
        </div>
      </section>

      {/* Cerrar sesión & Eliminar cuenta */}
      <div className="pt-space-xs space-y-space-sm">
        <button
          type="button"
          onClick={() => setConfirmModal('logout')}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-surface-container-low text-error hover:bg-error-container/40 active:scale-[0.98] transition-all font-label-lg font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          {t.logoutBtn}
        </button>

        <button
          type="button"
          onClick={() => setConfirmModal('delete')}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-error/40 bg-error-container/20 text-error hover:bg-error-container/50 active:scale-[0.98] transition-all font-label-lg font-semibold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            delete_forever
          </span>
          {t.deleteAccountBtn}
        </button>

        <p className="text-center font-label-sm text-outline pt-1">
          {t.versionFooter}
        </p>
      </div>

      {/* Confirmation Modals for Logout and Account Deletion */}
      {confirmModal !== 'none' && (
        <div
          onClick={() => setConfirmModal('none')}
          className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">
                  {confirmModal === 'logout' ? 'logout' : 'warning'}
                </span>
              </div>
              <h3 className="font-title-lg text-on-surface font-bold">
                {confirmModal === 'logout'
                  ? t.logoutConfirmTitle
                  : t.deleteConfirmTitle}
              </h3>
            </div>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {confirmModal === 'logout'
                ? t.logoutConfirmDesc
                : t.deleteConfirmDesc}
            </p>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal('none')}
                className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-label-lg font-semibold cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  const action = confirmModal;
                  setConfirmModal('none');
                  if (action === 'logout') {
                    onLogout();
                  } else {
                    onDeleteAccount();
                  }
                }}
                className="flex-1 h-11 rounded-xl bg-error text-on-error font-label-lg font-semibold shadow-sm cursor-pointer"
              >
                {confirmModal === 'logout'
                  ? t.confirmLogoutBtn
                  : t.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface DeleteReceiptProps {
  lang: Language;
  deletedEmail: string;
  deletedName: string;
  onNavigate: (screen: string) => void;
  onRestoreDemoAccount: () => void;
  onShowToast: (msg: string) => void;
}

export const AccountDeletionReceiptScreen: React.FC<DeleteReceiptProps> = ({
  lang,
  deletedEmail,
  deletedName,
  onNavigate,
  onRestoreDemoAccount,
  onShowToast,
}) => {
  const t = translations[lang].deleteReceipt;
  const nowStr = new Date().toLocaleString(lang === 'es' ? 'es-CO' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleDownloadReceipt = () => {
    const content = [
      '====================================================',
      '       EXPRESA TE — COMPROBANTE OFICIAL DE BAJA     ',
      '====================================================',
      `Folio de eliminación: #BAJA-9042-ET`,
      `Estado: ${t.statusDeleted.toUpperCase()} DEFINITIVAMENTE`,
      `Fecha y hora: ${nowStr}`,
      `Cuenta eliminada: ${deletedEmail} (${deletedName})`,
      `ID confidencial: #4829-EST`,
      `Datos borrados: ${t.dataWipedValue}`,
      `Estado en directorio: ${t.protocolValue}`,
      '----------------------------------------------------',
      t.reassurance,
      '====================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Comprobante_Eliminacion_Cuenta_ExpresaTe_ET9042.txt';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast(t.downloadedToast);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto items-center text-center px-space-xs py-space-md space-y-space-lg">
      {/* Seal / Badge */}
      <div className="relative flex items-center justify-center pt-space-xs">
        <div className="absolute w-28 h-28 bg-error/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative w-20 h-20 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-error to-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[32px]">
              receipt_long
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-tertiary-fixed text-on-tertiary-fixed p-1.5 rounded-full shadow-md flex items-center justify-center">
            <span className="material-symbols-outlined text-[15px]">
              verified
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-space-xs px-space-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low text-primary rounded-full font-label-sm font-semibold tracking-wide uppercase">
          <span className="material-symbols-outlined text-[14px]">
            verified_user
          </span>
          {t.badge}
        </span>
        <h1 className="font-headline-lg-mobile text-on-surface font-bold tracking-tight">
          {t.title}
        </h1>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Detailed Receipt Card */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-md text-left space-y-space-md border border-outline-variant/30">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/25">
          <div className="flex flex-col">
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              {t.folioLabel}
            </span>
            <span className="font-title-md text-primary font-mono tracking-tight font-bold">
              #BAJA-9042-ET
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-error-container text-on-error-container rounded-full">
            <span className="w-2 h-2 rounded-full bg-error"></span>
            <span className="font-label-sm font-semibold">
              {t.statusDeleted}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-lg p-space-md space-y-space-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">
                event_busy
              </span>
              {t.dateLabel}
            </span>
            <span className="font-label-md text-on-surface font-medium text-right">
              {nowStr}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">
                alternate_email
              </span>
              {t.accountLabel}
            </span>
            <span className="font-label-md text-on-surface font-medium truncate max-w-[180px]">
              {deletedEmail}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">
                badge
              </span>
              {t.idLabel}
            </span>
            <span className="font-label-md text-on-surface font-mono font-semibold">
              #4829-EST
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">
                delete_sweep
              </span>
              {t.dataWipedLabel}
            </span>
            <span className="font-label-md text-tertiary font-semibold text-right">
              {t.dataWipedValue}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">
                gpp_maybe
              </span>
              {t.protocolLabel}
            </span>
            <span className="font-label-md text-error font-semibold text-right">
              {t.protocolValue}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-space-sm bg-surface-container/60 rounded-lg">
          <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
            shield_lock
          </span>
          <p className="font-body-sm text-on-surface-variant leading-snug">
            {t.reassurance}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-space-sm pt-space-xs">
        <button
          type="button"
          onClick={handleDownloadReceipt}
          className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            download
          </span>
          <span>{t.downloadBtn}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="w-full h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-lg font-semibold hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          <span>{t.testLoginUnregisteredBtn}</span>
        </button>

        <button
          type="button"
          onClick={onRestoreDemoAccount}
          className="w-full h-11 rounded-lg bg-surface-container-low text-primary font-label-md font-semibold hover:bg-surface-container transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            restore
          </span>
          <span>{t.restoreDemoBtn}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="w-full h-11 rounded-lg text-on-surface-variant font-label-md hover:text-on-surface transition-all flex items-center justify-center cursor-pointer"
        >
          {t.backHomeBtn}
        </button>
      </div>
    </div>
  );
};
