import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";

const useCustomHook = () => {
    // extracting data passing during navigation
    const route: any = useRoute();
    const progress = route.params.progress;
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

    return {
        addressController, setAddressController,
        countryController, setCountryController,
        stateController, setStateController,
        cityController, setCityController,
        localityController, setLocalityController,
        pinController, setPinController,
        addressError, setAddressError,
        countryError, setCountryError,
        stateError, setStateError,
        cityError, setCityError,
        localityError, setLocalityError,
        pinError, setPinError,
        addressErrorText, setAddressErrorText,
        countryErrorText, setCountryErrorText,
        stateErrorText, setStateErrorText,
        cityErrorText, setCityErrorText,
        localityErrorText, setLocalityErrorText,
        pinErrorText, setPinErrorText,
        progress,
        countryCode, setCountryCode,
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
    };
};

export default useCustomHook;