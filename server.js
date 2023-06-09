const { log, error } = require("console")
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const uri = "mongodb+srv://artemrepeipz2020:foodfinder23@foodlist.o9isrdu.mongodb.net/smakosearch?retryWrites=true&w=majority"
const { FoodList } = require("./models/foodlist");
const { Places } = require("./models/places");

app.listen(8000, () => {
  log("Server started on port 8000!")
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
 
router.get('/search',async (req,res) => {
  res.sendFile(path.join(__dirname + '/public/pages/search.html'));
  // FOODLIST = await FoodList.find();
  // PLACES = await Places.find();
  // res.json(FOODLIST);
});
 
router.get('/services',function(req,res){
  res.sendFile(path.join(__dirname + '/public/pages/services.html'));
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname + '/public/pages/about.html'));
});

//add the router
app.use(express.json());
app.use('/', router);
app.use('/', express.static(path.join(__dirname + "/public")));

app.get('/api/foodlist', async (req, res) => {
  const result = await FoodList.find();
  res.json(result);
})

app.get('/api/places', async (req, res) => {
  const result = await Places.find();
  res.json(result);
})

async function connect() {
  try {
    await mongoose.connect(uri);
    log("Connected MongoDB");
  } catch (e) {
    error(e);
  }
}

connect();