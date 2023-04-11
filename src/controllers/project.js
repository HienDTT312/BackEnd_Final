const logger = require('../services/loggerService');
var geoip = require('geoip-lite');
const generateBcrypt = require('../services/generateBcrypt');
const { User } = require('../models');
const loggerInstance = require('../services/loggerService');
const sequelize = require('sequelize')


exports.projectTest = async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(url);
  console.log(req.body.name);
  // const user = new User({
  //     _id: new mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     profileImg: url + '/public/' + req.file.filename
  // });
  // user.save().then(result => {
  //     res.status(201).json({
  //         message: "User registered successfully!",
  //         userCreated: {
  //             _id: result._id,
  //             profileImg: result.profileImg
  //         }
  //     })
  // }).catch(err => {
  //     console.log(err),
  //         res.status(500).json({
  //             error: err
  //         });
  // })
  try {
    const test = await User.findAll({
        attributes: ["profile_status", [sequelize.fn("COUNT", "1"), "CountedValue"]],
        group: ['profile_status'],
        order: [[sequelize.col("CountedValue"), "ASC"]],
      })

    res.send(test);
  } catch (err) {
    loggerInstance.error('Error', err)
    res.send(err)
  }

}

exports.service2Test = (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
      reqFiles.push({ document: req.files[i].filename, product_id: 1})
  }

  console.log(reqFiles);
}
