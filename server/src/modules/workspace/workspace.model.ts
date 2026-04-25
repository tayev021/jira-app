import { model, Schema, Types } from 'mongoose';

export interface Workspace {
  _id: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
}

const workspaceSchema = new Schema<Workspace>({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A workspace must have a owner'],
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
});

export const Workspace = model<Workspace>('Workspace', workspaceSchema);
