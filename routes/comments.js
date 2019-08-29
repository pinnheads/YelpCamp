// ++++++++++++++++++++++++++++++++++++++++++++
//        COMMENT ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++

//Express router
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Campground Not Found")
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
    
});

//Post route
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground using Id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("/campgrounds")
        }
        else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully posted the Comment");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
            //connect new comment to campground
            //redirect to show page
        }
    });

});

//EDIT Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Error In loading the comment!");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });   
});

//Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Successfully edited the comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Deleted the comment!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;