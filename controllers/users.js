const user = require('../Models/users.js');
const bcrypt = require('bcrypt');
exports.logIn = (req, res) => {
    const bodyParser = req.body;

    const { email, password } = bodyParser;
    user.find({
        email: email
    }).then(data => {
        if (data.length > 0) {

            user.find({
                email: email
            }).then(data => {
                if (data.length > 0) {
                    const isMatch = bcrypt.compareSync(password, data[0].password)
                    if (isMatch) {
                        if (data[0].type === "client") {
                            res.json({
                                message: 'User logdin successfully',
                                user: data,
                                type: "client"
                            });
                        }else{
                            res.json({
                                message: 'User logdin successfully',
                                user: data,
                                type: "salon"
                            });
                        }
                    } else {
                        res.send("Password is wrong!");
                    }

                }
                else {
                    res.send("Password is wrong!");
                }

            }).catch(err => {
                res.json({ Error: err });
            })

        } else {
            res.json({ "data": "This email is not exist" })
        }
    }).catch((error) => {
        console.log(error)
    })

}
exports.signUp = (req, res) => {
    const reqBody = req.body;
    const { email, password, firstName, lastName,type,salonId } = reqBody;
    const userObj = new user(
        {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            type: type,
            salonId:salonId

        }
    );

    user.find({
        email: email
    }).then(data => {
        if (data.length > 0) {
            res.json({ "data": "Use another email" })

        } else {
            userObj.save().then(data => {
                res.json({
                    message: "user regesterd successfully",
                    user: data
                })
            }).catch(err => {
                res.json({ error: err });
            });
        }
    }).catch((error) => {
        console.log(error)
    })
}
