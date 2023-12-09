import React, { useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/loginStyles";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RadioGroup from 'react-native-radio-buttons-group';
import useCustomHook from "./useCustomHook";

const LoginScreen = ({ navigation }: any) => {
    const {
        gemail,
        isGLoginSuccess,
        roleData,
        roleController, setRoleController,
        emailController, setEmailController,
        passwordController, setPasswordController,
        roleError,
        emailError,
        passwordError,
        roleErrorText,
        emailErrorText,
        passwordErrorText,
        getUsers,
        users, isLoading, isSuccess, isError, error,
        showPassword,
        remember,
        extractUserPushEmail,
        checkDbIncludesEmailGoogle,
        hitLoginApi,
        toggleShowPassword,
        toggleRemember,
        _signIn,
        validateRole,
        validateEmail,
        validatePassword,
    } = useCustomHook(navigation);

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

        // If get register api is hit & status are fetched
        if (isLoading) {
            console.log('Loading');
        }
        else if (isSuccess) {
            // Here 1st extracting users object value & then inside users object if another object resides then map through it & check for all email fields & puth those email values into dbemail array
            extractUserPushEmail(users);
        }
        else if (isError) {
            console.log('error = ' + error);
        }

        if (isGLoginSuccess) {
            checkDbIncludesEmailGoogle(gemail);
        }
    }, [users, isGLoginSuccess, roleController]);

    return (
        <ScrollView contentContainerStyle={styles.scrollView} contentInsetAdjustmentBehavior='automatic'>
            {/* Base Container */}
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

                    {/* Checkboxes with texts */}
                    <RadioGroup
                        containerStyle={styles.roleContainer}
                        layout="row"
                        radioButtons={roleData}
                        onPress={setRoleController}
                        selectedId={roleController}
                    />
                    {roleError && (
                        <Text style={styles.errorText}>
                            {roleErrorText}
                        </Text>)}

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
                            hitLoginApi();
                            //return navigation.replace('CompleteProfileRoutes');
                        }
                        return true;
                    }} style={styles.signinContainer}>
                        {/* Sign In Text */}
                        <Text style={styles.signinText}>Sign In</Text>
                    </View>

                    {/* OR Image Container */}
                    <Image source={require('../../assets/OR.png')}
                        style={styles.orImage}
                    />

                    {/* Continue Google Button Container */}
                    <TouchableOpacity onPress={() => {
                        const roleValid = validateRole();
                        if (roleValid) {
                            _signIn();
                            getUsers(null);
                        }
                    }}>
                        <View style={styles.contGogContainer}>
                            <Image source={require('../../assets/Google.png')}
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
        </ScrollView>
    );
};

export default LoginScreen;