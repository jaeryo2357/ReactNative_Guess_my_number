import { Text, StyleSheet } from "react-native";

function Title({children}) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ddb52f',
        borderWidth: 2,
        borderColor: '#ddb52f',
        textAlign: "center",
        padding: 12
    }
})