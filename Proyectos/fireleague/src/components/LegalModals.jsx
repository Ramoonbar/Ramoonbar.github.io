import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cookie, Shield, Check, X, ShieldAlert, Scale, Info } from 'lucide-react';

export const LegalModals = () => {
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [activeTab, setActiveTab] = useState('cookies'); // For detailed cookie view if needed

  useEffect(() => {
    const hasAcceptedAge = localStorage.getItem('betmaster_age_verified');
    const hasAcceptedCookies = localStorage.getItem('betmaster_cookies_accepted');

    if (!hasAcceptedAge) {
      setShowAgeModal(true);
    } else if (!hasAcceptedCookies) {
      setShowCookieModal(true);
    }
  }, []);

  const handleAgeAccept = () => {
    localStorage.setItem('betmaster_age_verified', 'true');
    setShowAgeModal(false);
    if (!localStorage.getItem('betmaster_cookies_accepted')) {
      setShowCookieModal(true);
    }
  };

  const handleAgeReject = () => {
    window.location.href = 'https://www.google.com';
  };

  const handleCookieAccept = () => {
    localStorage.setItem('betmaster_cookies_accepted', 'true');
    setShowCookieModal(false);
  };

  return (
    <>
      {/* +18 Modal (Mandatory) */}
      {showAgeModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-light-900/95 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-10 md:p-14 text-center shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-warning to-primary"></div>
            
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShieldAlert className="w-12 h-12 text-primary" />
            </div>
            
            <h2 className="text-4xl font-display font-black text-light-900 mb-6 tracking-tight uppercase">⚠️ Acceso Restringido</h2>
            
            <div className="space-y-6 text-left mb-10 bg-light-50 p-8 rounded-3xl border border-light-100">
              <p className="text-xl font-bold text-light-900 flex items-center">
                <AlertTriangle className="w-6 h-6 text-warning mr-3 shrink-0" />
                Control de Edad Obligatorio (+18)
              </p>
              <p className="text-light-600 leading-relaxed">
                El acceso a <strong>BetMaster Analyst</strong> está estrictamente prohibido a menores de 18 años. Esta plataforma ofrece servicios de análisis de datos, estadísticas y pronósticos deportivos que pueden estar sujetos a regulaciones locales sobre el juego.
              </p>
              <div className="pt-4 border-t border-light-200">
                <p className="text-sm font-bold text-danger uppercase tracking-widest mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" /> Advertencia de Riesgo
                </p>
                <p className="text-sm text-light-500 italic">
                  Las apuestas deportivas conllevan un riesgo financiero y pueden generar adicción. Juega siempre con responsabilidad y solo con dinero que puedas permitirte perder.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={handleAgeAccept} 
                className="bg-primary text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 text-xl"
              >
                Soy mayor de edad
              </button>
              <button 
                onClick={handleAgeReject} 
                className="bg-light-100 text-light-600 font-black py-5 px-8 rounded-2xl hover:bg-light-200 transition-all text-xl"
              >
                Soy menor de edad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Cookie & Legal Banner */}
      {showCookieModal && !showAgeModal && (
        <div className="fixed bottom-0 left-0 right-0 z-[500] p-4 md:p-8 pointer-events-none">
          <div className="container mx-auto max-w-6xl pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-light-200 p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 animate-slide-up">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center shrink-0 shadow-inner">
                  <Cookie className="w-10 h-10 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-light-900 mb-3 tracking-tight uppercase flex items-center">
                    <Shield className="w-6 h-6 text-primary mr-2" />
                    Transparencia y Privacidad
                  </h3>
                  <div className="text-light-600 text-sm md:text-base max-w-3xl space-y-3">
                    <p>
                      En <strong>BetMaster Analyst</strong> valoramos tu seguridad. Utilizamos cookies propias y de terceros para optimizar nuestro algoritmo de análisis, personalizar tu experiencia y cumplir con la <strong>Ley de Ordenación del Juego</strong>.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button className="text-primary font-black hover:underline flex items-center text-xs">
                        <Scale className="w-3 h-3 mr-1" /> Aviso Legal
                      </button>
                      <button className="text-primary font-black hover:underline flex items-center text-xs">
                        <Shield className="w-3 h-3 mr-1" /> Política de Privacidad
                      </button>
                      <button className="text-primary font-black hover:underline flex items-center text-xs">
                        <Cookie className="w-3 h-3 mr-1" /> Configurar Cookies
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={handleCookieAccept} 
                  className="bg-light-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-black transition-all shadow-xl text-lg flex items-center justify-center"
                >
                  <Check className="w-5 h-5 mr-2" /> Aceptar Todas
                </button>
                <button 
                  className="bg-light-100 text-light-600 font-black py-4 px-10 rounded-2xl hover:bg-light-200 transition-all text-lg"
                >
                  Solo Necesarias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
