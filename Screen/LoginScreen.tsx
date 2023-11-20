import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/loginStyles";

const LoginScreen = () => {
    // State variable to hold the password 
    const [password, setPassword] = useState('');

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false);

    const [remember, setRemember] = useState(false);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleRemember = () => {
        console.log('press');
        setRemember(!remember);
    };
    return (
        /* Base Container */
        <View style={styles.container}>
            {/* Sub Container */}
            {/*<ScrollView>*/}
            <View style={styles.subContainer}>
                {/* Heading Text */}
                <Text style={styles.headText}>
                    Welcome to your academics
                    community
                </Text>

                {/* Text 1 and Text 2 */}
                <Text style={styles.text1}>
                    Connect from educational stakeholders with <Text
                        style={styles.text2}>EasyEduCom
                    </Text>
                </Text>

                {/* Email Container */}
                <View style={styles.emailContainer}>
                    {/* Text 3 */}
                    <Text style={styles.emailText}>
                        Email or Phone
                    </Text>
                    {/* Input Email */}
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="Enter your email or phone"
                        placeholderTextColor="#606060"
                    />
                </View>

                {/* Password Container */}
                <View style={styles.passwordContainer}>
                    {/* Text 3 */}
                    <Text style={styles.emailText}>
                        Password
                    </Text>
                    {/* Password Input Container */}
                    <View style={styles.passwordInputContainer}>
                        {/* Input Password */}
                        <TextInput
                            // Set secureTextEntry prop to hide  
                            // password when showPassword is false 
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.inputPassword}
                            placeholder="•••••••••"
                            placeholderTextColor="#606060"
                        />
                        <Pressable onPress={toggleShowPassword} >
                            <Icon
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={28}
                            //style={{ marginTop: 0, marginRight: 0 }} 
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Remember Forgot Container */}
                <View style={styles.rememberForgotContainer}>
                    <Text>
                        {/* Checkbox Container */}
                        <Pressable onPress={toggleRemember}>
                            <View style={styles.checkboxContainer}>
                                {remember && (<Icon
                                    name='check'//{remember ? 'check' : 'check-box'}
                                    size={18}
                                    color='black'
                                />)}
                            </View>
                        </Pressable>
                        <View>
                            <Text style={styles.emailText}>  Remember me</Text>
                        </View>
                    </Text>
                    {/* Forgot Text */}
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </View>

                {/* Signin Button Container */}
                <View style={styles.signinContainer}>
                    {/* Sign In Text */}
                    <Text style={styles.signinText}>Sign In</Text>
                </View>

                {/* OR Image Container */}
                <Image source={require('../assets/OR.png')}
                    style={styles.orImage}
                />

                {/* Continue Google Button Container */}
                <TouchableOpacity>
                    <View style={styles.contGogContainer}>
                        <Image source={require('../assets/Google.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        {/* Continue Google Text */}
                        <Text style={styles.contGogText}>
                            Continue with Google
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* New Join Button Container */}
                <TouchableOpacity>
                    <View style={styles.newJoinContainer}>
                        <Text style={styles.newJoinText1}>
                            New to EasyEduCom?
                        </Text>
                        <Text style={styles.newJoinText2}>
                            Join now
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
            {/*<ScrollView>*/}
        </View>
    );
};

export default LoginScreen;



/*Redundant code-
//import CheckBox from "./Components/CheckBox";
/*<CheckBox
                        onPress={() => setCheckbox(!checkbox)}
                        title="Music"
                        isChecked={checkbox}
                    /> 
 //import AntIcon from "react-native-vector-icons/AntDesign";
//import Octicon from "react-native-vector-icons/Octicons";                    */