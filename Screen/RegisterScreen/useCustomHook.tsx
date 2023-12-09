import { useMemo, useState } from "react";
import { ToastAndroid } from "react-native";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from "react-redux";
import { loginError, loginStatus, loginSuccess } from "../../features/userSlice";
import { RadioButtonProps } from "react-native-radio-buttons-group";

const useCustomHook = ({ navigation }: any) => {
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
    // nameController, emailController & passwordController
    const [roleController, setRoleController] = useState<any>('');
    const [nameController, setNameController] = useState('');
    const [emailController, setEmailController] = useState('');
    const [passwordController, setPasswordController] = useState('');
    // Validation states for name, email & password
    const [roleError, setRoleError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // errorTexts
    const [roleErrorText, setRoleErrorText] = useState('');
    const [nameErrorText, setNameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const dispatch = useDispatch();

    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(true);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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

    // Api calls i.e network
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

    return {
        roleData,
        roleController, setRoleController,
        nameController, setNameController,
        emailController, setEmailController,
        passwordController, setPasswordController,
        roleError, setRoleError,
        nameError, setNameError,
        emailError, setEmailError,
        passwordError, setPasswordError,
        roleErrorText, setRoleErrorText,
        nameErrorText, setNameErrorText,
        emailErrorText, setEmailErrorText,
        passwordErrorText, setPasswordErrorText,
        dispatch,
        showPassword, setShowPassword,
        toggleShowPassword,
        _isSignedIn,
        _getCurrentUserInfo,
        _signIn,
        validateRole,
        validateName,
        validateEmail,
        validatePassword,
    };
};

export default useCustomHook;