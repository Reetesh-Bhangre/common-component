export type notification = {
  id: 'string';
  userId: 'string';
  clientId: 'string';
  subject: 'string';
  message: 'string';
  source: 'string';
  severity: 'string';
  isRead: boolean;
  isArchived: boolean;
  messageEnqueueTs: 'string';
  messageReadTs: 'string';
  messageArchivedTs: 'string';
  lastModifiedTs: 'string';
  lastActionTaken: 'string';
};
