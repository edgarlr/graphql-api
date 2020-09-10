'use strict'

const store = require('../store/store-client')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, {input}) => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    try {
      let course = await store.createOne('courses', newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  
  editCourse: async (root, {_id, input}) => {
    let courseUpdated;

    try {
      let course = await store.updateOne('courses', _id, input)
      input._id = course.insertedId

      courseUpdated = await store.findById('courses', _id)
      return courseUpdated

    } catch (error) {
      errorHandler(error)
    }
  },

  deleteCourse: async (root, {_id}) => {
    try {
      await store.deleteOne('courses', _id)
      return true
    } catch (error) {
      errorHandler(error)
    }
  },

  createPerson: async (root, {input}) => {
    try {
      let student = await store.createOne('students', input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },

  editPerson: async (root, { _id, input }) => {
    let updatedStudent;

    try {
      let student = await store.updateOne('students', _id, input)
      input._id = student.insertedId

      updatedStudent = await store.findById('students', _id)
    } catch (error) {
      errorHandler(error)
    }
    return updatedStudent
  },

  deletePerson: async (root, {_id}) => {
    try {
      await store.deleteOne('students', _id)
      return true
    } catch (error) {
      errorHandler(error)
    }
  },

  addPerson: async (root, { courseID, studentID }) => {
    let course;
    try {
      course = await store.findById('courses', courseID)
      let student = await store.findById('students', studentID)

      if (!course || !student) throw new Error('The course or the student does not exists')

      await store.addToItem('courses', courseID, studentID)

    } catch (error) {
      errorHandler(error)
    }

    return course
  }
}