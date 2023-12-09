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
        //aspectRatio: 1/2,
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
        color: '#353535'
    },
    text2: {
        fontWeight: '700',
        color: '#262626'
    },    
    roleContainer: {
        marginTop: '5%',
        flexWrap: 'wrap'
    },    
    emailContainer: {
        marginTop: '5%',
    },
    emailText: {
        fontWeight: "700",
        color: '#202020'
    },
    inputEmail: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: '2%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: 'black',
    },
    errorText: {
        fontWeight: "700",
        color: 'red',
        //fontSize: 20, 
        marginVertical: 5,//12, 
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
        paddingHorizontal: 6,//'2%',
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 5,
        color: 'black',
    },
    rememberForgotContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        //alignItems: 'center',
        marginTop: '3%',
    },
    checkboxContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        //width:10,
        // height: 2,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
        //paddingHorizontal: '1%'
        //paddingLeft:5
    },
    forgotText: {
        color: '#2F80ED',
        fontWeight: '500',
    },
    signinContainer: {
        marginTop: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        //borderColor: 'black',
        backgroundColor: '#2F80ED',
        height: '6%'
    },
    signinText: {
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
    newJoinContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: '5%',
        paddingVertical: 10,//'4%',
        //height: '6%',
    },
    newJoinText1: {
        color: '#353535',
        fontWeight: '700',
        fontSize: 15,
    },
    newJoinText2: {
        color: '#2F80ED',
        fontWeight: '600',
        fontSize: 15,
    },
});

export default styles;