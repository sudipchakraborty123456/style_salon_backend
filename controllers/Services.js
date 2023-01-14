const services = require('../Models/services');
exports.getAllServicesByMainServiceId = (req, res) => {
    const mainServiceId = req.params.mainServiceId
    services.find({mainServiceId : mainServiceId}).then((data) => {
        res.json(
            {
                message: "Services list fatched",
                services: data
            }

        )

    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
};

exports.getAllServicesByGender=(req,res)=>{
    const gender = req.params.gender
    services.find({gender : gender}).then((data) => {
        res.json(
            {
                message: "Services list fatched",
                services: data
            }

        )

    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
}