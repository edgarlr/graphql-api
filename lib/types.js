'use strict'

const store = require('../store/store-client')
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  Course: {
    students: async ({ students }) => {
      let studentsData;
      let ids

      try {
        ids = students ? students.map(id => ObjectID(id)) : []

        studentsData = ids.length > 0 
          ? await store.findByQuery('students', { _id: { $in: ids } })
          : []

      } catch (error) {
        errorHandler(error)
      }
      return studentsData
    }
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return 'Monitor'
      } else {
        return 'Student'
      }
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return 'Course'
      }
      
      if (item.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  }
}