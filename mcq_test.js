let questions = [];
let userAnswers = [];
let current = 0;
let score = 0;
let mode = "";
let startTime;
let timerInterval;

const qs = id => document.getElementById(id);

const classSelect = qs("classSelect");
const subjectSelect = qs("subjectSelect");
const chapterSelect = qs("chapterSelect");
const questionCount = qs("questionCount");
const modeSelect = qs("modeSelect");
const startBtn = qs("startBtn");

/* ---------- DROPDOWN FLOW ---------- */

classSelect.onchange = () => {
  subjectSelect.innerHTML = "<option value=''>Select Subject</option>";
  chapterSelect.innerHTML = "<option value=''>Select Chapter</option>";

  subjectSelect.disabled = false;
  chapterSelect.disabled = true;
  questionCount.disabled = true;
  modeSelect.disabled = true;
  startBtn.disabled = true;

  Object.keys(questionBank[classSelect.value]).forEach(sub => {
    subjectSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
  });
};

subjectSelect.onchange = () => {
  chapterSelect.innerHTML = "<option value=''>Select Chapter</option>";
  chapterSelect.disabled = false;
  questionCount.disabled = true;
  modeSelect.disabled = true;
  startBtn.disabled = true;

  Object.keys(
    questionBank[classSelect.value][subjectSelect.value]
  ).forEach(ch => {
    chapterSelect.innerHTML += `<option value="${ch}">${ch}</option>`;
  });
};

chapterSelect.onchange = () => {
  questionCount.disabled = false;
};

questionCount.onchange = () => {
  modeSelect.disabled = false;
};

modeSelect.onchange = () => {
  startBtn.disabled = false;
};

/* ---------- TEST START ---------- */

startBtn.onclick = () => {
  qs("setup").classList.add("hidden");
  qs("test").classList.remove("hidden");

  mode = modeSelect.value;

  const allQ =
    questionBank[classSelect.value]
               [subjectSelect.value]
               [chapterSelect.value];

  const count =
    questionCount.value === "all"
      ? allQ.length
      : Math.min(parseInt(questionCount.value), allQ.length);

  questions = allQ.sort(() => 0.5 - Math.random()).slice(0, count);
  userAnswers = new Array(questions.length).fill(null);
  score = 0;
  current = 0;

  startTime = Date.now();
  startTimer(count * 30);
  showQuestion();
};

function startTimer(seconds) {
  timerInterval = setInterval(() => {
    qs("timer").textContent = `Time Left: ${seconds}s`;
    seconds--;
    if (seconds < 0) finishTest();
  }, 1000);
}

function showQuestion() {
  const q = questions[current];
  qs("questionBox").textContent = `Q${current + 1}. ${q.q}`;
  qs("optionsBox").innerHTML = "";
  qs("nextBtn").style.display = "none";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => handleAnswer(i);
    qs("optionsBox").appendChild(div);
  });
}

function handleAnswer(index) {
  if (userAnswers[current] !== null) return;

  userAnswers[current] = index;
  const correct = questions[current].answer;
  if (index === correct) score++;

  if (mode === "instant") {
    const options = document.querySelectorAll(".option");
    options[correct].style.background = "#c8e6c9";
    if (index !== correct)
      options[index].style.background = "#ffcdd2";

    qs("nextBtn").style.display = "block";
  } else {
    nextQuestion();
  }
}

qs("nextBtn").onclick = nextQuestion;

function nextQuestion() {
  current++;
  current < questions.length ? showQuestion() : finishTest();
}

function finishTest() {
  clearInterval(timerInterval);
  qs("test").classList.add("hidden");

  const timeTaken = Math.floor((Date.now() - startTime) / 1000);
  const result = qs("result");
  result.classList.remove("hidden");

  let html = `<h2>Score: ${score}/${questions.length}</h2>
              <p>Time Taken: ${timeTaken}s</p><hr>`;

  questions.forEach((q, i) => {
    const user = userAnswers[i];
    const correct = q.answer;

    html += `
      <div style="margin-bottom:12px;">
        <b>Q${i + 1}. ${q.q}</b><br>
        Your Answer:
        <span style="color:${user === correct ? 'green' : 'red'}">
          ${user !== null ? q.options[user] : "Not Answered"}
        </span><br>
        Correct Answer:
        <span style="color:green">${q.options[correct]}</span>
      </div>
    `;
  });

  result.innerHTML = html;
}
