document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#button')
  const timeLeft = document.querySelector('#time-left')
  const result = document.querySelector('#result')
  const squares = document.querySelectorAll('.grid div')
  let frogIndex = 76
  let width = 9
  let secondsRemaining = 20
  let timerId

  //draw the frog
  squares[frogIndex].classList.add('frog')

  //move the frog
  function moveFrog(e) {
    squares[frogIndex].classList.remove('frog')

    switch(e.keyCode) {
      case 37: //left arrow
        if(frogIndex % width !== 0) frogIndex -= 1
        break
      case 38: //up arrow
        if(frogIndex >= width) frogIndex -= width
        break
      case 39: //right arrow
        if(frogIndex % width !== (width-1)) frogIndex += 1
        break
      case 40: //down arrow
        if(frogIndex < (width*width - width)) frogIndex += width
        break
    }
    squares[frogIndex].classList.add('frog')
    win()
    loss()
  }

  //move the river and logs
  function moveRiver() {
    for (i = 18; i < 36; i++) {
      switch(true) {
        case squares[i].classList.contains('l1'):
          squares[i].classList.remove('l1')
          squares[i].classList.add('l2')
          break
        case squares[i].classList.contains('l2'):
          squares[i].classList.remove('l2')
          squares[i].classList.add('l3')
          break
        case squares[i].classList.contains('l3'):
          squares[i].classList.remove('l3')
          squares[i].classList.add('r1')
          break
        case squares[i].classList.contains('r1'):
          squares[i].classList.remove('r1')
          squares[i].classList.add('r2')
          break
        case squares[i].classList.contains('r2'):
          squares[i].classList.remove('r2')
          squares[i].classList.add('l1')
          break   
      }
    }
  }

  //move the cars along the road
  function moveCars() {
    for (i = 45; i < 63; i++) {
      switch(true) {
        case squares[i].classList.contains('car-left'):
          squares[i].classList.remove('car-left')
          squares[i].classList.add('road1')
          break
        case squares[i].classList.contains('road1'):
          squares[i].classList.remove('road1')
          squares[i].classList.add('road2')
          break
        case squares[i].classList.contains('road2'):
          squares[i].classList.remove('road2')
          squares[i].classList.add('car-left')
          break
        case squares[i].classList.contains('car-right'):
          squares[i].classList.remove('car-right')
          squares[i].classList.add('road4')
          break
        case squares[i].classList.contains('road3'):
          squares[i].classList.remove('road3')
          squares[i].classList.add('car-right')
          break
        case squares[i].classList.contains('road4'):
          squares[i].classList.remove('road4')
          squares[i].classList.add('road3')
          break  
      }
    }
  }
  //win detection
  function win() {
    if (squares[frogIndex].classList.contains('goal')) {
      clearInterval(timerId)
      document.removeEventListener('keyup', moveFrog);
      squares[frogIndex].classList.remove('frog')
      squares[frogIndex].classList.remove('goal')
      squares[frogIndex].classList.remove('grass')
      squares[frogIndex].classList.add('win')
      result.textContent = "YOU WIN!!"
    }
  }

  //collision detection
  function loss() {
    switch(true) {
      case squares[frogIndex].classList.contains('car-right') || squares[frogIndex].classList.contains('car-left'): 
        squares[frogIndex].classList.remove('car-right')
        squares[frogIndex].classList.remove('car-left')
        squares[frogIndex].classList.remove('frog')
        squares[frogIndex].classList.add('splat')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog);
        result.textContent = "SPLAT! YOU LOSE!"
        break
      case squares[frogIndex].classList.contains('r1') || squares[frogIndex].classList.contains('r2'):
        squares[frogIndex].classList.remove('r1')
        squares[frogIndex].classList.remove('r2') 
        squares[frogIndex].classList.remove('frog')
        squares[frogIndex].classList.add('death-bubbles')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog);
        result.textContent = "SWEPT AWAY IN THE CURRENT. YOU LOSE!"
        break
      case secondsRemaining === 0:
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog);
        result.textContent = "OUT OF TIME! YOU LOSE!"
        break
    }
  }

  //button functionality
  button.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      document.removeEventListener('keyup', moveFrog)
    } else {
      timerId = setInterval(runGame, 1000)
    }
  })

  //move with logs functionality
  function moveWithLogs() {
    if((squares[frogIndex].classList.contains('l1') || squares[frogIndex].classList.contains('l2') || squares[frogIndex].classList.contains('l3')) && frogIndex % width !==0) {
      squares[frogIndex].classList.remove('frog')
      frogIndex -= 1
      squares[frogIndex].classList.add('frog')
    }
  }

  function runGame() {
    moveWithLogs()
    moveRiver()
    moveCars()
    document.addEventListener('keyup', moveFrog)
    win()
    loss()
    secondsRemaining -= 1
    timeLeft.textContent = secondsRemaining


  }

  // timerId = setInterval(runGame, 1000)

})