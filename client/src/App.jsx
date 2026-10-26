import { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm.jsx';
import { TopBar } from './components/TopBar.jsx';
import { PromoPanel } from './components/PromoPanel.jsx';
import { Check, MailCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [registration, setRegistration] = useState(null);
  return <>
    <div className="orb orb-one" /><div className="orb orb-two" />
    <TopBar />
    <main className="layout" id="top">
      <PromoPanel />
      <section className="card" aria-labelledby="form-title">
        <header className="card-head"><div><h2 id="form-title">Tournament <em>Registration</em></h2><p className="card-sub">Tell us who's playing. We'll save your squad a spot in the arena.</p></div></header>
        {registration ? <div className="confirmation" role="status"><div className="confirmation-mark"><Check size={30} strokeWidth={3} /></div><div className="confirmation-kicker"><Sparkles size={14} /> REGISTRATION LOCKED IN</div><h3>You're on the roster!</h3><p>{registration.message}</p><div className="email-notice"><MailCheck size={19} /><span><strong>{registration.notificationMessage}</strong><small>{registration.registration.email}</small></span></div><div className="confirmation-id">Registration ID <strong>{registration.registration.id}</strong></div><button className="submit" onClick={() => setRegistration(null)}>Register another team</button></div> : <RegistrationForm onSuccess={setRegistration} />}
      </section>
    </main>
  </>;
}
