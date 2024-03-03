import {Notification} from '@notifee/react-native';
import NotificationClass from './NotificationClass';

class SampleNotification extends NotificationClass {
  constructor() {
    const notification: Notification = {};
    super(notification);
  }
}

export default new SampleNotification();
