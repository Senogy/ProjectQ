function battleRound () {
  if (hero.hp > 0 && nemesis.hp > 0) {
    attackTurn("Hero");
    battleLog.innerHTML += "<br />"
    attackTurn("Nemesis");
    battleLog.innerHTML += "<br />"
    if (hero.hp > 0 && nemesis.hp <= 0) { //If hero still alive ( hero hp > 0) while nemesis is dead ( nemesis hp <= 0)
      battleLog.innerHTML += "<br />The Hero " + hero.name + " wins !";
    }
    if (nemesis.hp > 0 && hero.hp <= 0) { //If nemesis still alive ( nemesis hp> 0) while hero is dead (hero hp <= 0)
      battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " wins !";
    }
    if (nemesis.hp <= 0 && hero.hp <= 0) { // if both hero and nemesis are dead ( nemesis hp <= 0 AND hero hp <= 0)
      battleLog.innerHTML += "<br />The Dumbasses double-koed themselves";
    }
    document.getElementById('HeroStats').innerHTML = statWindow(hero);
    document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  }
}
function attackTurn (name) {
  let damage, critroll, charatk, chardef, namechardef;
  let critstate = "notcrit", dodgestate = "hit"; // Initialising on false state
  if(name === "Hero"){
    charatk = hero;
    chardef = nemesis;
    namechardef = "Nemesis";
  }
  else{
    charatk = nemesis;
    chardef = hero;
    namechardef = "Hero";
  }
  critroll = Math.random();
  damage = charatk.attack();
  if (critroll < charatk.crtchance) { // attack is a crit if the crit roll is below character crit chance
    damage = Math.floor(charatk.crtmltp * damage);
    critstate = "crit";
    battleLog.innerHTML += "<br />The " + name + " " + charatk.name + " critically striked !";
  }
  dodgestate = chardef.dodge();
  if (dodgestate !== "hit") {       // condition to know if the attack doesn't hit
    if (critstate === "crit") {     // we want to display a different text message depending if the attacking character did crit or not
      battleLog.innerHTML += "<br />But the " + namechardef + " " + chardef.name + " " + dodgestate + " !";
      charatk.crit(name);
    }
    else {
      battleLog.innerHTML += "<br />The " + namechardef + " " + chardef.name + " " + dodgestate + " !";
    }
  }
  else {
    battleLog.innerHTML += "<br />The " + name + " " + charatk.name + " hitted for " + damage + " damages !";
    if (critstate == "crit") {
      charatk.crit(name);
    }
    chardef.hp -= damage;
  }
}
