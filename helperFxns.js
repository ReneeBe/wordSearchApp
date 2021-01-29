const programmingLanguages = ['PYTHON','PHP','SQL','MATLAB','PERL','GO','GROOVY','SAS','LUA','DART','FORTRAN','COBOL','SCRATCH','SCALA','ABAP','LISP','LOGO','ADA','PROLOG','SCHEME','RUST','HASKELL','JULIA','HACK','ERLANG','RPG','BASH','RUBY'] 
let words = ["SWIFT", "KOTLIN", "OBJECTIVEC", "VARIABLE", "JAVA", "MOBILE"]

const boardSize = 121;
let rowLength = Math.sqrt(boardSize)

const generateRandomBoard=()=>{
    let arr = []
    for (let i = 0; i < boardSize; i++) {
        arr.push(String.fromCharCode(Math.floor((Math.random() * (90-65)) + 65)));
    }
    return arr;
}

const generateRandomNumber = (num) => {
    return Math.floor(Math.random()*num);
}

export const boardGenerator = (wordsArr = []) => {
    let horizontal = false;
    let taken = [];
    let wordObject = {};
    let wordRanges = [];
    let boardArr = generateRandomBoard();

    //below line changes board to isolate words for debugging purposes
    boardArr = Array(boardSize).fill('X',0);

    //return true if the suggested position conflicts with any already established word positions    
    let isOverlap = (args) => {
        for (let i = 0; i < args.length; i++) {
            if (taken.includes(args[i])) {
                return true;
            }
        }
        return false;
    }

    let sameLineCheck = (num) => {
        return num % rowLength === rowLength - 1
    }

    //this function adds two random words, and isn't relevant if the wors are already there
    const addTwoRandomWords = () => {
        let number = generateRandomNumber(programmingLanguages.length-1);
        return [...words, programmingLanguages[number], programmingLanguages[number+1]];
    }

    let wordsOnBoard = wordsArr.length > 0 ? wordsArr : addTwoRandomWords();

    //put in words
    for (let i = 0; i < wordsOnBoard.length; i++) {
        let current = wordsOnBoard[i]
        let start = generateRandomNumber(rowLength) * generateRandomNumber(rowLength);
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
   
        //final check for this word position's candidacy, will try again if not a viable position 
        if (isOverlap(range) === true || ((start+1).toString().charAt() !== end.toString().charAt()  && horizontal === true) || (horizontal === false && range[range.length-1] > boardSize)|| (range.some(sameLineCheck))) {
            i--;
            continue;
        }

        //position approved; adding to relevant lists
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

    return {wordsOnBoard, boardArr, taken, wordObject, firstAndLastLetterIndices};
  }

  export const updateBoard = (arr) => {
      return boardGenerator(arr);
  }

