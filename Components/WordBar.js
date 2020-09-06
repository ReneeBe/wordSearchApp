import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from '../adjustableSize'

export default function WordBar(props){
    const {words, found} = props;

    return(
        <View style={styles.container}>
            {words.map((word,i) => (
                <Text key={i} style={styles.text}>
                    {found.includes(word) ?
                    <Text style={styles.bar, styles.found}>{word}</Text>
                    : <Text style={styles.bar}>{word}</Text> 
                    }
                </Text>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: verticalScale(50),
        padding: verticalScale(5),
        borderWidth: 2,
        borderColor:'#50495A',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    text: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        color: '#50495A',
        alignItems: 'center',
    },
    found: {
        textDecorationLine: 'line-through'
    }
})

