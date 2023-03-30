const { createVendor,Vendors,createResources,Resources} = require("../Controller/Controller");
const multer = require("multer");
multer({ dest: process.env.ResumePath });
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './' + process.env.ResumePath); },
    filename: function (req, file, cb) { cb(null, new Date() / 10 + 'vendor' + file.originalname); }
});
const upload = multer({ storage: storage});
const routes = require("express").Router();
routes.post("/create_vendor",createVendor);
routes.get("/vendors_list",Vendors);
routes.post("/create_resource",upload.single('resume'),createResources);
routes.get("/resource_list",Resources);

module.exports = routes;Vendors