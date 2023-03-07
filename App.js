import { createStackNavigator } from "@react-navigation/stack";
import FileScanner from "./components/FileScanner/FileScanner";


const Stack = createStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Scanner'>
             <Stack.Screen
                name="Scanner"
                component={FileScanner}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
