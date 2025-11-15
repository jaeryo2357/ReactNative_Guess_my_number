import { Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors';

function DescriptionText({children, style}) {
    return <Text style={[styles.text, style]}>{children}</Text>
}

export default DescriptionText;

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: Colors.accent500
    }
})