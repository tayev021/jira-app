import { model, Schema, Types } from 'mongoose';
import { IssueStatus, IssueStatuses } from '../../shared/types/IssueStatus';
import {
  IssuePriorities,
  IssuePriority,
} from '../../shared/types/IssuePriority';
import { User } from '../user/user.model';

export interface Issue {
  _id: Types.ObjectId;
  slug: string;
  sequenceNumber: number;
  title: string;
  description: string;
  workspaceId: Types.ObjectId;
  reporterId: Types.ObjectId;
  assigneeIds: Types.ObjectId[];
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: Date;
  updatedAt: Date;
  doneAt: Date | null;
}

export type PopulatedIssue = Omit<Issue, 'reporterId' | 'assigneeIds'> & {
  reporterId: User;
  assigneeIds: User[];
};

const issueSchema = new Schema<Issue>(
  {
    title: {
      type: String,
      required: [true, 'An issue must have a title'],
      set(value: string) {
        if (!value) return value;
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    slug: {
      type: String,
      required: [true, 'An issue must have a slug'],
      unique: true,
    },
    sequenceNumber: {
      type: Number,
      required: [true, 'An issue must have a sequence number'],
    },
    description: {
      type: String,
      required: [true, 'An issue must have a description'],
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'An issue must belong to a workspace'],
    },
    reporterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An issue must have a reporter'],
    },
    assigneeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    status: {
      type: String,
      enum: IssueStatuses,
      default: 'todo',
    },
    priority: {
      type: String,
      enum: IssuePriorities,
      default: 'none',
    },
    doneAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

issueSchema.pre('save', function () {
  if (!this.isModified('status')) return;

  if (this.status === 'done') {
    this.doneAt = new Date();
  } else {
    this.doneAt = null;
  }
});

export const Issue = model<Issue>('Issue', issueSchema);
