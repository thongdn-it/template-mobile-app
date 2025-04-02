import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppStore } from '@stores';
import { DetailPage, ListPage, SettingPage, SignInPage } from '@screens';

const HomeTabs = createBottomTabNavigator({
  screens: {
    List: {
      screen: ListPage,
      options: {
        tabBarIcon: ({ color }) => <HomeIcon color={color} />,
      },
    },
    Setting: {
      screen: SettingPage,
      options: {
        tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
});

const AppStack = createNativeStackNavigator({
  screens: {
    // Common screens
  },
  groups: {
    SignedIn: {
      if: () => useAppStore.getState().isLoggedIn,
      screens: {
        Home: {
          screen: HomeTabs,
          options: {
            headerShown: false,
          },
        },
        Detail: DetailPage,
      },
    },
    SignedOut: {
      if: () => !useAppStore.getState().isLoggedIn,
      screens: {
        SignIn: {
          screen: SignInPage,
          options: {
            headerShown: false,
          },
        },
      },
    },
  },
});

const AppNavigator = createStaticNavigation(AppStack);
export default AppNavigator;

// - typescript configuration - //
type RootStackParamList = StaticParamList<typeof AppStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
