import { TextInput, View, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.numberInput}
                maxLength={2} keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#460522ff',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center'
    },
    numberInput: {
        width: 100,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        color: '#ddb52f',
        borderBottomWidth: 2,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
});