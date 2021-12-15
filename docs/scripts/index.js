define(['axios'], function() {

    const axios = require("axios");
    let newSelect = JSON.parse(sessionStorage.getItem("select"));

    let token = "lPeWERzUHt1nR89lW4AbL6OMYNwk8fj7IBtywzVi";
    let category = newSelect[0];
    let difficulty = newSelect[1];
    let limit = newSelect[2];
    
    const URL = `https://quizapi.io/api/v1/questions?apiKey=${token}&category=${category}&difficulty=${difficulty}&limit=${limit}`;

    let questions = [];
    let answers = [];
    let correctAnswerData = [];
    let scoreKeeper = 0;

    let nextSet = [scoreKeeper, limit];

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

                if (res.length < limit) {
                    questions = [];
                    for (let i = 0; i < limit; i++) answers[i] = [];
                    getQuestions();

                } else {
                    questions[i] = res[i].question;
                    if (res[i].answers.answer_a != null) answers[i][0] = res[i].answers.answer_a;
                    if (res[i].answers.answer_b != null) answers[i][1] = res[i].answers.answer_b;
                    if (res[i].answers.answer_c != null) answers[i][2] = res[i].answers.answer_c;
                    if (res[i].answers.answer_d != null) answers[i][3] = res[i].answers.answer_d;
                    
                    let correctAnswers = res[i].correct_answers;

                    if (correctAnswers.answer_a_correct == "true") correctAnswerData[i] = "answer_a";
                    else if (correctAnswers.answer_b_correct == "true") correctAnswerData[i] = "answer_b";
                    else if (correctAnswers.answer_c_correct == "true") correctAnswerData[i] = "answer_c";
                    else if (correctAnswers.answer_d_correct == "true") correctAnswerData[i] = "answer_d";             
                }
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
                fourthAnswer.style.display = 'none';
                thirdAnswer.style.display = 'inline';
                thirdRadio.style.display = 'inline';
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
                thirdAnswer.style.display = 'none';
                fourthAnswer.style.display = 'none';
                question.innerHTML = questions[numAnswered];
                firstAnswer.innerHTML = answers[numAnswered][0];
                secondAnswer.innerHTML = answers[numAnswered][1];
                thirdAnswer.innerHTML = answers[numAnswered][2];
                numberOfQuestion.innerHTML = numAnswered + 1;
                numberLimit.innerHTML = limit;
            } else {
                thirdRadio.style.display = 'inline';
                fourthRadio.style.display = 'inline';
                thirdAnswer.style.display = 'inline';
                fourthAnswer.style.display = 'inline';
                question.innerHTML = questions[numAnswered];
                firstAnswer.innerHTML = answers[numAnswered][0];
                secondAnswer.innerHTML = answers[numAnswered][1];
                thirdAnswer.innerHTML = answers[numAnswered][2];
                fourthAnswer.innerHTML = answers[numAnswered][3];
                numberOfQuestion.innerHTML = numAnswered + 1;
                numberLimit.innerHTML = limit;
            }
            
        } else {
            sessionStorage.setItem("score", scoreKeeper);
            sessionStorage.setItem("limit", limit);
            window.location.href = "end.html"
        }
    }

    submitButton.addEventListener("click", () => {
        try {
            let radioChecked = document.querySelector('input[name="answer"]:checked').value;
            if (radioChecked == correctAnswerData[numAnswered]) scoreKeeper++;
            numAnswered++;
            document.querySelector('input[name="answer"]:checked').checked = false;
            loadQuiz();
        } catch {
            alert("Choose an answer!")
        }
        
    });

    if (sessionStorage.getItem('reloaded') ==='1') {
        window.location="index.html";
    }
    sessionStorage.setItem('reloaded', '1');
    
});

    

    






