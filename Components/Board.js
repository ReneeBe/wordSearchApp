import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {Header, centerComponent, leftComponent} from 'react-native-elements';
import Tile from './Tile';
import WordBar from './WordBar'


export function Board(props) {
    const [foundWords, setFoundWords] = useState([]);
    const [foundIndices, setFoundIndices] = useState([]);
    const [resetBoard, setResetBoard] = useState(false);

    // console.log('this is board.length', board.length)

    const handleClick = (inde) => {
        // console.log(props.indices)
        const index = Number(inde);
        if (props.indices.includes(index)){
            const wordFinder = props.wordRanges.find(range => range.includes(index))
            const word = props.words.find(word => word[0] === props.board[wordFinder[0]]);
            let wordIndices = props.wordObj[word];
            let updatedFoundIndices= foundIndices.includes(index) ? foundIndices : [...foundIndices, index];
            const wordIndicesFound = wordIndices.filter( ind => {
                return updatedFoundIndices.includes(ind)
            })
            let foundCheck = word && !foundWords.includes(word) && wordIndicesFound.length===word.length ? [...foundWords, word] : foundWords;
            setFoundWords(foundCheck);
            setFoundIndices(updatedFoundIndices);
            setResetBoard(false)    
        }
    }
    const renderHeader = () => {
        if (foundWords.length === words.length) {
            return {text: 'Great Job!', style: {color: 'white', fontWeight: 'bold', fontSize: 25}}
        }
        return {text: 'Word Search', style: {color: 'white', fontWeight: 'bold', fontSize: 25}}
    }

    const boardReset = (event) => {
        setFoundWords([]);
        setFoundIndices([]);
        setResetBoard(true);
    }

    let {words, board, indices, firstAndLastIndices, handleNewGame } = props;
    let {screenHeight, screenWidth} = props

    return (
        <View>
            <Header containerStyle={styles.appHeader} placement="left">
                <Text style={styles.newGameButton} onPress={()=>{boardReset(), handleNewGame()}}>
                    New Board
                </Text>
                <Text style={styles.headerText}>
                {foundWords.length === words.length ? 'Great Job' : 'Word Search'} 
                </Text>
            </Header>


            {/* <Text>{renderHeader()}</Text> */}
            <View style={styles.outer}>
                {/* <Text style={styles.newGameButton} onPress={()=>{boardReset(), handleNewGame()}}>
                    New Board
                </Text>  */}
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
        </View>
    );
}

const styles = StyleSheet.create({
    appHeader: {
        display: 'flex',
        flex: 0.1,
        // alignItems: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        backgroundColor: '#9C6ADE',
    },

    headerText: {
        // flex: 0.5,
        // fontSize: 30,
        color: 'white',
        fontWeight: 'bold'      
    },
    foundText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#50495A',
        alignItems: 'center',
        margin: 5,
        padding: 5,
    },
    newGameButton: {
        // alignSelf: 'flex-start',
        // backgroundColor: '#E3D0FF', 
        // alignSelf: 'flex-',
        // placement: 'left',
        // placement: 'left',
        borderWidth: 1, 
        fontWeight: 'bold',
        borderColor: 'white',
        // fontSize: 15,
        flexWrap: 'wrap',
        width: 5,
        // alignItems: 'flex-start',
        // margin: 50,
        padding: 5,
        color: 'white',
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
        // paddingTop: 25,
        paddingHorizontal: 100,
    },
    grid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        margin: 'auto',
        width: 360,
        height: 300,
        backgroundColor: '#E3D0FF',
    },
  })


