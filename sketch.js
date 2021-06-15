const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint= Matter.MouseConstraint;

var stone1,stone2,stone3,stone4,stoneIMG;
var ground,player,slingshot;
var bgImg,playerImg;
var slingshot;
var gameState=0;
var gem,xPos,yPos;
var score=0;
var flag = 0;


function preload(){
stoneIMG=loadImage("stone.png");
bgImg=loadImage("bgImg.jpg");
playerImg=loadImage("player.png");
}

function setup(){
    var  canvas= createCanvas(600,650);
    engine = Engine.create();
    world = engine.world;

stone1=createSprite(80,150,20,20);
stone1.addImage(stoneIMG);
stone1.scale=0.12;

stone2=createSprite(200,350,20,20);
stone2.addImage(stoneIMG);
stone2.scale=0.12;

stone3=createSprite(320,200,20,20);
stone3.addImage(stoneIMG);
stone3.scale=0.12;

stone4=createSprite(450,450,20,20);
stone4.addImage(stoneIMG);
stone4.scale=0.12;

ground=new Ground(300,600);
player=new Player(300,470);


slingshot= new SlingShot({x:300,y:470},player.body);

gem=createSprite(randomX(),randomY(),20,20);
}

function draw(){
   background(bgImg)

    Engine.update(engine);

   // slingshot=new SlingShot({x:stone1.x,y:stone1.y},player.body);

    if(frameCount%100===0){
        r=Math.round(random(1,4));
       if(r===1){
 stone1.x=80;
 stone1.y=random(100,400);
  
       }
      else if(r===2){
        stone2.x=200;
        stone2.y=random(100,400);
   
      }
      else if(r===3){
      
        stone3.x=320;
        stone3.y=random(100,400);
      }
      else if(r===4){
        stone4.x=450;
        stone4.y=random(100,400);
   
      }
     }
     if(mousePressedOver(stone1)){


     slingshot.body.pointA={x:stone1.x,y:stone1.y};
    // slingshot.body.length=10;
    gameState="attach";
        }
     
        if(mousePressedOver(stone2)){

          gameState="attach";
           slingshot.body.pointA={x:stone2.x,y:stone2.y};
            }
            else if(mousePressedOver(stone3)){
              gameState="attach";
            slingshot.body.pointA={x:stone3.x,y:stone3.y};
                }
                else if(mousePressedOver(stone4)){
                  gameState="attach";
                   slingshot.body.pointA={x:stone4.x,y:stone4.y};
                    }
     //fill(0);            
    //rect(gem.x,gem.y,20,20)

if(istouching(player,gem)&& flag === 0){
  gem.x = randomX();
  gem.y=randomY();
  flag = 1;
}

if(flag === 1){
  score =score +1;
  flag =0;
}
drawSprites();

textSize(20);
fill("red");
text("Score:"+score,50,50);

 ground.display();
 player.display();
 slingshot.display();

}

function mouseReleased(){
  slingshot.body.pointA=null;
  gameState="detach";
}
function istouching(o1,o2){
  if(o1.body.position.x-o2.x<25+o2.width/2 &&
    o2.x-o1.body.position.x<25+o2.width/2 &&
    o2.y-o1.body.position.y<25+o2.height/2 &&
    o1.body.position.y-o2.y<25+o2.height/2){
      return true;

  }
  else {

    return false
  }


}
function randomX(){

  xPos= random(50,550);

return xPos;

}
function randomY(){
   yPos= random(50,500);

return yPos;
}
function reset(){
  Matter.Body.setPosition(gem.body,{x:randomX(),y:randomY()});
}





