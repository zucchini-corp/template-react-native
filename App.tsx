import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators';
import {NativeModules, Platform} from 'react-native';
import translation from '@/translation';
import {RecoilRoot} from 'recoil';
import notifee from '@notifee/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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
  notifee.requestPermission();
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
