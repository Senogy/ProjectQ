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

  attack () {
    let bestStat;
    bestStat = Math.max(this.str, this.agi, this.int); // Determinate best offensive statistic between strength agility and intelligence
    return Math.floor((1 + Math.random()) * (bestStat / 3)); // deal damage between half and full of the stats
  }

  dodge () {
    let dodgeroll, dodgechance;
    dodgechance = this.agi / 250;
    dodgeroll = Math.random();
    if (dodgeroll < dodgechance) {
      return "dodged";
    }
    else {
      return "hit";
    }
  }
  crit (name) { };
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
        return "blocked";
      }
      else {
        return "hit";
      }
    }
  }
}
class Archer extends Classe {
  constructor() {
    super(["Archer", 130, 30, 50, 20, 0.33, 1.25, 0]);
  }

  crit (name) {
    battleLog.innerHTML += "<br />The " + name + " " + this.name + " quickly fire his next arrow !";
    attackTurn(name);
  }
}
class Assassin extends Classe {
  constructor() {
    super(["Assassin", 120, 10, 40, 20, 0.30, 3, 0]);
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
    battleLog.innerHTML += "<br />The " + name + " " + this.name + " healed himself of " + healroll + " Hp !";
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
    battleLog.innerHTML += "<br />The " + name + " " + this.name + " just did a life swap";
  }
}
