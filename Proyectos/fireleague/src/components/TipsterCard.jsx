import React from 'react';
import { Star, TrendingUp, Target, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TipsterCard = ({ tipster }) => {
  const { t } = useTranslation();
  return (
    <div className="card hover:border-primary/50 transition-colors duration-300 group flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-light-100 flex items-center justify-center border-2 border-primary overflow-hidden">
              {tipster.image ? (
                <img src={tipster.image} alt={tipster.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-display font-bold text-light-900">{tipster.name.charAt(0)}</span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
              <Award className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-light-900 group-hover:text-primary transition-colors">{tipster.name}</h3>
            <p className="text-sm text-light-600">{tipster.level} {t('tipsterCard.member')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-light-50 p-3 rounded-lg border border-light-200">
            <div className="flex items-center text-light-600 text-sm mb-1">
              <TrendingUp className="w-4 h-4 mr-1 text-success" /> Yield
            </div>
            <div className="text-lg font-bold text-success">+{tipster.yield}%</div>
          </div>
          <div className="bg-light-50 p-3 rounded-lg border border-light-200">
            <div className="flex items-center text-light-600 text-sm mb-1">
              <Target className="w-4 h-4 mr-1 text-primary" /> Win Rate
            </div>
            <div className="text-lg font-bold text-light-900">{tipster.winRate}%</div>
          </div>
          <div className="bg-light-50 p-3 rounded-lg border border-light-200">
            <div className="flex items-center text-light-600 text-sm mb-1">
              <Star className="w-4 h-4 mr-1 text-warning" /> {t('tipsterCard.avgOdds')}
            </div>
            <div className="text-lg font-bold text-light-900">{tipster.avgOdds}</div>
          </div>
          <div className="bg-light-50 p-3 rounded-lg border border-light-200">
            <div className="flex items-center text-light-600 text-sm mb-1">
              Profit
            </div>
            <div className="text-lg font-bold text-success">+{tipster.profit} Uds</div>
          </div>
        </div>
      </div>

      <Link to={`/tipster/${tipster.id}`} className="w-full btn-primary py-3 text-center block">
        {t('tipsterCard.viewPicks', { count: tipster.totalPicks })}
      </Link>
    </div>
  );
};

export default TipsterCard;
