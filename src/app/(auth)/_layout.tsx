import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthStack = () => {
  return (
    <Stack>
      <Stack.Screen  name='index' options={{title: "Login"}}/>
    </Stack>
  )
}

export default AuthStack