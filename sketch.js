//Create variables here

var dog, happyDog, dogPic, dogPic1;
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

  //Rajbir - This is the place where you read from database how much is the foodstock currently
  var foodStock = database.ref('food');
  // Rajbir - As soon as the value changes , stock has to be read, so readStock function will be called
  foodStock.on("value", readStock);
}

//Rajbir- ReadStock function
function readStock(data){
    foodS = data.val();
}

//Rajbir - WriteSTock function will actually make changes in database
// as soon as you press down arrow key this will be called , & it will decarese the quantity by 1
// it means you have given 1 feed to the dog
function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x -1;
  }

  //Rajbir -    .ref('tableName') is used to get database table name , beacuse database can have multiple names
  // however if we dont give the name & put .ref('/') it takes name from the last table used
 // .update is used to update the values in database.
  database.ref('/').update({
    food:x
  })
}

// Rajbir - I just used this menthod to update data for my review..this is not needed in your project
function reStock(){
  database.ref('/').update({
    food:20
  })
}


function draw() {  
  background(46, 139, 87);
  //Rajbir - In the starting , it will take sometime for code to read data from database..
  // so untill then it will show undefined foodS
  // that's why we need to check that if foods is not undefined then only we do other operations
  if(foodS !== undefined){
    //Rajbir - As soon as up arrow key is pressed, we need to decrease the food count by one
    // beacuse we are feeding 1 meal to dog
    // so we are calling writeStock function to make that change in database & also show it on the screen
    if(keyDown(UP_ARROW)){
      writeStock(foodS);
      // Rajbir - As dog will be happy ,so we need to change the dog pic here to be a happy dog
      dog.addImage(dogPic1);
    }

    //Rajbir- we need to show all these changes on the screen so we are writing this text
    fill("yellow");
    textSize(20);
    //Rajbir - this is for insructions
    text("Press Up Arrow key to give food to dog",100,50);
    // Rajbir - this is for showing how much food is remaining
    text("Food Remaining:"+foodS,150,150);
  } 
  
  
  drawSprites();
}