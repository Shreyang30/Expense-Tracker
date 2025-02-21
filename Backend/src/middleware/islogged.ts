import express from"express";

function ensureAuthenticated(req:express.Request, res:express.Response, cb:express.NextFunction) {
    if (req.isAuthenticated()) {
        console.log("logged");
      return cb(); 
    }
    res.redirect("/login"); 
  }

  export default ensureAuthenticated;