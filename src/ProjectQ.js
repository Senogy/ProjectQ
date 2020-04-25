import { Classe } from "./class";

var hero, nemesis;
var battleLog = document.getElementById('CombatLog');

class Warrior extends Classe {
  constructor(WarriorStats) {
    super(["Warrior", 150, 40, 10, 20, 0.2, 1.5, 0.2]);
  }

  dodge () {
    let dodgeroll, dodgechance, blockroll;
    dodgechance = this.agi / 250;
    dodgeroll = Math.random();
    blockroll = Math.random();
    if (dodgeroll < dodgechance) {
      console.log(this.name + " Dodged !");
      //battleLog.innerHTML += "<br />Dodged !";
      return 1;
    }
    else {
      if (blockroll < this.blkchance) {
        console.log(this.name + " Blocked !");
        //battleLog.innerHTML += "<br />Blocked !";
        return 2;
      }
      else {
        return 0;
      }
    }
  }
}
class Archer extends Classe {
  constructor(ArcherStats) {
    super(["Archer", 130, 30, 50, 20, 0.33, 1.25, 0]);
  }

  attack () {
    let damage, critroll, bestStat;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str, this.agi, this.int);
    damage = Math.floor((1 + Math.random()) * (bestStat / 3));
    if (critroll < this.crtchance) {
      console.log("Crit! One more turn");
      battleLog.innerHTML += "<br />Crit ! One more turn";
      return this.attack() + Math.floor(damage * this.crtmltp); // Archer crit trigger additionnal attack, until he doesn't crit
    }
    else {
      return damage;
    }
  }
}
class Assassin extends Classe {
  constructor(AssassinStats) {
    super(["Assassin", 120, 10, 40, 20, 0.30, 3, 0]);
  }
}
class Mage extends Classe {
  constructor(MageStats) {
    super(["Mage", 100, 20, 30, 70, 0.05, 3, 0]);
  }
}
class Healer extends Classe {
  constructor(HealerStats) {
    super(["Healer", 140, 30, 30, 40, 0.15, 1.5, 0]);
  }

  attack () {
    let damage, critroll, bestStat, healroll;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str, this.agi, this.int);
    damage = Math.floor((1 + Math.random()) * (bestStat / 3));
    if (critroll < this.crtchance) {
      healroll = Math.floor((1 + Math.random()) * (this.int / 2));
      this.hp += healroll; //if Healer crit he heal himself for half of the damage dealt dodged or not
      console.log("Crit! Healed of " + healroll);
      battleLog.innerHTML += "<br />Crit ! Healed of " + healroll + " Hp !";
      return Math.floor(damage * this.crtmltp);
    }
    else {
      return damage;
    }
  }
}
class Illusionist extends Classe {
  constructor(IllusionistStats) {
    super(["Illusionist", 110, 20, 20, 40, 0.5, 1.2, 0]);
  }

  attack () {
    let damage, critroll, bestStat, hpSwap;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str, this.agi, this.int)
    damage = Math.floor((1 + Math.random()) * (bestStat / 3))
    if (critroll < this.crtchance) {
      hpSwap = nemesis.hp;
      nemesis.hp = this.hp;
      this.hp = hpSwap;
      console.log("Crit! Life Swap");
      battleLog.innerHTML += "<br />Crit ! Life Swap";
      return Math.floor(damage * this.crtmltp);
    }
    else {
      return damage;
    }
  }
}
document.getElementById('Warrior').onclick = () => projectQ(1);
document.getElementById('Archer').onclick = () => projectQ(2);
document.getElementById('Assassin').onclick = () => projectQ(3);
document.getElementById('Mage').onclick = () => projectQ(4);
document.getElementById('Healer').onclick = () => projectQ(5);
document.getElementById('Illusionist').onclick = () => projectQ(6);


function projectQ (charclass) {     // Charclass répare charclass remplace
  document.getElementById('ClassSelector').style.display = "none";
  console.log("ProjectQ now running...");
  var nemesisroll;
  nemesisroll = Math.floor(Math.random() * 6) + 1;
  hero = charselect("" + charclass);
  nemesis = charselect("" + nemesisroll);
  document.getElementById('GameWindow').style.display = "flex";
  document.getElementById('HeroClass').innerHTML = hero.name;
  document.getElementById('HeroStats').innerHTML = statWindow(hero);
  document.getElementById('NemesisClass').innerHTML = nemesis.name;
  document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  if (hero.hp > 0 && nemesis.hp > 0) {
    document.getElementById('RoundButton').onclick = () => battleRound()
  }
  else {
    document.getElementById('RoundButton').onclick = () => location.reload()
  }
}

function charselect (char) {
  switch (char) {
    case '1': return new Warrior(); break;
    case '2': return new Archer(); break;
    case '3': return new Assassin(); break;
    case '4': return new Mage(); break;
    case '5': return new Healer(); break;
    case '6': return new Illusionist(); break;
    default: console.log("Wrong Input");
  }
}

function battleRound () {
  let nemesisdamage, herodamage, nemesisdodgeroll, herododgeroll;
  herodamage = hero.attack();
  nemesisdamage = nemesis.attack();
  nemesisdodgeroll = nemesis.dodge();
  herododgeroll = hero.dodge();
  if (nemesisdodgeroll == 0) {
    nemesis.hp -= herodamage;
    console.log("hero dealt " + herodamage + " damages");
    battleLog.innerHTML += "<br />Hero " + hero.name + " dealt " + herodamage + " damages";
  }
  else {
    if (nemesisdodgeroll == 2) {
      battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " blocked !";
    }
    else {
      battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " dodged !";
    }
  }
  if (herododgeroll == 0) {
    hero.hp -= nemesisdamage;
    console.log("nemesis dealt " + nemesisdamage + " damages");
    battleLog.innerHTML += "<br />Nemesis " + nemesis.name + " dealt " + nemesisdamage + " damages";
  }
  else {
    if (herododgeroll == 2) {
      battleLog.innerHTML += "<br />The Hero " + hero.name + " blocked !";
    }
    else {
      battleLog.innerHTML += "<br />The Hero " + hero.name + " dodged !";
    }
  }
  console.log("hero " + hero.name + " has " + hero.hp + " hp left");
  console.log("nemesis " + nemesis.name + " has " + nemesis.hp + " hp left");
  if (hero.hp > 0 && nemesis.hp < 0) {
    console.log("the hero " + hero.name + " wins !");
    battleLog.innerHTML += "<br />The Hero " + hero.name + " wins !";
  }
  else {
    if (nemesis.hp > 0 && hero.hp < 0) {
      console.log("the nemesis " + nemesis.name + " wins !");
      battleLog.innerHTML += "<br />The Nemesis " + nemesis.name + " wins !";
    }
    else {
      if (nemesis.hp < 0 && hero.hp < 0) {
        console.log("the two dumbasses killed themselves !");
        battleLog.innerHTML += "<br />The Dumbasses double-koed themselves";
      }
    }
  }
  document.getElementById('HeroStats').innerHTML = statWindow(hero);
  document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  battleLog.innerHTML += "<br />";
}

function statWindow (char) {
  return "Health Point: " + char.hp +
    "<br />Strength: " + char.str +
    "<br />Agility: " + char.agi +
    "<br />Intelligence: " + char.int;
}
