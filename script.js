cells = document.querySelectorAll(".cell");
playerInfo = document.querySelector("#playerTurn");
restartBtn = document.querySelector("#restart");
dragElements = document.querySelectorAll(".ele");
xElements = document.querySelectorAll(".x-ele");
oElements = document.querySelectorAll(".o-ele");
confetti = document.querySelector(".confetti");

console.log(confetti);
var selectedEle = null
var currentPlayer="X"
winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],  
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let board=["","","","","","","","",""]
let running=false
initializeGame()

let winner = new Audio("./audio/winner.m4a")
let draw = new Audio("./audio/draw.m4a")
let click = new Audio("./audio/click.m4a")

function initializeGame(){
    playerInfo.textContent=`${currentPlayer} 's turn`;

    restartBtn.addEventListener("click",restart)
    
    cells.forEach(cell => {
        cell.addEventListener("click",cellClicked)
    });

    dragElements.forEach((ele)=>{
        ele.addEventListener("dragstart",(e)=>{
            selectedEle = e.target;
        })

        ele.addEventListener("dragend",(e)=>{
        })

    })

    cells.forEach((cell)=>{
        cell.addEventListener("dragover",(e)=>{
            e.preventDefault()
        })
    })

    cells.forEach((cell)=>{
        cell.addEventListener("drop",(e)=>{
            e.target.textContent=selectedEle.textContent
            selectedEle.parentNode.removeChild(selectedEle)
            cellClicked(e.target)
        })
    })
    setDropable()

    running = true
}

function cellClicked(cell){
    let cellIndex = cell.getAttribute("cellIndex")

    if(board[cellIndex]!="" || !running){
        return
    }
    updateCell(this,cellIndex)
    checkWinner()
    
}
function updateCell(cell,index){
    board[index]=currentPlayer
    cell.textContent=currentPlayer
    
}

function checkWinner(){

    let gameOver=false

    for(let i=0;i<winningConditions.length;i++){
        condition = winningConditions[i];
        
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

       if(cellA==""||cellB[1]==""||cellC[2]==""){
        continue
       }
        if(cellA==cellB && cellB==cellC){
            gameOver=true
            break
        }
    }

    if(gameOver){
        playerInfo.textContent=`"${currentPlayer}" W O N`
        running=false
        confetti.classList.toggle("confetti-show")
        setTimeout(()=>confetti.classList.toggle("confetti-show"),2000)
        console.log(confetti);
        playAudio(winner)
    }else if(!board.includes("")){
        playerInfo.textContent=`D r a w`
        running=false
        playAudio(draw)

    }else{
        changePlayer()
        playAudio(click)
    }
}

function setDropable(){
    
    if(currentPlayer==="X"){
        oElements.forEach((ele)=>{
            ele.setAttribute('draggable', false)
        })

        xElements.forEach((ele)=>{
            ele.setAttribute('draggable', true)
        })
    }else{
        xElements.forEach((ele)=>{
            ele.setAttribute('draggable', false)
        })

        oElements.forEach((ele)=>{
            ele.setAttribute('draggable', true)
        })

    }

}

function changePlayer(){
    currentPlayer = (currentPlayer=="X")?"O":"X"
    playerInfo.textContent=`${currentPlayer}'s turn`;
    setDropable()
}

function restart(){
    location.reload()
    // currentPlayer="X"
    // playerInfo.textContent=`${currentPlayer}'s turn`
    // board=["","","","","","","","",""]
    // cells.forEach(cell => {
    //     cell.textContent=""
    // })

    // setDropable()

    // running = true
}

function playAudio(audio){
    audio.play()
}

