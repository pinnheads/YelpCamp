#YelpCamp v1
* Add Landing Page
* Add Campgrounds Page

    Campgrounds contain:- 
        1. Name
        2. Image

# Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap 

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add Basic unstyled form

# Style the Campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the navbar and form
* Add a navbar to all templates
* Style the new campground form

# Add Mongoose
* Install and configure mongoose
* setup Campground model
* Use Campground model inside of routes!

# Show Page
* Review the RESTful routes
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require all of the above

#Comment New/Create
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicer

#Finish Styling the show page
* Add public directory
* Add custom stylesheet

#Add User Model
* Install all packages needed for authentication
* Define User model

#Register
* Configure Passport
* Add register routes
* Add register template

#Logout and Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

#Editing Campgrounds
* Add Method-override
* Add Edit Route for cmapgrounds
* Add Link to edit Page
* Add Update Route
* Fix $set problem

#Deleting Campgrounds
* Add destroy Button
* Add delete button

#Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

#Deleting Comments
* Add destroy route
* Add Delete button

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding Flash Message
* Install and configure version
* ADd bootstrap alerts to the header

RESTful Routes

Name        Url         Verb        Desc
===============================================
INDEX       /dogs       GET         Display a list of all dogs
NEW         /dogs/new   GET         Displays form to make a new dog
CREATE      /dogs       POST        Add new dog to DB
SHOW        /dogs/:id   GET         Shows info about one dog

#Basic Routes of Campgrounds
INDEX       /campgrounds
NEW         /campgrounds/new
CREATE      /campgrounds
SHOW        /campgrounds/:id

#Comment Routes
NEW     campgrounds/:id/comments/new        GET
CREATE  campgrounds/:id/comments            POST