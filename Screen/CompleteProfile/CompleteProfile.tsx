import React from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../../styles/completeprofileStyles";
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PercentageBar from "../Components/PercentageBar";
import openforData from "../../model/openforData";
import useCustomHook from "./useCustomHook";

const CompleteProfile = ({ navigation }: any) => {
    // States
    const {
        firstnameController,
        setFirstNameController,
        lastnameController,
        setLastNameController,
        checkboxController,
        setCheckboxController,
        qualificationController,
        setQualificationController,
        dobController,
        phoneController,
        setPhoneController,
        setOpenForController,
        firstnameError, 
        lastnameError, 
        checkboxError, 
        qualificationError, 
        dobError, 
        phoneError, 
        openforError, 
        firstnameErrorText, 
        lastnameErrorText, 
        checkboxErrorText, 
        qualificationErrorText, 
        dobErrorText, 
        phoneErrorText, 
        openforErrorText, 
        showDate, 
        validateFirstName,
        validateLastName,
        validateRole,
        validateQualification,
        validateDOB,
        validatePhone,
        validateOpenFor,
        onChange,
        showDatepicker,
    } = useCustomHook()    

    // View
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