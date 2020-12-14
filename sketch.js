//Create variables here
var dog, happyDog, dogPic, dogPic2;
var foodS;
var database;
var x;
function preload(){
  //load images here
  dogPic = loadImage("dogImg.png");
  dogPic1 = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250, 100, 100);
  dog.addImage(dogPic);
  dog.scale = 0.15;
  var foodStock = database.ref('food');
  foodStock.on("value", readStock);
}
function readStock(data){
foodS = data.val();
}

function writeStock(){
  if(x <= 0){
    x = 0;
  }else{
    x = x -1;
  }
  database.ref('/').update({
    food:x
  })
}
function draw() {  
  background(46, 139, 87);
  drawSprites();
  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogPic1);
  }
  //add styles here

}