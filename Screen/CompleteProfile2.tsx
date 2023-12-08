import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../styles/completeprofileStyles2";
import { useRoute } from "@react-navigation/native";
import PercentageBar from './Components/PercentageBar';
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";
import SelectDropdown from "react-native-select-dropdown";

const CompleteProfile2 = ({ navigation }: any) => {
    // extracting data passing during navigation
    const route: any = useRoute();
    const progress = route.params.progress;
    // all the country state city dropdown states
    const [countryCode, setCountryCode] = useState('');
    const addressFromik: any = useFormik({
        initialValues: {
            country: "India",
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });

    const countries = Country.getAllCountries();

    const updatedCountries = countries.map((country: any) => ({
        label: country.name,
        value: country.id,
        ...country
    }));
    const updatedStates = (countryId: any) => State.getStatesOfCountry(countryId).map((state: any) => ({ label: state.name, value: state.id, ...state }));

    const updatedCities = (stateId: any) => City.getCitiesOfState(countryCode, stateId).map((city: any) => ({ label: city.name, value: city.id, ...city }));

    const { values, setFieldValue, setValues } = addressFromik;

    useEffect(() => {
        // This is for making validation not make fuzz if country changed again
        if (values.state === null) {
            setStateController('');
        }
        if (values.city === null) {
            setCityController('');
        }
    }, [values]);

    // all controllers
    const [addressController, setAddressController] = useState('');
    const [countryController, setCountryController] = useState('');
    const [stateController, setStateController] = useState<any>('');
    const [cityController, setCityController] = useState<any>('');
    const [localityController, setLocalityController] = useState('');
    const [pinController, setPinController] = useState('');
    // all validation states, isError 
    const [addressError, setAddressError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [localityError, setLocalityError] = useState(false);
    const [pinError, setPinError] = useState(false);
    // errorTexts
    const [addressErrorText, setAddressErrorText] = useState<any>();
    const [countryErrorText, setCountryErrorText] = useState<any>();
    const [stateErrorText, setStateErrorText] = useState<any>();
    const [cityErrorText, setCityErrorText] = useState<any>();
    const [localityErrorText, setLocalityErrorText] = useState<any>();
    const [pinErrorText, setPinErrorText] = useState<any>();

    // all validation functions
    const validateAddress = () => {
        if (addressController === '') {
            setAddressError(true);
            setAddressErrorText("Address is required");
            return false;
        }
        else {
            setAddressError(false);
            setAddressErrorText('');
            return true;
        }
    };

    const validateCountry = () => {
        if (countryController === '') {
            setCountryError(true);
            setCountryErrorText("Country is required");
            return false;
        }
        else {
            setCountryError(false);
            setCountryErrorText('');
            return true;
        }
    };

    const validateState = () => {
        if (stateController === '') {
            setStateError(true);
            setStateErrorText("State is required");
            return false;
        }
        else {
            setStateError(false);
            setStateErrorText('');
            return true;
        }
    };

    const validateCity = () => {
        if (cityController === '') {
            setCityError(true);
            setCityErrorText("City is required");
            return false;
        }
        else {
            setCityError(false);
            setCityErrorText('');
            return true;
        }
    };

    const validateLocality = () => {
        if (localityController === '') {
            setLocalityError(true);
            setLocalityErrorText("Locality is required");
            return false;
        }
        else {
            setLocalityError(false);
            setLocalityErrorText('');
            return true;
        }
    };

    const validatePin = () => {
        if (pinController === '') {
            setPinError(true);
            setPinErrorText("Pin is required");
            return false;
        }
        else if (/^\d+$/.test(pinController) == false) {
            setPinError(true);
            setPinErrorText("Invalid pincode, must be number!");
            return false;
        }
        else if (pinController.length !== 6) {
            setPinError(true);
            setPinErrorText("Invalid pincode, must be of 6 digits!");
            return false;
        }
        else if (/^[1-9][0-9]{5}$/.test(pinController) == false) {
            setPinError(true);
            setPinErrorText("Invalid Pin");
            return false;
        }
        else {
            setPinError(false);
            setPinErrorText('');
            return true;
        }
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
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item, index) => {
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
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item, index) => {
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
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem["label"]
                        }}
                        rowTextForSelection={(item, index) => {
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