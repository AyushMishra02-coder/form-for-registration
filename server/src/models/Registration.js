import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, trim: true, maxlength: 80, required: true },
  gameId: { type: String, trim: true, maxlength: 80, required: true }
}, { _id: false });

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, maxlength: 60, required: true },
  lastName: { type: String, trim: true, maxlength: 60, required: true },
  email: { type: String, trim: true, lowercase: true, maxlength: 160, required: true, index: true },
  phone: { type: String, trim: true, maxlength: 30, required: true },
  dateOfBirth: { type: Date, required: true },
  gameUsername: { type: String, trim: true, maxlength: 80, required: true },
  game: { type: String, required: true, enum: ['Valorant', 'BGMI', 'Free Fire', 'Counter-Strike 2', 'Call of Duty: Mobile', 'Rocket League', 'Other'] },
  teamSize: { type: Number, required: true, enum: [1, 2, 4, 5, 6] },
  teamName: { type: String, trim: true, maxlength: 80, required: true },
  teamTag: { type: String, trim: true, uppercase: true, maxlength: 8, default: '' },
  teamLogo: { type: String, default: '' },
  rank: { type: String, default: '' },
  mode: { type: String, required: true, enum: ['solo', 'duo', 'squad'] },
  region: { type: String, trim: true, required: true, maxlength: 80 },
  notes: { type: String, trim: true, maxlength: 1000, default: '' },
  players: { type: [playerSchema], default: [] },
  termsAccepted: { type: Boolean, required: true, validate: value => value === true },
  updatesOptIn: { type: Boolean, default: false },
  notificationStatus: { type: String, enum: ['pending', 'sent', 'failed', 'not_configured'], default: 'pending' },
  notificationSentAt: { type: Date, default: null },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);
