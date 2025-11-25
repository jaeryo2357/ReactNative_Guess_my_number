import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Title from '../components/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

function GameOverScreen({userNumber, roundsNumber, onStartGame}) {
    return <View style={styles.rootScreen}>
        <Title>Game Over!</Title>
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={require('../assets/images/success.png')}
            />
        </View>
        <Text style={styles.summaryText}>
            Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartGame}>Start New Game</PrimaryButton>
    </View>
}

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: deviceWidth < 380 ? 150 : 300,
        height: deviceWidth < 380 ? 150 : 300,
        borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 2,
        borderColor: Colors.primary700,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})