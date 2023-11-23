// Import React and Component
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavigationDrawerHeader = (props: any) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Icon
                name='dehaze'
                size={28}
                color="black"
                style={{marginHorizontal: 10, paddingTop: 5}}
                />                
            </TouchableOpacity>
        </View>
    );
};
export default NavigationDrawerHeader;