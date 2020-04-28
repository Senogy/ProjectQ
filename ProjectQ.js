var hero, nemesis;

document.getElementById('Warrior').onclick = () => setupGame("Warrior");
document.getElementById('Archer').onclick = () => setupGame("Archer");
document.getElementById('Assassin').onclick = () => setupGame("Assassin");
document.getElementById('Mage').onclick = () => setupGame("Mage");
document.getElementById('Healer').onclick = () => setupGame("Healer");
document.getElementById('Illusionist').onclick = () => setupGame("Illusionist");
document.getElementById('Berserker').onclick = () => setupGame("Berserker");
document.getElementById('Necromancer').onclick = () => setupGame("Necromancer");
document.getElementById('RoundButton').onclick = () => battleRound()
