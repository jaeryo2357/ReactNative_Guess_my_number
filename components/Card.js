import { View, StyleSheet } from 'react-native'
import Colors from '../constants/colors';

function Card({children}) {
    return <View style={styles.card}>{children}</View>
}

export default Card;

const styles = StyleSheet.create({
    card: {
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.primary500,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center'
    }
})