import { useState } from "react";
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Colors from '../constants/colors';
import Card from '../components/Card';
import Title from "../components/Title";
import DescriptionText from "../components/DescriptionText";

function StartGameScreen({ onPickedNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('');
    function numberInputHandler(changedNumber) {
        setEnteredNumber(changedNumber);
    }

    function resetHandler() {
        setEnteredNumber('');
    }

    function confirmHandler() {
        const number = parseInt(enteredNumber);
        if (isNaN(number) || number <= 0 || number > 99) {
            Alert.alert(
                'Invalid number',
                'number must be 0 between 99',
                [{ text: "okay", style: "destructive", onPress: resetHandler }]
            );
            return;
        }
        onPickedNumber(number);
    }

    const { width, height } = useWindowDimensions()
    const marginTop = height < 380 ? 30 : 100

    return (
        <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootScreen, { marginTop: marginTop }]}>
                <Title>Guess a Number</Title>
                <Card>
                    <DescriptionText>Enter a Number</DescriptionText>
                    <TextInput style={styles.numberInput}
                        maxLength={2} keyboardType="number-pad"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootScreen: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    numberInput: {
        width: 100,
        fontFamily: 'open-sans-bold',
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        color: Colors.accent500,
        borderBottomWidth: 2,
        marginVertical: 8,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
});