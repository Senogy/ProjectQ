var maxhaste = 500;
var fps = 30;
async function battleRound () {
  if (hero.hp > 0 && nemesis.hp > 0) {
    while(hero.haste<maxhaste && nemesis.haste<maxhaste){
      hero.haste += await hastetimer(hero);
      nemesis.haste += await hastetimer(nemesis);
      document.getElementById('HeroHaste').innerHTML = "Haste <br />"+ hero.haste+"/"+maxhaste;
      document.getElementById('NemesisHaste').innerHTML = "Haste <br />"+ nemesis.haste+"/"+maxhaste;
    }
    if(hero.haste>=maxhaste){
      attackTurn("Hero");
      logDisplay("<br />");
      hero.haste -= maxhaste;
      document.getElementById('HeroHaste').innerHTML = "Haste <br />"+hero.haste+"/"+maxhaste;
    }
    if(nemesis.haste>=maxhaste){
      attackTurn("Nemesis");
      logDisplay("<br />");
      nemesis.haste -= maxhaste;
      document.getElementById('NemesisHaste').innerHTML = "Haste <br />"+nemesis.haste+"/"+maxhaste;
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
  function hastetimer (char) {
    return new Promise(res => {
      setTimeout(
        () => res(Math.floor(Math.cbrt(char.agi)*100/fps)), 1000/fps)
    });
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
