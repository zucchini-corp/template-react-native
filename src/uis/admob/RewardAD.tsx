import DeviceStore from '@/stores/DeviceStore';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {
  RewardedAdEventType,
  RewardedInterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const unitID =
  Platform.select({
    ios: '<Empty>',
    android: '<Empty>',
  }) ?? '';

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : unitID;

const RewardAD = () => {
  const requestNonPersonalizedAdsOnly = !DeviceStore.getATT();
  useEffect(() => {
    const rewarded = RewardedInterstitialAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing', 'game'],
      requestNonPersonalizedAdsOnly,
    });
    const eventListener = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('User earned reward:', rewarded.loaded);
        rewarded.show();
      },
    );
    rewarded.load();
    return () => {
      eventListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
export default RewardAD;
