function statWindow (char) {
  return "Health Point: " + char.hp +
    "<br />Strength: " + char.str +
    "<br />Agility: " + char.agi +
    "<br />Intelligence: " + char.int;
}
function logDisplay(string){
  document.getElementById('CombatLog').innerHTML += string;
}
