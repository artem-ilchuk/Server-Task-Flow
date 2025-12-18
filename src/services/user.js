import User from '../models/userSchema.js';

export const getCurrentUser = (userId) => User.findById(userId);
