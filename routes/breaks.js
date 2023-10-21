const express=require('express');
const router=express.Router();
const Break=require('../models/Breaks')


//add a break
router.post('/addBreak',async(request,response)=>{
    try{
        const newBreak=new Break({...request.body})
        newBreak.save().then( result => {
            response.send({ status: "Break Added" });
        });
    }catch(error){
        response.status(500).send({status:"unable to add data"})
    }
})

//return all breaks
router.get('/',async (request,response)=>{
    try{
        const results = await Break.find({}).exec();
        response.send(results);
    }catch(error){
        response.status(500).send({status:"server error, unable to obtain data"})
    }
})

module.exports = router;