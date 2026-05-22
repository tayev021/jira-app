import { model, Schema, Types } from 'mongoose';
import { User } from '../user/user.model';

export interface Workspace {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  ownerId: Types.ObjectId;
  memberIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type PopulatedWorkspace = Omit<Workspace, 'ownerId' | 'memberIds'> & {
  ownerId: User;
  memberIds: User[];
};

const workspaceSchema = new Schema<Workspace>(
  {
    slug: {
      type: String,
      required: [true, 'A workspace must have a slug'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'A workspace must have a name'],
      set(value: string) {
        if (!value) return value;
        return value
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      },
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A workspace must have a owner'],
    },
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Workspace = model<Workspace>('Workspace', workspaceSchema);
