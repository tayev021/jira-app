import { Types } from 'mongoose';
import { Sequence } from '../../../shared/model/Sequence';

export async function getNextSequence(workspaceId: Types.ObjectId) {
  const { seq } = await Sequence.findOneAndUpdate(
    { _id: workspaceId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return seq;
}
