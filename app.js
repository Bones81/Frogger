document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#button')
  const timeLeft = document.querySelector('#time-left')
  const squares = document.querySelectorAll('.grid div')
  let frogIndex = 76
  let width = 9
  let timerId

  //draw the frog
  squares[frogIndex].classList.add('frog')

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




  function runGame() {
    moveRiver()
    moveCars()
    moveFrog()
    win()
    loss()
  }

  timerId = setInterval(runGame, 1000)

})