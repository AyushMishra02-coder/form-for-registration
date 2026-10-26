import Registration from '../models/Registration.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendRegistrationConfirmation } from '../services/emailService.js';

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === '') return fallback;
  try { return JSON.parse(value); } catch { return undefined; }
};

export const createRegistration = asyncHandler(async (req, res) => {
  const players = parseJsonField(req.body.players, []);
  if (!Array.isArray(players)) return res.status(400).json({ message: 'Player roster must be a valid list.' });
  const teamSize = Number(req.body.teamSize);
  if (![1, 2, 4, 5, 6].includes(teamSize)) return res.status(400).json({ message: 'Choose a valid team size.' });
  if (players.length !== teamSize - 1) {
    return res.status(400).json({ message: `Add ${teamSize - 1} teammate${teamSize - 1 === 1 ? '' : 's'} for this team size.` });
  }
  if (req.body.termsAccepted !== 'true') return res.status(400).json({ message: 'Please accept the tournament rules to register.' });
  const dob = new Date(req.body.dateOfBirth);
  if (!req.body.dateOfBirth || Number.isNaN(dob.valueOf()) || dob > new Date()) {
    return res.status(400).json({ message: 'Enter a valid date of birth.' });
  }

  const registration = await Registration.create({
    ...req.body,
    teamSize,
    players,
    dateOfBirth: dob,
    termsAccepted: true,
    updatesOptIn: req.body.updatesOptIn === 'true',
    teamLogo: req.file ? `/uploads/${req.file.filename}` : ''
  });
  try {
    const delivery = await sendRegistrationConfirmation(registration);
    registration.notificationStatus = delivery.status;
    if (delivery.status === 'sent') registration.notificationSentAt = new Date();
  } catch (error) {
    registration.notificationStatus = 'failed';
    console.error(`Confirmation email failed for registration ${registration.id}:`, error.message);
  }
  await registration.save();

  const notificationMessages = {
    sent: 'A confirmation email has been sent to your inbox.',
    failed: 'Your registration is saved, but the confirmation email could not be sent. Please contact the tournament team.',
    not_configured: 'Your registration is saved. Email delivery will start after the mail server is configured.'
  };
  res.status(201).json({
    message: 'Registration received. Your team is on the roster!',
    notificationMessage: notificationMessages[registration.notificationStatus],
    registration: {
      id: registration.id,
      teamName: registration.teamName,
      game: registration.game,
      email: registration.email,
      status: registration.status,
      notificationStatus: registration.notificationStatus
    }
  });
});

