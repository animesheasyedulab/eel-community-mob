import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/loginStyles";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError, loginStatus } from "../features/userSlice";

const LoginScreen = ({ navigation }: any) => {
    // emailController & passwordController
    const [emailController, setEmailController] = useState('');
    const [passwordController, setPasswordController] = useState('');
    // Validation states for email & password
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const dispatch = useDispatch();
    // State variable to hold the password 
    //const [password, setPassword] = useState('');

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false);

    const [remember, setRemember] = useState(false);

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
            //console.log("This only happens ONCE. Anything in here is fired on component UNMOUNT.");
            //_signOut();
        }
    }, []);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleRemember = () => {
        setRemember(!remember);
    };

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            console.log('User is already signed in');
            ToastAndroid.show('User is already signed in', ToastAndroid.SHORT);
            dispatch(loginStatus('User is already signed in'));
            // Set User Info if user is already signed in
            await _getCurrentUserInfo();
            navigation.replace('DrawerNavigationRoutes');
            return true;
        }
        else {
            console.log('Please Login');
            dispatch(loginStatus('Please Login'));
            return false;
        }
    }

    const _getCurrentUserInfo = async () => {
        try {
            let info: any = await GoogleSignin.signInSilently();
            console.log('User info --> ', info);
            dispatch(loginSuccess(info));
        }
        catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                ToastAndroid.show('User has not signed in yet', ToastAndroid.SHORT);
                console.log('User has not signed in yet');
                dispatch(loginError('User has not signed in yet'));
            }
            else {
                ToastAndroid.show("Unable to get user's info", ToastAndroid.SHORT);
                console.log("Unable to get user's info");
                dispatch(loginError("Unable to get user's info"));
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
                ToastAndroid.show('Logged in successfully. \nWelcome ' + userInfo['user']['name'], ToastAndroid.SHORT);
                //console.log('User Info --> ', userInfo);                
                dispatch(loginSuccess(userInfo));
                navigation.replace('DrawerNavigationRoutes');
            }
            catch (error: any) {
                console.log('Message', JSON.stringify(error));
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    ToastAndroid.show('User Cancelled the Login Flow', ToastAndroid.SHORT);
                    dispatch(loginError('User Cancelled the Login Flow'));
                }
                else if (error.code === statusCodes.IN_PROGRESS) {
                    ToastAndroid.show('Signing In', ToastAndroid.SHORT);
                    dispatch(loginStatus('Signing In'));
                }
                else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    ToastAndroid.show('Play Services Not Available or Outdated', ToastAndroid.SHORT);
                    dispatch(loginError('Play Services Not Available or Outdated'));
                }
                else {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    dispatch(loginError(error.message));
                }
            }
        }
    };

    const validateEmail = () => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        const emailValid = emailReg.test(emailController);
        if (emailController == '') {
            setEmailError(true);
            setEmailErrorText("Email is required");
            return false;
        }
        else if (emailValid != true) {
            setEmailError(true);
            setEmailErrorText('Incorrect email format');
            return false;
        }
        else {
            setEmailError(false);
            setEmailErrorText('');
            return true;
        }
    };

    const validatePassword = () => {
        let passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$/
        const passValid = passReg.test(passwordController);
        if (passwordController == '') {
            setPasswordError(true);
            setPasswordErrorText("Password is required");
            return false;
        }
        else if (passValid != true) {
            setPasswordError(true);
            setPasswordErrorText('Password should contain atleast 8 characters having 1 upper case,1 lowercase,1 numeric number,1 special character');
            return false;
        }
        else {            
            setPasswordError(false);
            setPasswordErrorText('');
            return true;
        }
    };

    return (
        /* Base Container */
        <View style={styles.container}>
            {/* Sub Container */}
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
                    {/* Email Text */}
                    <Text style={styles.emailText}>
                        Email or Phone
                    </Text>
                    {/* Input Email */}
                    <TextInput
                        value={emailController}
                        onChangeText={setEmailController}
                        style={styles.inputEmail}
                        placeholder="Enter your email or phone"
                        placeholderTextColor="#606060"
                    />
                    {emailError && (
                        <Text style={styles.errorText}>
                            {emailErrorText}
                        </Text>)}
                </View>

                {/* Password Container */}
                <View style={styles.passwordContainer}>
                    {/* Password Text */}
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
                            value={passwordController}
                            onChangeText={setPasswordController}
                            style={styles.inputPassword}
                            placeholder="•••••••••"
                            placeholderTextColor="#606060"
                        />
                        <Icon
                            onPress={toggleShowPassword}
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={28}
                            color='#606060'
                        //style={{ marginTop: 0, marginRight: 0 }} 
                        />
                    </View>
                    {passwordError && (
                        <Text style={styles.errorText}>
                            {passwordErrorText}
                        </Text>)}
                </View>

                {/* Remember Forgot Container */}
                <View style={styles.rememberForgotContainer}>
                    <Text>
                        {/* Checkbox Container */}
                        <View onStartShouldSetResponder={() => {
                            toggleRemember();
                            return true;
                        }} style={styles.checkboxContainer}>
                            {remember && (<Icon
                                name='check'
                                size={18}
                                color='black'
                            />)}
                        </View>
                        <View>
                            <Text style={styles.emailText}>  Remember me</Text>
                        </View>
                    </Text>
                    {/* Forgot Text */}
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </View>

                {/* Signin Button Container */}
                <View onStartShouldSetResponder={() => {
                    const emailValid = validateEmail();
                    const passValid = validatePassword();
                    if (emailValid && passValid) {
                        return navigation.replace('CompleteProfileRoutes');
                    }
                    return true;
                }} style={styles.signinContainer}>
                    {/* Sign In Text */}
                    <Text style={styles.signinText}>Sign In</Text>
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

                {/* New Join Button Container */}
                <View style={styles.newJoinContainer}>
                    <Text style={styles.newJoinText1}>
                        New to EasyEduCom?
                    </Text>
                    <Text onPress={() => navigation.replace('RegisterScreen')} style={styles.newJoinText2}>
                        Join now
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

/*Redundant code-
//{remember ? 'check' : 'check-box'} */