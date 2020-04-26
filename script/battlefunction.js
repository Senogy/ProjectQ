function battleRound () {
  if (hero.hp > 0 && nemesis.hp > 0) {
    attackTurn("Hero");
    battleLog.innerHTML += "<br />"
    attackTurn("Nemesis");
    battleLog.innerHTML += "<br />"
    if (hero.hp > 0 && nemesis.hp <= 0) {
      console.log("the hero " + hero.name + " wins !");
      battleLog.innerHTML += "<br />The Hero " + hero.name + " wins !";
    }
    else {
      if (nemesis.hp > 0 && hero.hp <= 0) {
        console.log("the nemesis " + nemesis.name + " wins !");
        battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " wins !";
      }
      else {
        if (nemesis.hp <= 0 && hero.hp <= 0) {
          console.log("the two dumbasses killed themselves !");
          battleLog.innerHTML += "<br />The Dumbasses double-koed themselves";
        }
      }
    }
    document.getElementById('HeroStats').innerHTML = statWindow(hero);
    document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  }
}
function attackTurn (name) {
  let damage, critroll;
  let critstate = 0, dodgestate = 0;
  critroll = Math.random();
  if (name == "Hero") {
    damage = hero.attack();
    if (critroll < hero.crtchance) {
      damage = Math.floor(hero.crtmltp * damage);
      critstate = 1;
      battleLog.innerHTML += "<br />The Hero " + hero.name + " critically striked !";
    }
    dodgestate = nemesis.dodge();
    if (dodgestate != 0) {
      if (critstate == 1) {
        if (dodgestate == 1) {
          battleLog.innerHTML += "<br />But the Nemesis " + nemesis.name + " dodged !";
          hero.crit(name);
        }
        else {
          battleLog.innerHTML += "<br />But the Nemesis " + nemesis.name + " blocked !";
          hero.crit(name);
        }
      }
      else {
        if (dodgestate == 1) {
          battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " dodged !";
        }
        else {
          battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " blocked !";
        }
      }
    }
    else {
      if (critstate == 1) {
        battleLog.innerHTML += "<br />The Hero " + hero.name + " hitted for " + damage + " damages !";
        hero.crit(name);
        nemesis.hp -= damage;
      }
      else {
        nemesis.hp -= damage;
        battleLog.innerHTML += "<br />The Hero " + hero.name + " hitted for " + damage + " damages !";
      }
    }
  }
  else {
    if (name == "Nemesis") {
      damage = nemesis.attack();
      if (critroll < nemesis.crtchance) {
        damage = Math.floor(nemesis.crtmltp * damage);
        critstate = 1;
        battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " critically striked !";
      }
      dodgestate = hero.dodge();
      if (dodgestate != 0) {
        if (critstate == 1) {
          if (dodgestate == 1) {
            battleLog.innerHTML += "<br />But the Hero " + hero.name + " dodged !";
            nemesis.crit(name);
          }
          else {
            battleLog.innerHTML += "<br />But the Hero " + hero.name + " blocked !";
            nemesis.crit(name);
          }
        }
        else {
          if (dodgestate == 1) {
            battleLog.innerHTML += "<br />The Hero " + hero.name + " dodged !";
          }
          else {
            battleLog.innerHTML += "<br />The Hero " + hero.name + " blocked !";
          }
        }
      }
      else {
        if (critstate == 1) {
          battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " hitted for " + damage + " damages !";
          nemesis.crit(name);
          hero.hp -= damage;
        }
        else {
          hero.hp -= damage;
          battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " hitted for " + damage + " damages !";
        }
      }
    }
  }
}
