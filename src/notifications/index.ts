import notifee, {
  AndroidChannel,
  Notification,
  TriggerType,
} from '@notifee/react-native';
import _ from 'lodash';
import {Platform} from 'react-native';

// 1. 권한 요청
export const requestPermission = () => {
  notifee.requestPermission();
};

// 2. 채널 생성 (android)
export const createChannel = async (channel: AndroidChannel) => {
  if (Platform.OS === 'android') {
    await notifee.createChannel(channel);
  }
};

// 3. 푸시 알림 예약
export const setNotification = <T>({
  title,
  subtitle,
  body,
  id,
  channelId,
  data,
  timestamp,
}: {
  title: string;
  subtitle?: string;
  body?: string;
  id?: string;
  channelId?: string;
  data?: T;
  timestamp?: number;
}) => {
  let notification: Notification = {title};
  subtitle && (notification.subtitle = subtitle);
  body && (notification.body = body);
  id && (notification.id = id);
  channelId &&
    (notification.android = {
      channelId,
      pressAction: {
        id: 'default',
      },
    });
  data && (notification.data = data);

  if (timestamp === undefined) {
    notifee.displayNotification(notification);
  } else {
    notifee.createTriggerNotification(notification, {
      type: TriggerType.TIMESTAMP,
      timestamp,
    });
  }
};
