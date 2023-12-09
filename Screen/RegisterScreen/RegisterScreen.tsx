import React, { useEffect } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../styles/registerStyles";
import { RadioGroup } from "react-native-radio-buttons-group";
import useCustomHook from "./useCustomHook";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const RegisterScreen = ({ navigation }: any) => {
    // States
    const {
        roleData,
        roleController, setRoleController,
        nameController, setNameController,
        emailController, setEmailController,
        passwordController, setPasswordController,
        roleError, 
        nameError, 
        emailError, 
        passwordError, 
        roleErrorText, 
        nameErrorText, 
        emailErrorText, 
        passwordErrorText, 
        showPassword, 
        toggleShowPassword,
        _signIn,
        validateRole,
        validateName,
        validateEmail,
        validatePassword,
    } = useCustomHook(navigation);

    // Side effects
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '220243668648-ktb8gv8t3rh0gd08egt7v7ednatks3p5.apps.googleusercontent.com',
        });
    }, []);

    // View
    return (
        <ScrollView contentContainerStyle={styles.scrollView} contentInsetAdjustmentBehavior='automatic'>
            {/* Base Container */}
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
                        validateRole();
                        validateName();
                        validateEmail();
                        validatePassword();
                        return true;
                    }} style={styles.createAccContainer}>
                        {/* Create Account Text */}
                        <Text style={styles.createAccText}>Create An Account</Text>
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

                    {/* Already & Sign Container */}
                    <View style={styles.alreadyContainer}>
                        <Text style={styles.alreadyText1}>
                            Already A Member?<Text onPress={() => navigation.replace('LoginScreen')} style={styles.termsText2}> Sign In.
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;