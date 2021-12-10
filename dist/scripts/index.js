define(['axios', 'initial'], function() {

    const axios = require("axios");

    function init() {
        let token = "lPeWERzUHt1nR89lW4AbL6OMYNwk8fj7IBtywzVi";
        let category = selectCategory;
        let difficulty = selectDifficulty;
        let limit = selectLimit;
        
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
                    question.innerHTML = questions[numAnswered];
                    firstAnswer.innerHTML = answers[numAnswered][0];
                    secondAnswer.innerHTML = answers[numAnswered][1];
                    thirdAnswer.innerHTML = answers[numAnswered][2];
                    fourthAnswer.innerHTML = answers[numAnswered][3];
                    numberOfQuestion.innerHTML = numAnswered + 1;
                    numberLimit.innerHTML = limit;
                } else {alert(`You got ${scoreKeeper} out of ${limit}!`)}
            }
    
        submitButton.addEventListener("click", () => {
            let radioChecked = document.querySelector('input[name="answer"]:checked').value;
            if (radioChecked == correctAnswerData[numAnswered]) scoreKeeper++;
            numAnswered++;
            document.querySelector('input[name="answer"]:checked').checked = false;
            loadQuiz();
        });
    }

    init();
    
});

    

    






