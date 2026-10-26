import { useMemo, useState } from 'react';
import { Gamepad2, Image, Mail, MapPin, Phone, UploadCloud, UserRound, UsersRound } from 'lucide-react';
import { Field, TextInput } from './Field.jsx';
import { TeamRoster } from './TeamRoster.jsx';
import { submitRegistration } from '../services/registrationApi.js';

const games = ['Valorant', 'BGMI', 'Free Fire', 'Counter-Strike 2', 'Call of Duty: Mobile', 'Rocket League', 'Other'];
const regions = ['India · IST (UTC+5:30)', 'South Asia', 'Southeast Asia', 'East Asia', 'Europe', 'North America', 'South America', 'Middle East & Africa', 'Other'];
const sizes = [{ value: 1, label: 'Solo (1 player)' }, { value: 2, label: 'Duo (2 players)' }, { value: 4, label: 'Squad (4 players)' }, { value: 5, label: 'Team (5 players)' }, { value: 6, label: 'Team (6 players)' }];

function SelectField({ label, name, required, placeholder, options, ...props }) {
  return <Field label={label} name={name} required={required}><select id={name} name={name} required={required} defaultValue="" {...props}><option value="" disabled>{placeholder}</option>{options.map(option => typeof option === 'string' ? <option key={option}>{option}</option> : <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>;
}

function FormSection({ title, children }) {
  return <fieldset><legend><span className="section-icon">◈</span>{title}</legend><div className="grid">{children}</div></fieldset>;
}

export function RegistrationForm({ onSuccess }) {
  const [teamSize, setTeamSize] = useState('');
  const [players, setPlayers] = useState([]);
  const [logo, setLogo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [values, setValues] = useState({});

  const progress = useMemo(() => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gameUsername', 'game', 'teamSize', 'teamName', 'mode', 'region'];
    const filled = required.filter(name => values[name]?.trim()).length + (values.termsAccepted ? 1 : 0);
    return Math.round(filled / (required.length + 1) * 100);
  }, [values]);
  const update = event => { const { name, value, type, checked } = event.target; setValues(current => ({ ...current, [name]: type === 'checkbox' ? checked : value })); };

  async function handleSubmit(event) {
    event.preventDefault(); setMessage(null);
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (new Date(values.dateOfBirth) > new Date()) { setMessage({ type: 'error', text: 'Please enter a valid date of birth.' }); return; }
    setBusy(true);
    try { const result = await submitRegistration({ ...values, teamSize, players, teamLogo: logo }); onSuccess(result); }
    catch (error) { setMessage({ type: 'error', text: error.message }); }
    finally { setBusy(false); }
  }

  return <>
    <div className="progress"><strong>{progress}% complete</strong><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div></div>
    {message && <div className={`alert ${message.type}`} role="alert">{message.text}</div>}
    <form onSubmit={handleSubmit} onChange={update}>
      <FormSection title="Player details">
        <TextInput label="First name" name="firstName" required placeholder="e.g. Alex" autoComplete="given-name" />
        <TextInput label="Last name" name="lastName" required placeholder="e.g. Morgan" autoComplete="family-name" />
        <TextInput label="Email address" name="email" required type="email" placeholder="you@example.com" autoComplete="email" icon={Mail} />
        <TextInput label="Phone number" name="phone" required type="tel" placeholder="+91 98765 43210" autoComplete="tel" icon={Phone} />
        <TextInput label="Date of birth" name="dateOfBirth" required type="date" autoComplete="bday" />
        <TextInput label="In-game username" name="gameUsername" required placeholder="Your player tag" icon={UserRound} />
      </FormSection>
      <FormSection title="Tournament setup">
        <SelectField label="Game" name="game" required placeholder="Select your game" options={games} />
        <SelectField label="Team size" name="teamSize" required placeholder="Select team size" options={sizes} value={teamSize} onChange={event => { setTeamSize(event.target.value); update(event); }} />
        <TextInput label="Team name" name="teamName" required placeholder="Your squad's name" icon={UsersRound} />
        <TextInput label="Team tag" name="teamTag" placeholder="e.g. ZVN" maxLength={8} hint="Short tag shown beside player names (up to 8 characters)." />
        <Field label="Team logo" name="teamLogo" hint="PNG, JPG or SVG · up to 2 MB"><label className={`upload${logo ? ' has-file' : ''}`} htmlFor="teamLogo"><UploadCloud size={19} /><strong>{logo?.name || 'Choose a file or drag it here'}</strong><small>{logo ? 'Logo ready to upload' : 'PNG, JPG or SVG · up to 2 MB'}</small><input id="teamLogo" type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={event => { const file = event.target.files?.[0]; if (file && file.size > 2 * 1024 * 1024) { event.target.value = ''; setLogo(null); setMessage({ type: 'error', text: 'Team logo must be 2 MB or smaller.' }); } else setLogo(file || null); }} /></label></Field>
        <SelectField label="Current rank / skill level" name="rank" placeholder="Select your rank" options={['Beginner / Unranked', 'Intermediate', 'Advanced', 'Competitive / Semi-pro', 'Professional']} />
        <Field label="Preferred mode" name="mode" required><div className="mode-row">{['squad', 'duo', 'solo'].map(mode => <label className="mode-option" key={mode}><input type="radio" name="mode" value={mode} required /><span>{mode[0].toUpperCase() + mode.slice(1)}</span></label>)}</div></Field>
        <SelectField label="Region / timezone" name="region" required placeholder="Select your region" options={regions} />
        <Field label="Notes for the tournament organizer" name="notes" full><textarea id="notes" name="notes" placeholder="Accessibility needs, questions, or anything else we should know..." maxLength={1000} /></Field>
      </FormSection>
      <FormSection title="Team roster">
        <Field label="Player names & in-game IDs" name="roster" full hint="Add each teammate's display name and in-game ID. Your own details are above."><TeamRoster teamSize={teamSize} players={players} onChange={setPlayers} /></Field>
      </FormSection>
      <label className="checkbox-line"><input type="checkbox" name="termsAccepted" required /><span>I agree to the <a href="#terms" onClick={event => { event.preventDefault(); setMessage({ type: 'info', text: 'Please add your event’s official terms and tournament rules before accepting registrations.' }); }}>Terms & Conditions</a> and tournament rules, and consent to my details being used to organize the event. <b className="req">*</b></span></label>
      <label className="checkbox-line optional"><input type="checkbox" name="updatesOptIn" /><span>Send me tournament updates and future event announcements by email. (Optional)</span></label>
      <div className="actions"><button className="submit" type="submit" disabled={busy}><Image size={16} />{busy ? 'Submitting registration…' : 'Register my team'}</button><p className="secure-note">Your information is kept private and used only for tournament registration.</p></div>
    </form>
    <footer className="footer">Need help? <a href="mailto:events@zevyon.gg">Contact the tournament team</a> · All fields marked * are required.</footer>
  </>;
}
