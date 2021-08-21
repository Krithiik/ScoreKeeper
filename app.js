const player1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const player2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
const msgIncreaseScore = document.querySelector('#incr-win-score');
let winningScore = 3;
let isGameOver = false;
let initialNumOfOptions = winningScoreSelect.childElementCount;

function showMesssage() {
    msgIncreaseScore.classList.remove("is-hidden");
    setTimeout(() => msgIncreaseScore.classList.add("is-hidden"), 5000);
}

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        scoreDifference = player.score - opponent.score;
        if (player.score === winningScore && scoreDifference > 1) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
        if (player.score === winningScore && scoreDifference == 1) {
            winningScore += 2;
            player.display.textContent = player.score;
            showMesssage();
            if (winningScore > 11) {
                let newOption = document.createElement("option");
                newOption.innerText = `${winningScore}`;
                newOption.setAttribute('value', `${winningScore}`);
                newOption.setAttribute('class', 'newOption');
                winningScoreSelect.append(newOption);
            }
            winningScoreSelect.value = winningScore;
        }
    }
}


player1.button.addEventListener('click', function () {
    updateScores(player1, player2)
})
player2.button.addEventListener('click', function () {
    updateScores(player2, player1)
})


winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function removeNewOptions() {
    const newOptions = document.querySelectorAll(".newOption");
    [...newOptions].forEach((newOption) => {
        newOption.remove();
    })
}

function reset() {
    isGameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    if (winningScoreSelect.childElementCount > initialNumOfOptions) {
        removeNewOptions();
    }

}
