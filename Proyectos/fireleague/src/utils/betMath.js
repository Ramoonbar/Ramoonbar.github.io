// Conversión de Cuotas
export const convertOdds = (decimal, toFormat) => {
  const d = parseFloat(decimal);
  if (isNaN(d) || d <= 1) return '';

  if (toFormat === 'fractional') {
    // Simplificación básica de fracciones (aproximada para UI rápida)
    let n = Math.round((d - 1) * 100);
    let d_frac = 100;
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(n, d_frac);
    return `${n / divisor}/${d_frac / divisor}`;
  }
  
  if (toFormat === 'american') {
    if (d >= 2) {
      return `+${Math.round((d - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (d - 1))}`;
    }
  }

  return d.toFixed(2);
};

// Generador de Combinaciones
const getCombinations = (arr, k) => {
  const results = [];
  function helper(start, combo) {
    if (combo.length === k) {
      results.push(combo);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      helper(i + 1, [...combo, arr[i]]);
    }
  }
  helper(0, []);
  return results;
};

// Lógica de Sistemas Complejos
// odds: Array de cuotas decimales
// stakePerBet: Stake por cada línea de apuesta
export const calculateSystem = (systemName, odds, stakePerBet) => {
  if (!odds || odds.length === 0) return { totalStake: 0, possibleReturn: 0, totalBets: 0, profit: 0 };
  
  let totalBets = 0;
  let possibleReturn = 0;

  const calculateCombinationsReturn = (k) => {
    const combos = getCombinations(odds, k);
    totalBets += combos.length;
    combos.forEach(combo => {
      const multiplier = combo.reduce((acc, val) => acc * val, 1);
      possibleReturn += multiplier * stakePerBet;
    });
  };

  const defaultReturn = { totalBets: 0, totalStake: 0, possibleReturn: 0, profit: 0 };

  switch (systemName) {
    case 'Trixie': // 3 selections: 3 doubles, 1 treble
      calculateCombinationsReturn(2);
      calculateCombinationsReturn(3);
      break;
    case 'Yankee': // 4 selections: 6 doubles, 4 trebles, 1 four-fold
      calculateCombinationsReturn(2);
      calculateCombinationsReturn(3);
      calculateCombinationsReturn(4);
      break;
    case 'Super Yankee': // 5 selections: 10 doubles, 10 trebles, 5 four-folds, 1 five-fold
      for (let i = 2; i <= 5; i++) calculateCombinationsReturn(i);
      break;
    case 'Heinz': // 6 selections
      for (let i = 2; i <= 6; i++) calculateCombinationsReturn(i);
      break;
    case 'Super Heinz': // 7 selections
      for (let i = 2; i <= 7; i++) calculateCombinationsReturn(i);
      break;
    case 'Goliath': // 8 selections
      for (let i = 2; i <= 8; i++) calculateCombinationsReturn(i);
      break;
    case 'Lucky 15': // 4 selections: 4 singles + Yankee
      for (let i = 1; i <= 4; i++) calculateCombinationsReturn(i);
      break;
    case 'Lucky 31': // 5 selections: 5 singles + Super Yankee
      for (let i = 1; i <= 5; i++) calculateCombinationsReturn(i);
      break;
    case 'Lucky 63': // 6 selections: 6 singles + Heinz
      for (let i = 1; i <= 6; i++) calculateCombinationsReturn(i);
      break;
    default:
      // Acumulada normal (Parlay/Acca)
      calculateCombinationsReturn(odds.length);
      break;
  }

  return {
    totalBets,
    totalStake: totalBets * stakePerBet,
    possibleReturn,
    profit: possibleReturn - (totalBets * stakePerBet)
  };
};
