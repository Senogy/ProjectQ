var hero, nemesis;
var battleLog = document.getElementById('CombatLog');



document.getElementById('Warrior').onclick = () => setupGame("Warrior");
document.getElementById('Archer').onclick = () => setupGame("Archer");
document.getElementById('Assassin').onclick = () => setupGame("Assassin");
document.getElementById('Mage').onclick = () => setupGame("Mage");
document.getElementById('Healer').onclick = () => setupGame("Healer");
document.getElementById('Illusionist').onclick = () => setupGame("Illusionist");
document.getElementById('RoundButton').onclick = () => battleRound()
