'use strict'

const connectDB = require('./mongo')
const { ObjectID } = require('mongodb')

async function listAll(collection) {
  const connection = await connectDB()
  return await connection.collection(collection).find({}).toArray()
}

async function findById(collection, id) {
  const connection = await connectDB()
  return await connection.collection(collection).findOne({_id: ObjectID(id)})
}

async function findByQuery(collection, query) {
  const connection = await connectDB()
  return await connection.collection(collection).find(query).toArray()
}

async function createOne(collection, data) {
  const connection = await connectDB()
  return await connection.collection(collection).insertOne(data)
}

async function updateOne(collection, id, data) {
  const connection = await connectDB()
  return await connection.collection(collection).updateOne(
    { _id: ObjectID(id) },
    { $set: data }
  )
}

async function deleteOne(collection, id) {
  const connection = await connectDB()
  return await connection.collection(collection).deleteOne({
    _id: ObjectID(id)
  })
}

async function addToItem(collection, parentItemId, itemToAddId) {
  const connection = await connectDB()
  return await connection.collection(collection).updateOne(
    { _id: ObjectID(parentItemId) },
    { $addToSet: { students: ObjectID(itemToAddId)} }
  )
}

module.exports = {
  listAll,
  findById,
  findByQuery,
  createOne,
  updateOne,
  deleteOne,
  addToItem
}