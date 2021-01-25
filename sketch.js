var database, food, foodStock, dog, dog1, dog2

function preload()
{
  dog1 = loadImage ("images/dogImg.png")
  dog2 = loadImage ("images/dogImg1.png")
  bg = loadImage ("Kitchen.gif")
}

function setup() {
	createCanvas(1300,800);
  database = firebase.database()
  dog = createSprite(850,550,150,150)
  dog.addImage(dog1)
  dog.scale = 0.5
  feed = createButton("Feed the Dog!")
  feed.position(850,95)
  feed.mousePressed(feedDog)
  add = createButton("Add Food!")
  add.position(1000,95)
  add.mousePressed(addFood)
  milkObj = new Food()
  foodStock = database.ref("Food")
  foodStock.on("value", readStock)
}


function draw() {  
background(bg)
milkObj.display();

  drawSprites();
  //add styles here

}



    function addFood(){
      foodS++
      database.ref('/').update({
      Food:foodS
      })
    }
    
    function feedDog(){
    
        dog.addImage(dog2);
        milkObj.updateFoodStock(milkObj.getFoodStock()-1);
    
        database.ref('/').update({
        Food:milkObj.getFoodStock(),
        FeedTime:hour()
      });
    }
    function showError(){
      console.log("Error in writing to the database");
    }
    function readStock(data){ 
      foodS=data.val(); 
      milkObj.updateFoodStock(foodS);
     }