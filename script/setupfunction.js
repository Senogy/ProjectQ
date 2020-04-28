function setupGame (charclass) {     // Charclass répare charclass remplace
  document.getElementById('ClassSelector').style.display = "none";
  console.log("ProjectQ now running...");
  nemesisroll = getRandomClass();
  hero = charselect("" + charclass);
  nemesis = charselect("" + nemesisroll);
  document.getElementById('GameWindow').style.display = "flex";
  document.getElementById('HeroClass').innerHTML = hero.name;
  document.getElementById('HeroStats').innerHTML = statWindow(hero);
  document.getElementById('HeroHaste').innerHTML = "Haste <br />"+hero.haste+"/"+maxhaste;
  document.getElementById('NemesisClass').innerHTML = nemesis.name;
  document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  document.getElementById('NemesisHaste').innerHTML = "Haste <br />"+nemesis.haste+"/"+maxhaste;
}

function charselect (char) {
  switch (char) {
    case 'Warrior': return new Warrior(); break;
    case 'Archer': return new Archer(); break;
    case 'Assassin': return new Assassin(); break;
    case 'Mage': return new Mage(); break;
    case 'Healer': return new Healer(); break;
    case 'Illusionist': return new Illusionist(); break;
    case 'Berserker': return new Berserker(); break;
    case 'Necromancer': return new Necromancer(); break;
    default: console.log("Wrong Input");
  }
}

function getRandomClass () {
  var carole; // character roll --> charroll --> Carole
  var classArray = ["Warrior", "Archer", "Assassin", "Mage", "Healer", "Illusionist","Berserker","Necromancer"];
  carole = Math.floor(Math.random() * 8);
  return classArray[carole];
}
