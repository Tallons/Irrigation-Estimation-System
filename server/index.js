require("dotenv").config();
   const express = require("express"),
         cors = require("cors"),
         massive = require ("massive"),
         session = require("express-session"),
         {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
         authCtrl = require("./controllers/authController"),
         bidCtrl = require("./controllers/bidController"),
         matCtrl = require("./controllers/materialController"),
         taskCtrl = require("./controllers/taskController");

         port = SERVER_PORT,
         app = express();

   app.use(cors());
   app.use(express.json());
   app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      cookie: {maxAge: 1000 * 60 * 60 * 24}
   }));

   massive({
      connectionString: CONNECTION_STRING,
      ssl: {rejectUnauthorized: false}
   }).then(db => {
      app.set("db", db);
      console.log("Your database LIVES!");
      app.listen(port, () => console.log("Server is accessible on port " + port ));
   });

   //Auth Endpoints
   app.post("/api/auth/register", authCtrl.register);
   app.post("/api/auth/login", authCtrl.login);
   app.post("/api/auth/logout", authCtrl.logout);
   app.get("/api/auth/user", authCtrl.getCurrentUser);

   // Bid Endpoints
   // app.get("/api/bid/:id", bidCtrl.getCurrentBid);
   app.put("/api/bid/material", bidCtrl.updateMaterial);
   app.get("/api/bid/:id/summary", bidCtrl.getBidSummary)
   app.get("/api/bid/:id/info", bidCtrl.getBidInfo);
   app.get("/api/bids/:id", bidCtrl.getBids);
   app.post("/api/bid", bidCtrl.createBid);
   app.put("/api/bid/:id", bidCtrl.renameBid);
   app.delete("/api/bids/:id", bidCtrl.deleteBid);
   app.get("/api/bid/:id/materials", bidCtrl.getBidMaterials);
   app.post("/api/bid/material", bidCtrl.addLineItem);
   app.delete("/api/bid/:line", bidCtrl.deleteLineItem);
   
   
   // Material Endpoints
   app.get("/api/material/types", matCtrl.getMaterialTypes)
   app.get("/api/materials/:type", matCtrl.getMaterialNames)
   app.get("/api/material/:id", matCtrl.getMaterialInfo)

   //task endpoints
   app.get("/api/material/:id/tasks", taskCtrl.getTasks)
   app.get("/api/task/:type/production",taskCtrl.getTaskProduction)

   // used for database adjustment


