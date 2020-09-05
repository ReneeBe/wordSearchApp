import React from 'react'
import {View, Text, StyleSheet} from 'react-native';


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
        margin: 50,
        padding: 5,
        borderWidth: 2,
        borderColor:'#50495A',
        borderRadius: 10,
    },
    text: {
        // flexBasis: 'row',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#50495A',
        alignItems: 'center',
        // borderWidth: 2,
    },
    found: {
        textDecorationLine: 'line-through'
    }
})

