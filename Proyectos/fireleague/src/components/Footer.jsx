import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send, ShieldCheck, AlertTriangle, Camera } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t border-light-200 mt-auto">
      <div className="page-container pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-display font-black text-light-900 tracking-wider mb-6">
              BET<span className="text-primary">MASTER</span>
            </div>
            <p className="text-light-500 text-sm leading-relaxed">
              Plataforma líder en análisis de datos deportivos y verificación de pronósticos. Transformamos la estadística en rentabilidad para apostadores profesionales.
            </p>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="font-extrabold text-light-900 mb-6 uppercase tracking-widest text-sm">Herramientas</h4>
            <ul className="space-y-4">
              <li><Link to="/calculator" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Calculadora de Sistema</Link></li>
              <li><Link to="/live" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Resultados en Vivo</Link></li>
              <li><Link to="/clasificacion" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Clasificación Ligas</Link></li>
            </ul>
          </div>

          {/* Blog/Resources Links */}
          <div>
            <h4 className="font-extrabold text-light-900 mb-6 uppercase tracking-widest text-sm">Recursos</h4>
            <ul className="space-y-4">
              <li><Link to="/blog" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Blog de Estrategias</Link></li>
              <li><Link to="/tipsters" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Ranking de Tipsters</Link></li>
              <li><Link to="/bookmakers" className="text-light-600 hover:text-primary transition-colors text-sm font-bold">Casas de Apuestas</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-extrabold text-light-900 mb-6 uppercase tracking-widest text-sm">Comunidad</h4>
            <div className="flex space-x-4 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-light-100 rounded-xl flex items-center justify-center text-light-600 hover:bg-[#1DA1F2] hover:text-white transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-light-100 rounded-xl flex items-center justify-center text-light-600 hover:bg-[#0088cc] hover:text-white transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-light-100 rounded-xl flex items-center justify-center text-light-600 hover:bg-[#E1306C] hover:text-white transition-all">
                <Camera className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-light-400">
              <AlertTriangle className="w-3 h-3 text-warning" />
              <span>BeGambleAware.org - +18 Juega con moderación</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light-900 py-6">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
              <Link to="/legal" className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Aviso Legal y +18</Link>
              <Link to="/legal" className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Política de Privacidad</Link>
              <Link to="/legal" className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Política de Cookies</Link>
              <Link to="/legal" className="text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Términos del Servicio</Link>
            </div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
              &copy; 2026 BetMaster Analyst. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
