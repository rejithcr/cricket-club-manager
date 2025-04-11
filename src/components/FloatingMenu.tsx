import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'


const FloatingMenu = (props: {
    onPressMain?: ((event: GestureResponderEvent) => void) | undefined;
    icon?: any;
    actions?: any;
    position?: string | undefined;
    onPressItem?: any;
    color?: string | undefined;
}) => {

    const [actionsItems, setActionItems] = useState<any>()
    const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false)

    const onMainButtonPress = () => {
        setActionItems(props.actions)
        setIsActionsVisible(prev => !prev)
    }
    return (
        <View style={styles.container}>
            {
                !props?.onPressMain && isActionsVisible && actionsItems?.map(
                    (action: { icon: any | undefined; text: string | undefined; name: string | undefined}) => {
                        return (
                            <TouchableOpacity 
                                key={action.name}    
                                style={styles.menuItem} 
                                onPress={() => props.onPressItem(action?.name)}>
                                <View style={styles.menuIcon} >
                                    { action.icon }
                                </View>
                                <View style={styles.menuText}><Text>{action.text}</Text></View>
                            </TouchableOpacity>
                        )
                    }
                )
            }
            <TouchableOpacity style={styles.button} onPress={ props.onPressMain ||  onMainButtonPress}>
                {props.icon}
            </TouchableOpacity>
        </View>
    )
}

export default FloatingMenu

const styles = StyleSheet.create({
    container: {
        bottom: 30,
        left: 30,
        position: 'absolute',
    },
    menuIcon: {
        backgroundColor: "black",
        borderRadius: 30,
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        backgroundColor: "white",
        borderColor: "#eee",
        boxShadow: "0 0 15 10 rgba(0, 0, 0, .2)",
        borderRadius: 5,
        alignSelf: "center",
        marginLeft: 10,
        padding: 5
    },
    menuItem: {
        left: 8,
        marginBottom: 20,
        flexDirection: "row",
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.2)",
    }

})


// const FloatingMenu = (props: { onPress: any; icon?: any }) => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.button} onPress={props.onPress}>
//                 <MaterialIcons name={props.icon || "menu"} size={32} color={"white"} />
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default FloatingMenu

// const styles = StyleSheet.create({
//     container: {
//         bottom: 30,
//         left: 30,
//         position: 'absolute',
//     },
//     button: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: 'black',
//         justifyContent: "center",
//         alignItems: "center",
//         boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.2)",
//     }

// })