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

  attack(){
    let bestStat;
    bestStat = Math.max(this.str,this.agi,this.int); // Determinate best offensive statistic between strength agility and intelligence
    return Math.floor((1+Math.random()) * (bestStat/3)); // deal damage between half and full of the stats
  }

  dodge(){
    let dodgeroll, dodgechance;
    dodgechance = this.agi/250;
    dodgeroll = Math.random();
    if (dodgeroll < dodgechance){
      return 1;
    }
    else{
      return 0;
    }
  }
  crit(name){};
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
      return 1;
    }
    else{
      if(blockroll < this.blkchance){
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

  crit(name){
    battleLog.innerHTML += "<br />The "+name+ " "+this.name+" quickly fire his next arrow !";
    attackTurn(name);
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

  crit(name){
    let healroll = Math.floor((1+Math.random()) * (this.int/2));
    this.hp += healroll; //if Healer crit he heal himself for half of the damage dealt dodged or not
    battleLog.innerHTML += "<br />The "+name+" "+this.name+" healed himself of "+healroll+" Hp !";
  }
}
class Illusionist extends Classe {
  constructor() {
    super(["Illusionist",110,20,20,40,0.5,1.2,0]);
  }

  crit(name){
    let hpSwap;
    hpSwap = nemesis.hp;
    nemesis.hp = hero.hp;
    hero.hp = hpSwap;
    battleLog.innerHTML += "<br />The "+name+" "+this.name+" just did a life swap";
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
    attackTurn("Hero");
    battleLog.innerHTML += "<br />"
    attackTurn("Nemesis");
    battleLog.innerHTML += "<br />"
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

function attackTurn(name){
  let damage, critroll;
  let critstate = 0,dodgestate = 0;
  critroll = Math.random();
  if(name == "Hero"){
    damage = hero.attack();
    if(critroll < hero.crtchance){
      damage = Math.floor(hero.crtmltp*damage);
      critstate = 1;
      battleLog.innerHTML += "<br />The Hero " +hero.name+" critically striked !" ;
    }
    dodgestate = nemesis.dodge();
    if(dodgestate != 0){
      if(critstate == 1){
        if(dodgestate == 1){
          battleLog.innerHTML += "<br />But the Nemesis " +nemesis.name+" dodged !" ;
          hero.crit(name);
        }
        else{
          battleLog.innerHTML += "<br />But the Nemesis " +nemesis.name+" blocked !" ;
          hero.crit(name);
        }
      }
      else{
        if(dodgestate == 1){
          battleLog.innerHTML += "<br />The Nemesis " +nemesis.name+" dodged !" ;
        }
        else{
          battleLog.innerHTML += "<br />The Nemesis " +nemesis.name+" blocked !" ;
        }
      }
    }
    else{
      if(critstate == 1){
        battleLog.innerHTML += "<br />The Hero " +hero.name+" hitted for "+damage+" damages !" ;
        hero.crit(name);
        nemesis.hp -= damage;
      }
      else{
      nemesis.hp -= damage;
      battleLog.innerHTML += "<br />The Hero " +hero.name+" hitted for "+damage+" damages !" ;
      }
    }
  }
  else{
    if(name == "Nemesis"){
      damage = nemesis.attack();
      if(critroll < nemesis.crtchance){
        damage = Math.floor(nemesis.crtmltp*damage);
        critstate = 1;
        battleLog.innerHTML += "<br />The Nemesis " +nemesis.name+" critically striked !" ;
      }
      dodgestate = hero.dodge();
      if(dodgestate != 0){
        if(critstate == 1){
          if(dodgestate == 1){
            battleLog.innerHTML += "<br />But the Hero " +hero.name+" dodged !" ;
            nemesis.crit(name);
          }
          else{
            battleLog.innerHTML += "<br />But the Hero " +hero.name+" blocked !" ;
            nemesis.crit(name);
          }
        }
        else{
          if(dodgestate == 1){
            battleLog.innerHTML += "<br />The Hero " +hero.name+" dodged !" ;
          }
          else{
            battleLog.innerHTML += "<br />The Hero " +hero.name+" blocked !" ;
          }
        }
      }
      else{
        if(critstate == 1){
          battleLog.innerHTML += "<br />The Nemesis " +nemesis.name+" hitted for "+damage+" damages !" ;
          nemesis.crit(name);
          hero.hp -= damage;
        }
        else{
          hero.hp -= damage;
          battleLog.innerHTML += "<br />The Nemesis " +nemesis.name+" hitted for "+damage+" damages !" ;
        }
      }
    }
  }
}
