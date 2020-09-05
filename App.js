import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {Board} from './Components/Board';
import boardGenerator from './helperFxns';

let {boardArr, taken, wordObject, wordRanges, firstAndLastLetterIndices} = boardGenerator();
const wordsOnBoard = ["SWIFT", "KOTLIN", "OBJECTIVEC", "VARIABLE", "JAVA", "MOBILE"]

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function App() {
  const [board, setBoard] = useState(boardArr);
  const [takenIndices, setTakenIndices] = useState(taken);
  const [wordObj, setWordObj] = useState(wordObject);
  const [wordIndArr, setWordIndArr] = useState(wordRanges);
  const [firstAndLast, setFirstAndLast] = useState(firstAndLastLetterIndices);  

  const handleNewGame = () => {
    let {boardArr, taken, wordObject, wordRanges, firstAndLastLetterIndices} = boardGenerator();
    setBoard(boardArr);
    setTakenIndices(taken);
    setWordObj(wordObject);
    setWordIndArr(wordRanges);
    setFirstAndLast(firstAndLastLetterIndices);
  }


  return (
    <View style={styles.container}>
      <Board
          board={board} 
          indices={takenIndices} 
          words={wordsOnBoard} 
          wordObj={wordObj} 
          wordRanges={wordIndArr} 
          firstAndLastIndices={firstAndLast} 
          handleNewGame={handleNewGame.bind()}
          appStyleSheet={styles}
          screenHeight = {screen.height}
          screenWidth = {screen.width} 
          />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screen.width,
    height: screen.height,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center',
    backgroundColor: '#E3D0FF',
  },
});


