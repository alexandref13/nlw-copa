import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';

import { SingIn } from '../screens/SingIn';

import { AppTabRoutes } from './app.tab_routes';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (user.name) {
      navigate('home');
    } else {
      navigate('singin');
    }
  }, [user]);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="singin" component={SingIn} />
      <Screen name="home" component={AppTabRoutes} />
    </Navigator>
  );
}
