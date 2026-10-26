import { useEffect } from 'react';
import { UserRoundPlus } from 'lucide-react';

export function TeamRoster({ teamSize, players, onChange }) {
  const teammateCount = Math.max(0, Number(teamSize || 1) - 1);
  useEffect(() => {
    const next = Array.from({ length: teammateCount }, (_, i) => players[i] || { name: '', gameId: '' });
    if (JSON.stringify(next) !== JSON.stringify(players)) onChange(next);
  }, [teammateCount, players, onChange]);

  if (teammateCount === 0) return <p className="hint roster-empty">Solo entry selected. Your player details are already on the form.</p>;
  return <div className="roster">{players.slice(0, teammateCount).map((player, index) => <div className="roster-row" key={index}><span className="roster-num">{String(index + 2).padStart(2, '0')}</span><input value={player.name} aria-label={`Player ${index + 2} name`} placeholder={`Player ${index + 2} name`} required onChange={e => onChange(players.map((item, i) => i === index ? { ...item, name: e.target.value } : item))} /><input value={player.gameId} aria-label={`Player ${index + 2} in-game ID`} placeholder="In-game ID" required onChange={e => onChange(players.map((item, i) => i === index ? { ...item, gameId: e.target.value } : item))} /></div>)}</div>;
}
