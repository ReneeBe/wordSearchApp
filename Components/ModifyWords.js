import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {horizontalScale, verticalScale} from '../adjustableSize';


export default function ModifyWords(props) {
    const {words, updateToUserUpdatedWords} = props;

    const [newWords, setNewWords] = useState(words);
    const [newlyAdded, setNewlyAdded] = useState('');
    const [tooLongWord, setTooLongWord] = useState(false);

    const handleDeleteWord =(index) => {
        let temp = newWords;
        temp.splice(index, 1);
        setNewWords(temp);
        updateToUserUpdatedWords(newWords);
    }

    const handleNewWord = (word) => {
        if (word.length > 11) {
            setTooLongWord(true);
            setNewlyAdded('');
        } else {
            setTooLongWord(false);
            word = word.toUpperCase().trim();
            setNewlyAdded(word);
        }
    }

    return(
        <View>
            <View style={styles.grid}>
                <Text style={styles.addWordsHeader}>
                        {tooLongWord ? 
                            "That word's too long. Maximum 11 letters long per word." 
                        :
                            "Add More Words:"
                        }
                </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your own word..."
                        onChangeText={ word => handleNewWord(word)}
                        clearButtonMode='always'
                        value={newlyAdded}
                    />
                <Text 
                    style={styles.button} 
                    onPress={
                        () => {
                            updateToUserUpdatedWords([...newWords, newlyAdded]);
                            setNewWords([...newWords, newlyAdded]);
                            setNewlyAdded('');
                        }
                    }
                >
                    Submit
                </Text> 
                <Text style={styles.modifyWordsHeader}>
                    Current Words
                </Text>
                <Text style={styles.modifyWordsSubHeader}>
                    Press on any words below to delete from the list
                </Text>
                {newWords.map((word,i) => (
                    <Text key={i} onPress={ () => handleDeleteWord(i)}>
                        <Text style={styles.text}>
                            {word}
                        </Text>
                    </Text>
                ))}
                <Text 
                    style={styles.button}
                    onPress={
                        ()=> {
                            setNewWords([]);
                            setNewlyAdded('');
                            updateToUserUpdatedWords(null);
                        }
                    }
                >
                    Clear Words
                </Text>   
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    modifyWordsHeader: {
        fontSize: verticalScale(25), 
        color: '#50495A',
        fontWeight: 'bold',
    },
    modifyWordsSubHeader: {
        fontSize: verticalScale(15),
        color: '#50495A',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: verticalScale(5),
        padding: verticalScale(5),
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    text: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        // margin: horizontalScale(25),
        color: '#50495A',
        // textAlign: 'center'
    },
    input: {
        height: verticalScale(45),
        width: horizontalScale(250),
        borderWidth: 2,
        borderColor:'#50495A',
        borderRadius: 10,
        padding: verticalScale(5),
        margin: verticalScale(5)
    },
    button: {
        padding: 2,
        fontSize: horizontalScale(20),
        borderWidth: 2,
        borderRadius: 10,
        fontWeight: 'bold',
        borderColor: '#9C6ADE',
        color: '#9C6ADE',
        margin: horizontalScale(20)
        // marginBottom: verticalScale(20)
    },

    appHeader: {
        height: verticalScale(90),
        marginHorizontal: horizontalScale(60),
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: verticalScale(10),
        justifyContent: 'space-evenly',
        backgroundColor: '#9C6ADE',
    },

    headerText: {
        color: 'white',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
    },
    headerButton: {
        padding: 1,
        fontSize: horizontalScale(15),
        borderWidth: 2,
        borderRadius: 10,
        fontWeight: 'bold',
        borderColor: 'white',
        color: 'white',
    },
    headerLeft:{
        fontSize: horizontalScale(15),
        borderColor: 'transparent',
        borderWidth: 2,
        padding: 2,
    },
    foundText: {
        fontSize: horizontalScale(20),
        fontWeight: 'bold',
        color: '#9C6ADE',
        alignItems: 'center',
        margin: 5,
        padding: 5,
    },
    outer: {
        display: 'flex',
        flex: 1,
        color: '#50495A',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5,
        justifyContent: 'center',
        backgroundColor: '#E3D0FF',
        paddingHorizontal: horizontalScale(100),
    },
    grid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        position: 'relative',
        margin: verticalScale(5),
        width: horizontalScale(365),
        height: verticalScale(50),
        backgroundColor: '#E3D0FF',
        textAlign: 'center'
        // marginHorizontal: 10
        // marginBottom: verticalScale(40)
    },
    addWordsHeader: {
        fontSize: verticalScale(25), 
        color: '#50495A',
        fontWeight: 'bold',
        marginBottom: verticalScale(15)
    },

})

