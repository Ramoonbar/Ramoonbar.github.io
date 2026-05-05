import React, { useState, useEffect, useRef } from 'react';
import TipsterCard from '../components/TipsterCard';
import PickFormModal from '../components/PickFormModal';
import LoginRequiredModal from '../components/LoginRequiredModal';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';

const mockTipsters = [
  { id: 1, name: 'Alex BetMaster', level: 'Premium', yield: 14.5, winRate: 68, avgOdds: 1.85, profit: 125.4, totalPicks: 342, image: '/images/tipster-profesional-perfil-alex.webp', date: '2022' },
  { id: 2, name: 'Soccer Guru', level: 'Gold', yield: 9.2, winRate: 62, avgOdds: 1.95, profit: 84.0, totalPicks: 156, image: '/images/tipster-perfil-soccer-guru.webp', date: '2023' },
  { id: 3, name: 'Data Analyst', level: 'Free', yield: 5.1, winRate: 55, avgOdds: 2.10, profit: 45.5, totalPicks: 89, date: '2024' },
];

const Tipsters = () => {
  const { t } = useTranslation();
  const { user, setIsLoginOpen } = useAuth();
  const [isPickModalOpen, setIsPickModalOpen] = useState(false);
  const [isLoginReqOpen, setIsLoginReqOpen] = useState(false);
  const [filter, setFilter] = useState('Top Yield'); // 'Top Yield', 'Más Profit', 'Nuevos'
  const cardsRef = useRef(null);

  const filters = [
    { key: 'Top Yield', label: t('tipsters.filters.yield') },
    { key: 'Más Profit', label: t('tipsters.filters.profit') },
    { key: 'Nuevos', label: t('tipsters.filters.new') }
  ];

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [filter]);

  const filteredTipsters = [...mockTipsters].sort((a, b) => {
    if (filter === 'Top Yield') return b.yield - a.yield;
    if (filter === 'Más Profit') return b.profit - a.profit;
    if (filter === 'Nuevos') return b.date.localeCompare(a.date);
    return 0;
  });

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <SEO 
        title={t('tipsters.rankingTitle')} 
        description={t('tipsters.rankingSubtitle')}
      />
      <div className="page-container">
        
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-light-900 mb-4">
            {t('tipsters.rankingTitle').split(' ')[0]} <span className="text-primary">{t('tipsters.rankingTitle').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-light-600 max-w-2xl mx-auto mb-6">
            {t('tipsters.rankingSubtitle')}
          </p>
          <button 
            onClick={() => {
              if (user) {
                setIsPickModalOpen(true);
              } else {
                setIsLoginReqOpen(true);
              }
            }}
            className="btn-primary flex items-center mx-auto transition-transform transform hover:scale-105 shadow-xl"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> {t('tipsters.postPick')}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {filters.map(f => (
            <button 
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${filter === f.key ? 'bg-primary text-white' : 'bg-white border border-light-200 text-light-600 hover:text-primary hover:border-primary/50'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTipsters.map(tipster => (
            <TipsterCard key={tipster.id} tipster={tipster} />
          ))}
        </div>

        <PickFormModal isOpen={isPickModalOpen} onClose={() => setIsPickModalOpen(false)} />
        
        <LoginRequiredModal 
          isOpen={isLoginReqOpen} 
          onClose={() => setIsLoginReqOpen(false)} 
          onLogin={() => setIsLoginOpen(true)}
          title="¿Quieres subir un pronóstico?"
          message="Para registrar tus picks y aparecer en el ranking oficial, primero debes iniciar sesión con tu cuenta de Tipster."
        />
      </div>
    </div>
  );
};

export default Tipsters;
