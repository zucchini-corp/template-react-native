import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators';
import {NativeModules, Platform} from 'react-native';
import translation from '@/translation';
import {RecoilRoot} from 'recoil';
import notifee from '@notifee/react-native';

let locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;
if (locale.indexOf('_') !== -1) {
  locale = locale.split('_')[0];
}
translation.changeLanguage(locale);

function App(): React.JSX.Element {
  notifee.requestPermission();
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
