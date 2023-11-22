import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/registerStyles";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';

const RegisterScreen = ({ navigation }: any) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [gettingLoginStatus, setGettingLoginStatus] = useState(false);
    // State variable to hold the password 
    const [password, setPassword] = useState('');

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(true);

    // Checkbox 1, 2 & 3 states
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);

    useEffect(() => {
        // Initial configuration
        GoogleSignin.configure({
            // Mandatory method to call before calling signIn() 
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Replace with your webClientId
            // Generated from Firebase console
            webClientId: '220243668648-ktb8gv8t3rh0gd08egt7v7ednatks3p5.apps.googleusercontent.com',
        });
        // Check if user is already signed in

        return () => {
            console.log("This only happens ONCE. Anything in here is fired on component UNMOUNT.");
            _signOut();
          }
    }, []);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleCheck = (value: Number) => {
        switch (value) {
            case 1:
                setCheckbox1(!checkbox1);
                break;
            case 2:
                setCheckbox2(!checkbox2);
                break;
            case 3:
                setCheckbox3(!checkbox3);
                break;
            default:
                console.log('Wrong condition provided');
                break;
        }
    };

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            ToastAndroid.show('User is already signed in', ToastAndroid.SHORT);
            // Set User Info if user is already signed in
            await _getCurrentUserInfo();
            return true;
        }
        else {
            setGettingLoginStatus(false);
            return false;
        }        
    }

    const _getCurrentUserInfo = async () => {
        try {
            let info: any = await GoogleSignin.signInSilently();
            console.log('User info --> ', info);
            setUserInfo(info);
        }
        catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                ToastAndroid.show('User has not signed in yet', ToastAndroid.SHORT);
                console.log('User has not signed in yet');
            }
            else {
                ToastAndroid.show("Unable to get user's info", ToastAndroid.SHORT);
                console.log("Unable to get user's info");
            }
        }
    };

    const _signIn = async () => {
        console.log('Login Pressed');

        //await _isSignedIn();

        if (
            await _isSignedIn() != true
            ) {
            // It will proppt google Signin Widget
            try {
                await GoogleSignin.hasPlayServices({
                    // Check if device has Google Play Services installed
                    // Always resolves to true on iOS
                    showPlayServicesUpdateDialog: true,
                });
                const userInfo: User = await GoogleSignin.signIn();
                ToastAndroid.show('Logged in successfully. \nWelcome '+userInfo['user']['name'], ToastAndroid.SHORT);
                console.log('User Info --> ', userInfo);
                setUserInfo(userInfo);
            }
            catch (error: any) {
                console.log('Message', JSON.stringify(error));
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    ToastAndroid.show('User Cancelled the Login Flow', ToastAndroid.SHORT);
                }
                else if (error.code === statusCodes.IN_PROGRESS) {
                    ToastAndroid.show('Signing In', ToastAndroid.SHORT);
                }
                else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    ToastAndroid.show('Plat Services Not Available or Outdated', ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                }
            }
        }
    };

    const _signOut = async () => {
        setGettingLoginStatus(true);
        // Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // Removing user Info
            setUserInfo(null);
            ToastAndroid.show('Logged Out', ToastAndroid.SHORT);
        }
        catch (error: any) {
            console.error(error);
            ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
        }
        setGettingLoginStatus(false);
    }
    return (
        /* Base Container */
        <View style={styles.container}>
            {/* Sub Container */}
            <View style={styles.subContainer}>
                {/* Heading Text */}
                <Text style={styles.headText}>
                    Join Our Educational Community
                </Text>

                {/* Text 1 */}
                <Text style={styles.text1}>
                    Empowering Minds, Building Futures
                </Text>

                {/* Checkboxes with texts */}
                <View style={styles.checkboxView}>
                    {/* Checkbox 1 */}
                    <View onStartShouldSetResponder={() => {
                        toggleCheck(1);
                        return true;
                    }} style={[styles.checkboxContainer, checkbox1 && { backgroundColor: '#2F80ED' }]}>
                    </View>
                    <Text style={styles.checkboxText}>
                        Teacher
                    </Text>

                    {/* Checkbox 2 */}
                    <View onStartShouldSetResponder={() => {
                        toggleCheck(2);
                        return true;
                    }} style={[styles.checkboxContainer, checkbox2 && { backgroundColor: '#2F80ED' }]}>
                    </View>
                    <Text style={styles.checkboxText}>
                        Student
                    </Text>

                    {/* Checkbox 3 */}
                    <View onStartShouldSetResponder={() => {
                        toggleCheck(3);
                        return true;
                    }} style={[styles.checkboxContainer, checkbox3 && { backgroundColor: '#2F80ED' }]}>
                    </View>
                    <Text style={styles.checkboxText}>
                        School
                    </Text>
                </View>

                {/* Name Container */}
                <View style={styles.inputContainer}>
                    {/* Name Text */}
                    <Text style={styles.inputText}>
                        Your name
                    </Text>
                    {/* Input Email */}
                    <TextInput
                        style={styles.inputNameEmail}
                        placeholder="First Last"
                        placeholderTextColor="#606060"
                    />
                </View>

                {/* Email Container */}
                <View style={styles.inputContainer}>
                    {/* Email Text */}
                    <Text style={styles.inputText}>
                        Email
                    </Text>
                    {/* Input Email */}
                    <TextInput
                        style={styles.inputNameEmail}
                        placeholder="you@email.com"
                        placeholderTextColor="#606060"
                    />
                </View>

                {/* Password Container */}
                <View style={styles.passwordContainer}>
                    {/* Password Text */}
                    <Text style={styles.inputText}>
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
                            placeholder="By.Y0u02"
                            placeholderTextColor="#606060"
                        />
                        <Icon
                            onPress={toggleShowPassword}
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={28}
                            color='#606060'
                        />
                    </View>
                </View>

                {/* Terms Container */}
                <View style={styles.termsContainer}>
                    <Text style={styles.termsText1}>
                        By signing up I agree to the <Text style={styles.termsText2}>terms & conditions</Text> and
                        <Text style={styles.termsText2}>privacy policy</Text>
                    </Text>
                </View>

                {/* Create Account Container */}
                <View style={styles.createAccContainer}>
                    {/* Create Account Text */}
                    <Text style={styles.createAccText}>Create An Account</Text>
                </View>

                {/* OR Image Container */}
                <Image source={require('../assets/OR.png')}
                    style={styles.orImage}
                />

                {/* Continue Google Button Container */}
                <TouchableOpacity onPress={_signIn}>
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

                {/* Already & Sign Container */}
                <View style={styles.alreadyContainer}>
                    <Text style={styles.alreadyText1}>
                        Already A Member?<Text onPress={() => navigation.navigate('LoginScreen')} style={styles.termsText2}> Sign In.
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RegisterScreen;