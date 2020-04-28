class Classe {
  constructor(ClassStats) {
    this.name = ClassStats[0];      // Classe name
    this.hp = ClassStats[1];        // Health point
    this.str = ClassStats[2];       // Strenght
    this.agi = ClassStats[3];       // Agility
    this.int = ClassStats[4];       // Intelligence
    this.crtchance = ClassStats[5]; // Critical chance
    this.crtmltp = ClassStats[6];   // Critical damage multiplier
    this.blkchance = ClassStats[7]; // Block chance
  }
  haste = 0;

  attack () {
    let bestStat;
    bestStat = Math.max(this.str, this.int); // Determinate best offensive statistic between strength agility and intelligence
    return Math.floor((1 + Math.random()) * (bestStat / 3)); // deal damage between half and full of the stats
  }

  dodge () {
    let dodgeroll, dodgechance, blockroll;
    dodgechance = this.agi / 250;
    dodgeroll = Math.random();
    blockroll = Math.random();
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
  crit (name) { };
  onhit (name, damage){};
}
class Warrior extends Classe {
  constructor() {
    super(["Warrior", 150, 40, 10, 20, 0.2, 1.5, 0.2]);
  }
  dodge () {
    let dodgeroll, dodgechance, blockroll;
    dodgechance = this.agi / 250;
    dodgeroll = Math.random();
    blockroll = Math.random();
    if (dodgeroll < dodgechance) {
      return "dodged";
    }
    else {
      if (blockroll < this.blkchance) {
        this.blkchance = 0.2;
        return "blocked";
      }
      else {
        return "hit";
      }
    }
  }
  onhit(name, damage){
    this.blkchance += 0.05;
    combatLog.add("<br />The "+name+" "+this.name+" is a little more on guard.");
    combatLog.display();
  }
}
class Archer extends Classe {
  constructor() {
    super(["Archer", 130, 30, 50, 20, 0.33, 1.25, 0]);
  }

  crit (name) {
    combatLog.add("<br />The " + name + " " + this.name + " quickly prepare his next arrow !");
    combatLog.display();
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

  crit (name) {
    let healroll = Math.floor((1 + Math.random()) * (this.int / 2));
    this.hp += healroll; //if Healer crit he heal himself for half of the damage dealt dodged or not
    combatLog.add("<br />The " + name + " " + this.name + " healed himself of " + healroll + " Hp !");
    combatLog.display();
  }
}
class Illusionist extends Classe {
  constructor() {
    super(["Illusionist", 110, 20, 20, 40, 0.5, 1.2, 0]);
  }

  crit (name) {
    let hpSwap;
    hpSwap = nemesis.hp;
    nemesis.hp = hero.hp;
    hero.hp = hpSwap;
    combatLog.add("<br />The " + name + " " + this.name + " just did a life swap");
    combatLog.display();
  }
}
class Berserker extends Classe {
  constructor() {
    super(["Berserker", 120, 30, 30, 5, 0.1, 2.5, 0.01]);
  }
  onhit(name, damage){
    this.agi -= Math.floor(damage);
    if(this.agi < 5){
      this.agi = 5;
    }
    this.str += damage*2;
    combatLog.add("<br />The "+name+" "+this.name+" is more beefed up");
    combatLog.display();
  }
}
class Necromancer extends Classe {
  constructor() {
    super(["Necromancer", 120, 10, 25, 40, 0.2, 2, 0]);
  }
  lifetoken = 2;
  onhit(name, damage){
    if(this.lifetoken > 0 && this.hp-damage <= 0 ){
      this.lifetoken -= 1;
      this.hp += damage;
      combatLog.add("<BR />The "+name+" "+this.name+" mitigated the damage using a life token.");
      combatLog.display();
    }
  }
}
