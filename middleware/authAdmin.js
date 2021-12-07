const Users = require('../models/userModel');

const authAdmin = async (req, res, next) =>{
    try {
        // pobieranie użytkowników po id
        const user = await Users.findOne({
            _id: req.user.id
        });
        if(user.role === 0)
            return res.status(400).json({msg: "Wymagane bycie adminem"});

        next();
        
    } catch (err) {
        return res.status(500).json({msg: err.message});
    } 
};

module.exports = authAdmin;