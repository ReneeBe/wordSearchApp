import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Tile from './Tile';
import WordBar from './WordBar';
import {horizontalScale, verticalScale} from '../adjustableSize';
import ModifyWords from './ModifyWords'

export function Board(props) {
    const [foundWords, setFoundWords] = useState([]);
    const [foundIndices, setFoundIndices] = useState([]);
    const [resetBoard, setResetBoard] = useState(false);
    const [changeWordsClicked, setChangeWordsClicked] = useState(false);
    const [userUpdatedWords, setUserUpdatedWords] = useState(words);
    // const [updateToCustomBoard, setUpdateToCustomBoard] = useState(false)

    const handleClick = (i) => {
        const index = Number(i);
        if (props.indices.includes(index)){
            const wordEntries = Object.entries(props.wordObj);
            const wordEntry = wordEntries.find((word) => word[1].includes(index))
            const updatedFoundIndices= foundIndices.includes(index) ? foundIndices : [...foundIndices, index];
            const wordIndicesFound = wordEntry[1].filter( ind => {
                return updatedFoundIndices.includes(ind);
            })
            const updatedFoundWords = wordEntry[0] && !foundWords.includes(wordEntry[0]) && wordIndicesFound.length===wordEntry[1].length ? [...foundWords, wordEntry[0]] : foundWords;
            setFoundWords(updatedFoundWords);
            setFoundIndices(updatedFoundIndices);
            setResetBoard(false);    
        }
    }

    const boardReset = () => {
        setFoundWords([]);
        setFoundIndices([]);
        setResetBoard(true);
    }

    const changeWords = (bool = '') => {
        if (bool.length > 1) {
            setChangeWordsClicked(Boolean(bool));
        } else {
            setChangeWordsClicked(!changeWordsClicked);
        }
    }

    const updateToUserUpdatedWords = (newWords) => {
        console.log(newWords);
        setUserUpdatedWords(newWords);
    }

    let { words, board, indices, firstAndLastIndices, handleNewGame, handleCustomBoard } = props;

    return (
        <View>
            <View style={styles.appHeader}>
                <Text style={styles.headerButton} onPress={()=>{boardReset(), handleNewGame(), setChangeWordsClicked(false) }}>New Board</Text>

                {/* { changeWordsClicked === false ?
                    <Text style={styles.headerButton} onPress={()=>{boardReset(), handleNewGame(), changeWords('false') }}>New Board</Text>
                    :
                    <Text style={styles.headerButton} onPress={() => {setFoundWords([]), setFoundIndices([]), handleCustomBoard(userUpdatedWords), changeWords()}}>
                        See Your Board
                    </Text> 
                } */}
                <Text style={styles.headerText}>{'Word Search'}</Text> 
                <Text 
                    style={styles.headerButton} 
                    onPress={
                        changeWordsClicked ?
                        (() => {
                            setChangeWordsClicked(false);
                            // changeWords('false');
                            setFoundWords([]);
                            setFoundIndices([]);
                            handleCustomBoard(userUpdatedWords);
                        })
                        : (() => {
                            setChangeWordsClicked(true);
                        })
                    }
                >
                    {changeWordsClicked ? 'Play Now' : 'Change Words'}
                </Text>
            </View>
            <View style={styles.outer}>
                { changeWordsClicked === true ? (
                    <ModifyWords words = {words} updateToUserUpdatedWords={updateToUserUpdatedWords.bind()}/>
                ) : (
                <View>
                    <Text style={styles.foundText}>
                        {foundWords.length === words.length ? 'Great work!' : `You found: ${foundWords.length} word(s)`}
                    </Text>

                    <View style={styles.grid}>
                        {board.map((letter, i) => (
                        <Tile key={i} value={letter} indices={indices} index={i} handleClick={handleClick.bind(this)} selected={foundIndices.includes(Number(i))} firstAndLastIndices={firstAndLastIndices}
                        />))}
                    </View>

                    <WordBar words={words} found={foundWords}/>
                </View>
                )}
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
    },
    headerButton: {
        padding: 2,
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
        color: '#50495A',
        alignSelf: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        margin: 'auto',
        width: horizontalScale(365),
        height: verticalScale(310),
        backgroundColor: '#E3D0FF',
    },
    headerRight:{
        fontSize: horizontalScale(15),
        borderColor: 'transparent',
        borderWidth: 2,
        padding: 2,
    },
  })


