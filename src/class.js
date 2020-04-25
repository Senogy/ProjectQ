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
    let damage, critroll, bestStat;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str, this.agi, this.int); // Determinate best offensive statistic between strength agility and intelligence
    damage = Math.floor((1 + Math.random()) * (bestStat / 3)); // deal damage between half and full of the stats
    if (critroll < this.crtchance) { // if critroll is inferior to critical chances the attack is a crit and deal bonus damage determined by critical multiplier
      console.log("Crit!");
      battleLog.innerHTML += "<br />Crit !";
      return Math.floor(damage * this.crtmltp);
    }
    else {
      return damage;
    }
  }

  dodge () {
    let dodgeroll, dodgechance;
    dodgechance = this.agi / 250;
    dodgeroll = Math.random();
    if (dodgeroll < dodgechance) {
      console.log(this.name + " Dodged !");
      //battleLog.innerHTML += "<br />Dodged !";
      return 1;
    }
    else {
      return 0;
    }
  }
}