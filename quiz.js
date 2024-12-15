const questions = [
    { answer: "閤子", translation: "小屋", options: ["大門", "閣樓", "庭院"] },
    { answer: "方丈", translation: "指長寬各一丈的面積", options: ["和尚的稱號", "寺廟大殿", "佛堂"] },
    { answer: "滲漉", translation: "由孔隙滲漏下來", options: ["流水聲", "下雨", "濕潤"] },
    { answer: "雨澤下注", translation: "雨水向下流瀉", options: ["雨水充沛", "下大雨", "雨水灌溉"] },
    { answer: "顧視無可置者", translation: "環顧四周，找不到可以放置桌子的地方", options: ["四處張望", "無處可去", "放眼望去"] },
    { answer: "修葺", translation: "整修", options: ["建造", "裝飾", "拆除"] },
    { answer: "使不上漏", translation: "使屋頂不再滲漏", options: ["防止進水", "修補破洞", "加蓋屋頂"] },
    { answer: "垣牆周庭", translation: "指在庭院四周築起圍牆", options: ["庭院深深", "圍牆倒塌", "花園圍籬"] },
    { answer: "以當南日", translation: "用來迎受南面射來的日光", options: ["朝南而居", "避免日曬", "向陽而生"] },
    { answer: "日影", translation: "日光", options: ["影子", "陰影", "月光"] },
    // ... 可以繼續添加更多題目
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeQuiz() {
    // 隨機選擇10題
    currentQuestions = shuffleArray([...questions]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
}

function showQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // 顯示題目
    questionEl.innerHTML = `<h2>請選出「${currentQuestion.translation}」的正確答案：<br><small style="color: #666;">(以原文回答)</small></h2>`;
    
    // 準備選項
    const allOptions = shuffleArray([currentQuestion.answer, ...currentQuestion.options]);
    optionsEl.innerHTML = '';
    
    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsEl.appendChild(button);
    });
    
    // 清除之前的回饋
    document.getElementById('feedback').innerHTML = '';
}

function selectAnswer(selectedAnswer) {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    const options = document.getElementsByClassName('option');
    
    // 禁用所有選項
    Array.from(options).forEach(option => {
        option.disabled = true;
        if (option.textContent === currentQuestion.answer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // 顯示回饋
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = isCorrect ? 
        '<div style="color: green">答對了！✓</div>' : 
        `<div style="color: red">答錯了！✗<br>正確答案是：${currentQuestion.answer}</div>`;
    
    // 記錄答案
    userAnswers.push({
        question: currentQuestion.translation,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        score += 10;
    }
    
    // 2秒後進入下一題
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    const resultList = document.getElementById('result-list');
    document.getElementById('total-score').textContent = score;
    
    resultContainer.style.display = 'block';
    resultList.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${answer.isCorrect ? 'result-correct' : 'result-incorrect'}`;
        resultItem.innerHTML = `
            <strong>題目 ${index + 1}:</strong> ${answer.question}<br>
            您的答案: ${answer.userAnswer}<br>
            ${answer.isCorrect ? '✓ 正確' : `✗ 錯誤 (正確答案: ${answer.correctAnswer})`}
        `;
        resultList.appendChild(resultItem);
    });
}

// 初始化測驗
window.onload = initializeQuiz;
