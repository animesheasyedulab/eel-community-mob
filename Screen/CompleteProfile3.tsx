import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../styles/completeprofileStyles3";
import PercentageBar from "./Components/PercentageBar";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import gradeTeachData from "../model/gradeTeachData";
import boardsData from "../model/boardsData";
import languagesData from "../model/languagesData";
import { useRoute } from "@react-navigation/native";

const CompleteProfile3 = ({ navigation }: any) => {
    // extracting data passing during navigation
    const route: any = useRoute();
    const progress = route.params.progress;
    // all controllers
    const [gradeController, setGradeController] = useState('');
    const [boardController, setBoardController] = useState('');
    const [subjectController, setSubjectController] = useState('');
    const [languageController, setLanguageController] = useState<any>([]);
    const [curjobController, setCurJobController] = useState('');
    const [prevjobController, setPrevJobController] = useState('');
    // all validation states, isError 
    const [gradeError, setGradeError] = useState(false);
    const [boardError, setBoardError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [languageError, setLanguageError] = useState(false);
    const [curjobError, setCurJobError] = useState(false);
    const [prevjobError, setPrevJobError] = useState(false);
    // errorTexts
    const [gradeErrorText, setGradeErrorText] = useState<any>();
    const [boardErrorText, setBoardErrorText] = useState<any>();
    const [subjectErrorText, setSubjectErrorText] = useState<any>();
    const [languageErrorText, setLanguageErrorText] = useState<any>();
    const [curjobErrorText, setCurJobErrorText] = useState<any>();
    const [prevjobErrorText, setPrevJobErrorText] = useState<any>();

    const [droporinputGrade, setDropOrInputGrade] = useState('dropdown'); // drop-->dropdown
    const [droporinputBoard, setDropOrInputBoard] = useState('dropdown');

    const handleGrade = (selected: any) => {
        if (selected === 'Type your own') {
            setDropOrInputGrade('input');
            setGradeController('');
        }
    };

    const handleBoard = (selected: any) => {
        if (selected === 'Type your own') {
            setDropOrInputBoard('input');
            setBoardController('');
        }
    };

    // all validation functions
    const validateGrade = () => {
        if (gradeController === '') {
            setGradeError(true);
            setGradeErrorText("Grade is required");
            return false;
        }
        else {
            setGradeError(false);
            setGradeErrorText('');
            return true;
        }
    };

    const validateBoard = () => {
        if (boardController === '') {
            setBoardError(true);
            setBoardErrorText("Board is required");
            return false;
        }
        else {
            setBoardError(false);
            setBoardErrorText('');
            return true;
        }
    };

    const validateSubject = () => {
        if (subjectController === '') {
            setSubjectError(true);
            setSubjectErrorText("Subject is required");
            return false;
        }
        else {
            setSubjectError(false);
            setSubjectErrorText('');
            return true;
        }
    };

    const validateLanguage = () => {
        if (languageController.length == 0) {
            setLanguageError(true);
            setLanguageErrorText("Language is required");
            return false;
        }
        else {
            setLanguageError(false);
            setLanguageErrorText('');
            return true;
        }
    };

    const validateCurrentJob = () => {
        if (curjobController === '') {
            setCurJobError(true);
            setCurJobErrorText("Current experience is required");
            return false;
        }
        else if (/^\d+$/.test(curjobController) == false) {
            setCurJobError(true);
            setCurJobErrorText("Invalid current experience, must be number!");
            return false;
        }
        else {
            setCurJobError(false);
            setCurJobErrorText('');
            return true;
        }
    };

    const validatePrevJob = () => {
        if (prevjobController === '') {
            setPrevJobError(true);
            setPrevJobErrorText("Previous experience is required");
            return false;
        }
        else if (/^\d+$/.test(prevjobController) == false) {
            setPrevJobError(true);
            setPrevJobErrorText("Invalid previous experience, must be number!");
            return false;
        }
        else {
            setPrevJobError(false);
            setPrevJobErrorText('');
            return true;
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} contentInsetAdjustmentBehavior='automatic'>
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
                    <Text style={styles.normalText}>*Grade in which you Teach</Text>
                    {droporinputGrade === 'dropdown' ? <SelectList
                        boxStyles={styles.dropdownContainer}
                        dropdownTextStyles={styles.dropdownText}
                        inputStyles={styles.dropdownSearchText}
                        placeholder="Select Standard"
                        setSelected={(val: any) => {
                            setGradeController(val);
                            handleGrade(val);
                        }}
                        data={gradeTeachData}
                        save="value"
                    />
                        : <TextInput
                            value={gradeController}
                            onChangeText={setGradeController}
                            style={styles.input}
                            placeholder="Standard, Type your own"
                            placeholderTextColor="#606060"
                        />}
                    {gradeError && (
                        <Text style={styles.errorText}>
                            {gradeErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Board/Target</Text>
                    {droporinputBoard === 'dropdown' ? <SelectList
                        boxStyles={styles.dropdownContainer}
                        dropdownTextStyles={styles.dropdownText}
                        inputStyles={styles.dropdownSearchText}
                        placeholder="Select Board"
                        setSelected={(val: any) => {
                            setBoardController(val)
                            handleBoard(val);
                        }}
                        data={boardsData}
                        save="value"
                    />
                        : <TextInput
                            value={boardController}
                            onChangeText={setBoardController}
                            style={styles.input}
                            placeholder="Board, Type your own"
                            placeholderTextColor="#606060"
                        />}
                    {boardError && (
                        <Text style={styles.errorText}>
                            {boardErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Teaching Subject</Text>
                    <TextInput
                        value={subjectController}
                        onChangeText={setSubjectController}
                        style={styles.input}
                        placeholder="Maths, English, Science, Other"
                        placeholderTextColor="#606060"
                    />
                    {subjectError && (
                        <Text style={styles.errorText}>
                            {subjectErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Language</Text>

                    {languageController.length < 3 ? <MultipleSelectList
                        boxStyles={styles.dropdownContainer}
                        dropdownTextStyles={styles.dropdownText}
                        inputStyles={styles.dropdownSearchText}
                        placeholder="Select Language, Max. 3"
                        setSelected={(val: any) => {
                            console.log(val);
                            setLanguageController(val);
                        }}
                        data={languagesData}
                        save="value"
                        onSelect={() => console.log('Array Length: ' + languageController.length + ' ' + JSON.stringify(languageController) + ' ' + languageController)}
                    /> : <View onStartShouldSetResponder={(event) => {
                        setLanguageController([]);
                        return true;
                    }} style={[styles.input, { height: 40 }]}>
                        <Text style={{ color: 'black' }}>{languageController.toString()}</Text>
                    </View>}
                    {languageError && (
                        <Text style={styles.errorText}>
                            {languageErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Current Job Experience</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={curjobController}
                        onChangeText={setCurJobController}
                        style={styles.input}
                        placeholder="Ex. 1 year"
                        placeholderTextColor="#606060"
                    />
                    {curjobError && (
                        <Text style={styles.errorText}>
                            {curjobErrorText}
                        </Text>)}
                    <Text style={styles.normalText}>*Previous Job Experience</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={prevjobController}
                        onChangeText={setPrevJobController}
                        style={styles.input}
                        placeholder="Ex. 1 year"
                        placeholderTextColor="#606060"
                    />
                    {prevjobError && (
                        <Text style={styles.errorText}>
                            {prevjobErrorText}
                        </Text>)}
                    <View onStartShouldSetResponder={() => {
                        const gradeValid = validateGrade();
                        const boardValid = validateBoard();
                        const subjectValid = validateSubject();
                        const languageValid = validateLanguage();
                        const curjobValid = validateCurrentJob();
                        const prevjobValid = validatePrevJob();
                        if (gradeValid && boardValid && subjectValid && languageValid && curjobValid && prevjobValid) {
                            navigation.navigate('CompleteProfile3', { progress: '70%' });
                        }
                        return true;
                    }} style={styles.buttonContainer}>
                        {/* Sign In Text */}
                        <Text style={styles.buttonText}>Submit</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default CompleteProfile3;