import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const unitID =
  Platform.select({
    ios: '<Empty>',
    android: '<Empty>',
  }) ?? '';

const adUnitId = __DEV__ ? TestIds.BANNER : unitID;

export enum AdmobType {
  FixedHeight = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  Full = BannerAdSize.INLINE_ADAPTIVE_BANNER,
}

interface AdmobProps {
  type: string;
}

const BannerAD = ({type}: AdmobProps) => {
  return (
    <View style={[styles.admob]}>
      <BannerAd
        unitId={adUnitId}
        size={type}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  admob: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BannerAD;
