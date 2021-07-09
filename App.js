import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from './container/HomeContainer';
import AppBar from './components/AppBar'

const Stack = createStackNavigator();
export const AppContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <AppContext.Provider value={{ searchValue }}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator >
            <Stack.Screen name="Home" options={{
              header: (props) => <AppBar searchValue={searchValue} setSearchValue={setSearchValue} {...props} />
            }}
              component={HomeContainer}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
