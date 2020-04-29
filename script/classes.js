class Classe {
  constructor(ClassStats) {
    this.name = ClassStats[0];      // Classe name, name of the RPG classe
    this.hp = ClassStats[1];        // Health point, quantity of damage a character can take before dying
    this.str = ClassStats[2];       // Strenght, used to calculate damage
    this.agi = ClassStats[3];       // Agility, used to determine dodge chance and speed at wich character does action
    this.int = ClassStats[4];       // Intelligence, used to calculate damage
    this.crtchance = ClassStats[5]; // Critical chance, chance of doing a critical attack
    this.crtmltp = ClassStats[6];   // Critical damage multiplier, damage mutliplier of critical attack
    this.blkchance = ClassStats[7]; // Block chance, chance that character block an incoming attack
  }
  haste = 0; // This is the starting haste of all classes, 0 by default

  /*
  The following lines declares method which are action to take when character do or receive some action
  Those function are called for all the character but only do action depending on the classes so some
  as oncrit or onhit are declared as null in the main class because except when the character has a special class it's not intended
  to do anything but as it is always called it is needed to be declared for all classes thus, declared here as void
  */
  attack () { // this is the method describing how character attack
    const bestStat = Math.max(this.str, this.int); // Determinate best offensive statistic between strength agility and intelligence
    return Math.floor((1 + Math.random()) * (bestStat / 3)); // deal damage between half and full of the stats
  }

  dodge () { // this is the method describing how a character dodge
    const dodgechance = this.agi / 250; // Character chance to dodge is indexed on agility
    const dodgeroll = Math.random();
    const blockroll = Math.random();
    if (dodgeroll < dodgechance) {
      return "dodged";
    }
    else {
      if (blockroll < this.blkchance) {
        return "blocked";
      }
      else {
        return "hit";
      }
    }
  }
  oncrit (name) { }; // this is the method describing action to do when character crit
  onhit (name, damage){}; // this is the method describing action to do when character take a hit
}
class Warrior extends Classe {
  constructor() {
    super(["Warrior", 150, 40, 10, 20, 0.2, 1.5, 0.2]);
  }
  dodge () { // Warior has a special dodge because blocking with a warrior reset his block chance
    const dodgechance = this.agi / 250;
    const dodgeroll = Math.random();
    const blockroll = Math.random();
    if (dodgeroll < dodgechance) {
      return "dodged";
    }
    else {
      if (blockroll < this.blkchance) {
        this.blkchance = 0.2; // reset of block chance
        return "blocked";
      }
      else {
        return "hit";
      }
    }
  }
  onhit(name, damage){ // Warrior has special onhit, he gain block chance when taking hit
    this.blkchance += 0.05;
    combatLog.add("<br />The "+name+" "+this.name+" is a little more on guard.");
    combatLog.display("CombatLog");
  }
}
class Archer extends Classe {
  constructor() {
    super(["Archer", 130, 30, 50, 20, 0.33, 1.25, 0]);
  }

  oncrit (name) { // Archer has special oncrit, when archer crit he regain some his haste, playing faster
    combatLog.add("<br />The " + name + " " + this.name + " quickly prepare his next arrow !");
    combatLog.display("CombatLog");
    this.haste += Math.floor(maxhaste*75/100);
  }
}
class Assassin extends Classe {
  constructor() {
    super(["Assassin", 120, 10, 70, 20, 0.30, 5, 0]);
  }
}
class Mage extends Classe {
  constructor() {
    super(["Mage", 100, 20, 30, 70, 0.05, 3, 0]);
  }
}
class Healer extends Classe {
  constructor() {
    super(["Healer", 140, 30, 30, 40, 0.15, 1.5, 0]);
  }

  oncrit (name) { // Healer has special oncrit, heal himself when he crit
    const healroll = Math.floor((1 + Math.random()) * (this.int / 2));
    this.hp += healroll; //if Healer crit he heal himself for half of the damage dealt dodged or not
    combatLog.add("<br />The " + name + " " + this.name + " healed himself of " + healroll + " Hp !");
    combatLog.display("CombatLog");
  }
}
class Illusionist extends Classe {
  constructor() {
    super(["Illusionist", 110, 20, 20, 40, 0.5, 1.2, 0]);
  }

  oncrit (name) { // Illusionist has special oncrit, he swap his hp with his ennemy
    let hpSwap;
    hpSwap = nemesis.hp;
    nemesis.hp = hero.hp;
    hero.hp = hpSwap;
    combatLog.add("<br />The " + name + " " + this.name + " just did a life swap");
    combatLog.display("CombatLog");
  }
}
class Berserker extends Classe {
  constructor() {
    super(["Berserker", 120, 30, 30, 5, 0.1, 2.5, 0.01]);
  }
  onhit(name, damage){ // Berserker has special onhit, he gain strength but lose agility indexed on damage he took
    this.agi -= Math.floor(damage);
    if(this.agi < 5){
      this.agi = 5;
    }
    this.str += damage*2;
    combatLog.add("<br />The "+name+" "+this.name+" is more beefed up");
    combatLog.display("CombatLog");
  }
}
class Necromancer extends Classe {
  constructor() {
    super(["Necromancer", 120, 10, 25, 35, 0.15, 2, 0]);
  }
  lifetoken = 2;
  onhit(name, damage){ // Necromancer has special onhit allowing him to mitigate deadly damage he was supposed to take using a token
    if(this.lifetoken > 0 && this.hp-damage <= 0 ){
      this.lifetoken -= 1;
      this.hp += damage;
      combatLog.add("<BR />The "+name+" "+this.name+" mitigated the damage using a life token.");
      combatLog.display("CombatLog");
    }
  }
}
