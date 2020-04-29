// Display function global variables declaration
var combatLog = createLogBuffer(15);
const fps = 30;
// End of global variables declaration

// Display function
function statWindow (char) { //Display character stats during the fight
  return "Health Point: " + char.hp +
    "<br />Strength: " + char.str +
    "<br />Agility: " + char.agi +
    "<br />Intelligence: " + char.int;
}
function createLogBuffer(logSize){ // Used to create a buffer containing logs
  var logBuffer = [];
  function addToLog(input){ // add a string passed in argument at the end of the buffer
    logBuffer.push(input);
    if(logBuffer.length > logSize){ // if the buffer length is longer than wanted, we delete the first element
      logBuffer.shift();
    }
  }
  function logDisplay(logsid){ // used to display the logs in the html id passed in argument
    document.getElementById(logsid).innerHTML = "";
    logBuffer.forEach(string => {document.getElementById(logsid).innerHTML += string;
    });
  }
  return {
    add: (input) => {
      addToLog(input)
    },
    display: (logsid) => {
      logDisplay(logsid);
    }
  }
}
// End of display function
