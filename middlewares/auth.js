const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly (req,res,next){

    const userId = req.cookies?.uid;
    console.log(userId);
    if(!userId) return res.redirect('/login');

    const user = await getUser(userId);
    if(!user) return res.redirect('/login');
 
    req.user = user;
    next();
}

async function checkAuth(req,res,next) {
    const userId = req.cookies?.uid;
    console.log(userId);

    const user = await getUser(userId);
 
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}