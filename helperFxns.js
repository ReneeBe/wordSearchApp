const wordsOnBoard = ["SWIFT", "KOTLIN", "OBJECTIVEC", "VARIABLE", "JAVA", "MOBILE"]
// const columnEndIndices = [14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 164, 179, 194, 209, 224];
const columnEndIndices = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
const boardSize = 100;
let rowLength = Math.sqrt(boardSize)
// const wordsOnBoard =['JAVA', 'JAVA']
const randomizeBoard=()=>{
    let arr = []
    for (let i = 0; i < boardSize; i++) {
        arr.push(String.fromCharCode(Math.floor((Math.random() * (90-65)) + 65)));
    }
    return arr;
}

const randomNumberGenerator = (num) => {
    return Math.floor(Math.random()*num);
}

export default function boardGenerator(){
    let horizontal = false;
    let taken = [];
    let wordObject = {};
    let wordRanges = [];
    //USE THE LINE BELOW FOR REAL THING
    // let boardArr = randomizeBoard();
    //USE THE LINE BELOW TO GET A SIMPLIFIED VERSION TO WORKING
    let boardArr = Array(boardSize).fill('X',0)


    //checker checks if the suggested position for the word will conflict with the position of any of the existing words already on the board
    let checker = (args) => {
        for (let i = 0; i < args.length; i++) {
            if (taken.includes(args[i])) {
                return true;
            }
        }
        return false;
    }

    let sameLineCheck = (num) => {
        // return columnEndIndices.includes(num)
        return num % rowLength === rowLength - 1
    }

    for (let i = 0; i < wordsOnBoard.length; i++) {
        let current = wordsOnBoard[i]
        let start = randomNumberGenerator(rowLength) * randomNumberGenerator(rowLength);
        let end = start + current.length;
        let range = [];
        horizontal = !horizontal;
        if (horizontal === true) {
            for (let i = start; i < end; i++) {
                range.push(i)
            }
        } else if (horizontal === false) {
            for (let i = start; i < (rowLength*current.length) + start; i+=rowLength) {
                range.push(i)
            }
        }
        //checking that this word wont conflict with a word already on the board
        let check = checker(range);
   
        //checking that this position wont run over into the next line or column depending on direction or any other exceptions that impact its candidacy
        if (check === true || ((start+1).toString().charAt() !== end.toString().charAt()  && horizontal === true) || (horizontal === false && range[range.length-1] > boardSize)|| (range.some(sameLineCheck))) {
            i--;
            continue;
        }

        //position has been approved; adding to all the various lists and updating the board
        wordRanges.push(range);
        wordObject[current] = range;
        taken.push(...range);
        current = current.split('');
        for (let i = 0; i < range.length; i++) {
            boardArr[range[i]] = current[i];
        }
    }

    let firstAndLastLetterIndices = {hor: [], ver: []};
    wordRanges.forEach((word) => {
      if (word[0] +1 === word[1]) {
        firstAndLastLetterIndices.hor.push(word[0], word[word.length-1]);
      } else if (word[0] + rowLength === word[1]) {
        firstAndLastLetterIndices.ver.push(word[0], word[word.length-1]);
      }
    });

    return {boardArr, taken, wordObject, wordRanges, firstAndLastLetterIndices};
  }