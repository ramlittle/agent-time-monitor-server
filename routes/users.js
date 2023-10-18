const express = require('express');
const router = express.Router();


// Model
const User = require('../models/Users');


//return one user by ID
router.get('/:id', async (request, response)=>{
    try{
    const userId=request.params.id;
   const results = await User.findOne({_id:userId})
   .exec();
   response.send(results);
   }catch(error){
       response.status(500).send({status:'server error'})
   }
});

//return all users
router.get('/', async (request, response)=>{
    try{
   const results = await User.find({})
   .exec();
   response.send(results);
   }catch(error){
       response.status(500).send({status:'server error'})
   }
});

// Update a user
router.put('/:id', ( request, response ) => {
    try{
        const userId = request.params.id;
        User.updateOne(
            { _id: userId },
            { $set: { ...request.body } })
        .then( result => {
            if( result.modifiedCount === 1 ){
                response.send({ status: "User Information has been updated Successfully" });
            }
        });
    }catch(error){
        response.status(500).send({status:'server error'})
    }
});

// //Update a user password
// router.put('/password/:id', async (request, response) => {
//     try{
//         const hashedPassword = await bcrypt.hash( request.body.password, 10 );
//         const userId = request.params.id;
//         let result = await User.updateOne(
//             { _id: userId },
//             { $set: { ...request.body,
//                     password: hashedPassword
//             }}
//         );
//         if (result.modifiedCount === 1) {
//         response.status(200).send({ status: "Password Update is successful!" });
//         } 
//     }catch(error){
//         response.status(500).send({status:'server error'})
//     }
// });

router.put('/password/:id', async (request, response) => {
    try {
        // Check if the request body includes a valid password
        if (!request.body.password) {
            response.status(400).send({ status: 'Invalid password' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userId = request.params.id;

        // Update the user's password
        const result = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    ...request.body,
                    password: hashedPassword
                }
            }
        );

        if (result.modifiedCount === 1) {
            response.status(200).send({ status: 'Password update is successful!' });
        } else {
            response.status(404).send({ status: 'User not found or password not updated' });
        }
    } catch (error) {
        console.error(error,);
        response.status(500).send({ status: 'Server error' });
    }
});

// Delete a user
router.delete('/:id', ( request, response ) => {
    try{
        User.deleteOne({ _id: request.params.id })
        .then( result => {
            if( result.deletedCount === 1 ){
                response.send({
                    status: "User has been deleted"
                });
            }
        });
    }catch(error){
        response.status(500).send({status:'server error'})
    }
});




module.exports = router;


