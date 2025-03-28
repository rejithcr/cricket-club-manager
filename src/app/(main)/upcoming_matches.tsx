import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMatches, Match } from '@/src/helpers/matches_helper';
import { appStyles } from '@/src/utils/styles';
import { MaterialIcons } from '@expo/vector-icons';

const UpcomingMatches = (props: {memberId: number}) => {
    const [matches, setMatches] = useState<Match[]>([]);
    useEffect(() => setMatches(getMatches(props.memberId)), [])
    return (
        <View>
           <Text style={appStyles.title}>Upcoming Matches</Text>
        {matches.map((match) => {
          return (
            <View key={match.id} style={{ ...appStyles.shadowBox, width: "80%" , marginBottom: 15}}>
              <View style={{ flexDirection: "row", width: "100%", margin: 5, 
                justifyContent: "space-between",alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}> {match.name} </Text>
                <Text style={{ fontSize: 10, paddingRight: 10 }}> {match.club} </Text>
              </View>
              <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
                <MaterialIcons name={"calendar-today"} size={20} />
                <Text> {match.date} </Text>
              </View>
              <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
                <MaterialIcons name={"access-time"} size={20} />
                <Text> {match.time} </Text>
              </View>
              <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
                <MaterialIcons name={"location-pin"} size={20} />
                <Text> {match?.ground} </Text>
              </View>
            </View>
          )
        })}
        </View>
    )
}

export default UpcomingMatches