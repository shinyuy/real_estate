const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const logger = require("morgan");
const API_PORT = process.env.PORT || 8000;
const app = express();
const router = express.Router();
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
var cors = require("cors"); 

//  Models
const Property = require("./models/property");
const Agent = require("./models/agent");
const User = require("./models/user");

// Middlewares  
const { auth } = require('./middlewares/auth');
const { admin } = require('./middlewares/admin');

app.use(cors());

// Connect to database
const dbRoute = "mongodb://house:house1234@ds249717.mlab.com:49717/house";
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());  
app.use(logger("dev"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// this is our post method method images for uploading images from the front end, and from here they eventually get send and saved in the cloud with cloudinary
router.post("/images/uploadimage", formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

router.get("/images/removeimage", (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("Okay");
  });
}); 

/***************************************
 //      Property                      //
 **************************************/

// this is our get method this method fetches all available data in our database
router.get("/getproperties", (req, res) => {
  Property.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/searchproperties", (req, res) => {
 console.log(req.query)
  const {region, propertyFor, bedrooms } = req.query;
  Property.find({region: region, propertyFor: propertyFor, bedrooms: bedrooms}  ) 
    .exec((err, docs) => { 
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true, docs
      })
    })     
   
})

// this our get method for a single applicant this method fetches a single data object by id from the database.
router.get("/getproperty/:id", (req, res) => {
  let id = req.params.id;
  Property.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/addproperty", (req, res) => {
  let property = new Property();
  console.log(req.body);
  const {
    title,
    description,
    price,
    location,
    propertyFor,
    owner,
    area,
    contact,
    region,
    bedrooms,
    images,
   // geometry
  } = req.body;  

  if (
    !title || 
    !price ||
    !description ||
    !location ||
    !propertyFor ||
    !owner ||
    !contact ||
    !region ||
    !images ||
    !bedrooms 
  ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }  
  property.title = title;
  property.price = price;
  property.description = description;
  property.location = location;
  property.propertyFor = propertyFor;
  property.owner = owner;
  property.area = area;
  property.contact = contact;
  property.region = region;
  property.bedrooms = bedrooms;
  property.images = images;
 // property.geometry = geometry;
  property.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  console.log(property); 
});    

  /***************************************
 //      Agents                        //
 **************************************/

router.post("/addagent", (req, res) => {
  let agent = new Agent();
  console.log(req.body);
  const {
    name,
    region,
    contact,
    location,
    agency,
    images,
   // geometry
  } = req.body;  

  if (
    !name || 
    !region ||
    !location ||
    !agency ||
    !contact ||
    !images 
  ) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }  
  agent.name = name;
  agent.location = location;
  agent.contact = contact;
  agent.region = region;
  agent.agency = agency;
  agent.images = images;
 // agent.geometry = geometry;
  agent.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
  console.log(agent); 
});    

router.get("/getagents", (req, res) => {
  Agent.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


  /***************************************
 //      Users                         //
 **************************************/
 
router.get('/auth', auth, (req, res)=>{
  res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      phoneNumber: req.user.phoneNumber,
      role: req.user.role,   
      images: req.user.images,
      accountNumber: req.user.accountNumber,  
      savings: req.user.savings
  }) 
}); 
 
 router.post("/register", (req, res) => {
   const user = new User(req.body);
   user.save((err, doc) => {
     if (err) return res.json({ success: false, err });
     res.status(200).json({
       success: true,
       userData: doc
     });
   });
 }); 

 router.get("/getAdmins", (req, res) => {
  let query = User.find({}) 

  query.where('role', 1)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true, docs
      })
    })
}); 

router.get("/getUsers", (req, res) => {
  let query = User.find({}) 

  query.where('role', 0)
    .exec((err, docs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true, docs
      })
    })
}); 
  
router.get("/getUsers/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);   
  User.findById(id, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});   

 router.post("/login", (req, res) => {
   //Find the email
   User.findOne({ email: req.body.email }, (err, user) => {
     if (!user)
       return res.json({
         loginSuccess: false,
         message: "Auth failed, email not found"
       });
 
     //Grab the password and check
     user.comparePassword(req.body.password, (err, isMatch) => {
       if (!isMatch)
         return res.json({
           loginSuccess: false,
           message: "Wrong Password or Email"
         });
 
       //Generate a new token
       user.generateToken((err, user) => {
         if (err) return res.status(400).send(err);
         res
           .cookie("w_auth", user.token)
           .status(200)
           .json({ loginSuccess: true });
       });
     });
   });
 });  

 router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

// append /api for our http requests
app.use("/api", router);

app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});
