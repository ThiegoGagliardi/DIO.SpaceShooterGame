const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensIMG = ['./assets/img/monster-1.png','./assets/img/monster-2.png','./assets/img/monster-3.png'];
const instructionText = document.querySelector('.game-instructions');
const startButton     = document.querySelector('.start-button');
let alienInterval;

function flyShip(event)
{
    if (event.key === 'ArrowUp'){

        event.preventDefault();
        moveUp();

    } else if (event.key === 'ArrowDown'){

        event.preventDefault();
        moveDown();

    } else if (event.key === " ") {

        event.preventDefault();
        fireLaser();
    }
}

function moveUp(){

    let shipTopPosition  = getComputedStyle(yourShip).getPropertyValue('top');
    let position         = parseInt(shipTopPosition);
  
    if (position <= 0) {
        return;

    } else {
        let position = parseInt(shipTopPosition);
        position -= 50;
        yourShip.style.top = `${position}px`; 
    }
}

function moveDown(){

    let shipTopPosition = getComputedStyle(yourShip).getPropertyValue('top');
    let position        = parseInt(shipTopPosition);
      
    if (position >= 500){
        return;

    } else{
        position += 50;
        yourShip.style.top = `${position}px`; 
    }  
  }

function fireLaser(){

    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
 }

 function createLaserElement(){ 

    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser  = document.createElement('img');

    newLaser.src = './assets/img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;

    return newLaser;    
 }

 function moveLaser(laser) {
    let laserInterval = setInterval(() => {

        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { 
           
            if (checkLaserCollision(laser, alien)) {
                
                alien.src = './assets/img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition >= 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

 function createAliens(){
     
     let newAlien = document.createElement('img');
     let AlienSprite = aliensIMG[Math.floor(Math.random() * aliensIMG.length)];

     newAlien.src = AlienSprite;
     newAlien.classList.add('alien');
     newAlien.classList.add('alien-transition');
     newAlien.style.left = '370px';
     newAlien.style.top  = `${Math.floor(Math.random() * 330) + 30}px`;

     playArea.appendChild(newAlien);
     
     moveAlien(newAlien); 
 }

 function moveAlien(alien){

     let moveAlienInterval = setInterval(() => {               
        
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));                     
           
        if (xPosition <= 50) {
               
            if (Array.from(alien.classList).includes('dead-alien')){
                    
                alien.remove();

            } else {
                  gameOver();
                }
        } else {
                   alien.style.left = `${xPosition -1}px`;
                }        
     },50);
 }

 function checkLaserCollision(laser, alien){

     let laserTop    = parseInt(laser.style.top);
     let laserLeft   = parseInt(laser.style.left);
     let laserBottom = laserTop - 20;

     let alienTop    = parseInt(alien.style.top);
     let alienLeft   = parseInt(alien.style.left);
     let alienBottom = alienTop - 30;

     if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {

        if (laserTop <= alienTop && laserTop >= alienBottom) {

            return true;
        } else {
           return false;
        }
    } else {
        return false;
    }
 }

 function playGame(){

     startButton.style.display = 'none';
     instructionText.style.display = 'none';
     window.addEventListener('keydown', flyShip);
     
     alienInterval = setInterval(() => {
        createAliens();
     },2000);
 } 

startButton.addEventListener('click',(event) =>{ playGame();});

function gameOver(){

    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);

    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());

    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());

    setTimeout(() => {

        alert('game over!');

        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionText.style.display = "block";
    });
}