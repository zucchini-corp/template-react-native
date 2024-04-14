import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators';
import translation from '@/translation';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import DeviceStore from '@/stores/DeviceStore';
import {AppState, NativeModules, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import admob, {MaxAdContentRating} from 'react-native-google-mobile-ads';

let locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;
if (locale.indexOf('_') !== -1) {
  locale = locale.split('_')[0];
}
translation.changeLanguage(locale);

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const requestAppTrackingPermission = async () => {
    if (Platform.OS === 'ios') {
      const permissionStatus = await request(
        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
      );
      if (permissionStatus === RESULTS.GRANTED) {
        console.log('App Tracking Transparency permission granted');
        admob()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForChildDirectedTreatment: true,
            tagForUnderAgeOfConsent: true,
          })
          .then(() => {
            console.log('AdMob initialized');
            DeviceStore.setATT(true);
          })
          .catch(error => {
            console.error('AdMob initialization failed', error);
          });
      } else {
        console.log('App Tracking Transparency permission denied');
        DeviceStore.setATT(false);
      }
    }
  };

  useEffect(() => {
    const listener = AppState.addEventListener('change', status => {
      if (status === 'active') {
        requestAppTrackingPermission();
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
