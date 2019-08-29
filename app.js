var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalSrategy        = require("passport-local"),
    User                = require("./models/user"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    seedDB              = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");

//seedDB(); //seed the database
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); //Using body-parser
app.set("view engine", "ejs"); //set the view for all the reder files to be ejs
app.use(express.static(__dirname + "/public"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Huskies are the best.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

passport.use(new LocalSrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(3000, function(){
    console.log("Server active and listening on port 3000..");
});