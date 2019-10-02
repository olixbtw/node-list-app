
const drawBlocks = require('./../draw.blocks')
const currentUser = require('./../store')

const updateCounter = () => {
  drawBlocks.counter.innerHTML = 'Total number of notes - ' + currentUser.tasks.length
}

module.exports = {
  update: updateCounter
}