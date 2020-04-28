function statWindow (char) {
  return "Health Point: " + char.hp +
    "<br />Strength: " + char.str +
    "<br />Agility: " + char.agi +
    "<br />Intelligence: " + char.int;
}
/*
function logDisplay(string){
  document.getElementById('CombatLog').innerHTML += string;
}
*/

var combatLog = createLogBuffer(15);

function createLogBuffer(logSize){
  var logBuffer = [];
  function addToLog(input){
    logBuffer.push(input);
    if(logBuffer.length > logSize){
      logBuffer.shift();
    }
  }
  function logDisplay(){
    document.getElementById('CombatLog').innerHTML = "";
    logBuffer.forEach(string => {document.getElementById('CombatLog').innerHTML += string;
    });
  }
  return {
    add: (input) => {
      addToLog(input)
    },
    display: () => {
      logDisplay();
    }
  }
}
