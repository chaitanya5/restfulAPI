const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriberModel');

//Get All
router.get('/',(req,res)=>{
    Subscriber.find()
        .then(subscribers => res.json(subscribers))  
        .catch(error => res.status(500).json({message:error.message}));
    
})
// Get One
router.get('/:id',(req,res)=>{
    Subscriber.findById(req.params.id)
        .then(subscriber => res.json(subscriber))
        .catch(error => res.status(400).json({message:error.message}))   
})
// Create One
router.post('/add',(req,res)=>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })
    subscriber.save()
        .then(res.status(201).json(subscriber))
        .catch(error =>res.status(400).json({message:error.message}))
    
})
// Update One
router.patch('/update/:id',getSubscriberByID,async(req,res)=>{

    // Subscriber.findByIdAndUpdate(req.params.id)
    //     .then((subscriber)=> {
    //         // subscriber.name = req.body.name;
    //         // subscriber.subscribedToChannel = req.body.subscribedToChannel;
    //         // subscriber.save()
    //         // .then(res.json('Updated Succesfully'))
    //         // .catch(error => res.status(400).json('Error:-'+error))
    //         res.send(subscriber)
    //     })
    //     .catch(error => res.status(400).json('Error:-'+error));
    if(req.body.name != null)
        name = req.body.name;

    if(req.body.subscribedToChannel != null)
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    
    try{
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);

    }catch(error){
        res.status(500).json({message:error.message});
    }  
    
})
// Delete One
router.delete('/:id',(req,res)=>{
    Subscriber.findByIdAndDelete(req.params.id)
        .then(res.status(201).json({message:'Successfully Deleted'}))
        .catch(error =>res.status(500).json({message:error.message}))
})

// Instead of getting all subscribers by ID,lets write a single function
async function getSubscriberByID(req,res,next){
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null)
            return res.status(404).json({message:'No Subscriber with that ID found'});

    }catch(error){
        res.status(500).json({message:error.message});
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;