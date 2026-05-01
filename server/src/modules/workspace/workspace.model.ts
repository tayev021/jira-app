import { model, Schema, Types } from 'mongoose';

export interface Workspace {
  _id: Types.ObjectId;
  name: string;
  ownerId: Types.ObjectId;
  memberIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<Workspace>(
  {
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
