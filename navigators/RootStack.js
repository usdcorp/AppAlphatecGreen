import React from "react";

//react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screeens
import Login from "../screens/Login";
import HomeCustomer from "../screens/HomeCustomer";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: '#1F2937',
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle :{ paddingLeft: 20 }
        }}
        //initialRouteName = "Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
