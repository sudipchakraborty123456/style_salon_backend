const salon = require('../Models/salons');

//for image upload
const aws  = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    region:process.env.S3_BUCKET_REGION
})
exports.getAllSalon = (req, res) => {
    salon.find().then((data) => {
        const dataLength = data.length;
        res.json(
            {
                message: "Salon list fatched",
                count: dataLength,
                salons: data
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
exports.getAllSalonByGender = (req, res) => {
    const gender = req.params.gender;
    salon.find({ gender: gender }).then((data) => {
        const dataLength = data.length;
        res.json(
            {
                message: "Salon list fatched",
                count: dataLength,
                salons: data
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



exports.getAllSalonByCity = (req, res) => {
    const city = req.params.cityId;
    salon.find({ cityId: city }).then(data => {
        const count = data.length;
        res.json({
            message: "Salon list fatched",
            count: count,
            city: data
        });
    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
}


exports.getAllSalonById = (req, res) => {
    const id = req.params.id;
    salon.find({ _id: id }).then(data => {
        res.json({
            Message: 'Salon list fatched',
            count: data.length,
            salon: data
        })
    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
}

exports.getSalonByLocationId = (req, res) => {
    const locationId = req.params.locationId;
    salon.find({ locationId: locationId }).then(data => {
        const count = data.length;
        res.json({
            Message: 'Salon list fatched',
            count: count,
            Salons: data
        })
    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
}
exports.getAllSalonByMainService = (req, res) => {
    const mainService = req.params.mainService;
    salon.find({ mainServices: mainService }).then(data => {
        const count = data.length;
        res.json({
            message: 'Salon list fatched',
            count: count,
            salons: data
        })
    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })

}



exports.filterSalons = (req, res) => {
    const {
        city,
        hcost,
        lcost,
        sort,
        page = 1,
        locality,
        service,
        subServices,
        getAllSalon,
        gender } = req.body;
    let filters = {};

    if (getAllSalon) {
        filters = null;
    }
    if (gender) {
        filters.gender = gender
    }
    if (city) {
        filters.cityId = city;
    }
    if (service && service.length > 0) {
        filters["services.id"] = {
            $in: service
        }
    }
    if (hcost != undefined && lcost != undefined) {
        if (lcost == 0) {
            filters.min_price = {
                $lt: hcost
            };
        } else {
            filters.min_price = {
                $lte: hcost,
                $gte: lcost
            }
        }
    }
    if (subServices && subServices.length > 0) {
        filters["services.service.id"] = {
            $in: subServices
        }
    }
    if (locality) {
        filters.locationId = locality;
    }
    const filtersJson = JSON.stringify(filters);
    if (page) {
        var pageNo = 1;
        pageNo = page;
    }
    salon.find(filters).sort({ min_price: sort }).then(data => {
        const pageSize = 2;
        let temp;
        function pagein(array, pageSize, pageNo) {
            return array.slice((page - 1) * pageSize, page * pageSize);
        }
        temp = pagein(data, pageSize, page);
        res.json({
            message: "Filter succesfull",
            "Number of Salons found ": temp.length,
            salons: temp,
            totalResults: data.length,
            pageNo: pageNo,
            pageSize: pageSize
        })
    }).catch(err => {
        res.status(400).json({ message: "Error " + err });
    })
};


exports.serviseFilter = (req, res) => {
    const { service } = req.params
    console.log(service)
    salon.find({ "services.service.name": service }).then((data) => {
        res.json({
            data: data
        })
    }).catch((err) => {
        res.json({
            err: err
        })
    })

}

exports.serviceListFatch = (req, res) => {
    const { id } = req.params;
    salon.find({ _id: id }).then(data => {
        data[0].services.map((item, index) => {
            if (item.name === service) {
                res.json({
                    serviceList: item.service
                })
            } else {
                return (null)
            }
        })

    }).catch((err) => {
        res.json(
            {
                message: "Salon list not fatched",
                Error: err
            }
        )
    })
}

//{services.service: {$elemMatch: {name :'Cut and Hair Care'}}}
//{services : {service : { $elementMatch : { name : service}} }}



exports.filterSalonsByGender = (req, res) => {
    const {
        city,
        locality,
        gender } = req.body;
    let filters = {};


    if (gender) {
        filters.gender = gender
    }
    if (city) {
        filters.cityId = city;
    }
    if (locality) {
        filters.locationId = locality;
    }
    salon.find(filters).then(data => {
        res.json({
            message: "Filter succesfull",
            "Number of Salons found ": data.length,
            salons: data
        })
    }).catch(err => {
        res.status(400).json({ message: "Error " + err });
    })
};


// exports.uploadImage = (req, res) => {
//   console.log(req.files);

//   const upload = multer({
//       storage:multers3({
//           s3:s3,
//           bucket:"style-salon-image-storage",
//           metadata: function(req, file, cb){
//             cb(null,{fieldName: file.fieldname});
//           },
//           key: function(req, file,cb){
//               cb(null, "image.jpeg");
//           },
//       }),
//   });
// }
