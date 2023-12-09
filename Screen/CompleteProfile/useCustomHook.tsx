import { useState } from "react";

const useCustomHook = () => {
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

    // Date states/manipulations
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

    return {
        firstnameController,
        setFirstNameController,
        lastnameController,
        setLastNameController,
        checkboxController,
        setCheckboxController,
        qualificationController,
        setQualificationController,
        dobController,
        setDobController,
        phoneController,
        setPhoneController,
        openforController,
        setOpenForController,
        firstnameError, setFirstNameError,
        lastnameError, setLastNameError,
        checkboxError, setCheckboxError,
        qualificationError, setQualificationError,
        dobError, setDobError,
        phoneError, setPhoneError,
        openforError, setOpenForError,
        firstnameErrorText, setFirstNameErrorText,
        lastnameErrorText, setLastNameErrorText,
        checkboxErrorText, setCheckboxErrorText,
        qualificationErrorText, setQualificationErrorText,
        dobErrorText, setDobErrorText,
        phoneErrorText, setPhoneErrorText,
        openforErrorText, setOpenForErrorText,
        showDate, setShowDate,
        validateFirstName,
        validateLastName,
        validateRole,
        validateQualification,
        validateDOB,
        validatePhone,
        validateOpenFor,
        onChange,
        showDatepicker,
    };
};

export default useCustomHook;