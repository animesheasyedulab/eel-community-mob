import { useState } from "react";
import { useRoute } from "@react-navigation/native";

const useCustomHook = () => {
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

    // Dynamic dropdown change into input states
    const [droporinputGrade, setDropOrInputGrade] = useState('dropdown'); // drop-->dropdown
    const [droporinputBoard, setDropOrInputBoard] = useState('dropdown');

    // handle states(grade, board)
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

    return {
        route,
        progress,
        gradeController, setGradeController,
        boardController, setBoardController,
        subjectController, setSubjectController,
        languageController, setLanguageController,
        curjobController, setCurJobController,
        prevjobController, setPrevJobController,
        gradeError, setGradeError,
        boardError, setBoardError,
        subjectError, setSubjectError,
        languageError, setLanguageError,
        curjobError, setCurJobError,
        prevjobError, setPrevJobError,
        gradeErrorText, setGradeErrorText,
        boardErrorText, setBoardErrorText,
        subjectErrorText, setSubjectErrorText,
        languageErrorText, setLanguageErrorText,
        curjobErrorText, setCurJobErrorText,
        prevjobErrorText, setPrevJobErrorText,
        droporinputGrade, setDropOrInputGrade,
        droporinputBoard, setDropOrInputBoard,
        handleGrade,
        handleBoard,
        validateGrade,
        validateBoard,
        validateSubject,
        validateLanguage,
        validateCurrentJob,
        validatePrevJob,
    };
};

export default useCustomHook;