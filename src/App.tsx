import React, { useEffect, useState } from 'react';
import {
  AccountDeletionReceiptScreen,
  LoginScreen,
  ProfileScreen,
} from './components/AuthAndProfileScreens';
import {
  StudentDashboardScreen,
  WelcomeScreen,
} from './components/HomeScreens';
import { OrientationScreens } from './components/OrientationScreens';
import {
  ResourcesScreen,
  SelfCareScreen,
} from './components/ResourcesAndSelfCare';
import { ASSETS, Language, translations } from './data/translations';

export type ActiveScreen =
  | 'inicio'
  | 'panel-estudiante'
  | 'recursos'
  | 'autocuidado'
  | 'orientacion'
  | 'solicitud-enviada'
  | 'panel-orientador'
  | 'login'
  | 'perfil'
  | 'comprobante-eliminar';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accountDeleted, setAccountDeleted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Camila R.');
  const [userEmail, setUserEmail] = useState<string>(
    'c.rodriguez@colegio.edu.co'
  );
  const [userGrade, setUserGrade] = useState<string>(
    'Grado 10° - Secundaria B'
  );
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen as ActiveScreen);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tHeader = translations[lang].header;
  const tNav = translations[lang].nav;
  const tSwitch = translations[lang].screenSwitcher;

  const isBottomTabActive = (tab: string) => {
    if (tab === 'inicio') {
      return activeScreen === 'inicio' || activeScreen === 'panel-estudiante';
    }
    if (tab === 'orientacion') {
      return (
        activeScreen === 'orientacion' ||
        activeScreen === 'solicitud-enviada' ||
        activeScreen === 'panel-orientador'
      );
    }
    if (tab === 'perfil') {
      return (
        activeScreen === 'perfil' ||
        activeScreen === 'login' ||
        activeScreen === 'comprobante-eliminar'
      );
    }
    return activeScreen === tab;
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top App Header with Dark/Light Mode Button & ES/EN Language Buttons */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(20,184,166,0.06)] border-b border-outline-variant/20">
        <div className="max-w-xl mx-auto h-16 px-3 sm:px-margin-mobile flex items-center justify-between gap-2">
          {/* Brand Zone */}
          <button
            type="button"
            onClick={() => handleNavigate('inicio')}
            className="flex items-center gap-1.5 text-left cursor-pointer shrink-0"
          >
            <div className="flex flex-col">
              <span className="font-title-lg text-primary tracking-tight leading-tight">
                Expresa Te
              </span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">
                  shield_lock
                </span>
                <span className="font-label-sm text-tertiary hidden sm:inline">
                  {tHeader.subtitle}
                </span>
              </div>
            </div>
          </button>

          {/* Controls Zone: Dark/Light Button + ES/EN Language Button + Help + Menu + Avatar */}
          <div className="flex items-center gap-1.5">
            {/* Botón de modo claro/oscuro arriba de la página principal */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              title={tHeader.themeTooltip}
              aria-label={tHeader.themeTooltip}
              className="flex items-center gap-1 h-9 px-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm font-semibold transition-all active:scale-95 cursor-pointer border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[17px] text-primary">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{darkMode ? tHeader.lightMode : tHeader.darkMode}</span>
            </button>

            {/* Idioma Español e Inglés en forma de botón */}
            <div
              role="group"
              aria-label="Selector de idioma"
              className="flex items-center bg-surface-container-low p-0.5 rounded-full border border-outline-variant/30"
            >
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`h-8 px-2.5 rounded-full font-label-sm font-bold transition-all cursor-pointer ${
                  lang === 'es'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`h-8 px-2.5 rounded-full font-label-sm font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                EN
              </button>
            </div>

            {/* Ayuda / Crisis */}
            <button
              type="button"
              onClick={() => handleNavigate('orientacion')}
              aria-label="Asistencia Inmediata o Crisis"
              className="hidden xs:flex items-center gap-1 h-9 px-2.5 bg-surface-container-low text-secondary rounded-full font-label-md transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                support_agent
              </span>
            </button>

            {/* Menú de todas las pantallas */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú de pantallas"
              className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">
                more_vert
              </span>
            </button>

            {/* Avatar / Perfil */}
            <button
              type="button"
              onClick={() => handleNavigate('perfil')}
              className="relative rounded-full focus:outline-none cursor-pointer shrink-0"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={ASSETS.headerAvatar}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown Menu for Screen Navigation */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-50 bg-inverse-surface/30 backdrop-blur-xs flex justify-end pt-16 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 h-fit bg-surface-container-lowest rounded-2xl p-3 shadow-2xl border border-outline-variant/30 flex flex-col gap-1"
          >
            <div className="px-3 py-1.5 font-label-sm text-primary uppercase font-bold tracking-wider">
              {tHeader.menuTitle}
            </div>
            {[
              { id: 'inicio', label: tSwitch.welcome, icon: 'home' },
              {
                id: 'panel-estudiante',
                label: tSwitch.studentDashboard,
                icon: 'dashboard',
              },
              { id: 'login', label: tSwitch.login, icon: 'login' },
              {
                id: 'recursos',
                label: tSwitch.resources,
                icon: 'local_library',
              },
              { id: 'autocuidado', label: tSwitch.selfcare, icon: 'spa' },
              {
                id: 'orientacion',
                label: tSwitch.requestForm,
                icon: 'chat_bubble',
              },
              {
                id: 'solicitud-enviada',
                label: tSwitch.requestSent,
                icon: 'task_alt',
              },
              {
                id: 'panel-orientador',
                label: tSwitch.counselorPanel,
                icon: 'psychology',
              },
              { id: 'perfil', label: tSwitch.profile, icon: 'person' },
              {
                id: 'comprobante-eliminar',
                label: tSwitch.deletedReceipt,
                icon: 'receipt_long',
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-label-md text-left transition-colors cursor-pointer ${
                  activeScreen === item.id
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-xl mx-auto bg-surface pt-20 pb-28 min-h-screen px-margin-mobile flex flex-col">
        {activeScreen === 'inicio' && (
          <WelcomeScreen
            lang={lang}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'panel-estudiante' && (
          <StudentDashboardScreen
            lang={lang}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'recursos' && (
          <ResourcesScreen
            lang={lang}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'autocuidado' && (
          <SelfCareScreen
            lang={lang}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {(activeScreen === 'orientacion' ||
          activeScreen === 'solicitud-enviada' ||
          activeScreen === 'panel-orientador') && (
          <OrientationScreens
            lang={lang}
            subScreen={
              activeScreen === 'solicitud-enviada'
                ? 'sent'
                : activeScreen === 'panel-orientador'
                ? 'counselor'
                : 'form'
            }
            onChangeSubScreen={(sub) => {
              if (sub === 'form') setActiveScreen('orientacion');
              if (sub === 'sent') setActiveScreen('solicitud-enviada');
              if (sub === 'counselor') setActiveScreen('panel-orientador');
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'login' && (
          <LoginScreen
            lang={lang}
            accountDeleted={accountDeleted}
            onLoginSuccess={(email) => {
              setIsLoggedIn(true);
              setUserEmail(email);
              setActiveScreen('panel-estudiante');
            }}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'perfil' && (
          <ProfileScreen
            lang={lang}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            userName={userName}
            userEmail={userEmail}
            userGrade={userGrade}
            onUpdateProfile={(name, grade) => {
              setUserName(name);
              setUserGrade(grade);
            }}
            onLogout={() => {
              setIsLoggedIn(false);
              showToast(
                lang === 'es'
                  ? 'Sesión cerrada correctamente'
                  : 'Logged out successfully'
              );
              setActiveScreen('login');
            }}
            onDeleteAccount={() => {
              setIsLoggedIn(false);
              setAccountDeleted(true);
              showToast(
                lang === 'es'
                  ? 'Cuenta eliminada. Comprobante generado.'
                  : 'Account deleted. Receipt generated.'
              );
              setActiveScreen('comprobante-eliminar');
            }}
            onShowToast={showToast}
          />
        )}

        {activeScreen === 'comprobante-eliminar' && (
          <AccountDeletionReceiptScreen
            lang={lang}
            deletedEmail={userEmail}
            deletedName={userName}
            onNavigate={handleNavigate}
            onRestoreDemoAccount={() => {
              setAccountDeleted(false);
              setUserEmail('c.rodriguez@colegio.edu.co');
              setUserName('Camila R.');
              showToast(
                lang === 'es'
                  ? 'Cuenta de Camila R. restaurada'
                  : 'Camila R. account restored'
              );
              setActiveScreen('login');
            }}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full font-label-md shadow-xl flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.03)] border-t border-outline-variant/20">
        <div className="max-w-xl mx-auto flex items-center justify-around h-16 px-space-xs">
          {[
            { id: 'inicio', icon: 'home', label: tNav.inicio },
            { id: 'recursos', icon: 'local_library', label: tNav.recursos },
            { id: 'autocuidado', icon: 'spa', label: tNav.autocuidado },
            { id: 'orientacion', icon: 'forum', label: tNav.orientacion },
            { id: 'perfil', icon: 'person_outline', label: tNav.perfil },
          ].map((tab) => {
            const active = isBottomTabActive(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleNavigate(tab.id)}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors cursor-pointer ${
                  active
                    ? 'text-primary font-title-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[24px] mb-0.5">
                  {tab.icon}
                </span>
                <span className="font-label-sm tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
