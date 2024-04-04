import notifee, {Notification, TriggerType} from '@notifee/react-native';
import Channel from './Channel';

const createNotification = (notification: Notification, timestamp?: number) => {
  return {
    notify: () => {
      if (timestamp === undefined) {
        notifee.displayNotification(notification);
      } else {
        notifee.createTriggerNotification(notification, {
          type: TriggerType.TIMESTAMP,
          timestamp,
        });
      }
    },
  };
};

export const createWelcomeNotification = (
  notification: Notification,
  timestamp?: number,
) => {
  return createNotification(
    {
      ...notification,
      id: 'welcome',
      android: {
        channelId: Channel.DEFAULT.id,
        pressAction: {
          id: 'default',
        },
      },
    },
    timestamp,
  );
};

// createWelcomeNotification({title: ''}, 2000).notify();
