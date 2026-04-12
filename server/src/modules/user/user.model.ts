import { Schema, Types, model } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      set(value: string) {
        if (!value) return value;
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    surname: {
      type: String,
      required: [true, 'A user must have a surname'],
      set(value: string) {
        if (!value) return value;
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    email: {
      type: String,
      required: [true, 'A user must have a email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<User>('User', userSchema);
