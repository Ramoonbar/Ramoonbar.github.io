import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrendingUp, Target, Star, Award, Calendar, ChevronRight, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import LoginRequiredModal from '../components/LoginRequiredModal';
import { useAuth } from '../context/AuthContext';

const TipsterProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user, setIsLoginOpen } = useAuth();
  const [isLoginReqOpen, setIsLoginReqOpen] = useState(false);
  
  // Mock profile data
  const profile = {
    name: 'Alex BetMaster',
    image: '/images/tipster-profesional-perfil-alex.webp',
    level: t('tipsterMonth.badge'),
    yield: 14.5,
    winRate: 68,
    profit: 125.4,
    totalPicks: 342,
    bio: t('tipsterMonth.quote'),
    recentPicks: [
      { id: 101, match: 'Real Madrid vs Man City', pick: 'Más de 2.5 goles', odds: 1.85, status: 'WIN', date: '2024-05-01' },
      { id: 102, match: 'Bayern vs Arsenal', pick: 'Arsenal gana (Hnd 0)', odds: 2.10, status: 'WIN', date: '2024-05-02' },
      { id: 103, match: 'PSG vs Dortmund', pick: 'Ambos marcan', odds: 1.70, status: 'LOSS', date: '2024-05-03' },
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFollow = () => {
    if (user) {
      alert('¡Siguiendo a ' + profile.name + '!');
    } else {
      setIsLoginReqOpen(true);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO title={`Perfil de ${profile.name} | BetMaster`} description={`${t('tipsterProfile.eliteStats')} de ${profile.name}.`} />
      
      <div className="page-container">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Profile */}
          <div className="card mb-8 overflow-hidden border-none p-0 shadow-2xl bg-white rounded-[2.5rem]">
            <div className="h-32 bg-gradient-to-r from-primary to-primary-dark"></div>
            <div className="px-8 pb-8 -mt-12">
              <div className="flex flex-col md:flex-row items-end gap-6 mb-6">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl relative">
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-success text-white p-1.5 rounded-lg shadow-lg">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-black text-light-900 tracking-tight">{profile.name}</h1>
                  <p className="text-primary font-black uppercase tracking-widest text-sm">{profile.level}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleFollow} className="btn-primary px-8 rounded-xl shadow-lg shadow-primary/20 transform hover:scale-105 transition-all">
                    {t('tipsterProfile.follow')}
                  </button>
                  <button className="p-4 rounded-xl border-2 border-light-100 hover:bg-light-50 transition-all text-light-400 hover:text-primary">
                    <Activity className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <p className="text-light-600 max-w-2xl leading-relaxed italic font-medium">"{profile.bio}"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="card bg-white rounded-3xl p-8 border border-light-200">
                <h3 className="font-black text-light-900 mb-6 border-b-2 border-primary/10 pb-4 uppercase tracking-widest text-xs">{t('tipsterProfile.eliteStats')}</h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-light-500 font-bold">{t('tipsterProfile.yield')}</span>
                    <span className="text-xl font-black text-success">+{profile.yield}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-light-500 font-bold">{t('tipsterProfile.winRate')}</span>
                    <span className="text-xl font-black text-light-900">{profile.winRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-light-500 font-bold">{t('tipsterProfile.profit')}</span>
                    <span className="text-xl font-black text-success">+{profile.profit} Uds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-light-500 font-bold">{t('tipsterProfile.picks')}</span>
                    <span className="text-xl font-black text-light-900">{profile.totalPicks}</span>
                  </div>
                </div>
              </div>

              <div className="card bg-light-900 text-white border-none rounded-3xl p-8 shadow-xl">
                <h3 className="font-black mb-6 flex items-center uppercase tracking-widest text-xs">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  {t('tipsterProfile.recentActivity')}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-bold uppercase tracking-tighter">Mayo 2024</span>
                    <span className="text-success font-black">+12.4 Uds</span>
                  </div>
                  <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div className="bg-gradient-to-r from-success to-primary h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content: Picks */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-black text-light-900 tracking-tight">{t('tipsterProfile.recentPicks')}</h2>
              
              {profile.recentPicks.map(pick => (
                <div key={pick.id} className="card bg-white rounded-3xl p-8 border border-light-200 hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-light-900 text-xl tracking-tight group-hover:text-primary transition-colors">{pick.match}</h4>
                      <p className="text-light-400 text-xs font-bold uppercase tracking-widest mt-1">{pick.date}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black tracking-widest ${pick.status === 'WIN' ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'}`}>
                      {pick.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-light-50 p-6 rounded-2xl border border-light-100">
                    <div>
                      <div className="text-[10px] text-light-400 font-black uppercase tracking-[0.2em] mb-2">{t('tipsterProfile.market')}</div>
                      <div className="font-black text-light-900 text-lg">{pick.pick}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-light-400 font-black uppercase tracking-[0.2em] mb-2">{t('tipsterProfile.odds')}</div>
                      <div className="text-3xl font-display font-black text-primary">@{pick.odds}</div>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full py-5 border-2 border-dashed border-light-200 rounded-[2rem] text-light-400 font-black hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center group">
                {t('tipsterProfile.loadMore')} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <LoginRequiredModal 
        isOpen={isLoginReqOpen} 
        onClose={() => setIsLoginReqOpen(false)} 
        onLogin={() => setIsLoginOpen(true)}
        title="¿Quieres seguir a este Tipster?"
        message="Para recibir notificaciones de sus nuevos pronósticos y guardar tu lista de seguimiento, primero debes iniciar sesión."
      />
    </div>
  );
};

export default TipsterProfile;
