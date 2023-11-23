import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/registerStyles";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from "react-redux";
import { loginError, loginStatus, loginSuccess } from "../features/userSlice";

const RegisterScreen = ({ navigation }: any) => {
    // nameController, emailController & passwordController
    const [nameController, setNameController] = useState('');
    const [emailController, setEmailController] = useState('');
    const [passwordController, setPasswordController] = useState('');
    // Validation states for name, email & password
    const [nameError, setNameError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const dispatch = useDispatch();
    // State variable to hold the password 
    //const [password, setPassword] = useState('');

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(true);

    // Checkbox 1, 2 & 3 states
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '220243668648-ktb8gv8t3rh0gd08egt7v7ednatks3p5.apps.googleusercontent.com',
        });
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
            console.log('User is already signed in');
            ToastAndroid.show('User is already signed in', ToastAndroid.SHORT);
            dispatch(loginStatus('User is already signed in'));

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
            //console.log('User info --> ', info);
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

        if (
            await _isSignedIn() != true
        ) {

            try {
                await GoogleSignin.hasPlayServices({
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

    const validateName = () => {
        if (nameController == '') {
            setNameError(true);
            setNameErrorText("Name can't be blank");
        }
        else {
            setNameError(false);
            setNameErrorText('');
        }
    };

    const validateEmail = () => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        const emailValid = emailReg.test(emailController);
        if (emailController == '') {
            setEmailError(true);
            setEmailErrorText("Email can't be blank");
        }
        else if (emailValid != true) {
            setEmailError(true);
            setEmailErrorText('Enter correct email');
        }
        else {
            setEmailError(false);
            setEmailErrorText('');
        }
    };

    const validatePassword = () => {
        let passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$/
        const passValid = passReg.test(passwordController);
        if (passwordController == '') {
            setPasswordError(true);
            setPasswordErrorText("Password can't be blank");
        }
        else if (passValid != true) {
            setPasswordError(true);
            setPasswordErrorText('Password should contain atleast 8 characters having 1 upper case,1 lowercase,1 numeric number,1 special character');
        }
        else {
            setPasswordError(false);
            setPasswordErrorText('');
        }
    };

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
                        value={nameController}
                        onChangeText={setNameController}
                        style={styles.inputNameEmail}
                        placeholder="First Last"
                        placeholderTextColor="#606060"
                    />
                    {nameError && (
                        <Text style={styles.errorText}>
                            {nameErrorText}
                        </Text>)}
                </View>

                {/* Email Container */}
                <View style={styles.inputContainer}>
                    {/* Email Text */}
                    <Text style={styles.inputText}>
                        Email
                    </Text>
                    {/* Input Email */}
                    <TextInput
                        value={emailController}
                        onChangeText={setEmailController}
                        style={styles.inputNameEmail}
                        placeholder="you@email.com"
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
                            value={passwordController}
                            onChangeText={setPasswordController}
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
                    {passwordError && (
                        <Text style={styles.errorText}>
                            {passwordErrorText}
                        </Text>)}
                </View>

                {/* Terms Container */}
                <View style={styles.termsContainer}>
                    <Text style={styles.termsText1}>
                        By signing up I agree to the <Text style={styles.termsText2}>terms & conditions</Text> and
                        <Text style={styles.termsText2}> privacy policy</Text>
                    </Text>
                </View>

                {/* Create Account Container */}
                <View onStartShouldSetResponder={() => {
                    validateName();
                    validateEmail();
                    validatePassword();
                    return true;
                }} style={styles.createAccContainer}>
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
                        Already A Member?<Text onPress={() => navigation.replace('LoginScreen')} style={styles.termsText2}> Sign In.
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RegisterScreen;