
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;
var PLAY, END;
var gameState;
var ground;
var banana;
var obstacle;
function preload(){
  
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(100,300,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background("green");
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if (keyDown("space") && monkey.x <= 133){
      monkey.velocityY = -11;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    spawnBananas();
    spawnObstacles();
  }                        
  else if(gameState === END){
    
  }
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: " + survivalTime, 200, 15);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 3, 15);
  monkey.collide(ground);
  drawSprites();
}
function spawnBananas(){
  if (frameCount % 80 === 0){
    banana = createSprite(400, 400, 20, 20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 200;
    bananasGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1
  }
}
function spawnObstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(400, 325, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime =  200;
    obstaclesGroup.add(obstacle);
  }
} 




