import React, { useState } from 'react';
import { Activity, Trophy, MapPin, ChevronRight, Calendar, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchLiveMatches, fetchStandings } from '../services/api';

const LiveScores = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('2026');
  const leagues = ['All', 'Mundial', 'LaLiga', 'Premier League', 'Bundesliga', 'Serie A', 'Champions League'];
  const seasons = ['2026', '2025', '2024', '2023'];

  // Partidos en Vivo (API Real para todas las ligas)
  const { data: realMatches, isLoading: isLoadingMatches } = useQuery({
    queryKey: ['liveMatches', filter],
    queryFn: () => fetchLiveMatches(filter),
    refetchInterval: 30000,
  });

  // Clasificación Real (API Real para todas las ligas)
  const { data: realStandings, isLoading: isLoadingStandings } = useQuery({
    queryKey: ['standings', filter, selectedSeason],
    queryFn: () => fetchStandings(filter, selectedSeason),
  });

  const handleFilterChange = (league) => {
    setFilter(league);
  };

  const combinedMatches = realMatches || [];
  
  // Lógica de Ranking Global vs Local
  let currentStandings = realStandings || [];
  let rankingTitle = filter === 'All' 
    ? `${t('live.globalTeamTitle')} (${selectedSeason})` 
    : `${t('live.standings')} ${filter} (${selectedSeason})`;

  if (currentStandings.length > 0) {
    currentStandings = currentStandings.slice(0, 7); // Show top 7 by default
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title={t('live.title')} 
        description={t('live.subtitle')}
      />
      <div className="page-container">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-light-900 mb-2 flex items-center">
              <Activity className="w-8 h-8 mr-3 text-primary animate-pulse" />
              {t('live.title').split(' ')[0]} <span className="text-primary ml-2">{t('live.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-light-600">{t('live.subtitle')}</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            {leagues.map(l => (
              <button 
                key={l}
                onClick={() => handleFilterChange(l)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === l ? 'bg-primary text-white shadow-md' : 'bg-white text-light-600 border border-light-200 hover:border-primary/50'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Matches Panel */}
          <div className="lg:col-span-2 space-y-4">
            {isLoadingMatches ? (
              <div className="card flex items-center justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : combinedMatches.length === 0 ? (
              <div className="card text-center py-12 text-light-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('live.noMatches')}</p>
              </div>
            ) : (
              combinedMatches.map(match => (
                <div key={match.id} className="card relative flex flex-col md:flex-row items-center justify-between hover:border-primary/50 hover:shadow-lg cursor-pointer group animate-fade-in transition-all">
                  
                  {/* Fecha y Hora */}
                  <div className="w-full text-center md:text-left mb-3 md:mb-0 md:absolute md:top-4 md:left-6 text-xs font-bold text-light-400">
                    <span className="bg-light-100 px-2 py-1 rounded flex items-center w-fit mx-auto md:mx-0 uppercase tracking-tighter">
                      <Calendar className="w-3 h-3 mr-1" />
                      {match.status.includes(':') || match.status.includes('h') ? match.status : 
                        match.status === 'LIVE' ? t('live.statusLive') : 
                        match.status === 'FT' ? t('live.statusFT') : 
                        new Date().toLocaleDateString(i18n.language, { weekday: 'short', day: 'numeric', month: 'short' })}
                      {!(match.status.includes(':') || match.status.includes('h')) && ' • 21:00h'}
                    </span>
                  </div>

                  <div className="flex items-center w-full md:w-2/5 justify-between md:justify-start mb-4 md:mb-0 mt-4 md:mt-6">
                    <span className="font-bold text-light-900 text-lg">{match.home}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center w-full md:w-1/5 mb-4 md:mb-0">
                    <span className="text-xs font-bold text-primary mb-1 bg-primary/10 px-2 py-0.5 rounded-full">{match.status}</span>
                    <div className="text-3xl font-display font-bold text-light-900 tracking-widest">{match.score}</div>
                  </div>

                  <div className="flex items-center w-full md:w-2/5 justify-between md:justify-end text-right">
                    <span className="font-bold text-light-900 text-lg">{match.away}</span>
                  </div>
                  
                  {/* Info expandida */}
                  <div className="w-full mt-4 pt-4 border-t border-light-100 flex justify-between items-center text-xs text-light-400">
                    <div className="flex items-center">
                      <Trophy className="w-3 h-3 mr-1" /> {match.league}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {match.stadium} 
                      <span className="ml-2 font-bold text-success">({match.attendance} {t('scorers.avg')})</span>
                    </div>
                  </div>
                  
                  {/* Ver más detalle overlay on hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="bg-primary text-white font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">{t('live.viewStats')}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar: Standings & Stats */}
          <div className="space-y-6 lg:sticky lg:top-28 z-20">
            
            {/* Equipo Global del Día (Now at the top) */}
            {filter === 'All' && (
              <div className="card bg-gradient-to-br from-light-900 to-black text-white p-6 border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                  <Trophy className="w-20 h-20" />
                </div>
                <h4 className="font-bold mb-4 flex items-center text-lg relative z-10">
                  <Star className="w-5 h-5 mr-2 text-warning fill-current" />
                  {t('live.globalTeamTitle')}
                </h4>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl font-bold border border-white/10 shadow-inner">R</div>
                  <div>
                    <div className="font-bold text-xl tracking-tight">Real Madrid</div>
                    <div className="text-sm text-primary font-bold">{t('live.worldLeader')}</div>
                    <div className="text-xs text-white/60 mt-1">85 pts • +42 GD • 92% Win Rate</div>
                  </div>
                </div>
              </div>
            )}

            <div className="card p-0 overflow-hidden max-h-[65vh] flex flex-col shadow-xl border-light-200">
              <div className="bg-light-900 text-white p-4 shrink-0 flex justify-between items-center border-b border-light-800">
                <h3 className="font-bold font-display flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-warning" /> 
                  {t('live.standings')}
                </h3>
                <select 
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="bg-light-800 text-white text-xs border border-light-700 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                >
                  {seasons.map(s => (
                    <option key={s} value={s}>{t('live.season')} {s}</option>
                  ))}
                </select>
              </div>
              <div className="bg-primary/5 p-3 border-b border-light-200">
                <h4 className="text-sm font-bold text-primary">{rankingTitle}</h4>
              </div>
              <div className="overflow-y-auto flex-1">
                {isLoadingStandings ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-light-400 bg-light-50 border-b border-light-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">{t('scorers.team')}</th>
                        <th className="px-4 py-3 text-center">Pts</th>
                        <th className="px-4 py-3 text-center">Forma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStandings.map((team, idx) => (
                        <tr key={`${team.team}-${idx}`} className="border-b border-light-100 last:border-0 hover:bg-light-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-light-900 text-center">
                            {idx + 1 === 1 ? <span className="w-6 h-6 bg-warning/20 text-warning-dark rounded-full flex items-center justify-center mx-auto">{idx + 1}</span> : idx + 1}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-light-800">{team.team}</span>
                              {(filter === 'All' || team.league) && (
                                <span className="text-[10px] text-primary uppercase font-bold tracking-tighter">{team.league || filter}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-primary">{team.pts}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-0.5">
                              {team.form.slice(0, 5).map((f, i) => (
                                <span key={i} className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-bold text-white
                                  ${f === 'W' ? 'bg-success' : f === 'D' ? 'bg-warning' : 'bg-danger'}`}>
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="p-3 bg-light-50 border-t border-light-200 text-center">
                <button 
                  onClick={() => navigate('/clasificacion')}
                  className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center justify-center w-full"
                >
                  {t('live.showFullTable')} <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScores;
