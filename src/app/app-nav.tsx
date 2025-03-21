import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { HomeIcon, SettingsIcon } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailPage, ListPage, SettingPage } from '@pages';

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
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    Detail: DetailPage,
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
