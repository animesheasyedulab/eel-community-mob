import React from "react";
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./HomeScreen";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import SettingsScreen from "./SettingsScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }: any) => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Home', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader color="red" navigationProps={navigation} />
                    ),
                    headerStyle: {
                        //backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: 'black', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', // Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const SettingScreenStack = ({ navigation }: any) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    //backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: 'black', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', // Set Header text style
                },
            }}
        >
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings', //Set Header Title                
                }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigationRoutes = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={CustomSidebarMenu}>
            <Drawer.Screen
                name="HomeScreenStack"
                options={{ drawerLabel: 'Home Screen', drawerLabelStyle: {color: 'white'} }}
                component={HomeScreenStack} />
            <Drawer.Screen
                name="SettingScreenStack"
                options={{ drawerLabel: 'Setting Screen', drawerLabelStyle: {color: 'white'} }}
                component={SettingScreenStack} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({});

export default DrawerNavigationRoutes;