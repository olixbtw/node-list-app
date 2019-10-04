
const drawBlocks = require('./../draw/draw.blocks')
const currentUser = require('./../service/store')

const updateCounter = () => {
  drawBlocks.counter.innerHTML = 'Total number of notes - ' + currentUser.tasks.length
  drawBlocks.allUsers.parentElement.classList.add('hidden')
}

module.exports = {
  update: updateCounter
}