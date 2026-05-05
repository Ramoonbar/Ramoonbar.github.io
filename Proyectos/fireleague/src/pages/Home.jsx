import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send, TrendingUp, ShieldCheck, Target, Award, Star, Quote, ChevronLeft, ChevronRight, Zap, CheckCircle2, BarChart3, Users, Clock, ArrowRight, Trophy } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  const { t } = useTranslation();
  
  // Testimonials Wheel Logic
  const originalTestimonials = [
    { id: 1, name: 'Marcos T.', role: 'Usuario Premium', text: 'Gracias al ranking trimestral pude filtrar quién era rentable de verdad. Llevo 3 meses siguiendo a Alex y estoy en verde. Increíble plataforma.', img: '1' },
    { id: 2, name: 'Elena S.', role: 'Apostadora habitual', text: 'La calculadora de sistemas es una locura. Me ahorra muchísimo tiempo a la hora de hacer mis Lucky 15 y ver el profit real que me voy a llevar.', img: '5' },
    { id: 3, name: 'David R.', role: 'Analista Deportivo', text: 'Las estadísticas en vivo son las mejores que he probado. Poder ver las clasificaciones actualizadas al momento de LaLiga me ayuda a decidir en el live.', img: '8' },
    { id: 4, name: 'Laura M.', role: 'Miembro VIP', text: 'Increíble comunidad de Telegram, los pronósticos saltan al momento. Con el blog he aprendido a controlar el tilt y mi bankroll ha mejorado un montón.', img: '9' },
    { id: 5, name: 'Carlos P.', role: 'Apostador Profesional', text: 'Lo de tener todo el ranking de las bookies y el comparador es vital. Ya no me engañan con los bonos de bienvenida. 10/10.', img: '12' },
  ];

  const [currentIndex, setCurrentIndex] = useState(originalTestimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedTestimonials = [...originalTestimonials, ...originalTestimonials, ...originalTestimonials];

  const handleNext = () => { if (!isTransitioning) return; setCurrentIndex(prev => prev + 1); };
  const handlePrev = () => { if (!isTransitioning) return; setCurrentIndex(prev => prev - 1); };

  const handleTransitionEnd = () => {
    if (currentIndex >= originalTestimonials.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - originalTestimonials.length);
    } else if (currentIndex < originalTestimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + originalTestimonials.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) { setTimeout(() => setIsTransitioning(true), 50); }
  }, [isTransitioning]);

  return (
    <div className="overflow-x-hidden pt-16 bg-white">
      <SEO 
        title="Gana con la Élite de los Pronósticos Deportivos | BetMaster"
        description="Sigue a los tipsters más rentables con estadísticas 100% verificadas. Maximiza tus beneficios con análisis de datos reales."
      />

      {/* Premium Hero Section */}
      <section className="relative pt-12 lg:py-24 bg-white overflow-hidden">
        {/* Abstract backgrounds for depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="page-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Content */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 rounded-full mb-8 border border-primary/20 animate-fade-in">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Verification Engine v2.0</span>
              </div>
              <h1 className="text-4xl lg:text-6xl mb-8 leading-[1.05] text-[#050505] font-black">
                Domina el Juego con <br />
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic pr-10 inline-block overflow-visible">Pronósticos Deportivos&nbsp;</span>
              </h1>
              <p className="text-lg lg:text-xl text-light-500 mb-12 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                Sigue a los pronosticadores de fútbol más rentables con estadísticas 100% verificadas (Yield, Profit, Win Rate). Analiza cuotas de valor, utiliza calculadoras de sistemas y maximiza tus apuestas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Link to="/tipsters" className="btn-primary flex items-center gap-3">
                  Explorar Pronósticos <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/live" className="px-8 py-3 bg-light-100 text-light-600 border-2 border-light-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-light-200 hover:border-light-300 hover:text-[#050505] transition-all duration-300 shadow-sm">
                  Resultados en Vivo
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-light-100 pt-8">
                <div>
                  <div className="text-2xl font-black text-[#050505]">12K+</div>
                  <div className="text-[10px] text-light-400 font-black uppercase tracking-widest">Usuarios Activos</div>
                </div>
                <div className="w-px h-8 bg-light-100"></div>
                <div>
                  <div className="text-2xl font-black text-[#050505]">1.2M</div>
                  <div className="text-[10px] text-light-400 font-black uppercase tracking-widest">Picks Auditados</div>
                </div>
                <div className="w-px h-8 bg-light-100"></div>
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />)}
                </div>
              </div>
            </div>
            
            {/* Right Image with Floating UI Elements - THE "WOW" FACTOR */}
            <div className="lg:w-2/5 w-full relative">
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/5] lg:aspect-[3/4]">
                <img src="/images/plataforma-pronosticos-deportivos-hero.webp" alt="Stadium Analysis" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Card 1: Tipster Stats */}
              <div className="absolute -left-12 top-1/4 z-20 bg-white p-5 rounded-3xl shadow-xl border border-light-100 animate-float hidden lg:block w-48">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary" /></div>
                  <div>
                    <div className="text-[9px] font-black text-light-400 uppercase">Top Yield</div>
                    <div className="text-lg font-black text-[#050505]">+34.5%</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-light-50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full"></div>
                </div>
              </div>

              {/* Floating Card 2: Live Alert */}
              <div className="absolute -right-8 bottom-1/4 z-20 bg-white p-5 rounded-3xl shadow-xl border border-light-100 animate-float-delayed hidden lg:block w-52">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center"><Zap className="w-5 h-5 text-success" /></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-light-400 uppercase">Live Pick</div>
                    <div className="text-sm font-black text-[#050505]">Real Madrid vs Barça</div>
                    <div className="text-[8px] text-success font-bold uppercase tracking-widest">Valor Detectado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Distinct Container */}
      <section className="py-20 bg-white relative z-20">
        <div className="page-container">
          <div className="bg-[#F8FAFC] rounded-[3rem] p-8 lg:p-10 border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-success" />, title: "100% Verificado", desc: "Auditoría en tiempo real de cada pick." },
                { icon: <TrendingUp className="w-6 h-6 text-primary" />, title: "+25.8% Yield", desc: "Media de analistas profesionales." },
                { icon: <Target className="w-6 h-6 text-secondary" />, title: "IA Prediction", desc: "Modelos xG y Big Data avanzados." }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="mb-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">{stat.icon}</div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">{stat.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Banner - Refined Light Section */}
      <section className="bg-light-100 py-20 lg:py-24 relative overflow-hidden border-y border-light-200">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="page-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
                <Send className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Comunidad Elite en Telegram</span>
              </div>
              <h2 className="mb-6">
                Únete a la Comunidad VIP <br />
                <span className="text-primary italic">y Recibe Alertas en Directo</span>
              </h2>
              <p className="text-light-500 text-lg font-medium leading-relaxed">
                Más de 12,000 apostadores ya reciben nuestros mejores pronósticos directamente en su móvil. Totalmente gratis, auditado y verificado.
              </p>
            </div>
            
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-3">
              Unirme Ahora <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Tipster Section - Standard Width & Balanced Height */}
      <section className="py-20 bg-light-50 border-y border-light-200">
        <div className="page-container">
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-lg border border-light-200 flex flex-col lg:flex-row items-stretch">
            <div className="lg:w-2/5 relative h-72 lg:h-auto">
              <img src="/images/tipster-profesional-perfil-alex.webp" alt="Alex Master" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Reconocimiento Mensual</span>
                </div>
                <h2 className="text-4xl font-black text-[#050505] mb-2 tracking-tight">Tipster del Mes</h2>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-light-600">Alex BetMaster</span>
                  <span className="px-2.5 py-1 bg-primary text-[#050505] text-[8px] rounded font-black uppercase tracking-widest">Nivel Pro</span>
                </div>
              </div>
              <p className="text-lg text-light-500 italic font-medium leading-relaxed mb-10 border-l-4 border-primary pl-6">
                "{t('tipsterMonth.quote')}"
              </p>
              <div className="grid grid-cols-3 gap-6 p-8 bg-light-50 rounded-3xl border border-light-100 text-center">
                <div>
                  <div className="text-3xl font-black text-primary mb-1">+34.5%</div>
                  <div className="text-[10px] text-light-400 font-black uppercase tracking-widest">Yield</div>
                </div>
                <div className="border-x border-light-200">
                  <div className="text-3xl font-black text-primary mb-1">+158u</div>
                  <div className="text-[10px] text-light-400 font-black uppercase tracking-widest">Profit</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[#050505] mb-1">82%</div>
                  <div className="text-[10px] text-light-400 font-black uppercase tracking-widest">Win Rate</div>
                </div>
              </div>
              <Link to="/tipster/1" className="btn-primary self-start mt-8">Ver Perfil Auditado</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Classic Slider with Lateral Fades */}
      <section className="py-20 overflow-hidden relative bg-white">
        <div className="page-container text-center mb-12">
          <h2 className="mb-2 tracking-tight">Voces de la Comunidad</h2>
          <p className="text-base text-light-500 font-medium max-w-xl mx-auto">Nuestra transparencia es la base de su rentabilidad diaria.</p>
        </div>
        
        <div className="relative w-full max-w-[1500px] mx-auto px-4 lg:px-12">
          {/* Lateral Fade Overlays */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none hidden lg:block"></div>
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none hidden lg:block"></div>

          <div className="overflow-visible py-8">
            <div 
              className={`flex transition-transform ${isTransitioning ? 'duration-700 ease-in-out' : 'duration-0'}`}
              style={{ transform: `translateX(calc(-${currentIndex * 100}% / ${window.innerWidth >= 1024 ? 3 : 1}))` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((test, i) => {
                const isActive = window.innerWidth >= 1024 ? (i === currentIndex + 1) : (i === currentIndex);
                return (
                  <div key={i} className="w-full lg:w-1/3 flex-shrink-0 px-5">
                    <div className={`bg-white p-10 rounded-[2.5rem] shadow-lg border transition-all duration-500 flex flex-col h-full relative
                      ${isActive ? 'border-primary/20 scale-100 opacity-100 z-10' : 'border-light-50 scale-90 opacity-20 blur-[1px]'}`}>
                      <Quote className={`w-10 h-10 mb-8 ${isActive ? 'text-primary' : 'text-light-200'}`} />
                      <p className="text-base text-light-800 italic mb-10 flex-grow font-medium leading-relaxed">"{test.text}"</p>
                      <div className="flex items-center gap-4 pt-8 border-t border-light-100">
                        <img src={`https://i.pravatar.cc/100?img=${test.img}`} alt={test.name} className="w-12 h-12 rounded-2xl object-cover shadow-md" />
                        <div>
                          <div className="font-black text-[#050505] text-sm">{test.name}</div>
                          <div className="text-[10px] text-primary font-black uppercase tracking-widest">{test.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <button onClick={handlePrev} className="w-14 h-14 rounded-2xl bg-white border border-light-200 flex items-center justify-center text-[#050505] hover:bg-primary hover:text-[#050505] transition-all shadow-xl"><ChevronLeft className="w-7 h-7" /></button>
            <button onClick={handleNext} className="w-14 h-14 rounded-2xl bg-white border border-light-200 flex items-center justify-center text-[#050505] hover:bg-primary hover:text-[#050505] transition-all shadow-xl"><ChevronRight className="w-7 h-7" /></button>
          </div>
        </div>
      </section>

      {/* Trust Section - Balanced Professional Scale */}
      <section className="py-24 bg-white border-t border-light-200">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-success/10 rounded-full mb-6 border border-success/20 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-[10px] font-black uppercase tracking-widest text-success">Transparencia Radical</span>
              </div>
              <h2 className="mb-8 leading-tight tracking-tighter font-black text-[#050505]">
                Tu Seguridad es Nuestra <span className="text-primary italic">Obsesión</span>
              </h2>
              <p className="text-light-500 text-lg font-medium leading-relaxed mb-10 max-w-lg">Auditamos cada pronóstico para garantizar la veracidad absoluta de los datos presentados. No somos una casa de apuestas; somos tu equipo de auditoría.</p>
              
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center"><BarChart3 className="w-6 h-6 text-primary" /></div>
                  <h4 className="text-lg font-black text-[#050505] uppercase tracking-tight">Auditoría en Vivo</h4>
                  <p className="text-sm text-light-400 font-medium leading-relaxed">Verificación instantánea con cuotas de mercado real antes de cada publicación.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-primary" /></div>
                  <h4 className="text-lg font-black text-[#050505] uppercase tracking-tight">Ranking Élite</h4>
                  <p className="text-sm text-light-400 font-medium leading-relaxed">Solo los mejores tipsters con yield histórico positivo entran en el ranking.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-light-50 p-12 lg:p-16 rounded-[4rem] border border-light-200 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="space-y-12">
                <div>
                  <div className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Métrica Global Auditada</div>
                  <div className="text-5xl lg:text-6xl font-black text-[#050505] tracking-tighter mb-1">1.2M+</div>
                  <div className="text-base font-medium text-light-400">Picks Verificados con Éxito</div>
                </div>
                <div className="h-px bg-light-200"></div>
                <div>
                  <div className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3">Certificación de Precisión</div>
                  <div className="text-5xl lg:text-6xl font-black text-[#050505] tracking-tighter mb-1">99.9%</div>
                  <div className="text-base font-medium text-light-400">Datos Auditados en Tiempo Real</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner - Centered & Concise */}
      <section className="bg-primary py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-black/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="page-container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
              <Target className="w-4 h-4 text-[#050505]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#050505]">¿Eres un Analista Experto?</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#050505] mb-6">
              ¿Listo para Unirte a la Comunidad?
            </h2>
            <p className="text-[#050505]/90 text-lg mb-10 max-w-2xl mx-auto font-medium">
              Únete a miles de usuarios que ya están maximizando sus beneficios con nuestras herramientas y pronósticos verificados.
            </p>
            <Link to="/register" className="inline-flex bg-white text-primary px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest border border-transparent hover:bg-light-100 hover:border-light-200 hover:text-[#050505] transition-all items-center gap-4 group">
              Registrarme Ahora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
