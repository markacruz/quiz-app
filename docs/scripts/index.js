define(['axios'], function() {

    const axios = require("axios");
    newSelect = JSON.parse(sessionStorage.getItem("select"));

    let token = "lPeWERzUHt1nR89lW4AbL6OMYNwk8fj7IBtywzVi";
    let category = newSelect[0];
    let difficulty = newSelect[1];
    let limit = newSelect[2];
    
    const URL = `https://quizapi.io/api/v1/questions?apiKey=${token}&category=${category}&difficulty=${difficulty}&limit=${limit}`;

    let questions = [];
    let answers = [];
    let correctAnswerData = [];
    let scoreKeeper = 0;

    for (let i = 0; i < limit; i++) answers[i] = [];

    async function getQuestions() {
        try {
            let res = await axios.get(URL);
            return res.data;

        } catch (err) { 
            console.log(err); 
        } 
    }

    getQuestions()
        .then((res) => {
            for (let i = 0; i < res.length; i++) {
                questions[i] = res[i].question;
                answers[i][0] = res[i].answers.answer_a;
                answers[i][1] = res[i].answers.answer_b;
                answers[i][2] = res[i].answers.answer_c;
                answers[i][3] = res[i].answers.answer_d;
                correctAnswerData[i] = res[i].correct_answer;
            }
            loadQuiz();
        });

    let numAnswered = 0;

    let question = document.getElementById("question");
    let firstAnswer = document.getElementById("firstAnswer");
    let secondAnswer = document.getElementById("secondAnswer");
    let thirdAnswer = document.getElementById("thirdAnswer");
    let fourthAnswer = document.getElementById("fourthAnswer");
    let submitButton = document.getElementById("submit");
    let numberOfQuestion = document.getElementById("numberAnswered");
    let numberLimit = document.getElementById("numberLimit");

    function loadQuiz() {
            if (numAnswered < limit) {
                if (answers[numAnswered].length == 3) {
                    let fourthRadio = document.querySelector('input[id="fourthRadio"]');
                    fourthRadio.style.display = 'none';
                    question.innerHTML = questions[numAnswered];
                    firstAnswer.innerHTML = answers[numAnswered][0];
                    secondAnswer.innerHTML = answers[numAnswered][1];
                    thirdAnswer.innerHTML = answers[numAnswered][2];
                    numberOfQuestion.innerHTML = numAnswered + 1;
                    numberLimit.innerHTML = limit;
                } else if (answers[numAnswered].length == 2) {
                    let thirdRadio = document.querySelector('input[id="thirdRadio"]');
                    let fourthRadio = document.querySelector('input[id="fourthRadio"]');
                    thirdRadio.style.display = 'none';
                    fourthRadio.style.display = 'none';
                    question.innerHTML = questions[numAnswered];
                    firstAnswer.innerHTML = answers[numAnswered][0];
                    secondAnswer.innerHTML = answers[numAnswered][1];
                    thirdAnswer.innerHTML = answers[numAnswered][2];
                    numberOfQuestion.innerHTML = numAnswered + 1;
                    numberLimit.innerHTML = limit;
                } else {
                    question.innerHTML = questions[numAnswered];
                    firstAnswer.innerHTML = answers[numAnswered][0];
                    secondAnswer.innerHTML = answers[numAnswered][1];
                    thirdAnswer.innerHTML = answers[numAnswered][2];
                    fourthAnswer.innerHTML = answers[numAnswered][3];
                    numberOfQuestion.innerHTML = numAnswered + 1;
                    numberLimit.innerHTML = limit;
                }
                
            } else {
                if (scoreKeeper < limit/2) {
                    alert(`You got ${scoreKeeper} out of ${limit}! Better luck next time.`);
                } else {
                    alert(`Congratulations! You got ${scoreKeeper} out of ${limit}!`);
                }
                window.location.href = "index.html"
            }
        }

    submitButton.addEventListener("click", () => {
        try {
            let radioChecked = document.querySelector('input[name="answer"]:checked').value;
            if (radioChecked == correctAnswerData[numAnswered]) scoreKeeper++;
            numAnswered++;
            document.querySelector('input[name="answer"]:checked').checked = false;
            loadQuiz();
        }
        catch {
            alert("Choose an answer!")
        }
    });

});

    

    






