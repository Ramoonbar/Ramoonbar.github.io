import React, { useState } from 'react';
import { Trophy, ArrowLeft, TrendingUp, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchStandings } from '../services/api';

const Clasificacion = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('LaLiga');
  const [selectedSeason, setSelectedSeason] = useState('2026');
  const leagues = ['LaLiga', 'Premier League', 'Bundesliga', 'Serie A', 'Champions League', 'Mundial'];
  const seasons = ['2026', '2025', '2024', '2023'];

  const { data: standings, isLoading } = useQuery({
    queryKey: ['fullStandings', filter, selectedSeason],
    queryFn: () => fetchStandings(filter, selectedSeason),
  });

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title={`${t('live.standings')} ${filter} - BetMaster Analyst`}
        description={`Consulta la clasificación completa de ${filter} temporada ${selectedSeason}. Estadísticas detalladas de puntos, goles y forma reciente.`}
      />
      <div className="page-container">
        
        <div className="mb-8">
          <Link to="/live" className="text-primary font-bold flex items-center hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('common.back') || 'Volver a Live Scores'}
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-light-900 mb-2 flex items-center">
                <Trophy className="w-8 h-8 mr-3 text-warning" />
                {t('live.standings')} <span className="text-primary ml-2">{filter}</span>
              </h1>
              <p className="text-light-600">Temporada {selectedSeason} • Datos actualizados en tiempo real</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end">
              {leagues.map(l => (
                <button 
                  key={l}
                  onClick={() => setFilter(l)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === l ? 'bg-primary text-white shadow-md' : 'bg-white text-light-600 border border-light-200 hover:border-primary/50'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-0 overflow-hidden shadow-2xl border-light-200 bg-white rounded-[2rem]">
          <div className="bg-light-900 text-white p-6 flex justify-between items-center border-b-4 border-primary">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">{filter} Standings</h3>
                <p className="text-xs text-light-400">Panel de rendimiento total verificado</p>
              </div>
            </div>
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="bg-light-800 text-white text-sm border border-light-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary font-bold"
            >
              {seasons.map(s => (
                <option key={s} value={s}>{t('live.season')} {s}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-light-50 text-light-400 text-[10px] uppercase tracking-widest border-b border-light-200 font-black">
                  <tr>
                    <th className="px-6 py-5 text-center w-16">Pos</th>
                    <th className="px-6 py-5 min-w-[200px]">{t('scorers.team')}</th>
                    <th className="px-3 py-5 text-center">PJ</th>
                    <th className="px-3 py-5 text-center">V</th>
                    <th className="px-3 py-5 text-center">E</th>
                    <th className="px-3 py-5 text-center">D</th>
                    <th className="px-3 py-5 text-center hidden md:table-cell">GF</th>
                    <th className="px-3 py-5 text-center hidden md:table-cell">GC</th>
                    <th className="px-3 py-5 text-center">DG</th>
                    <th className="px-6 py-5 text-center bg-light-100/50">Pts</th>
                    <th className="px-6 py-5 text-center">Últimos 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-100">
                  {standings?.map((team, idx) => (
                    <tr key={idx} className="hover:bg-light-50 transition-colors group">
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs
                          ${idx < 4 ? 'bg-primary text-white shadow-lg shadow-primary/20' : idx > 16 ? 'bg-danger/10 text-danger' : 'bg-light-100 text-light-600'}`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 bg-light-100 rounded-xl border border-light-200 flex items-center justify-center font-black text-xs text-light-400 group-hover:border-primary/30 transition-colors">
                            {team.team.substring(0, 1)}
                          </div>
                          <span className="font-bold text-light-900 group-hover:text-primary transition-colors text-base">{team.team}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center font-bold text-light-600">{team.played || 0}</td>
                      <td className="px-3 py-4 text-center font-medium text-light-500">{team.v || 0}</td>
                      <td className="px-3 py-4 text-center font-medium text-light-500">{team.e || 0}</td>
                      <td className="px-3 py-4 text-center font-medium text-light-500">{team.d || 0}</td>
                      <td className="px-3 py-4 text-center text-light-400 text-sm hidden md:table-cell">{team.gf || 0}</td>
                      <td className="px-3 py-4 text-center text-light-400 text-sm hidden md:table-cell">{team.gc || 0}</td>
                      <td className={`px-3 py-4 text-center font-black text-sm ${team.gd?.startsWith('+') ? 'text-success' : team.gd?.startsWith('-') ? 'text-danger' : 'text-light-400'}`}>
                        {team.gd || '0'}
                      </td>
                      <td className="px-6 py-4 text-center font-black text-light-900 text-xl bg-light-50/30">{team.pts || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-1">
                          {team.form?.map((f, i) => (
                            <div key={i} className="group/dot relative">
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black text-white shadow-sm transition-transform hover:scale-125
                                ${f === 'W' ? 'bg-success' : f === 'D' ? 'bg-warning' : 'bg-danger'}`}>
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="bg-light-50 p-6 border-t border-light-200 flex flex-wrap gap-8 justify-between items-center">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
                <span className="text-[10px] font-black text-light-500 uppercase tracking-widest">Champions League</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-danger/50"></div>
                <span className="text-[10px] font-black text-light-500 uppercase tracking-widest">Descenso</span>
              </div>
            </div>
            <div className="flex items-center text-[10px] text-light-400 font-bold italic uppercase tracking-wider">
              <Info className="w-4 h-4 mr-2 text-primary opacity-50" /> 
              PJ: Jugados | V: Victorias | E: Empates | D: Derrotas | GF: Favor | GC: Contra | DG: Diferencia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clasificacion;
