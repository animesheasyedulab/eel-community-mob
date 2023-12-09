import { useMemo, useState } from "react";
import { ToastAndroid } from "react-native";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError, loginStatus } from "../../features/userSlice";
import { useLazyGetUsersQuery } from "../../features/api/getregisterapiSlice";
import { useAddUserMutation } from "../../features/api/registerapiSlice";
import { useLoginUserMutation } from "../../features/api/loginapiSlice";
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import * as RootNavigation from '../../Routes/RootNavigation';

const useCustomHook = ({ navigation }: any) => {
    // All Google login states for payload send
    var [gemail, setGemail] = useState<any>();
    var [gfirst, setGfirst] = useState<any>();
    var [glast, setGlast] = useState<any>();
    var [gid, setGid] = useState<any>(); // We will set this id as password when login/signup
    const [isGLoginSuccess, setIsGLoginSuccess] = useState(false);
    // role options
    const roleData: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Teacher',
            value: 'Teacher',
            labelStyle: { color: 'black', fontWeight: "700" },
            color: '#007BFF',
            borderColor: 'black',
        },
        {
            id: '2',
            label: 'Student',
            value: 'Student',
            labelStyle: { color: 'black', fontWeight: "700" },
            color: '#007BFF',
            borderColor: 'black',
        },
        {
            id: '3',
            label: 'School',
            value: 'School',
            labelStyle: { color: 'black', fontWeight: "700" },
            color: '#007BFF',
            borderColor: 'black',
        },
    ]), []);

    var dbemail: unknown[] = [];
    // roleController, emailController & passwordController
    const [roleController, setRoleController] = useState<any>('');
    const [emailController, setEmailController] = useState('');
    const [passwordController, setPasswordController] = useState('');
    // Validation states for role, email & password
    const [roleError, setRoleError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // errorTexts
    const [roleErrorText, setRoleErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');

    // Slices
    const [addUser, response] = useAddUserMutation();
    const [loginUser, loginResponse] = useLoginUserMutation();

    // Returns trigger function and results object
    const [getUsers, { data: users, isLoading, isSuccess, isError, error, }] = useLazyGetUsersQuery();

    const dispatch = useDispatch();

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false);

    const [remember, setRemember] = useState(false);

    const extractUserPushEmail = (users: any) => {
        var i = 0;
        Object.entries(users)
            .map(([name, value]: any) => {
                if (typeof value === "object") {
                    var userdata;
                    while (i != value.length) {
                        userdata = Object.entries(value[i]).map(([name, value]) => {
                            if (name == 'email') {
                                dbemail.push(value);
                            }
                            return `${name}: ${value}`
                        });
                        i++;
                    }

                    return `${name}: ${userdata}`;
                }
                return;

            })
            .join('\n');
    };

    const checkDbIncludesEmailGoogle = (email: any) => {
        if (dbemail.includes(gemail)) {
            console.log('User exists. Logging in.');
            ToastAndroid.show('User exists. Logging in.', ToastAndroid.SHORT);
            RootNavigation.navigate('CompleteProfileRoutes', {});            
        }
        else {
            hitRegisterApi(roleData[roleController]['value'], gfirst, glast, email, gid);
        }
    };

    // Note this function results false if the value is string & return true if the value is numeric
    function checkStringIsNum(string: any) {
        return /^[0-9]*$/.test(string);
    }

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleRemember = () => {
        setRemember(!remember);
    };

    // Validations
    const validateRole = () => {
        if (roleController === '') {
            setRoleError(true);
            setRoleErrorText('Role is required');
            return false;
        }
        else {
            setRoleError(false);
            setRoleErrorText('');
            return true;
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

    // Api calls i.e network
    const hitRegisterApi = (role: any, firstName: any, lastName: any, email: any, password: any) => {
        // In Google login, password will be id that will come from google api, so here we are checking if login through google then payload password manual modify otherwise in register send the actual password payload
        let payloadToSend
        if (checkStringIsNum(password)) {
            payloadToSend = {
                role: role,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: 'Google1@' + password,
            }
        }
        else {
            payloadToSend = {
                role: role,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }
        }

        addUser(payloadToSend)
            .unwrap()
            .then((response) => {
                console.log(JSON.stringify(response) + ' with email ' + email);
                ToastAndroid.show(response["message"], ToastAndroid.SHORT);
                RootNavigation.navigate('CompleteProfileRoutes', {});
                
            })
            .catch((error: any) => {
                console.log(JSON.stringify(error));
                ToastAndroid.show(error["data"]["error"]["errors"]["message"], ToastAndroid.SHORT);
            });
    };

    const hitLoginApi = async () => {
        const payloadToSend = {
            email: emailController,
            password: passwordController,
        };
        await loginUser(payloadToSend)
            .unwrap()
            .then((response) => {
                console.log(JSON.stringify(response) + ' with email ' + emailController);
                ToastAndroid.show(response["message"], ToastAndroid.SHORT);
                RootNavigation.navigate('CompleteProfileRoutes', {});                
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                ToastAndroid.show(error["data"]["error"], ToastAndroid.SHORT);
            });
    };

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            console.log('User is already signed in');
            dispatch(loginStatus('User is already signed in'));
            // Set User Info if user is already signed in
            await _getCurrentUserInfo();
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
            let userInfo: any = await GoogleSignin.signInSilently();
            console.log('User info --> ', userInfo);
            checkDbIncludesEmailGoogle(userInfo['user']['email']);
            dispatch(loginSuccess(userInfo));
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
            // It will proppt google Signin Widget
            try {
                await GoogleSignin.hasPlayServices({
                    // Check if device has Google Play Services installed
                    // Always resolves to true on iOS
                    showPlayServicesUpdateDialog: true,
                });
                const userInfo: User = await GoogleSignin.signIn();

                setGemail(userInfo['user']['email']);
                setGfirst(userInfo['user']['givenName']);
                setGlast(userInfo['user']['familyName']);
                setGid(userInfo['user']['id']);
                setIsGLoginSuccess(true);
                dispatch(loginSuccess(userInfo));
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

    return {
        gemail, setGemail,
        gfirst, setGfirst,
        glast, setGlast,
        gid, setGid,
        isGLoginSuccess, setIsGLoginSuccess,
        roleData,
        dbemail,
        roleController, setRoleController,
        emailController, setEmailController,
        passwordController, setPasswordController,
        roleError, setRoleError,
        emailError, setEmailError,
        passwordError, setPasswordError,
        roleErrorText, setRoleErrorText,
        emailErrorText, setEmailErrorText,
        passwordErrorText, setPasswordErrorText,
        addUser, response,
        loginUser, loginResponse,
        getUsers,
        users, isLoading, isSuccess, isError, error,
        dispatch,
        showPassword, setShowPassword,
        remember, setRemember,
        extractUserPushEmail,
        checkDbIncludesEmailGoogle,
        hitRegisterApi,
        checkStringIsNum,
        hitLoginApi,
        toggleShowPassword,
        toggleRemember,
        _isSignedIn,
        _signIn,
        validateRole,
        validateEmail,
        validatePassword,
    };
};

export default useCustomHook;