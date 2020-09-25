var express = require('express');
var router = express.Router();
const messages=require('../errorMessage');

router.post('/', function(req, res, next) {

  let shows=req.body.payload;
  if (shows===undefined){
     res.status(400)
     return res.json(messages.payloadIsMissing);
  }
  

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

module.exports = router;
