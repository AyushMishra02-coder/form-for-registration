import { Gamepad2, Gift, ShieldCheck, Trophy, UsersRound } from 'lucide-react';

const features = [
  { icon: Trophy, title: 'Epic tournaments', text: 'Find your next challenge' },
  { icon: UsersRound, title: 'Live leaderboard', text: 'Track every climb' },
  { icon: Gift, title: 'Rewards & recognition', text: 'Play for more than glory' },
  { icon: ShieldCheck, title: 'Fair play, always', text: 'Verified matches' }
];

export function PromoPanel() {
  return <aside className="aside"><div className="eyebrow">Next match starts here</div><h1><span className="h1-grad">Champions</span><br />are built.</h1><p className="aside-copy">One registration puts your squad on the path to the arena. Bring your team, lock in your game, and make your mark.</p><div className="feature-list">{features.map(({ icon: Icon, title, text }) => <div className="feature" key={title}><div className="feature-icon"><Icon size={19} /></div><div><strong>{title}</strong><span>{text}</span></div></div>)}</div><p className="motto"><Gamepad2 size={13} /> PLAY WITH PURPOSE.<br />LEAVE A LEGACY.</p></aside>;
}
