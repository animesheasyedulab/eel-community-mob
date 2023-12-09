import React from "react";
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from "../../styles/completeprofileStyles3";
import PercentageBar from "../Components/PercentageBar";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import gradeTeachData from "../../model/gradeTeachData";
import boardsData from "../../model/boardsData";
import languagesData from "../../model/languagesData";
import useCustomHook from "./useCustomHook";

const CompleteProfile3 = ({ navigation }: any) => {
    // States
    const {
        progress,
        gradeController, setGradeController,
        boardController, setBoardController,
        subjectController, setSubjectController,
        languageController, setLanguageController,
        curjobController, setCurJobController,
        prevjobController, setPrevJobController,
        gradeError, 
        boardError, 
        subjectError, 
        languageError, 
        curjobError, 
        prevjobError, 
        gradeErrorText, 
        boardErrorText, 
        subjectErrorText, 
        languageErrorText, 
        curjobErrorText, 
        prevjobErrorText, 
        droporinputGrade, 
        droporinputBoard, 
        handleGrade,
        handleBoard,
        validateGrade,
        validateBoard,
        validateSubject,
        validateLanguage,
        validateCurrentJob,
        validatePrevJob,
    } = useCustomHook();

    // View
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
                    /> : <View onStartShouldSetResponder={() => {
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
                            navigation.replace('DrawerNavigationRoutes', { progress: '100%' });
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