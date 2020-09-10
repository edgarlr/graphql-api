'use strict'

function errorHandler(error) {
  console.error('[ERROR]:', error);
  throw new Error('There was a problem on the server. Please try again in a moment.')
}

module.exports = errorHandler;