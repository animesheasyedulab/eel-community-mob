import React, { useEffect } from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../../styles/completeprofileStyles2";
import PercentageBar from '../Components/PercentageBar';
import SelectDropdown from "react-native-select-dropdown";
import useCustomHook from "./useCustomHook";

const CompleteProfile2 = ({ navigation }: any) => {
    // States
    const {
        addressController, setAddressController,
        setCountryController,
        stateController, setStateController,
        setCityController,
        localityController, setLocalityController,
        pinController, setPinController,
        addressError, 
        countryError, 
        stateError, 
        cityError, 
        localityError, 
        pinError, 
        addressErrorText, 
        countryErrorText, 
        stateErrorText, 
        cityErrorText, 
        localityErrorText, 
        pinErrorText, 
        progress,
        setCountryCode,
        updatedCountries,
        updatedStates,
        updatedCities,
        values, setFieldValue, setValues,
        validateAddress,
        validateCountry,
        validateState,
        validateCity,
        validateLocality,
        validatePin,
    } = useCustomHook();

    // Side effects
    useEffect(() => {
        // This is for making validation not make fuzz if country changed again
        if (values.state === null) {
            setStateController('');
        }
        if (values.city === null) {
            setCityController('');
        }
    }, [values]);

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
                        percentage={progress}
                    />
                    <Text style={styles.normalText}>*Address</Text>
                    <TextInput
                        multiline
                        value={addressController}
                        onChangeText={setAddressController}
                        style={styles.input}
                        placeholder="63, Podar Chambers, Sa Brelvi Road, Fort"
                        placeholderTextColor="#606060"
                    />
                    {addressError && (
                        <Text style={styles.errorText}>
                            {addressErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Country</Text>
                    <SelectDropdown
                        search
                        defaultButtonText="Select Country"
                        buttonStyle={styles.dropdownButtonContainer}
                        searchInputStyle={styles.dropdownSearchContainer}
                        searchInputTxtStyle={styles.dropdownSearchText}
                        searchPlaceHolder="Select Country"
                        data={updatedCountries}
                        onSelect={(selected, index) => {
                            console.log(selected["label"], index)
                            var countryLabel: any;
                            var isoCode: any;
                            Object.entries(selected).map(([name, value]) => {
                                if (name === 'isoCode') {
                                    isoCode = value;
                                    return `${value}`;
                                }
                                else if (name === 'label') {
                                    countryLabel = value;
                                    return `${value}`;
                                }
                                else {
                                    return `${value}`;
                                }
                            });
                            setCountryCode(isoCode);
                            setCountryController(countryLabel);
                            setValues({ country: selected, state: null, city: null }, false);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item["label"]
                        }}
                    />
                    {countryError && (
                        <Text style={styles.errorText}>
                            {countryErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*State:</Text>
                    <SelectDropdown
                        search
                        defaultButtonText={stateController == '' ? "Select State" : stateController}
                        buttonStyle={styles.dropdownButtonContainer}
                        searchInputStyle={styles.dropdownSearchContainer}
                        searchInputTxtStyle={styles.dropdownSearchText}
                        searchPlaceHolder="Select State"
                        data={updatedStates(values.country ? values.country.isoCode : null)}
                        onSelect={(selected, index) => {
                            console.log(selected["label"], index)
                            var stateLabel;
                            Object.entries(selected).map(([name, value]) => {
                                if (name === 'label') {
                                    stateLabel = value;
                                    return `${value}`;
                                }
                                else {
                                    return `${value}`;
                                }
                            });
                            setStateController(stateLabel);
                            setValues({ state: selected, city: null }, false);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item) => {
                            return item["label"]
                        }}
                    />
                    {stateError && (
                        <Text style={styles.errorText}>
                            {stateErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*City</Text>
                    <SelectDropdown
                        search
                        defaultButtonText="Select City"
                        buttonStyle={styles.dropdownButtonContainer}
                        searchInputStyle={styles.dropdownSearchContainer}
                        searchInputTxtStyle={styles.dropdownSearchText}
                        searchPlaceHolder="Select City"
                        data={updatedCities(values.state ? (values.state.isoCode) : null)}
                        onSelect={(selected, index) => {
                            console.log(selected["label"], index)
                            var cityLabel;
                            Object.entries(selected).map(([name, value]) => {
                                if (name === 'label') {
                                    cityLabel = value;
                                    return `${value}`;
                                }
                                else {
                                    return `${value}`;
                                }
                            });
                            setCityController(cityLabel);
                            setFieldValue("city", selected);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item) => {
                            return item["label"]
                        }}
                    />
                    {cityError && (
                        <Text style={styles.errorText}>
                            {cityErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Locality</Text>
                    <TextInput
                        value={localityController}
                        onChangeText={setLocalityController}
                        style={styles.input}
                        placeholder="Ex. Charbagh"
                        placeholderTextColor="#606060"
                    />
                    {localityError && (
                        <Text style={styles.errorText}>
                            {localityErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Pin Code</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={pinController}
                        onChangeText={setPinController}
                        style={styles.input}
                        placeholder="226028"
                        placeholderTextColor="#606060"
                    />
                    {pinError && (
                        <Text style={styles.errorText}>
                            {pinErrorText}
                        </Text>)}

                    <View onStartShouldSetResponder={() => {
                        const addressValid = validateAddress();
                        const countryValid = validateCountry();
                        const stateValid = validateState();
                        const cityValid = validateCity();
                        const localityValid = validateLocality();
                        const pinValid = validatePin();
                        if (addressValid && countryValid && stateValid && cityValid && localityValid && pinValid) {
                            navigation.navigate('CompleteProfile3', { progress: '70%' })
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
};

export default CompleteProfile2;