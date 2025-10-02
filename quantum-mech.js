

// Array of formula names
const formulaNames = [ 
  "Uncertainty Principle",
  "Operator–Eigenfunction–Eigenvalue Relation",
  "Momentum Operator",
  "Hamiltonian Operator",
  "Schrödinger Equation (Time Dependent)",
  "Schrödinger Equation (Time Independent)",
  "State Function (Time Independent)"
];

// Array of corresponding LaTeX formulas
const formulas = [

  // Uncertainty Principle
  `$$
  \\Delta x \\, \\Delta p \\geq \\frac{\\hbar}{2}
  $$`,

  // Operator–Eigenfunction–Eigenvalue Relation
  `$$
  \\hat{A} \\, f(x) = a \\, f(x)
  $$`,

  // Momentum Operator
  `$$
  \\hat{p} = - i \\hbar \\, \\frac{d}{dx}
  $$`,

  // Hamiltonian Operator
  `$$
  \\hat{H} = -\\frac{\\hbar^{2}}{2m} \\frac{d^{2}}{dx^{2}} + V(x,t)
  $$`,

  // Time-dependent Schrödinger Equation
  `$$
  i\\hbar \\, \\frac{\\partial}{\\partial t} \\, \\Psi(x,t)
  = \\left[ -\\frac{\\hbar^{2}}{2m} \\, \\frac{d^{2}}{dx^{2}} + V(x,t) \\right] \\Psi(x,t)
  $$`,

  // Time-independent Schrödinger Equation
  `$$
  \\hat{H} \\, \\phi(x) = E \\, \\phi(x)
  $$`,

  // State function (space-dependent part)
  `$$
  \\Psi(x,t) = \\phi(x) \\, e^{-iEt/\\hbar}
  $$`
];

const container=document.getElementById('main-box');


for (let i=0; i<formulaNames.length;i++){

    const bigbox=document.createElement('div');
    bigbox.className='big-box';
    

    const nm=document.createElement('div');
    nm.className="formula-name";
    nm.textContent=formulaNames[i];

    const eqbox=document.createElement('div');
    eqbox.className="equation-box";
    eqbox.textContent=formulas[i];

    bigbox.appendChild(nm);
    bigbox.appendChild(eqbox);

    container.appendChild(bigbox);

    
}




// General quantum mechanics symbols (no fixed constant values)
const qmSymbols = [
  { symbol: "\\Psi(\\mathbf{r},t)", meaning: "Wavefunction (state function)" },
  { symbol: "\\phi(x)", meaning: "Spatial part of wavefunction" },
  { symbol: "H", meaning: "Hamiltonian operator" },
  { symbol: "p", meaning: "Momentum operator" },
  { symbol: "V(\\mathbf{r},t)", meaning: "Potential energy function" },
  { symbol: "E", meaning: "Energy eigenvalue" },
  { symbol: "\\Delta x", meaning: "Uncertainty in position" },
  { symbol: "\\Delta p", meaning: "Uncertainty in momentum" }
];

// Constants with values
const qmConstants = [
  { symbol: "\\hbar", meaning: "Reduced Planck's constant", value: "1.055 × 10⁻³⁴ J·s" },
  { symbol: "m_{e}", meaning: "Electron mass", value: "9.109 × 10⁻³¹ kg" },
  { symbol: "c", meaning: "Speed of light", value: "3.0 × 10⁸ m/s" },
  { symbol: "e", meaning: "Elementary charge", value: "1.602 × 10⁻¹⁹ C" }
];

// Function to populate popup content
function loadPopupContent() {
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = ""; // Clear old content

  // Title
  const title = document.createElement("h2");
  title.textContent = "Quantum Mechanics Symbols & Constants";
  title.style.color = "cyan";
  popupContent.appendChild(title);

  // ---------- Section 1: Symbols ----------
  const symTitle = document.createElement("h3");
  symTitle.textContent = "Symbols";
  symTitle.style.color = "lightgreen";
  popupContent.appendChild(symTitle);

  qmSymbols.forEach(item => {
    const div = document.createElement("div");
    div.style.margin = "5px 0";
    div.style.color = "white";
    div.style.fontFamily = "Courier New, monospace";
    div.innerHTML = `\\(${item.symbol}\\) – ${item.meaning}`;
    popupContent.appendChild(div);
  });

  // ---------- Section 2: Constants ----------
  const constTitle = document.createElement("h3");
  constTitle.textContent = "Constants with Values";
  constTitle.style.color = "lightgreen";
  constTitle.style.marginTop = "15px";
  popupContent.appendChild(constTitle);

  qmConstants.forEach(item => {
    const div = document.createElement("div");
    div.style.margin = "5px 0";
    div.style.color = "white";
    div.style.fontFamily = "Courier New, monospace";
    div.innerHTML = `\\(${item.symbol}\\)– ${item.meaning} = ${item.value}`;
    popupContent.appendChild(div);
  });

  // Re-render MathJax
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

window.onload = loadPopupContent;
