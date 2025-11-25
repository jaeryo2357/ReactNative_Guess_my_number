import { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Alert } from 'react-native';
import Title from '../components/Title';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import DescriptionText from '../components/DescriptionText';
import Ionicons from '@expo/vector-icons/Ionicons';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction) { // direction => lower, greater
        if (
            (direction === 'lower' && userNumber > currentGuess) ||
            (direction === 'greater' && userNumber < currentGuess)
        ) {
            Alert.alert(
                "Don't lie!", 'You know that this is wrong...', [{ text: "sorry" }]
            )
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        
        const newGuessNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newGuessNumber)
        setGuessRounds(previusGuessRounds => [newGuessNumber, ...previusGuessRounds])
    }


    return (
        <View style={styles.rootScreen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <DescriptionText style={styles.descriptionText}>Higher or lower?</DescriptionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList data={guessRounds} renderItem={({item}) => <Text>{item}</Text>} keyExtractor={(_, index) => index.toString()}></FlatList>
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    descriptionText: {
        marginBottom: 24
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})