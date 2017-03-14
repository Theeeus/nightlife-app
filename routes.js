module.exports = function(app, yelp, passport, db) {

app.get('/',function(req,res){
	res.render('index', {auth : req.isAuthenticated()});
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/search', function(req,res){ 
    var query = req.body.query;
    res.redirect('/city/'+query);
});

app.post('/go', function(req,res){
    db.nightlifersvps.find({ barID : req.body.barID},function(err,data){
        if (data.length === 0) {
            db.nightlifersvps.insert({"barID": req.body.barID, "going":[req.user.id]});
        } else {
            db.nightlifersvps.update({ barID : req.body.barID},{ "$push":{"going" : req.user.id}});
        }
    });
    res.redirect('back');
});

app.post('/unenroll', function(req,res){
    db.nightlifersvps.update({ barID : req.body.barID},{ "$pull":{"going" : req.body.userID}});
    res.redirect('back');
});

app.get('/city/:query',function(req,res){
	var query = req.params.query;
    yelp.search({ term: 'bar', location: query })
    .then(function (data) {
		var arr = data.businesses;
        var newArr = [];
        var i = -1;
        var goingCount = null;
        var enrolled = null;
        var next = function() {
            i++;
            if (i < arr.length) {
                var value = arr[i];
                db.nightlifersvps.find({ barID : value.id }, function(err,bar){
                    if (bar.length > 0) {
                        goingCount = bar[0].going.length;
                        enrolled = bar[0].going;

                    } else {
                        goingCount = 0;
                        enrolled = [];
                    }
                    var obj = { image_url : value.image_url, url : value.url, name : value.name, id : value.id, rating : value.rating, rating_img_url : value.rating_img_url, review_count: value.review_count, address : value.location.address[0], snippet : value.snippet_text, going : goingCount, enrolled : enrolled};
                    newArr[i] = obj;
                    next();
                });
            } else {
                var string = JSON.stringify(newArr);
                var updatedString = string.replace(/'/g, "\\'");
                var updatedString = updatedString.replace(/\n/g, "\\n");
                var updatedString = updatedString.replace(/"/g, '\\"');
                var user = '';
                if (req.isAuthenticated()) {
                    user = req.user.id;
                }
                res.render('search', {data : updatedString, auth : req.isAuthenticated(), user : user, city : data.businesses[0].location.city });
                
            }
        }
        next();
    })
    .catch(function (err) {
    console.error(err);
    });
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : 'back', /* redirects user back to previous page */
            failureRedirect : '/'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

};