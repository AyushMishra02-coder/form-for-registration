import { Router } from 'express';
import { createRegistration } from '../controllers/registrationController.js';
import { uploadLogo } from '../middleware/upload.js';

const router = Router();
router.post('/', (req, res, next) => uploadLogo(req, res, error => {
  if (error) return next(error);
  next();
}), createRegistration);
export default router;
