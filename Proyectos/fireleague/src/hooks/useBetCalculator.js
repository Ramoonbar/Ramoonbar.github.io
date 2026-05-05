import { useState, useMemo } from 'react';
import { calculateSystem, convertOdds } from '../utils/betMath';

export const useBetCalculator = () => {
  const [odds, setOdds] = useState([{ id: 1, value: '' }, { id: 2, value: '' }]);
  const [stakePerBet, setStakePerBet] = useState(10);
  const [system, setSystem] = useState('Acumulada');
  const [oddsFormat, setOddsFormat] = useState('decimal'); // decimal, fractional, american

  const addOdd = () => {
    if (odds.length < 8) {
      setOdds([...odds, { id: Date.now(), value: '' }]);
    }
  };

  const removeOdd = (id) => {
    if (odds.length > 2) {
      setOdds(odds.filter(o => o.id !== id));
    }
  };

  const updateOdd = (id, value) => {
    setOdds(odds.map(o => o.id === id ? { ...o, value } : o));
  };

  const handleSetStake = (val) => {
    const num = parseFloat(val);
    setStakePerBet(isNaN(num) ? 0 : num);
  };

  const validOdds = useMemo(() => {
    return odds
      .map(o => {
        const strVal = String(o.value).replace(',', '.');
        return parseFloat(strVal);
      })
      .filter(val => !isNaN(val) && val > 1);
  }, [odds]);

  const availableSystems = useMemo(() => {
    const count = validOdds.length;
    const systems = ['Acumulada'];
    if (count >= 3) systems.push('Trixie');
    if (count >= 4) systems.push('Yankee', 'Lucky 15');
    if (count >= 5) systems.push('Lucky 31', 'Super Yankee');
    if (count >= 6) systems.push('Heinz', 'Lucky 63');
    if (count >= 7) systems.push('Super Heinz');
    if (count >= 8) systems.push('Goliath');
    return systems;
  }, [validOdds.length]);

  const results = useMemo(() => {
    // Si el sistema seleccionado no está disponible para esta cantidad de cuotas, volvemos a Acumulada
    const currentSystem = availableSystems.includes(system) ? system : 'Acumulada';
    return calculateSystem(currentSystem, validOdds, stakePerBet);
  }, [validOdds, system, stakePerBet, availableSystems]);

  const formatOddValue = (decimalValue) => {
    if (!decimalValue) return '';
    if (oddsFormat === 'decimal') return decimalValue;
    return convertOdds(decimalValue, oddsFormat);
  };

  return {
    odds,
    addOdd,
    removeOdd,
    updateOdd,
    stakePerBet,
    setStakePerBet: handleSetStake,
    system,
    setSystem,
    availableSystems,
    results,
    oddsFormat,
    setOddsFormat,
    formatOddValue
  };
};
