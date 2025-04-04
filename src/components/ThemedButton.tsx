import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ThemedButton = (props: { title: string; onPress: any; disabled?: boolean}) => {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        height: 50,
        alignSelf: "center",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15
    }
})