export interface INotificationDTO {
  messageType?: string;
  subject?: string;
  message?: string;
  referenceId?: string;
  isHtml?: string;
}

export class NotificationDTO implements INotificationDTO {
  constructor(
    public destinationAddress?: string,
    public sourceAddress?: string,
    public messageType?: string,
    public subject?: string,
    public message?: string,
    public referenceId?: string,
    public isHtml?: string
  ) {
  }
}
