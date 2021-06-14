const router = require('express').Router();
const verify = require("./tokenVerification")
router.get('/', verify, (req,res)=>{
    res.json({
        posts:{
            title: "all posts",
            description: "post description here"
        }
    });
});

module.exports = router