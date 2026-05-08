import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, LogOut, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, setIsLoginOpen } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { to: '/tipsters', label: t('nav.tipsters') },
    { 
      label: 'Fútbol',
      subLinks: [
        { to: '/live', label: 'Resultados en Vivo' },
        { to: '/clasificacion', label: 'Clasificación' },
        { to: '/scorers', label: 'Estadísticas' },
      ]
    },
    { 
      label: 'Herramientas',
      subLinks: [
        { to: '/calculator', label: t('nav.calculator') },
        { to: '/bookmakers', label: t('nav.bookmakers') }
      ]
    },
    { to: '/blog', label: t('nav.blog') },
  ];

  const currentLang = i18n?.language || 'es';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-white shadow-sm border-b border-light-200 h-16 flex items-center">
      <div className="page-container flex justify-between items-center w-full">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-2xl font-display font-black text-[#000000] tracking-tight flex-shrink-0">
            BET<span className="text-primary">MASTER</span>
          </Link>
          
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link, idx) => (
              link.subLinks ? (
                <div key={idx} className="relative group cursor-pointer py-2">
                  <div className="flex items-center text-[#111827] hover:text-primary transition-colors font-black text-xs uppercase tracking-widest">
                    {link.label} <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                  </div>
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-light-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left flex flex-col overflow-hidden p-2">
                    {link.subLinks.map(sub => (
                      <Link key={sub.to} to={sub.to} className="px-4 py-3 text-xs font-black text-light-600 hover:bg-light-50 hover:text-primary rounded-xl transition-all uppercase tracking-widest">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.to} to={link.to} className="text-[#111827] hover:text-primary transition-colors font-black text-xs uppercase tracking-widest">
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <button 
              onClick={() => setIsLoginOpen(true)} 
              className="px-5 py-2 bg-primary text-[#050505] border-2 border-primary font-black rounded-xl hover:bg-primary-light hover:border-primary transition-all flex items-center space-x-2 text-xs uppercase tracking-widest"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Iniciar Sesión</span>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 bg-light-50 px-3 py-1.5 rounded-xl border border-light-200 hover:bg-light-100 transition-all shadow-sm">
                <div className="w-6 h-6 bg-primary text-[#050505] flex items-center justify-center rounded-lg text-[10px] font-black">
                  {user.avatar}
                </div>
                <span className="text-xs font-black text-[#050505] hidden sm:block">{user.name}</span>
              </Link>
            </div>
          )}

          <div className="h-6 w-px bg-light-200 mx-2 hidden lg:block"></div>

          <button 
            onClick={() => i18n.changeLanguage(currentLang.startsWith('es') ? 'en' : 'es')} 
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl border border-light-200 hover:border-primary transition-all text-[10px] font-black shadow-sm bg-white"
          >
            <span className={currentLang.startsWith('es') ? 'text-primary' : 'text-light-400'}>ES</span>
            <span className="text-light-200 font-normal">|</span>
            <span className={currentLang.startsWith('en') ? 'text-primary' : 'text-light-400'}>EN</span>
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-light-900">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-light-200 fixed top-16 left-0 w-full h-screen z-[999] overflow-y-auto">
          <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <div key={idx} className="flex flex-col border-b border-light-100 pb-4">
                {link.subLinks ? (
                  <>
                    <div className="text-lg font-black text-light-900 mb-4 uppercase">{link.label}</div>
                    <div className="flex flex-col pl-4 border-l-2 border-primary/20 space-y-4">
                      {link.subLinks.map(sub => (
                        <Link key={sub.to} to={sub.to} className="text-base font-bold text-light-600" onClick={() => setIsMenuOpen(false)}>{sub.label}</Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={link.to} className="text-xl font-black text-light-900 uppercase" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
