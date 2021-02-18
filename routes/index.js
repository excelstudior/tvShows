var express = require('express');
var router = express.Router();
const messages=require('../errorMessage');

const refreshTokenHell = () => {
  return new Promise((resolve, reject) => {
    resolve("newTokenValu")
  })
}
const getAuthObject = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "newTokenValue") {
      resolve({ auth_code: "abc", device_code: "xxxyyyzzz" })
    } else {
      resolve("error")
    }
  })
}

const hell = async () =>{
  try {
        console.log("hell")
        const token = await refreshTokenHell();
        const auth = await getAuthObject( token );
        console.log(auth)
      } catch (error) {
        error.message
      }
}

router.post('/', function(req, res, next) {

  // Check if payload node exists
  let shows=req.body.payload;
  if (shows===undefined){
     res.status(400)
     return res.json(messages.payloadIsMissing);
  }
  
  // Check if payload is array or not, if it is an array, check if the array is empty or not
  if (shows.length ===undefined || shows.length<1){
    res.status(400)
    return res.json(messages.payloadIsNull)
  }

  let filteredShows=[];
  shows.forEach((show,index)=>{
      if ( show.drm ){
        if ( show.episodeCount > 0){
            let filteredShow= {
              image:show.image.showImage,
              slug:show.slug,
              title:show.title
            };
            filteredShows=[...filteredShows,filteredShow];
        }
      }
  })
  let resp={};
  resp.response=filteredShows
  res.json(resp)
});

router.get('/promisehell',function(req, res, next){
  hell();
  res.json({message:"hell"})
})

module.exports = router;
