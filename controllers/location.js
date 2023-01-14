const location = require('../Models/locations');

exports.getAllLocations=(req,res)=>{
    location.find().then(data=>{
        const count = data.length;
        res.json({
            Message:'Location list fatched',
            count:count,
            locations:data
        })
    })
};

exports.getAllCityes=(req,res)=>{
    location.find().then(data=>{
        const count = data.length;
        const allCity = []
      data.map((item,index)=>{
          allCity.push(item.city);
      })
      const city = [...new Set(allCity)]
      res.json({
          message:"All city fatched",
          city : city
      })
        }).catch(err=>
            console.log(err))
    
}

