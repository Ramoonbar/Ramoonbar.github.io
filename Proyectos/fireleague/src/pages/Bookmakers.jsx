import React, { useState } from 'react';
import { ShieldCheck, Star, ExternalLink, CreditCard, Bitcoin, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';

const mockBookmakers = [
  { id: 1, name: 'Bet365', rating: 4.9, bonus: 'Hasta 100€ en Créditos', highlight: 'Mejor para En Vivo', payments: ['paypal', 'applepay', 'bizum'], link: '#' },
  { id: 2, name: '1xBet', rating: 4.7, bonus: 'Bono del 100% hasta 130€', highlight: 'Mejores Cuotas', payments: ['crypto', 'bizum', 'card'], link: '#' },
  { id: 3, name: 'William Hill', rating: 4.5, bonus: 'Apuesta Gratis de 20€', highlight: 'Excelentes Supercuotas', payments: ['paypal', 'card'], link: '#' },
  { id: 4, name: 'Stake', rating: 4.8, bonus: 'Cashback VIP', highlight: 'Cripto Apuestas #1', payments: ['crypto'], link: '#' },
];

const PaymentIcon = ({ type }) => {
  const { t } = useTranslation();
  switch(type) {
    case 'paypal': return <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">PayPal</div>;
    case 'applepay': return <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center"><Smartphone className="w-3 h-3 mr-1"/> Apple Pay</div>;
    case 'bizum': return <div className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded font-bold">Bizum</div>;
    case 'crypto': return <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded flex items-center"><Bitcoin className="w-3 h-3 mr-1"/> {t('bookmakers.payments.crypto')}</div>;
    case 'card': return <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded flex items-center"><CreditCard className="w-3 h-3 mr-1"/> {t('bookmakers.payments.card')}</div>;
    default: return null;
  }
};

const Bookmakers = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (f) => {
    setFilter(f);
  };

  const filteredBookies = filter === 'all' ? mockBookmakers : mockBookmakers.filter(b => b.payments.includes(filter));

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title={t('bookmakers.title')} 
        description={t('bookmakers.subtitle')}
      />
      <div className="page-container">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-light-900 mb-4 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 mr-3 text-primary" />
            {t('bookmakers.title').split(' ')[0]} <span className="text-primary ml-2">{t('bookmakers.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-light-600 max-w-2xl mx-auto">
            {t('bookmakers.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button onClick={() => handleFilterChange('all')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${filter === 'all' ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-light-600 border border-light-200 hover:border-primary'}`}>{t('bookmakers.all')}</button>
          <button onClick={() => handleFilterChange('bizum')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${filter === 'bizum' ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-light-600 border border-light-200 hover:border-primary'}`}>{t('bookmakers.bizum')}</button>
          <button onClick={() => handleFilterChange('paypal')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${filter === 'paypal' ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-light-600 border border-light-200 hover:border-primary'}`}>{t('bookmakers.paypal')}</button>
          <button onClick={() => handleFilterChange('crypto')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${filter === 'crypto' ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-light-600 border border-light-200 hover:border-primary'}`}>{t('bookmakers.crypto')}</button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="card flex items-center justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredBookies.length === 0 ? (
            <div className="card text-center py-12 text-light-400">
              <p>{t('bookmakers.noResults')}</p>
            </div>
          ) : filteredBookies.map((bookie, index) => (
            <div key={bookie.id} className="card flex flex-col md:flex-row items-center justify-between p-6 hover:shadow-lg transition-all border-l-4 border-l-primary group">
              
              <div className="flex items-center w-full md:w-1/4 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-light-100 flex items-center justify-center font-bold text-light-400 mr-4">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-light-900">{bookie.name}</h3>
                  <div className="flex items-center text-sm text-warning mt-1">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-bold text-light-800">{bookie.rating}</span> / 5.0
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/4 mb-4 md:mb-0 text-center md:text-left">
                <span className="text-xs uppercase tracking-wider font-bold text-primary mb-1 block">{t('bookmakers.bonusLabel')}</span>
                <span className="font-bold text-light-900 text-lg">{bookie.bonus}</span>
              </div>

              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <span className="text-xs text-light-400 block mb-2 text-center md:text-left">{t('bookmakers.paymentLabel')}</span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {bookie.payments.map(p => <PaymentIcon key={p} type={p} />)}
                </div>
              </div>

              <div className="w-full md:w-auto">
                <a 
                  href={bookie.link} 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="btn-primary w-full md:w-auto flex items-center justify-center py-3 px-8 text-lg"
                >
                  {t('bookmakers.viewBonus')} <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmakers;
