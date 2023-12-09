import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompleteProfile from '../Screen/CompleteProfile/CompleteProfile';
import CompleteProfile2 from '../Screen/CompleteProfile2/CompleteProfile2';
import CompleteProfile3 from '../Screen/CompleteProfile3/CompleteProfile3';

const Stack = createStackNavigator();

const CompleteProfileRoutes = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        <Stack.Navigator initialRouteName="CompleteProfile">
            <Stack.Screen
                name="CompleteProfile"
                component={CompleteProfile}
                options={{
                    headerShown: true,
                    title: 'Complete Profile',
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />

            <Stack.Screen
                name="CompleteProfile2"
                component={CompleteProfile2}
                options={{
                    headerShown: true,
                    title: 'Complete Profile',
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />

            <Stack.Screen
                name="CompleteProfile3"
                component={CompleteProfile3}
                options={{
                    headerShown: true,
                    title: 'Complete Profile',
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    );
};

export default CompleteProfileRoutes;