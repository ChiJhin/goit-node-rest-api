import {model, Schema} from 'mongoose';    
import bcrypt from 'bcrypt';

import { userSubscription } from '../constants/const.js';

const userSchemas = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscription),
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  },{ 
    versionKey: false,
  }
);

  userSchemas.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }); 
  
  export const User = model('User', userSchemas); 