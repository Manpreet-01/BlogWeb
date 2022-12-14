//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Health and wellness has become a hot topic in recent years. From contemporary yoga classes to trendy new diets, everyone seems to be on the hunt for the next big thing. But you don’t need a fancy fitness membership or a personal chef to be healthy; sometimes the answer can be found with a simple click of your mouse. Wellness blogs are great way to stay informed and be inspired when it comes to living a healthy lifestyle. From nutrition and fitness to spiritual and mental health, these websites are full of useful resources to help boost your well-being.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus facilisis volutpat est velit egestas dui id ornare. Semperest pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum  Mauris ultrices eros in cursus turpis massa tincidunt dui fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [] ;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (res, req) {
	req.render("home", {
		StartingContent : homeStartingContent,
		posts: posts			
	});
});

app.get("/contact", function (res, req) {
	req.render("contact", {contactmeContent : contactContent});
});

app.get("/about", function (res, req) {
	req.render("about", {aboutmeContent : aboutContent});
});


app.get("/compose", function (res, req) {
	req.render("compose");
});



app.post("/compose", function(res, req){
		
	var post = {
		title:res.body.postTitle,
		content:res.body.postBody
	};
	
	posts.push(post);
	
	req.redirect("/");
});





app.get("/posts/:postName", function(req,res){
	const requestedTitle = _.lowerCase(req.params.postName);
	
	posts.forEach(function(post){
		const storedTitle = _.lowerCase(post.title);
		
		if(storedTitle === requestedTitle){
			res.render("post", {
				title: post.title,
				content: post.content
			});
		};
	});
});




app.listen(3000, function() {
  console.log("Server UP ^^^ on My port 3000");
});
