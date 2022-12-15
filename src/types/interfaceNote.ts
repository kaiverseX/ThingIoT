import {Timestamp} from 'firebase/firestore';

export interface INoteForm {
  customize?: {bgImage: string; color: string};
  tags?: string;
  title?: string;
  content?: string;
}

export interface INote extends INoteForm {
  id: string;
  userId: string;
  pendingDelete?: Timestamp;
  isLocked: boolean;
  isEncrypted: boolean;
  isArchived: boolean;
}
