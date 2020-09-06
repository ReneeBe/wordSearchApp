import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Board} from './Components/Board';
import boardGenerator from './helperFxns';

let { wordsOnBoard, boardArr, taken, wordObject, firstAndLastLetterIndices} = boardGenerator();
let { width, height } = Dimensions.get('screen');

export default function App() {
  const [words, setWords] = useState(wordsOnBoard)
  const [board, setBoard] = useState(boardArr);
  const [takenIndices, setTakenIndices] = useState(taken);
  const [wordObj, setWordObj] = useState(wordObject);
  const [firstAndLast, setFirstAndLast] = useState(firstAndLastLetterIndices);  

  const handleNewGame = () => {
    let {wordsOnBoard, boardArr, taken, wordObject, wordRanges, firstAndLastLetterIndices} = boardGenerator();
    setWords(wordsOnBoard);
    setBoard(boardArr);
    setTakenIndices(taken);
    setWordObj(wordObject);
    setFirstAndLast(firstAndLastLetterIndices);
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Board
          board={board} 
          indices={takenIndices} 
          words={words} 
          wordObj={wordObj} 
          firstAndLastIndices={firstAndLast} 
          handleNewGame={handleNewGame.bind()}
          appStyleSheet={styles}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3D0FF',
  },
});


