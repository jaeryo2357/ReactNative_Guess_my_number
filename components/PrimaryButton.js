import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOutContainer}>
            <Pressable 
             android_ripple={{ color: '#91305cff' }}
             style={({pressed}) => pressed ? [
                styles.buttonInnerContainer, styles.pressed
             ] : styles.buttonInnerContainer}
             onPress={onPress}
             >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOutContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: "#720637",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 28,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75
    }
})