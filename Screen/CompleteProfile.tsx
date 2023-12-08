import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../styles/completeprofileStyles";
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PercentageBar from "./Components/PercentageBar";
import openforData from "../model/openforData";

const CompleteProfile = ({ navigation }: any) => {
    // all controllers
    const [firstnameController, setFirstNameController] = useState('');
    const [lastnameController, setLastNameController] = useState('');
    const [checkboxController, setCheckboxController] = useState('');
    const [qualificationController, setQualificationController] = useState('');
    const [dobController, setDobController] = useState<any>('');
    const [phoneController, setPhoneController] = useState('');
    const [openforController, setOpenForController] = useState('');
    // all validation states, isError 
    const [firstnameError, setFirstNameError] = useState(false);
    const [lastnameError, setLastNameError] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);
    const [qualificationError, setQualificationError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [openforError, setOpenForError] = useState(false);
    // errorTexts
    const [firstnameErrorText, setFirstNameErrorText] = useState<any>();
    const [lastnameErrorText, setLastNameErrorText] = useState<any>();
    const [checkboxErrorText, setCheckboxErrorText] = useState<any>();
    const [qualificationErrorText, setQualificationErrorText] = useState<any>();
    const [dobErrorText, setDobErrorText] = useState<any>();
    const [phoneErrorText, setPhoneErrorText] = useState<any>();
    const [openforErrorText, setOpenForErrorText] = useState<any>();

    // all validation functions
    const validateFirstName = () => {
        if (firstnameController === '') {
            setFirstNameError(true);
            setFirstNameErrorText("First Name is required");
            return false;
        }
        else {
            setFirstNameError(false);
            setFirstNameErrorText('');
            return true;
        }
    };

    const validateLastName = () => {
        if (lastnameController === '') {
            setLastNameError(true);
            setLastNameErrorText("Last Name is required");
            return false;
        }
        else {
            setLastNameError(false);
            setLastNameErrorText('');
            return true;
        }
    };

    const validateRole = () => {
        if (checkboxController === '') {
            setCheckboxError(true);
            setCheckboxErrorText('Role is required');
            return false;
        }
        else {
            setCheckboxError(false);
            setCheckboxErrorText('');
            return true;
        }
    };

    const validateQualification = () => {
        if (qualificationController === '') {
            setQualificationError(true);
            setQualificationErrorText('Qualification is required');
            return false;
        }
        else {
            setQualificationError(false);
            setQualificationErrorText('');
            return true;
        }
    };

    const validateDOB = () => {
        if (dobController === '') {
            setDobError(true);
            setDobErrorText('Dob is required');
            return false;
        }
        else {
            setDobError(false);
            setDobErrorText('');
            return true;
        }
    };

    const validatePhone = () => {
        if (phoneController === '') {
            setPhoneError(true);
            setPhoneErrorText('Phone is required');
            return false;
        }
        // Digit checker
        else if (/^\d+$/.test(phoneController) == false) {
            setPhoneError(true);
            setPhoneErrorText('Invalid number, must be number!');
            return false;
        }
        // length & indian number format checker              
        else if (phoneController.length == 10 && (/^[6-9]\d{9}$/.test(phoneController) == false)) {
            setPhoneError(true);
            setPhoneErrorText('Invalid number!');
            return false;
        }
        // length checker
        else if (phoneController.length !== 10) {
            setPhoneError(true);
            setPhoneErrorText('Invalid number; must be ten digits');
            return false;
        }
        else {
            setPhoneError(false);
            setPhoneErrorText('');
            return true;
        }
    };

    const validateOpenFor = () => {
        if (openforController === '') {
            setOpenForError(true);
            setOpenForErrorText('Open-For is required');
            return false;
        }
        else {
            setOpenForError(false);
            setOpenForErrorText('');
            return true;
        }
    };

    const [showDate, setShowDate] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        // For check if year is same or greater        
        if (selectedDate.getFullYear() >= new Date().getFullYear()) {
            setShowDate(false);
            setDobError(true);
            setDobErrorText('Dob can\'t exceed or equals to current date/year');
            return;
        }
        // For check year must be atleast 18 years lesser
        else if (selectedDate.getFullYear() > new Date().getFullYear() - 18) {
            setShowDate(false);
            setDobError(true);
            setDobErrorText('Must be atleast 18 years of age');
            return;
        }

        else {
            setShowDate(false);
            const currentDate = selectedDate;
            setDobController(currentDate);
        }
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView} contentInsetAdjustmentBehavior='automatic'>
            {/* Base Container */}
            <View style={styles.container}>
                {/* Sub Container */}
                <View style={styles.subContainer}>
                    <Text style={styles.headText}>
                        Complete Profile
                    </Text>
                    <PercentageBar
                        height={20}
                        backgroundColor={'grey'}
                        completedColor={'#2196F3'}
                        percentage={'0%'}
                    />
                    <Text style={[styles.normalText, { marginTop: '0%' }]}>0%</Text>
                    <Text style={styles.normalText}>*All fields required</Text>
                    <Text style={styles.normalText}>*First Name</Text>
                    <TextInput
                        value={firstnameController}
                        onChangeText={setFirstNameController}
                        style={styles.input}
                        placeholder="Steve"
                        placeholderTextColor="#606060"
                    />
                    {firstnameError && (
                        <Text style={styles.errorText}>
                            {firstnameErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Last Name</Text>
                    <TextInput
                        value={lastnameController}
                        onChangeText={setLastNameController}
                        style={styles.input}
                        placeholder="Lawliet"
                        placeholderTextColor="#606060"
                    />
                    {lastnameError && (
                        <Text style={styles.errorText}>
                            {lastnameErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Role:</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioSubContainer}>
                            <RadioButton.Android
                                value="option1"
                                status={checkboxController === 'option1' ?
                                    'checked' : 'unchecked'}
                                onPress={() => setCheckboxController('option1')}
                                color="#007BFF"
                            />
                            <Text style={styles.normalText}>Teacher</Text>
                            <RadioButton.Android
                                value="option2"
                                status={checkboxController === 'option2' ?
                                    'checked' : 'unchecked'}
                                onPress={() => setCheckboxController('option2')}
                                color="#007BFF"
                            />
                            <Text style={styles.normalText}>Student</Text>
                            <RadioButton.Android
                                value="option3"
                                status={checkboxController === 'option3' ?
                                    'checked' : 'unchecked'}
                                onPress={() => setCheckboxController('option3')}
                                color="#007BFF"
                            />
                            <Text style={styles.normalText}>Schools</Text>
                        </View>
                    </View>
                    {checkboxError && (
                        <Text style={styles.errorText}>
                            {checkboxErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Qualification</Text>
                    <TextInput
                        value={qualificationController}
                        onChangeText={setQualificationController}
                        style={styles.input}
                        placeholder="Ex. B.Ed, MBA"
                        placeholderTextColor="#606060"
                    />
                    {qualificationError && (
                        <Text style={styles.errorText}>
                            {qualificationErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Date of Birth</Text>
                    <View style={styles.dobContainer} onStartShouldSetResponder={() => {
                        showDatepicker();
                        return true;
                    }}>
                        <Text style={styles.normalText}>{
                            (dobController == '') ? "DD/MM/YYYY" : dobController.getDate() + "/" + parseInt(dobController.getMonth() + 1) + "/" + dobController.getFullYear()
                        }</Text>
                        <MaterialIcon name='calendar-month'
                            size={28}
                            color="black"
                            style={{ marginHorizontal: 10, paddingTop: 5 }} />
                    </View>

                    {showDate && <DateTimePicker
                        testID="dateTimePicker"
                        value={dobController == '' ? new Date() : dobController}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                    />}
                    {dobError && (
                        <Text style={styles.errorText}>
                            {dobErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Phone Number</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={phoneController}
                        onChangeText={setPhoneController}
                        style={styles.input}
                        placeholder="5809771790"
                        placeholderTextColor="#606060"
                    />
                    {phoneError && (
                        <Text style={styles.errorText}>
                            {phoneErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Open-For</Text>
                    <View style={styles.verticalMargin}>
                        <MultipleSelectList
                            inputStyles={{ color: 'grey' }}
                            placeholder="Ex. Tuition"
                            dropdownTextStyles={{ color: 'black' }}
                            labelStyles={{ color: 'black' }}
                            setSelected={(val: any) => setOpenForController(val)}
                            data={openforData}
                            save="value"                            
                        />
                    </View>
                    {openforError && (
                        <Text style={styles.errorText}>
                            {openforErrorText}
                        </Text>)}
                    <View onStartShouldSetResponder={() => {
                        const firstnameValid = validateFirstName();
                        const lastnameValid = validateLastName();
                        const roleValid = validateRole();
                        const qualificationValid = validateQualification();
                        const dobValid = validateDOB();
                        const phoneValid = validatePhone();
                        const openforValid = validateOpenFor();
                        if (firstnameValid && lastnameValid && roleValid && qualificationValid && dobValid && phoneValid && openforValid) {
                            return navigation.navigate('CompleteProfile2', { progress: '40%' });
                        }
                        return true;
                    }} style={styles.buttonContainer}>
                        {/* Sign In Text */}
                        <Text style={styles.buttonText}>Next</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default CompleteProfile;