import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: '10%',
        margin: '10%',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    headText: {
        fontSize: 20,
        fontWeight: "700",
        color: 'black'
    },
    text1: {
        fontSize: 15,
        fontWeight: "400",
        color: '#353535',
    },
    roleContainer: {
        marginTop: '5%',
        flexWrap: 'wrap'
    },
    checkboxView: {
        marginTop: '7%',
        marginBottom: '2%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    checkboxContainer: {
        backgroundColor: '#D9D9D9',
        width: 13,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxText: {
        fontWeight: "700",
        color: '#000000',
        marginHorizontal: '3%'
    },
    inputContainer: {
        marginTop: '5%',
    },
    inputText: {
        fontWeight: "700",
        color: '#202020'
    },
    inputNameEmail: {
        paddingHorizontal: 10,
        padding: 5,
        marginTop: '2%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: 'black',
    },
    errorText: {
        fontWeight: "700", 
        color: 'red',         
        marginVertical: 5,
    }, 
    passwordContainer: {
        marginTop: '5%',
    },
    passwordInputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: '2%',
        paddingHorizontal: 6,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 5,
        color: 'black',
    },
    termsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '3%',
    },
    termsText1: {
        fontSize: 13,
        fontWeight: "400",
        color: '#353535'
    },
    termsText2: {
        color: '#3F46FF',
        fontWeight: "600",
    },
    createAccContainer: {
        marginTop: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F46FF',
        height: '6%'
    },
    createAccText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    orImage: {
        width: '100%',
        marginVertical: '3%',
    },
    contGogContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 5,//'2%',
    },
    contGogText: {
        color: '#000000',
        fontWeight: '700',
    },
    alreadyContainer: {
        alignItems: 'center',
        marginVertical: '5%',
        paddingVertical: '4%',
    },
    alreadyText1: {
        fontSize: 15,
        fontWeight: "400",
        color: '#353535'
    },
});

export default styles;