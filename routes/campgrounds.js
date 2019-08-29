// ++++++++++++++++++++++++++++++++++++++
//          CAMPGROUND ROUTES
// ++++++++++++++++++++++++++++++++++++++

//These routes follow RESTful routing

//Express router
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
// INDEX - Campground route
router.get("/", function(req,res){ 
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user});
        }
    });
    
});

//CREATE - Campground Route
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc =req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image:image, description: desc, author: author}
    //Create a new  campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "There was an error in creating the campground!");
            console.log(err);
        }
        else {
            req.flash("Successfully created the Campground!");
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
    
});

//NEW -show form to create a new Campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - Shows info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            console.log(err);
        }
        else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });   
    
});

//EDIT - Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //check if user is logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Not found!");
        }        
        res.render("campgrounds/edit", {campground: foundCampground});                
    });    
});

//UPDATE - route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update the correct campground
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Error occured in updating the Campground");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully updated the campground!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect to show page
});

//DESTROY - Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            req.flash("error", "Error in deleting the campground");
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Successfully deleted the Campground!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;