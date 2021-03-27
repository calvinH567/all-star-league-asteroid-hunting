var acceleration = 3
var gameState = 1;
var currentWave = 0;
var asteroidHealth = 10;
var waveMultiplier = 10;

var cooldown = 2;
var damage = 1;
var abilityTotal
var ability1Used = 0
var ability2Used = 0
var cooldownCounter = cooldown;
var ability1Cooldown = 10//kncokback
var ability2cooldown = 20//teleport asteroid back
var spaceshipIMG
var asteroidScatter1;
var asteroidScatter2;
var asteroidScatter3;

function preload(){
  spaceshipIMG = loadImage("images.jpg");
}

function setup() {
  createCanvas(800,800);
  asteroid = createSprite(400, 0, 50, 50);
  spaceShip = createSprite(400,400,25,25,);
  asteroid.velocityY = 0;
  
  
  asteroidScatter1 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,1);
  asteroidScatter2 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,2);
  asteroidScatter3 = new rock(Math.round(random(0,400)),0,asteroidHealth/10,3);
  
}

function draw() {
  if(gameState ==1){
    if(ability1Cooldown>0){
      ability1Cooldown -=0.1;
    }else{
      if(keyDown("1")){
        //effect of ability1; knock everything back slightly
        asteroid.velocityY = -3;
        asteroidScatter1.y = -10;
        asteroidScatter2.y = -10;
        asteroidScatter3.y = -10;
        ability1Cooldown = 10;
        ability1Used = ability1Used + 1;//used to calculate damage increase
      }
    }
    if(ability2cooldown>0){
      ability2cooldown-=0.1;
    }else{
      if(keyDown("2")){
        //effect of ability2; teleport everything back 
        ability2cooldown=20;
        asteroid.y = 0;
        asteroidScatter1.y = -10;
        asteroidScatter2.y = -10;
        asteroidScatter3.y = -10;
        ability2Used = ability2Used + 1;//used to calculate damage gain
      }
    }
    if(asteroid.y>800||asteroidScatter1.y>800||asteroidScatter2.y>800||asteroidScatter3.y>800){
      gameState = 0;
    }
    if(asteroidHealth<1){
      //how asteroid hp is calculated
      asteroidHealth = waveMultiplier*currentWave;

      //adds more multiplier every 10 waves
      if(currentWave%10 == 0){
        waveMultiplier = waveMultiplier + 5;
      }

      //based on amount of abilities used in wave, it will increases damage
      asteroid.y = 0;
      abilityTotal = ability1Used + ability2Used;
      damage = damage + 1000/abilityTotal;

    }else{
      //resets all asteroids scatters (unused)
      asteroidScatter1.y = 0;
      asteroidScatter1.health = asteroidHealth /10;

      asteroidScatter2.y = 0;
      asteroidScatter2.health = asteroidHealth /10;

      asteroidScatter3.y = 0;
      asteroidScatter3.health = asteroidHealth /10;
      //resets all asteroids scatters (unused)

      if(scattershotDown >2){
         currentWave = currentWave + 1;//-------increases difficulty of hp and speed of asteroids
         acceleration = acceleration + 0.05;//speed difficulty increases
         scattershotDown = 0;//resets so it doesn't go up as much
      }
    }
    if(asteroid.velocityY >=acceleration){
      //only used for the else function
    }else{
      asteroid.velocityY = asteroid.velocityY+0.1//gravitational pull towards earth
    }
    if(spaceShip.isTouching(asteroid)){
      cooldownCounter = cooldownCounter -0.1;
      if(cooldownCounter <0){//----cooldown for attack(spaceship must be touching                                
        cooldownCounter=cooldown//// the asteroid for cooldown to go down)
        asteroidHealth = asteroidHealth - damage;
      }
    
    }//drag movement
    spaceShip.x = mouseX;
    spaceShip.y = mouseY;
    
  console.log(asteroidHealth)
    background(0);  
    drawSprites();
    //image(50,50,50,50,spaceshipIMG)

    //tutorial
    text("When an ability pops up, use the 1/2 keys to activate it",10,25);
    text("Hover the space ship over the asteroid",10,10);

    //displays hp
    fill("white")
    text(asteroidHealth,asteroid.x,asteroid.y);
    push ()

    //shows when ability is ready
    if(ability1Cooldown <=0){stroke("blue")}else{stroke("black")}
    fill (rgb(ability1Cooldown*25,ability1Cooldown*25,ability1Cooldown*25));
    rect (200,700,50,50);

    //shows when ability is ready
    if(ability2cooldown <=0){stroke("blue")}else{stroke("black")}
    fill(rgb(ability2cooldown*12.5,ability2cooldown*12.5,ability2cooldown*12.5));
    rect (600,700,50,50);

    pop ();
    asteroidScatter1.draw();
    asteroidScatter2.draw();
    asteroidScatter3.draw();
}else{

  //defeat text
  fill ("white");
  textSize(25)
  text ("The earth was destroyed! You survived for "+currentWave+" years",50,400);
}
}
