const qs = id => document.getElementById(id);

let questions = [];
let userAnswers = [];
let current = 0;
let score = 0;
let mode = "";
let startTime;
let timerInterval;

const feedbackIcon = qs("feedbackIcon");

/* ---------- DROPDOWNS ---------- */

qs("classSelect").onchange = e => {
  const cls = e.target.value;
  qs("subjectSelect").innerHTML = "<option>Select Subject</option>";
  qs("subjectSelect").disabled = false;

  const data = cls === "6" ? class6Data : class9Data;
  Object.keys(data).forEach(s =>
    qs("subjectSelect").innerHTML += `<option>${s}</option>`
  );
};

qs("subjectSelect").onchange = e => {
  qs("chapterSelect").innerHTML = "<option>Select Chapter</option>";
  qs("chapterSelect").disabled = false;

  const data = qs("classSelect").value === "6" ? class6Data : class9Data;
  Object.keys(data[e.target.value]).forEach(c =>
    qs("chapterSelect").innerHTML += `<option>${c}</option>`
  );
};

qs("chapterSelect").onchange = () => qs("questionCount").disabled = false;
qs("questionCount").onchange = () => qs("modeSelect").disabled = false;
qs("modeSelect").onchange = () => qs("startBtn").disabled = false;

/* ---------- START TEST ---------- */

qs("startBtn").onclick = () => {
  qs("setup").classList.add("hidden");
  qs("test").classList.remove("hidden");

  mode = qs("modeSelect").value;
  const data = qs("classSelect").value === "6" ? class6Data : class9Data;

  questions = data
    [qs("subjectSelect").value]
    [qs("chapterSelect").value];

  userAnswers = new Array(questions.length).fill(null);
  current = 0;
  score = 0;

  startTime = Date.now();
  startTimer();
  showQuestion();
};

/* ---------- TIMER (COUNT UP) ---------- */

function startTimer() {
  timerInterval = setInterval(() => {
    const t = Math.floor((Date.now() - startTime) / 1000);
    qs("timer").textContent = `Time: ${t}s`;
  }, 1000);
}

/* ---------- QUESTION ---------- */

function showQuestion() {
  const q = questions[current];
  qs("questionBox").innerHTML = q.q;

  MathJax.typesetPromise();

  if (q.image) {
    qs("questionImage").src = q.image;
    qs("questionImage").style.display = "block";
  } else {
    qs("questionImage").style.display = "none";
  }

  qs("optionsBox").innerHTML = "";
  qs("nextBtn").style.display = "none";

  q.options.forEach((opt, i) => {
    const d = document.createElement("div");
    d.className = "option";
    d.innerHTML = opt;
    d.onclick = () => answer(i);
    qs("optionsBox").appendChild(d);
  });
}

function answer(i) {
  if (userAnswers[current] !== null) return;

  userAnswers[current] = i;
  const correct = questions[current].answer;
  if (i === correct) score++;

  if (mode === "instant") {
    showFeedback(i === correct);
    qs("nextBtn").style.display = "block";
  } else next();
}

qs("nextBtn").onclick = next;

function next() {
  current++;
  current < questions.length ? showQuestion() : finish();
}

/* ---------- FEEDBACK PNG ---------- */

function showFeedback(ok) {
  feedbackIcon.src = ok ? "correct.png" : "wrong.png";
  feedbackIcon.style.display = "block";
  setTimeout(() => feedbackIcon.style.display = "none", 500);
}

/* ---------- RESULT ---------- */

function finish() {
  clearInterval(timerInterval);
  qs("test").classList.add("hidden");

  const time = Math.floor((Date.now() - startTime) / 1000);
  let html = `<h2>Score: ${score}/${questions.length}</h2>
              <p>Time Taken: ${time}s</p><hr>`;

  questions.forEach((q, i) => {
    html += `<p>
      <b>Q${i + 1}.</b> ${q.q}<br>
      Your: <span style="color:${userAnswers[i] === q.answer ? 'green':'red'}">
        ${userAnswers[i] !== null ? q.options[userAnswers[i]] : "Not Answered"}
      </span><br>
      Correct: <span style="color:green">${q.options[q.answer]}</span>
    </p>`;
  });

  const resultDiv = qs("result");
  resultDiv.innerHTML = html;
  resultDiv.classList.remove("hidden");

  /*  THIS LINE FIXES LaTeX IN RESULT VIEW  */
  MathJax.typesetPromise();
}

