export async function submitRegistration(data) {
  const body = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === 'players') body.append(key, JSON.stringify(value));
    else if (key === 'teamLogo') { if (value) body.append(key, value); }
    else if (value !== undefined && value !== null) body.append(key, String(value));
  }
  const response = await fetch('/api/registrations', { method: 'POST', body });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Registration could not be submitted. Please try again.');
  return result;
}
