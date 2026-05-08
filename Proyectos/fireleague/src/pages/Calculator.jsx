import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Plus, Trash2, Info, Lightbulb, Target, TrendingUp, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const Calculator = () => {
  const { t } = useTranslation();
  const [odds, setOdds] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' }
  ]);
  const [stake, setStake] = useState(10);
  const [format, setFormat] = useState('decimal');
  const [systemType, setSystemType] = useState('Acumulada');
  const [isGuideOpen, setIsGuideOpen] = useState(true);

  const [results, setResults] = useState({
    lines: 0,
    totalStake: 0,
    potentialReturn: 0,
    netProfit: 0
  });

  useEffect(() => {
    calculateResults();
  }, [odds, stake, systemType]);

  const calculateResults = () => {
    const validOdds = odds.filter(o => !isNaN(parseFloat(o.value)) && parseFloat(o.value) > 0);
    const count = validOdds.length;
    
    if (count < 1) {
      setResults({ lines: 0, totalStake: 0, potentialReturn: 0, netProfit: 0 });
      return;
    }

    let lines = 1;
    let multiplier = 1;
    validOdds.forEach(o => multiplier *= parseFloat(o.value));

    if (systemType === 'Trixie' && count >= 3) lines = 4;
    else if (systemType === 'Yankee' && count >= 4) lines = 11;
    else if (systemType === 'Lucky 15' && count >= 4) lines = 15;

    const totalStake = lines * stake;
    const potentialReturn = multiplier * stake;
    const netProfit = potentialReturn - totalStake;

    setResults({
      lines,
      totalStake: totalStake.toFixed(2),
      potentialReturn: potentialReturn.toFixed(2),
      netProfit: netProfit.toFixed(2)
    });
  };

  const addOdd = () => { if (odds.length < 8) setOdds([...odds, { id: Date.now(), value: '' }]); };
  const removeOdd = (id) => { if (odds.length > 2) setOdds(odds.filter(o => o.id !== id)); };
  const updateOdd = (id, value) => { setOdds(odds.map(o => o.id === id ? { ...o, value } : o)); };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-light-50">
      <SEO title={t('calculator.title')} description={t('calculator.subtitle')} />
      <div className="page-container">
        
        <div className="text-center mb-12">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Advanced Betting Tool</div>
          <h1>{t('calculator.title').split(' ')[0]} <span className="text-primary">{t('calculator.title').split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-lg text-light-600 font-medium max-w-2xl mx-auto">{t('calculator.subtitle')}</p>
        </div>

        {/* Guide/Info Section - MOVED TO TOP */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-light-200 mb-8 w-full">
          <button 
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="w-full p-8 flex items-center justify-between hover:bg-light-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <h3 className="mb-0 text-xl font-black">¿Cómo usar nuestra Calculadora de Apuestas? (Guía y FAQ)</h3>
            </div>
            {isGuideOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          {isGuideOpen && (
            <div className="p-8 md:p-10 border-t border-light-100 animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-light-600 font-medium leading-relaxed">{t('calculator.guide.p1')}</p>
                  <div className="space-y-4">
                    <h4 className="font-black text-light-900 uppercase tracking-widest text-xs">Sistemas Populares</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-light-50 rounded-2xl border border-light-100">
                        <p className="font-black text-primary text-xs uppercase mb-2">Trixie</p>
                        <p className="text-xs text-light-500 font-medium">3 selecciones en 4 apuestas (3 dobles + 1 triple). Cubre un fallo.</p>
                      </div>
                      <div className="p-5 bg-light-50 rounded-2xl border border-light-100">
                        <p className="font-black text-primary text-xs uppercase mb-2">Yankee</p>
                        <p className="text-xs text-light-500 font-medium">4 selecciones en 11 apuestas (6 dobles, 4 triples, 1 acumulada).</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-light-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <p className="text-lg font-medium leading-relaxed opacity-90 italic">"La clave de las apuestas de sistema no es ganar siempre, sino asegurar rentabilidad cuando un favorito falla."</p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-10 h-1bg-primary rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Consejo Pro de Alex</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Calculator Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-light-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <h3 className="mb-0 flex items-center gap-3 text-2xl font-black">
                  <CalcIcon className="w-6 h-6 text-primary" />
                  {t('calculator.oddsTitle')}
                </h3>
                <div className="flex bg-light-100 p-1 rounded-xl">
                  {['decimal', 'fractional'].map(f => (
                    <button key={f} onClick={() => setFormat(f)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${format === f ? 'bg-white text-primary shadow-sm' : 'text-light-400'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {odds.map((odd, idx) => (
                  <div key={odd.id} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-light-50 rounded-2xl flex items-center justify-center text-light-300 font-black text-lg border border-light-100 group-hover:border-primary/30 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="relative flex-grow">
                      <input 
                        type="number" 
                        step="0.01" 
                        placeholder="1.85" 
                        value={odd.value} 
                        onChange={(e) => updateOdd(odd.id, e.target.value)} 
                        className="w-full bg-light-50 border border-light-100 rounded-2xl py-4 px-8 focus:outline-none focus:border-primary font-black text-xl transition-all" 
                      />
                    </div>
                    <button 
                      onClick={() => removeOdd(odd.id)} 
                      disabled={odds.length <= 2} 
                      className="w-14 h-14 flex items-center justify-center text-light-200 hover:text-danger disabled:opacity-0 transition-all hover:bg-danger/5 rounded-2xl"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={addOdd} className="w-full py-6 border-2 border-dashed border-light-200 rounded-2xl text-light-400 font-black text-xs uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                + Añadir Selección Individual
              </button>
            </div>
          </div>

          {/* Sidebar / Results Area */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-light-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
              <h3 className="mb-8 flex items-center gap-3 text-xl font-black text-light-900">
                <Settings className="w-6 h-6 text-primary" />
                Configuración
              </h3>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-[10px] font-black text-light-400 uppercase tracking-widest mb-3 ml-1">Stake Total de la Jugada</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={stake} 
                      onChange={(e) => setStake(e.target.value)} 
                      className="w-full bg-light-50 border border-light-100 rounded-2xl py-4 px-8 text-light-900 font-black text-2xl focus:outline-none focus:border-primary transition-all" 
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-primary font-black text-2xl">€</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-light-400 uppercase tracking-widest mb-3 ml-1">Modalidad de Sistema</label>
                  <div className="relative">
                    <select 
                      value={systemType} 
                      onChange={(e) => setSystemType(e.target.value)} 
                      className="w-full bg-light-50 border border-light-100 rounded-2xl py-4 px-8 text-light-900 font-black text-base focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      <option value="Acumulada" className="text-light-900">Acumulada Simple</option>
                      <option value="Trixie" className="text-light-900">Trixie (3 sel.)</option>
                      <option value="Yankee" className="text-light-900">Yankee (4 sel.)</option>
                      <option value="Lucky 15" className="text-light-900">Lucky 15 (4 sel.)</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-light-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-2 border-primary/10">
              <h3 className="mb-8 text-xl font-black">Cálculo de Retorno</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-light-100">
                  <span className="text-xs font-black text-light-400 uppercase tracking-widest">Inversión</span>
                  <span className="text-2xl font-black text-light-900">{results.totalStake} €</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-light-100">
                  <span className="text-xs font-black text-light-400 uppercase tracking-widest">Ganancia Bruta</span>
                  <span className="text-2xl font-black text-secondary">{results.potentialReturn} €</span>
                </div>
                <div className="mt-8 bg-primary/5 p-10 rounded-[2rem] border border-primary/20 shadow-inner">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 text-center">Beneficio Neto Real</div>
                  <div className="text-4xl font-black text-primary text-center tracking-tighter leading-none">{results.netProfit} €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
