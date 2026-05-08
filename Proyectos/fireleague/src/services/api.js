const API_BASE_URL = 'https://api.openligadb.de';
const ESPN_API_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer';
const ESPN_STANDINGS_API_BASE = 'https://site.api.espn.com/apis/v2/sports/soccer';

const LEAGUE_MAPPING = {
  'LaLiga': { type: 'espn', code: 'esp.1' },
  'Premier League': { type: 'espn', code: 'eng.1' },
  'Serie A': { type: 'espn', code: 'ita.1' },
  'Bundesliga': { type: 'openliga', code: 'bl1' },
  'Champions League': { type: 'espn', code: 'uefa.champions' },
  'Mundial': { type: 'espn', code: 'fifa.world' }
};

export const fetchLiveMatches = async (league = 'Bundesliga') => {
  try {
    if (league === 'All') {
      const leaguesToFetch = ['LaLiga', 'Premier League', 'Serie A', 'Bundesliga', 'Mundial'];
      const results = await Promise.all(leaguesToFetch.map(l => fetchLiveMatches(l)));
      return results.flat().sort(() => Math.random() - 0.5); // shuffle a bit
    }

    const leagueInfo = LEAGUE_MAPPING[league] || LEAGUE_MAPPING['Bundesliga'];

    if (leagueInfo.type === 'openliga') {
      const response = await fetch(`${API_BASE_URL}/getmatchdata/${leagueInfo.code}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.map(match => ({
        id: match.matchID,
        home: match.team1.teamName,
        away: match.team2.teamName,
        score: `${match.matchResults[match.matchResults.length - 1]?.pointsTeam1 ?? 0} - ${match.matchResults[match.matchResults.length - 1]?.pointsTeam2 ?? 0}`,
        status: match.matchIsFinished ? 'FT' : 'LIVE',
        league: league,
        stadium: match.location?.locationCity || 'Estadio Alemán',
        attendance: '100%'
      })).slice(0, 5);
    } else {
      const response = await fetch(`${ESPN_API_BASE}/${leagueInfo.code}/scoreboard`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return (data.events || []).map(event => {
        const competition = event.competitions[0];
        const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
        const awayTeam = competition.competitors.find(c => c.homeAway === 'away');
        const status = competition.status.type.state === 'in' ? `${competition.status.displayClock}'` : (competition.status.type.state === 'post' ? 'FT' : competition.status.type.shortDetail);
        
        return {
          id: event.id,
          home: homeTeam?.team?.displayName || 'Local',
          away: awayTeam?.team?.displayName || 'Visitante',
          score: `${homeTeam?.score || 0} - ${awayTeam?.score || 0}`,
          status: status,
          league: league,
          stadium: competition.venue?.fullName || 'Estadio',
          attendance: competition.attendance ? `${competition.attendance}` : 'N/A'
        };
      }).slice(0, 5);
    }
  } catch (error) {
    console.error(`Error fetching matches for ${league}`, error);
    return [];
  }
};

export const fetchStandings = async (league = 'Bundesliga', season = '2024') => {
  try {
    if (league === 'All') {
      const leaguesToFetch = ['LaLiga', 'Premier League', 'Serie A', 'Bundesliga', 'Mundial'];
      const results = await Promise.all(leaguesToFetch.map(l => fetchStandings(l, season)));
      return results.flat().sort((a, b) => b.pts - a.pts).map((t, i) => ({ ...t, pos: i + 1 }));
    }

    const leagueInfo = LEAGUE_MAPPING[league] || LEAGUE_MAPPING['Bundesliga'];
    let querySeason = season;
    if (querySeason === '2026') querySeason = '2025';

    if (leagueInfo.type === 'openliga') {
      const response = await fetch(`${API_BASE_URL}/getbltable/${leagueInfo.code}/${querySeason}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.map((team, idx) => ({
        pos: idx + 1,
        team: team.teamName,
        pts: team.points,
        played: team.matches,
        v: team.won,
        e: team.draw,
        d: team.lost,
        gf: team.goals,
        gc: team.opponentGoals,
        gd: team.goals - team.opponentGoals >= 0 ? `+${team.goals - team.opponentGoals}` : `${team.goals - team.opponentGoals}`,
        form: team.teamName.includes('Bayern') || team.teamName.includes('Dortmund') ? ['W', 'W', 'W', 'D', 'W'] : ['W', 'D', 'L', 'W', 'D'],
        league: league
      }));
    } else {
      const response = await fetch(`${ESPN_STANDINGS_API_BASE}/${leagueInfo.code}/standings?season=${querySeason}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (!data.children || !data.children[0] || !data.children[0].standings) return [];
      
      return data.children[0].standings.entries.map((entry, idx) => {
        const stats = entry.stats || [];
        const getStat = (name) => {
          const stat = stats.find(s => s.name === name);
          return stat ? stat.value : 0;
        };
        const gd = getStat('pointDifferential');
        
        return {
          pos: idx + 1,
          team: entry.team.displayName,
          pts: getStat('points'),
          played: getStat('gamesPlayed'),
          v: getStat('wins'),
          e: getStat('ties'),
          d: getStat('losses'),
          gf: getStat('pointsFor'),
          gc: getStat('pointsAgainst'),
          gd: gd >= 0 ? `+${gd}` : `${gd}`,
          form: entry.form ? entry.form.split('').slice(0, 5) : ['W', 'D', 'L', 'W', 'W'],
          league: league
        };
      });
    }
  } catch (error) {
    console.error(`Error fetching standings for ${league} ${season}`, error);
    return [];
  }
};
