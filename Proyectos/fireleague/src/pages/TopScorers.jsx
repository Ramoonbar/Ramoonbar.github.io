import React, { useState } from 'react';
import { Activity, User, Target, ChevronRight, Search, Trophy, Globe, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const leaguePlayers = {
  'LaLiga': [
    { name: 'Kylian Mbappé', team: 'Real Madrid', goals: 24, played: 28, image: 'https://i.pravatar.cc/150?u=mbappe' },
    { name: 'Vedat Muriqi', team: 'RCD Mallorca', goals: 21, played: 33, image: 'https://i.pravatar.cc/150?u=muriqi' },
    { name: 'Lamine Yamal', team: 'FC Barcelona', goals: 16, played: 28, image: 'https://i.pravatar.cc/150?u=lamine' },
    { name: 'Ante Budimir', team: 'CA Osasuna', goals: 16, played: 33, image: 'https://i.pravatar.cc/150?u=budimir' },
    { name: 'Vinícius Júnior', team: 'Real Madrid', goals: 15, played: 33, image: 'https://i.pravatar.cc/150?u=vini' },
    { name: 'Robert Lewandowski', team: 'FC Barcelona', goals: 13, played: 27, image: 'https://i.pravatar.cc/150?u=lewy' },
  ],
  'Premier League': [
    { name: 'Erling Haaland', team: 'Man City', goals: 28, played: 26, image: 'https://i.pravatar.cc/150?u=haaland' },
    { name: 'Mohamed Salah', team: 'Liverpool', goals: 19, played: 27, image: 'https://i.pravatar.cc/150?u=salah' },
    { name: 'Ollie Watkins', team: 'Aston Villa', goals: 18, played: 30, image: 'https://i.pravatar.cc/150?u=watkins' },
    { name: 'Bukayo Saka', team: 'Arsenal', goals: 16, played: 29, image: 'https://i.pravatar.cc/150?u=saka' },
    { name: 'Cole Palmer', team: 'Chelsea', goals: 16, played: 25, image: 'https://i.pravatar.cc/150?u=palmer' },
  ],
  'Bundesliga': [
    { name: 'Harry Kane', team: 'Bayern Munich', goals: 31, played: 27, image: 'https://i.pravatar.cc/150?u=kane' },
    { name: 'Serhou Guirassy', team: 'Stuttgart', goals: 24, played: 22, image: 'https://i.pravatar.cc/150?u=guirassy' },
    { name: 'Loïs Openda', team: 'RB Leipzig', goals: 19, played: 27, image: 'https://i.pravatar.cc/150?u=openda' },
    { name: 'Florian Wirtz', team: 'Bayer Leverkusen', goals: 11, played: 27, image: 'https://i.pravatar.cc/150?u=wirtz' },
  ],
  'Serie A': [
    { name: 'Lautaro Martínez', team: 'Inter Milan', goals: 23, played: 26, image: 'https://i.pravatar.cc/150?u=lautaro' },
    { name: 'Dušan Vlahović', team: 'Juventus', goals: 15, played: 25, image: 'https://i.pravatar.cc/150?u=vlahovic' },
    { name: 'Olivier Giroud', team: 'AC Milan', goals: 12, played: 26, image: 'https://i.pravatar.cc/150?u=giroud' },
    { name: 'Paulo Dybala', team: 'AS Roma', goals: 12, played: 20, image: 'https://i.pravatar.cc/150?u=dybala' },
  ],
  'Champions League': [
    { name: 'Erling Haaland', team: 'Man City', goals: 8, played: 7, image: 'https://i.pravatar.cc/150?u=haaland' },
    { name: 'Harry Kane', team: 'Bayern Munich', goals: 7, played: 8, image: 'https://i.pravatar.cc/150?u=kane' },
    { name: 'Kylian Mbappé', team: 'PSG', goals: 6, played: 8, image: 'https://i.pravatar.cc/150?u=mbappe' },
    { name: 'Antoine Griezmann', team: 'Atlético de Madrid', goals: 6, played: 8, image: 'https://i.pravatar.cc/150?u=griezmann' },
  ],
  'Mundial': [
    { name: 'Lionel Messi', team: 'Argentina', goals: 7, played: 7, image: 'https://i.pravatar.cc/150?u=messi' },
    { name: 'Kylian Mbappé', team: 'France', goals: 8, played: 7, image: 'https://i.pravatar.cc/150?u=mbappe' },
    { name: 'Julián Álvarez', team: 'Argentina', goals: 4, played: 7, image: 'https://i.pravatar.cc/150?u=alvarez' },
    { name: 'Olivier Giroud', team: 'France', goals: 4, played: 6, image: 'https://i.pravatar.cc/150?u=giroud' },
  ]
};

const TopScorers = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('LaLiga');
  const [selectedSeason, setSelectedSeason] = useState('2026');
  const [statType, setStatType] = useState('Goleadores'); 
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('statValue');
  const [sortDir, setSortDir] = useState('desc');

  const leagues = ['LaLiga', 'Premier League', 'Bundesliga', 'Serie A', 'Champions League', 'Mundial'];
  const seasons = ['2026', '2025', '2024', '2023'];
  const statTypes = ['Goleadores', 'Asistencias', 'Tarjetas amarillas', 'Tarjetas rojas', 'Pases', 'Paradas'];

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  };

  const getScorers = () => {
    let base = leaguePlayers[filter] || leaguePlayers['LaLiga'];
    
    if (statType === 'Paradas') {
      base = [
        { name: 'Thibaut Courtois', team: 'Real Madrid', played: 34, image: 'https://i.pravatar.cc/150?u=courtois', goals: 0 },
        { name: 'Ter Stegen', team: 'FC Barcelona', played: 33, image: 'https://i.pravatar.cc/150?u=stegen', goals: 0 },
        { name: 'Jan Oblak', team: 'Atlético de Madrid', played: 35, image: 'https://i.pravatar.cc/150?u=oblak', goals: 0 },
        { name: 'Manuel Neuer', team: 'Bayern Munich', played: 28, image: 'https://i.pravatar.cc/150?u=neuer', goals: 0 },
        { name: 'Ederson', team: 'Man City', played: 33, image: 'https://i.pravatar.cc/150?u=ederson', goals: 0 },
        { name: 'Alisson Becker', team: 'Liverpool', played: 32, image: 'https://i.pravatar.cc/150?u=alisson', goals: 0 },
      ];
    }
    
    let stats = base.map(s => {
      let value = s.goals;
      if (statType === 'Asistencias') value = Math.max(1, Math.floor(Math.random() * 12) + 2);
      if (statType === 'Tarjetas amarillas') value = Math.floor(Math.random() * 8) + 1;
      if (statType === 'Tarjetas rojas') value = Math.floor(Math.random() * 2);
      if (statType === 'Pases') value = Math.floor(Math.random() * 1500) + 1000;
      if (statType === 'Paradas') value = Math.floor(Math.random() * 60) + 70;
      
      return { ...s, statValue: value };
    });

    stats.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === 'string') { valA = valA.toLowerCase(); valB = valB.toLowerCase(); }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    if (search) {
      stats = stats.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.team.toLowerCase().includes(search.toLowerCase())
      );
    }

    return stats;
  };

  const currentScorers = getScorers();

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title={`${t('scorers.title')} | BetMaster`}
        description={t('scorers.subtitle')}
      />
      <div className="page-container">
        
        <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-light-900 mb-4 flex items-center justify-center lg:justify-start">
              <Activity className="w-10 h-10 mr-4 text-primary" />
              {t('scorers.title')} <span className="text-primary ml-3">{statType}</span>
            </h1>
            <p className="text-xl text-light-600 font-medium">{t('scorers.subtitle')}</p>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 w-full max-w-[95vw] lg:w-auto hide-scrollbar">
              {leagues.map(l => (
                <button 
                  key={l}
                  onClick={() => setFilter(l)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-extrabold transition-all ${filter === l ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-light-600 border border-light-200 hover:border-primary/50 hover:text-primary'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="flex w-full lg:w-auto gap-4">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={t('scorers.searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-light-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm font-bold transition-all"
                />
              </div>
              <select 
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="bg-white text-light-900 text-base border-2 border-light-200 rounded-2xl px-5 py-3 font-extrabold outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm appearance-none cursor-pointer"
              >
                {seasons.map(s => (
                  <option key={s} value={s}>{t('live.season')} {s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-8 mb-4 hide-scrollbar">
          {statTypes.map(st => (
            <button 
              key={st}
              onClick={() => setStatType(st)}
              className={`whitespace-nowrap px-8 py-4 rounded-2xl text-sm font-extrabold transition-all ${statType === st ? 'bg-light-900 text-white shadow-2xl' : 'bg-white text-light-500 border border-light-200 hover:bg-light-50 hover:text-light-900'}`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="card bg-white rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-light-200">
          <div className="bg-light-900 text-white p-8 shrink-0 flex justify-between items-center border-b-8 border-primary">
            <h3 className="font-extrabold font-display flex items-center text-2xl tracking-tight">
              {filter === 'Mundial' ? <Globe className="w-7 h-7 mr-3 text-warning" /> : <Trophy className="w-7 h-7 mr-3 text-warning" />}
              Top {statType} {filter} ({selectedSeason})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-light-400 bg-light-50 border-b border-light-200 uppercase tracking-widest font-extrabold">
                <tr>
                  <th className="px-8 py-6 text-center">Pos</th>
                  <th className="px-8 py-6 cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('name')}>
                    {t('scorers.player')} {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-8 py-6 hidden md:table-cell cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('team')}>
                    {t('scorers.team')} {sortBy === 'team' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-8 py-6 text-center cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort('statValue')}>
                    {statType.toUpperCase()} {sortBy === 'statValue' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-8 py-6 text-center hidden sm:table-cell">{t('scorers.matches')}</th>
                  <th className="px-8 py-6 text-center font-bold">{t('scorers.avg')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-100">
                {currentScorers.map((player, idx) => (
                  <tr key={idx} className="hover:bg-light-50 transition-all group">
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-lg ${idx === 0 ? 'bg-warning/20 text-warning-dark shadow-lg shadow-warning/10' : 'bg-light-100 text-light-600'}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-5">
                        <div className="relative">
                          <img src={player.image} alt={player.name} className="w-14 h-14 rounded-2xl bg-light-200 object-cover shadow-md border-2 border-white ring-4 ring-light-100 group-hover:ring-primary/10 transition-all" />
                          {idx === 0 && <div className="absolute -top-2 -right-2 bg-warning text-white p-1 rounded-lg shadow-lg"><Star className="w-3 h-3 fill-current" /></div>}
                        </div>
                        <span className="font-extrabold text-light-900 text-xl group-hover:text-primary transition-colors">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-light-500 font-bold text-lg hidden md:table-cell">
                      {player.team}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-2xl font-display font-black text-primary bg-primary/5 px-5 py-2 rounded-2xl inline-block min-w-[4rem] shadow-sm">
                        {player.statValue}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center text-light-500 font-bold text-lg hidden sm:table-cell">
                      {player.played}
                    </td>
                    <td className="px-8 py-6 text-center font-black text-light-800 text-lg">
                      {player.played > 0 ? (player.statValue / player.played).toFixed(2) : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScorers;
