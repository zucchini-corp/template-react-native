import notifee, {Notification, TriggerType} from '@notifee/react-native';

export default class NotificationClass {
  notification: Notification = {};

  private async createChannel(notification: Notification) {
    const channelId = notification.android?.channelId;
    if (channelId) {
      const isChannelCreated = await notifee.isChannelCreated(channelId);
      if (!isChannelCreated) {
        const createdChannelId = await notifee.createChannel({
          id: channelId,
          name: channelId,
        });
        return createdChannelId;
      }
    }
  }

  private validate(notification: Notification) {
    console.log('validate - ', notification);
    if (notification.id) {
      return true;
    } else {
      return false;
    }
  }

  constructor(notification: Notification) {
    if (this.validate(notification)) {
      this.createChannel(notification);
      this.notification = notification;
    } else {
      throw new Error(
        'Notification Initialize Error : notification.id is undifiend.',
      );
    }
  }

  async display(): Promise<string> {
    return await notifee.displayNotification(this.notification);
  }

  async schedule(timestamp: number): Promise<string> {
    return await notifee.createTriggerNotification(this.notification, {
      type: TriggerType.TIMESTAMP,
      timestamp,
    });
  }

  async cancel(): Promise<boolean> {
    if (this.notification.id) {
      await notifee.cancelNotification(this.notification.id);
      return true;
    }
    return false;
  }
}
