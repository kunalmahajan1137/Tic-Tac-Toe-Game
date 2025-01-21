let boxes = document.querySelectorAll('.box');
let reseBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turnO = true ;//player x , player o
let count = 0;

//winning patterns
const winPatterns = [
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerHTML = 'O';
            box.style.color = '#22181C';
            turnO = false;
        } else {
            box.innerHTML = 'X';
            box.style.color = '#FF1B1C';
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
        }
    );
});

const resetGame = () => {
    turnO = true;   
    enableBoxes();  
    msgContainer.classList.add('hide');
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
   for(let box of boxes){
       box.disabled = true;
   }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, ${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns){
        let firstVal = boxes[pattern[0]].innerHTML;
        let secondVal = boxes[pattern[1]].innerHTML;
        let thirdVal = boxes[pattern[2]].innerHTML;
        if(firstVal!="" && secondVal!="" && thirdVal!=""){
            if (firstVal === secondVal && secondVal === thirdVal) {
                showWinner(firstVal);
            }
        }
        if (count == 9){
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
            count = 0;
        }
    }
};

newGameBtn.addEventListener('click', resetGame);
reseBtn.addEventListener('click', resetGame);