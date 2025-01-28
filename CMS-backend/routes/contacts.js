const router = require("express").Router();

router.post('contacts', (req , res) => {
    const[name , address , email , phone] = req.body;
    try {
        
    } catch (error) {
        console.log(error)
    }
})