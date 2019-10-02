
const drawBlocks = require('./../draw/draw.blocks')
const currentUser = require('./../service/store')

const updateCounter = () => {
  drawBlocks.counter.innerHTML = 'Total number of notes - ' + currentUser.tasks.length
}

module.exports = {
  update: updateCounter
}