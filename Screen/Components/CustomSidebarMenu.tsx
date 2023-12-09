// Import React and Component
import React, { useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ToastAndroid } from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { logoutSuccess, logoutError } from '../../features/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import stylesSidebar from '../../styles/customSidebarMenu';

const CustomSidebarMenu = (props: any) => {
    const username = useSelector((state: RootState) => state.user.user.userInfo.user.name);
    var nameFirstChar;
    if (username != null) {
        //console.log('username not null');
        nameFirstChar = username;
        nameFirstChar = nameFirstChar.charAt(0);
    }
    else {
        nameFirstChar = '';
    }

    const dispatch = useDispatch();

    useEffect(() => {
        //console.log('here');        
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '220243668648-ktb8gv8t3rh0gd08egt7v7ednatks3p5.apps.googleusercontent.com',
        });
        return () => {
            //console.log("This only happens ONCE. Anything in here is fired on component UNMOUNT.");
        }
    }, []);

    const _signOut = async () => {
        // Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // Removing user Info
            dispatch(logoutSuccess(null));
            ToastAndroid.show('Logged out successfully.', ToastAndroid.SHORT);
        }
        catch (error: any) {
            console.error(error);
            dispatch(logoutError(error));
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }
    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{ fontSize: 25, color: '#307ecc' }}>
                        {nameFirstChar}
                    </Text>
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    {username}
                </Text>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={({ color }) =>
                        <Text style={{ color: 'white' }}>
                            Logout
                        </Text>
                    }
                    onPress={() => {
                        props.navigation.toggleDrawer();
                        Alert.alert(
                            'Logout',
                            'Are you sure? You want to logout?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: 'Confirm',
                                    onPress: async () => {
                                        await _signOut();
                                        //AsyncStorage.clear(); // It also cleares all save data in redux or 
                                        props.navigation.replace('Auth');
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomSidebarMenu;