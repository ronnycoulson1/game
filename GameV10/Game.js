/*

const player = document.getElementById('player');
let position = 50; // Starting at 50% left
const speed = .1; // Change this to adjust speed

let moveLeftActive = false;
let moveRightActive = false;

function move() {
    if (moveLeftActive) 
    {
        player.style.transform = 'scaleX(1)';
        position -= speed;
        if (position < 4) {
            position = 4;
        }
    } 
    else if (moveRightActive) 
    {
        player.style.transform = 'scaleX(-1)';
        position += speed;
        if (position > 96) {
            position = 96;
        }
    }
    player.style.left = position + '%';
    requestAnimationFrame(move);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a' ) {
    moveLeftActive = true;

    //change player image source here...
    player.src = "Images/RefinedRun.gif";
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
    moveRightActive = true;
    player.src = "Images/RefinedRun.gif";
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a' ) {
    moveLeftActive = false;
    player.src = "Images/RefinedIdle.gif";
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
    moveRightActive = false;
    player.src = "Images/RefinedIdle.gif";
    }
});

move();

*/

const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');

    HeartimgArray = new Array(3);
    HeartimgArray[0] = new Image;
    HeartimgArray[0].src = document.getElementById('heart1');
    HeartimgArray[1] = new Image;
    HeartimgArray[1].src = document.getElementById('heart2');
    HeartimgArray[2] = new Image;
    HeartimgArray[2].src = document.getElementById('heart3');

    const TimerElement = document.getElementById('Timer');
    let position = 50; // Starting at 50% left
    const ObstacleSpeed = 1.0;
    const speed = 0.1; // Adjust the falling speed
    let lives = 3;
    let score = 0;
    let Timer = 20;

    let moveLeftActive = false;
    let moveRightActive = false;

     //jude audio
  function playMusic(theme) {
    let audio = new Audio(theme);
    audio.loop = true;
    audio.play();
  }
  playMusic("theme.mp3",true);

  function playEnd(end) {
    let audio = new Audio(end);
    audio.play();
  }

    function move() {
      if (moveLeftActive) {
        player.style.transform = 'scaleX(1)';
        position -= speed;
        if (position < 4) {
          position = 4;
        }
      } else if (moveRightActive) {
        player.style.transform = 'scaleX(-1)';
        position += speed;
        if (position > 96) {
          position = 96;
        }
      }
      player.style.left = position + '%';
      requestAnimationFrame(move);
    }

    function createFallingObject() {
        const fallingObject = document.createElement('img');
        //const fallingObject = document.createElement('div');  
        fallingObject.className = 'falling-object'; // Make sure this line is present
        fallingObject.src = './Images/fallingskull.png'

        fallingObject.style.left = Math.random() * 100 + '%';
        gameContainer.appendChild(fallingObject);
    
        animateFallingObject(fallingObject);
    }

    //Ronny
    /* make the objects fall*/
    function animateFallingObject(fallingObject) {
      const animate = () => {
          const top = fallingObject.offsetTop + ObstacleSpeed;
          fallingObject.style.top = top + 'px';
  
          // Check for collision with player
          if (
              top + fallingObject.clientHeight >= player.offsetTop &&
              top <= player.offsetTop + player.clientHeight &&
              fallingObject.offsetLeft + fallingObject.clientWidth >= player.offsetLeft &&
              fallingObject.offsetLeft <= player.offsetLeft + player.clientWidth
          ) {
              // Collision detected
  
              // Reduce lives
              if (lives <= 1) {
                  gameOver();
                  return;
              } else {
                playEnd("hit.wav", true)
                lives--;
                if (lives <= 2){
                  heart3.style.visibility = "hidden";
                }
                if (lives <= 1){
                  heart2.style.visibility = "hidden";
                }
                if (lives <= 0){
                  heart1.style.visibility = "hidden";
                }
                // Remove falling object on collision
                fallingObject.remove();

                // Re-create falling object
                setTimeout(() => {
                    createFallingObject();
                }, 500); // Adjust the delay before a new obstacle appears
              }
          } else if (top < gameContainer.clientHeight) {
              // Continue animation if the falling object is still within the container
              requestAnimationFrame(animate);
          } else {
              // Remove the falling object if it goes off the screen
              fallingObject.remove();
          }
      };
  
      animate(); // Function call
    }

    function decreaseTimer() { // decrease Timer 
      if(Timer <= 0){
        gameWin();
        Timer = 20;
      }
      else{
        Timer--; 
        TimerElement.innerText = Timer;
      }
      setTimeout("decreaseTimer()", 1000);
    }

    function gameOver() {
        playEnd("DeathSoundEffect.mp3",true);
        // Refresh the page after a delay of 3 seconds


        setTimeout(function(){
          window.location.href = 'GameOver.html'
      }, 1250);
     }

    //go to the next level if the player survives for the amount of time
    function gameWin() {
      window.location.href = 'Level2.html';
    }

    document.addEventListener('keydown', function(event) {  // move side to side 
      if (event.key === 'ArrowLeft' || event.key === 'a' ) { //key a
        moveLeftActive = true;
        player.src = "Images/RefinedRun.gif";
      } else if (event.key === 'ArrowRight' || event.key === 'd') { // key d
        moveRightActive = true;
        player.src = "Images/RefinedRun.gif"; 
      }
    });

    document.addEventListener('keyup', function(event) {
      if (event.key === 'ArrowLeft' || event.key === 'a' ) {
        moveLeftActive = false;
        player.src = "Images/RefinedIdle.gif";
      } else if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRightActive = false;
        player.src = "Images/RefinedIdle.gif";
      }
    });

    move();
    setInterval(createFallingObject, 1000); // Adjust the interval for creating falling objects

