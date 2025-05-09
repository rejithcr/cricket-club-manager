import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import InputText from '@/src/components/InputText'
import { Picker } from '@react-native-picker/picker'
import { MaterialIcons } from '@expo/vector-icons'
import ThemedButton from '@/src/components/ThemedButton'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ShadowBox from '@/src/components/ShadowBox'
import { addRegularFee } from '@/src/helpers/fee_helper'
import LoadingSpinner from '@/src/components/LoadingSpinner'
import { router } from 'expo-router'
import { isNumeric, isValidLength } from '@/src/utils/validators'
import { AuthContext } from '@/src/context/AuthContext'
import { ClubContext } from '@/src/context/ClubContext'

const DefineFee = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [feeType, setFeeType] = useState("");
    const [feeTypeInterval, setFeeTypeInterval] = useState("MONTHLY");
    const [feeAmount, setFeeAmount] = useState("");
    const { userInfo } = useContext(AuthContext)
    const { clubInfo } = useContext(ClubContext)

    const addFee = () => {
        if (validate(feeType, feeAmount)) {
            setIsLoading(true)
            addRegularFee(clubInfo.clubId, feeType, feeTypeInterval, feeAmount, userInfo.email)
                .then((response) => {
                    console.log(response.data)
                    Alert.alert("Success", "Fee added successfully")
                    router.dismissTo(`/(main)/(clubs)/(fees)`)
                })
                .catch((error: any) => {
                    Alert.alert("Error", error.response.data.error)
                    console.log(error)
                }).finally(() => setIsLoading(false))
        }
    }
    return (
        <GestureHandlerRootView>
            <ScrollView>
                {isLoading && <LoadingSpinner />}
                {!isLoading &&
                    <View style={{ alignItems: "center" }}>
                        <InputText
                            onChangeText={(text: string) => setFeeType(text)}
                            label={`Fee Type`}
                            defaultValue={feeType}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                            <Text style={{ width: "40%" }}>Select Period</Text>
                            <Picker style={{ width: "60%", textAlign: "right" }}
                                selectedValue={feeTypeInterval}
                                onValueChange={(itemValue, _itemIndex) => setFeeTypeInterval(itemValue)}>
                                <Picker.Item label="MONTHLY" value="MONTHLY" />
                                <Picker.Item label="QUARTERLY" value="QUARTERLY" />
                                <Picker.Item label="YEARLY" value="YEARLY" />
                                <Picker.Item label="ADHOC" value="ADHOC" />
                            </Picker>
                        </View>
                        <InputText
                            onChangeText={(text: string) => setFeeAmount(text)}
                            label={`Fee Amount`}
                            keyboardType={'numeric'}
                            defaultValue={feeAmount}
                        />

                        <View style={{ marginBottom: 40 }} />
                        <ThemedButton title='Add Fee' onPress={addFee} />
                    </View>
                }
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default DefineFee

const validate = (feeType: string | null | undefined, feeAmount: string) => {
    if (!isValidLength(feeType, 2)) {
        alert("Enter atleast 2 characters for fee type")
        return false
    }
    if (!isNumeric(feeAmount)) {
        alert("Enter numeric value for amount")
        return false
    }
    return true
}