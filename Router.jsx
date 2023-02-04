import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransactorAppBar } from './app/components/AppBar/TransactorAppBar';
import { AddUpdateConsumer } from './app/screens/Consumers/AddUpdateConsumer';
import { HomeTabs } from './app/screens/Home/HomeTabs';

const Stack = createStackNavigator();

export function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <TransactorAppBar {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeTabs}
        />
        <Stack.Screen
          name="AddUpdateConsumer"
          component={AddUpdateConsumer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
