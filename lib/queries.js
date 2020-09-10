'use strict'

const store = require('../store/store-client')
const errorHandler = require('./errorHandler')

module.exports = {
  allCourses: async () => {
    let courses = [];
    try {
      courses = await store.listAll('courses')
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  course: async (root, { id }) => {
    let course;
    try {
      course = await store.findById('courses', id)
    } catch (error) {
      errorHandler(error)
    }
    return course
  },

  allPeople: async () => {
    let students = [];
    try {
      students = await store.listAll('students')
    } catch (error) {
      errorHandler(error)
    }
    return students
  },

  person: async (root, { id }) => {
    let student;
    try {
      student = await store.findById('students', id)
    } catch (error) {
      errorHandler(error)
    }
    return student
  },

  searchItems: async (root, { keyword }) => {
    let query = { $text: { $search: keyword } }
    let result = []
    
    try {
      let courses = await store.findByQuery('courses', query )
      let people = await store.findByQuery('students', query )

      result =  [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return result
  }
}