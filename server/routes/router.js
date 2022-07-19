const express = require("express");
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description thirrja e Home Root prej /services/render ne baze te pathit
 *  @method GET /
 */
route.get("/", services.homeRoutes);

/**
 *  @description thirrja e add users root prej /services/render ne baze te pathit
 *  @method GET /add-user
 */
route.get("/add-user", services.add_user);

/**
 *  @description thirrja e update users root prej /services/render ne baze te pathit
 *  @method GET /update-user
 */
route.get("/update-user", services.update_user);

//API (funksionalizimi i api rootave permes metodave te server/controller/controller.js)
route.post('/api/users', controller.create);        //shkon te server/controller/controller.js dhe thirr metoden create kur kemi post ne /api/users
route.get("/api/users", controller.find);           //shkon te server/controller/controller.js dhe thirr metoden find kur kemi get ne /api/users
route.put("/api/users/:id", controller.update);     //shkon te server/controller/controller.js dhe thirr metoden update kur kemi put ne /api/users/:id
route.delete("/api/users/:id", controller.delete);  //shkon te server/controller/controller.js dhe thirr metoden delete kur kemi delete ne /api/users/:id

module.exports = route;