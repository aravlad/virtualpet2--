var dog
var happyDog
var database
var foodS
var foodStock
var buttonAdd
var buttonFeed
var fedTime
var lastFed
var foodObj

function preload()
{
	dogNor=loadImage("images/dogImg.png")
	dogHap=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  dog = createSprite(200, 200)
  dog.addImage(dogNor)
  dog.scale = 0.3

  object = new Food(500, 250, 20, 20)

  foodStock = 20
  foodS = 20

  buttonFeed = createButton("Feed The Dog")
  buttonFeed.position(700,95)
  buttonFeed.mousePressed(feedDog)

  buttonAdd = createButton("Add Food")
  buttonAdd.position(800,95)
  buttonAdd.mousePressed(addFoods)

  foodStock=database.ref('Food')
  foodStock.on("value", function(readStock){
     readStock = database.foodStock
  })



  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(readStock){
     lastFed = database.val()
  })

}


function draw() {  
  background(46, 139, 87);
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM",350,30)
  }  else if(lastFed=0){
    text("Last Feed : 12 AM",350,30)
  }  else{
    text("Last Feed : " + lastFed + "AM",350,30)
  }




  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  text("Food Left:"+foodS, 300, 150)
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })

}

