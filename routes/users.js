var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const userModal = require("../modals/userSchema")
//router.use(express.static(__dirname+'./public/'));


var Storage=multer.diskStorage({
  destination:"./public/images",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

/* For Single File Upload */
// var upload=multer({
//   storage:Storage
//   }).single('image');

/* For Multiple Input File Section Upload Or Multipe File With Single Input File */
var upload=multer({
storage:Storage
}).array('image');


/* Post User Details Submit. */
router.post('/blogs', upload,  async(request, response) => {

  /* For Multiple File Upload */
   let arr=[];
  for(let i=0;i<request.files.length;i++){
     arr[i]=request.files[i].filename;
  }

  let user = new userModal({
      name: request.body.name,
      company: request.body.company,
      designation: request.body.designation,
      phone_no: request.body.phone_no,
      email:request.body.email,
      address: request.body.address,
      year_of_establishment: request.body.year_of_establishment,
      description: request.body.description,
      product_name: request.body.product_name,
      product_desc: request.body.product_desc,
      avtar: arr, /* For Multiple File */
      //avtar: request.body.filename /* For Single File Upload */
  });

  try {
      blog = await user.save();
      //response.redirect('blogs/editAbout');
      //response.redirect(`blogs/${blog.slug}`);
  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
