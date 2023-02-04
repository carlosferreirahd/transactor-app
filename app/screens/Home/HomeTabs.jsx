import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ConsumersTab } from './ConsumersTab';
import { TransactionsTab } from './TransactionsTab';

const Tab = createMaterialTopTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Clientes" component={ConsumersTab} />
      <Tab.Screen name="Transações" component={TransactionsTab} />
    </Tab.Navigator>
  );
}
