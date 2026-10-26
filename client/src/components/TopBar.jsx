import { Radio } from 'lucide-react';

export function TopBar() {
  return <header className="topbar"><a className="brand" href="#top" aria-label="Zevyon home"><span className="brand-mark">ZV</span><span className="brand-name">ZEVYON<small>BEYOND GAMES</small></span></a><div className="nav-status">PLAY <b>•</b> COMPETE <b>•</b> WIN</div><div className="live"><Radio size={13} /> REGISTRATION OPEN</div></header>;
}
