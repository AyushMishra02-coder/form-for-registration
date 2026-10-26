const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

export function registrationConfirmation(registration) {
  const name = escapeHtml(registration.firstName);
  const team = escapeHtml(registration.teamName);
  const game = escapeHtml(registration.game);
  const mode = escapeHtml(registration.mode.toUpperCase());
  const reference = escapeHtml(registration.id);
  const roster = registration.players.length
    ? registration.players.map(player => `<li style="padding:7px 0;color:#ccd5f4">${escapeHtml(player.name)} <span style="color:#8291bb">· ${escapeHtml(player.gameId)}</span></li>`).join('')
    : '<li style="padding:7px 0;color:#ccd5f4">Solo registration</li>';
  const subject = `Registration received — ${registration.teamName} | Zevyon Esports`;
  const text = [
    `Hey ${registration.firstName},`, '',
    `Your registration for ${registration.teamName} has been received.`,
    `Game: ${registration.game}`, `Mode: ${registration.mode.toUpperCase()}`,
    `Team size: ${registration.teamSize}`, `Reference: ${registration.id}`, '',
    'We will contact you if we need anything else. Good luck in the arena!',
    '', 'Zevyon Esports · Beyond Games'
  ].join('\n');
  const html = `<!doctype html><html><body style="margin:0;background:#070817;color:#eef3ff;font-family:Arial,sans-serif;padding:28px 12px"><div style="max-width:560px;margin:0 auto;border:1px solid #5145a4;border-radius:18px;overflow:hidden;background:#0b1028"><div style="padding:22px 28px;border-bottom:1px solid #252d55"><div style="font-size:20px;font-weight:bold;letter-spacing:4px">ZEVYON</div><div style="font-size:10px;letter-spacing:3px;color:#9eacd6;margin-top:5px">BEYOND GAMES</div></div><div style="padding:30px 28px"><div style="color:#a981ff;font-size:11px;font-weight:bold;letter-spacing:2px">REGISTRATION RECEIVED</div><h1 style="font-size:27px;margin:12px 0 8px">You're on the roster, ${name}!</h1><p style="color:#aab6d7;line-height:1.7">Your tournament registration is in. Get your squad ready for the arena.</p><div style="margin:22px 0;padding:18px;border:1px solid #303968;border-radius:12px;background:#080e22"><div style="font-size:19px;font-weight:bold">${team}</div><div style="margin-top:7px;color:#8fcfff;font-size:12px">${game} &nbsp;·&nbsp; ${mode} &nbsp;·&nbsp; ${registration.teamSize} player${registration.teamSize === 1 ? '' : 's'}</div><ul style="padding-left:18px;margin:14px 0 0;border-top:1px solid #252d55">${roster}</ul></div><p style="color:#aab6d7;font-size:12px;line-height:1.7">We’ll contact you at this email if we need anything else. Keep your registration reference for your records.</p><div style="padding:12px;background:#111632;border-radius:8px;color:#99a8d2;font-size:11px">Reference: <strong style="color:#d6c8ff">${reference}</strong></div><p style="color:#aab6d7;font-size:12px;margin-top:24px">See you in the arena,<br><strong style="color:#edf1ff">Zevyon Esports</strong></p></div><div style="padding:16px 28px;background:#080c1c;color:#7583ab;font-size:10px">This is an automated registration confirmation. Replies to this email may not be monitored.</div></div></body></html>`;
  return { subject, text, html };
}
