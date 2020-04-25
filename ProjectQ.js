var hero, nemesis;
var battleLog = document.getElementById('CombatLog');

class Classe{
  constructor(ClassStats){
    this.name = ClassStats[0];      // Classe name
    this.hp = ClassStats[1];        // Health point
    this.str = ClassStats[2];       // Strenght
    this.agi = ClassStats[3];       // Agility
    this.int = ClassStats[4];       // Intelligence
    this.crtchance = ClassStats[5]; // Critical chance
    this.crtmltp = ClassStats[6];   // Critical damage multiplier
    this.blkchance = ClassStats[7]; // Block chance
  }

  attack(name){
    let damage, critroll, bestStat;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str,this.agi,this.int); // Determinate best offensive statistic between strength agility and intelligence
    damage = Math.floor((1+Math.random()) * (bestStat/3)); // deal damage between half and full of the stats
    if (critroll < this.crtchance ){ // if critroll is inferior to critical chances the attack is a crit and deal bonus damage determined by critical multiplier
      console.log("Crit!");
      battleLog.innerHTML += "<br />The "+name+" "+this.name+" critically striked !";
      return Math.floor(damage * this.crtmltp);
    }
    else{
      return damage;
    }
  }

  dodge(){
    let dodgeroll, dodgechance;
    dodgechance = this.agi/250;
    dodgeroll = Math.random();
    if (dodgeroll < dodgechance){
      console.log(this.name + " Dodged !");
      //battleLog.innerHTML += "<br />Dodged !";
      return 1;
    }
    else{
      return 0;
    }
  }
}
class Warrior extends Classe{
  constructor(){
    super(["Warrior",150,40,10,20,0.2,1.5,0.2]);
  }

  dodge(){
    let dodgeroll, dodgechance, blockroll;
    dodgechance = this.agi/250;
    dodgeroll = Math.random();
    blockroll = Math.random();
    if (dodgeroll < dodgechance){
      console.log(this.name + " Dodged !");
      //battleLog.innerHTML += "<br />Dodged !";
      return 1;
    }
    else{
      if(blockroll < this.blkchance){
        console.log(this.name + " Blocked !");
        //battleLog.innerHTML += "<br />Blocked !";
        return 2;
      }
      else{
        return 0;
      }
    }
  }
}
class Archer extends Classe{
  constructor(){
    super(["Archer",130,30,50,20,0.33,1.25,0]);
  }

  attack(name){
    let damage, critroll, bestStat;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str,this.agi,this.int);
    damage = Math.floor((1+Math.random()) * (bestStat/3));
    if (critroll < this.crtchance ){
      console.log("Crit! One more turn");
      battleLog.innerHTML += "<br />The "+name+" "+this.name+" critically striked ! One more turn !";
      return this.attack(name) + Math.floor(damage * this.crtmltp); // Archer crit trigger additionnal attack, until he doesn't crit
    }
    else{
      return damage;
    }
  }
}
class Assassin extends Classe {
  constructor() {
    super(["Assassin",120,10,40,20,0.30,3,0]);
  }
}
class Mage extends Classe {
  constructor() {
    super(["Mage",100,20,30,70,0.05,3,0]);
  }
}
class Healer extends Classe {
  constructor() {
    super(["Healer",140,30,30,40,0.15,1.5,0]);
  }

  attack(){
    let damage, critroll, bestStat,healroll;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str,this.agi,this.int);
    damage = Math.floor((1+Math.random()) * (bestStat/3));
    if (critroll < this.crtchance ){
      healroll = Math.floor((1+Math.random()) * (this.int/2));
      this.hp += healroll; //if Healer crit he heal himself for half of the damage dealt dodged or not
      console.log("Crit! Healed of "+ healroll);
      battleLog.innerHTML += "<br />The "+name+" "+this.name+" critically striked ! He healed himself of "+healroll+" Hp !";
      return Math.floor(damage * this.crtmltp);
    }
    else{
      return damage;
    }
  }
}
class Illusionist extends Classe {
  constructor() {
    super(["Illusionist",110,20,20,40,0.5,1.2,0]);
  }

  attack(){
    let damage, critroll, bestStat, hpSwap;
    critroll = Math.random();
    //console.log(this.name + " rolled a "+critroll+"in crit roll");
    bestStat = Math.max(this.str,this.agi,this.int)
    damage = Math.floor((1+Math.random()) * (bestStat/3))
    if (critroll < this.crtchance ){
      hpSwap = nemesis.hp;
      nemesis.hp = hero.hp;
      hero.hp = hpSwap;
      console.log("Crit! Life Swap");
      battleLog.innerHTML += "<br />The "+name+" "+this.name+" critically striked ! He just did a life swap";
      return Math.floor(damage * this.crtmltp);
    }
    else{
      return damage;
    }
  }
}

document.getElementById('Warrior').onclick = () => setupGame("Warrior");
document.getElementById('Archer').onclick = () => setupGame("Archer");
document.getElementById('Assassin').onclick = () => setupGame("Assassin");
document.getElementById('Mage').onclick = () => setupGame("Mage");
document.getElementById('Healer').onclick = () => setupGame("Healer");
document.getElementById('Illusionist').onclick = () => setupGame("Illusionist");


function setupGame(charclass){     // Charclass répare charclass remplace
  document.getElementById('ClassSelector').style.display = "none";
  console.log("ProjectQ now running...");
  nemesisroll = getRandomClass();
  hero = charselect(""+charclass);
  nemesis = charselect(""+nemesisroll);
  document.getElementById('GameWindow').style.display = "flex";
  document.getElementById('HeroClass').innerHTML = hero.name;
  document.getElementById('HeroStats').innerHTML = statWindow(hero);
  document.getElementById('NemesisClass').innerHTML = nemesis.name;
  document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  document.getElementById('RoundButton').onclick = () => battleRound()
}

function charselect(char){
  switch(char){
    case 'Warrior':return new Warrior();break;
    case 'Archer':return new Archer();break;
    case 'Assassin':return new Assassin();break;
    case 'Mage':return new Mage();break;
    case 'Healer':return new Healer();break;
    case 'Illusionist':return new Illusionist();break;
    default:console.log("Wrong Input");
  }
}

function battleRound(){
  if(hero.hp > 0 && nemesis.hp > 0){
    let nemesisdamage, herodamage,nemesisdodgeroll, herododgeroll;
    herodamage = hero.attack("Hero");
    nemesisdamage = nemesis.attack("Nemesis");
    nemesisdodgeroll = nemesis.dodge();
    herododgeroll = hero.dodge();
    if(nemesisdodgeroll==0){
      nemesis.hp -= herodamage;
      console.log("hero dealt "+herodamage+ " damages");
      battleLog.innerHTML += "<br />The Hero "+hero.name+" dealed "+herodamage+ " damages";
    }
    else{
      if(nemesisdodgeroll==2){
        battleLog.innerHTML += "<br />The Nemesis "+nemesis.name +" blocked !";
      }
      else {
        battleLog.innerHTML += "<br />The Nemesis "+nemesis.name +" dodged !";
      }
    }
    if(herododgeroll==0){
      hero.hp -= nemesisdamage;
      console.log("nemesis dealt "+nemesisdamage+ " damages");
      battleLog.innerHTML += "<br />The Nemesis "+nemesis.name+" dealed "+nemesisdamage+ " damages";
    }
    else{
      if(herododgeroll==2){
        battleLog.innerHTML += "<br />The Hero "+hero.name +" blocked !";
      }
      else {
        battleLog.innerHTML += "<br />The Hero "+hero.name +" dodged !";
      }
    }
    console.log("hero "+hero.name +" has "+hero.hp+" hp left");
    console.log("nemesis "+nemesis.name +" has "+nemesis.hp+" hp left");
    if(hero.hp > 0 && nemesis.hp<=0){
      console.log("the hero " + hero.name + " wins !");
      battleLog.innerHTML += "<br />The Hero "+hero.name+" wins !";
    }
    else{
      if(nemesis.hp > 0 && hero.hp<=0){
        console.log("the nemesis " + nemesis.name + " wins !");
        battleLog.innerHTML += "<br />The Nemesis "+nemesis.name+" wins !";
      }
      else{
        if(nemesis.hp<=0 && hero.hp<=0){
          console.log("the two dumbasses killed themselves !");
          battleLog.innerHTML += "<br />The Dumbasses double-koed themselves";
        }
      }
    }
  document.getElementById('HeroStats').innerHTML = statWindow(hero);
  document.getElementById('NemesisStats').innerHTML = statWindow(nemesis);
  battleLog.innerHTML += "<br />";
  }
}

function statWindow(char){
  return "Health Point: "+char.hp+
  "<br />Strength: "+char.str+
  "<br />Agility: "+char.agi+
  "<br />Intelligence: "+char.int;
}

function getRandomClass(){
  var carole; // character roll --> charroll --> Carole
  var classArray = ["Warrior","Archer","Assassin","Mage","Healer","Illusionist"];
  carole = Math.floor(Math.random() * 6);
  console.log("getRandomClass roll "+carole+" , "+classArray[carole]);
  return classArray[carole];
}
