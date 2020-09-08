'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, {input}) => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    let db;
    let course;

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  
  editCourse: async (root, {_id, input}) => {
    let db;
    let course;

    try {
      db = await connectDB()
      course = await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      input._id = course.insertedId
      course = await db.collection('courses').findOne(
        { _id: ObjectID(_id) }
      )
      return course
    } catch (error) {
      errorHandler(error)
    }
  },

  createPerson: async (root, {input}) => {
    let db;
    let student;

    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },

  editPerson: async (root, { _id, input }) => {
    let db;
    let student;

    try {
      db = await connectDB()
      student = await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input }
      )
      input._id = student.insertedId
      student = await db.collection('students').findOne(
        { _id: ObjectID(_id) }
      )
      return student
    } catch (error) {
      errorHandler(error)
    }
  },

  addPerson: async (root, { courseID, studentID }) => {
    let db;
    let student;
    let course;

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne(
        { _id: ObjectID(courseID) }
      )
      student = await db.collection('students').findOne(
        { _id: ObjectID(studentID) }
      )

      if (!course || !student) throw new Error('The course or the student does not exist')

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { students: ObjectID(studentID)} }
      )

    } catch (error) {
      errorHandler(error)
    }

    return course
  }
}