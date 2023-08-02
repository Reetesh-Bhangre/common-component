// UI Notification interfaces
export interface uiNotificationConfig {
  timeOut?: number;
  progressBar?: boolean;
  preventDuplicates?: boolean;
  notificationType?: string;
}

export interface toastrMessage {
  title: string;
  message: string;
}
