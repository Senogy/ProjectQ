var herohaste = 0, nemesishaste = 0;
function battleRound () {
  if (hero.hp > 0 && nemesis.hp > 0) {
    herohaste += hero.agi/2;
    nemesishaste += nemesis.agi/2;
    console.log("Hero haste "+herohaste+"/100");
    console.log("Nemesis haste "+nemesishaste+"/100");
    document.getElementById('HeroHaste').innerHTML = "Haste <br />"+herohaste+"/100";
    document.getElementById('NemesisHaste').innerHTML = "Haste <br />"+nemesishaste+"/100";
    if(herohaste>=100){
      attackTurn("Hero");
      logDisplay("<br />");
      herohaste -= 100;
      document.getElementById('HeroHaste').innerHTML = "Haste <br />"+herohaste+"/100";
    }
    if(nemesishaste>=100){
      attackTurn("Nemesis");
      logDisplay("<br />");
      nemesishaste -= 100;
      document.getElementById('NemesisHaste').innerHTML = "Haste <br />"+nemesishaste+"/100";
    }
    if (hero.hp > 0 && nemesis.hp <= 0) { //If hero still alive ( hero hp > 0) while nemesis is dead ( nemesis hp <= 0)
      logDisplay("<br />The Hero " + hero.name + " wins !");
    }
    if (nemesis.hp > 0 && hero.hp <= 0) { //If nemesis still alive ( nemesis hp> 0) while hero is dead (hero hp <= 0)
      logDisplay("<br />The Nemesis " + nemesis.name + " wins !");
    }
    if (nemesis.hp <= 0 && hero.hp <= 0) { // if both hero and nemesis are dead ( nemesis hp <= 0 AND hero hp <= 0)
      logDisplay("<br />The Dumbasses double-koed themselves");
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
    logDisplay("<br />The " + name + " " + charatk.name + " critically striked !");
  }
  dodgestate = chardef.dodge();
  if (dodgestate !== "hit") {       // condition to know if the attack doesn't hit
    if (critstate === "crit") {     // we want to display a different text message depending if the attacking character did crit or not
      logDisplay("<br />But the " + namechardef + " " + chardef.name + " " + dodgestate + " !");
      charatk.crit(name);
    }
    else {
      logDisplay("<br />The " + namechardef + " " + chardef.name + " " + dodgestate + " !");
    }
  }
  else {
    logDisplay("<br />The " + name + " " + charatk.name + " hitted for " + damage + " damages !");
    if (critstate == "crit") {
      charatk.crit(name);
    }
    chardef.hp -= damage;
  }
}
