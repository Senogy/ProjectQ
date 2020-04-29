/*
Disclaimer : This code is not so pretty to look at, sorry.
You'll find different js script in the script folder, those script contain globales and function
intimately linked to them.
The documents are as follows :
Classes : declaration of character Classes
Setup Function : Function called at the start of the game ( from selection to launch)
Battle Function : Function called when the fight is going on
Display Function : Function called to display things ( altering HTML )
*/

document.getElementById('Warrior').onclick = () => setupGame("Warrior");
document.getElementById('Archer').onclick = () => setupGame("Archer");
document.getElementById('Assassin').onclick = () => setupGame("Assassin");
document.getElementById('Mage').onclick = () => setupGame("Mage");
document.getElementById('Healer').onclick = () => setupGame("Healer");
document.getElementById('Illusionist').onclick = () => setupGame("Illusionist");
document.getElementById('Berserker').onclick = () => setupGame("Berserker");
document.getElementById('Necromancer').onclick = () => setupGame("Necromancer");
document.getElementById('RoundButton').onclick = () => battleRound()
