import { ObjectId } from 'mongodb';
import {client} from '../index.js';
import express from 'express';

const router = express.Router();

router.get('/',async (req,res)=>{
    const users = await client.db('ajackus-task').collection('users').find().toArray();
  res.json(users);
})

router.post('/',async (req,res)=>{
    const user= req.body;
    const db = client.db('ajackus-task');
    const usersCollection = db.collection('users');
    await usersCollection.insertOne(user);
    const users = await usersCollection.find().toArray();
    res.status(201).send({ message: 'User added successfully', users});
})

router.put('/:id',async (req,res)=>{
const id = req.params;
const usertoUpdate = req.body;
const userCopy = { ...usertoUpdate };
delete userCopy._id;
const db = client.db('ajackus-task');
const usersCollection = db.collection('users');
await usersCollection.updateOne({_id:new ObjectId(id)},{$set:userCopy});
const users = await usersCollection.find().toArray();
res.json(users);
})

router.delete('/:id',async (req,res)=>{
    const id = req.params;
    const db = client.db('ajackus-task');
    const usersCollection = db.collection('users');
    await usersCollection.deleteOne({_id:new ObjectId(id)});
    const users = await usersCollection.find().toArray();
    res.json(users);
})
export const userRouter = router;