const questions = [
    {
      question: "Which is the largest country in the world by population?",
      answers: [
        { text: "India", correct: true },
        { text: "USA", correct: false },
        { text: "China", correct: false },
        { text: "Russia", correct: false }
      ]
    },
    {
      question: "When did the second world war end?",
      answers: [
        { text: "1945", correct: true },
        { text: "1942", correct: false },
        { text: "1944", correct: false },
        { text: "1943", correct: false }
      ]
    },
    {
      question: "Which was the first country to use paper currency?",
      answers: [
        { text: "USA", correct: false },
        { text: "France", correct: false },
        { text: "Italy", correct: false },
        { text: "China", correct: true }
      ]
    },
    {
      question: "Which city hosted the first summer olympics?",
      answers: [
        { text: "Atlanta", correct: false },
        { text: "Sydney", correct: false },
        { text: "Athens", correct: true },
        { text: "Beijing", correct: false }
      ]
    },
    {
      question: "Who invented telephone?",
      answers: [
        { text: "Albert Einstein", correct: false },
        { text: "Alexander Graham Bell", correct: true },
        { text: "Thomas Edison", correct: false },
        { text: "Nikola Tesla", correct: false }
      ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Elephant", correct: false},
            { text: "Tiger", correct: true },
            { text: "Zebra", correct: false }
        ]
    },
    {
        question: "Who gave the theory of relativity?",
        answers: [
            { text: "Albert Einstein", correct: true },
            { text: "Isaac Newton", correct: false },
            { text: "Galileo", correct: false },
            { text: "Aristotle", correct: false }
        ]
    },
    {
        question: "Who was the first President of India?",
        answers: [
            { text: "Dr. Rajendra Prasad", correct: true },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Sardar Vallabhbhai Patel", correct: false },
            { text: "Dr. A.P.J. Abdul Kalam", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    }
        
];

  const questionElement = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const nextBtn = document.getElementById('next-btn');
  let currentQuestionIndex = 0;
  let score = 0;
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerText = 'Next';
    showQuestion();
  }
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = `Question ${questionNo}: ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      button.dataset.correct = answer.correct;
      answerButtons.appendChild(button);
      button.addEventListener('click', selectAnswer);
    });
  }
  function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
    });
    setStatusClass(selectedButton, correct);
    if (correct) {
      score++;
    } else {
        const correctButtons = Array.from(answerButtons.children).filter(button => button.dataset.correct === 'true');
        correctButtons.forEach(button => {
            setStatusClass(button, true);
        }); 
    }
    if (questions.length > currentQuestionIndex + 1) {
      nextBtn.style.display = 'block';
    } else {
      showScore();
      const correctButtons = Array.from(answerButtons.children).filter(button => button.dataset.correct === 'true');
      correctButtons.forEach(button => {
          setStatusClass(button, true);
       });
    }
}
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('incorrect');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `
      <h2>You scored ${score} out of ${questions.length}!</h2>
    `;
    nextBtn.innerText = 'Restart';
    nextBtn.style.display = 'block';
  }
  
  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();