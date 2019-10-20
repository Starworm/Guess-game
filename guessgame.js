// List of words
let listOfWords = ["abracadabra","car","road","computer", "resident"];


// random word and attempts
let word = ChooseWord(listOfWords);
let attempts = word.length * 2;

// main info field
let infofield = document.createElement("div");
infofield.className = "topLabel";
infofield.innerHTML = "Guess the word!";
document.body.appendChild(infofield);

// win and lose screens
let win = document.createElement("div");
let lose = document.createElement("div");
win.classList.add("winscreen");
lose.classList.add("losescreen");

// field for attempts showing
let label = document.createElement("label");
let att = document.createElement("label");
att.className = "count";
label.className = "info";
label.innerHTML = "Attempts remains: ";
label.appendChild(att);


// container for words
let cont = document.createElement("div");
cont.style.width = word.length * 5 + "vw";
cont.style.height = 25 + "vw";
cont.classList.add("centered", "container", "paper");
// cont.appendChild(att);
cont.appendChild(label);

// field for letters
let form = document.createElement("div");
let field = document.createElement("input");
let but = document.createElement("button");
form.className = "form";
field.type = "text";
field.className = "field";
field.id = "letter";
but.innerHTML = "OK";
but.setAttribute("onclick", "check()");
form.appendChild(field);
form.appendChild(but);

// answer array
let answerArray = [];
let square = [];

for (let i = 0; i < word.length; i++) {
    let sq = document.createElement("div");
    sq.classList.add("sq");
    sq.innerHTML = "-";
    square.push(sq);

    answerArray.push("_");
}

square.forEach((e, index) => {
    e.i = index;
    e.style.left = e.i * 5 + "vw";
    cont.appendChild(e);
});
cont.appendChild(form);

// remaining letters
let remainingLetters = word.length;
att.innerHTML = attempts;

function check() {
    let guess = document.getElementById('letter').value;
    for (let i = 0; i < word.length; i++) {
        if (guess.length !== 1) {
            infofield.innerHTML = "Type a one letter";
        } else if (guess.toLowerCase() === word[i] && answerArray[i] === guess.toLowerCase()) {
            infofield.innerHTML = "This letter is already opened";
        } else if (guess.toLowerCase() === word[i] && answerArray[i] !== guess.toLowerCase()) {
            answerArray[i] = guess.toLowerCase();
            square[i].innerHTML = guess.toLowerCase();
            remainingLetters--;
            infofield.innerHTML = "Guess the word!";
            if(CheckWin()) {
                win.textContent = "You won!";
                document.body.append(win);
            }
        }
    }
    attempts--;
    if (CheckLose()) {
        lose.textContent = "You lose!";
        document.body.append(lose);
    }
    att.innerHTML = attempts;
    console.log(guess);
}

function CheckLose() {
    return attempts === 0;
}

function CheckWin() {
    return remainingLetters === 0;
}

function ChooseWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

document.body.append(cont);