let display = document.getElementById("display");
let buttons = document.querySelectorAll("#calculadora button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "btnC") {
      display.textContent = "";
      equacao = [];
    } else if (button.id === "btnBack") {
      if (display.textContent.length > 0) {
        display.textContent = display.textContent.slice(0, -1);
      }
      if (equacao.length > 0) {
        const ultimo = equacao[equacao.length - 1];
        if (["+", "-", "*", "/"].includes(ultimo)) {
          equacao.pop();
        } else {
          if (ultimo.length > 1) {
            equacao[equacao.length - 1] = ultimo.slice(0, -1);
          } else {
            equacao.pop();
          }
        }
      }
    } else if (button.id === "btnequal") {
      console.log("Equação antes de processar:", equacao);
      processarEquacao();
      console.log("Equação após processar:", equacao);
      display.textContent = equacao[0];
    } else {
      // Se for um operador
      if (["+", "-", "*", "/"].includes(button.textContent)) {
        equacao.push(button.textContent);
      } else {
        // Se for um número ou ponto
        // Se o último elemento é um número, concatenar
        if (equacao.length > 0 && !isNaN(equacao[equacao.length - 1])) {
          equacao[equacao.length - 1] += button.textContent;
        } else {
          equacao.push(button.textContent);
        }
      }
      display.textContent += button.textContent;
    }
  });
});

let equacao = [];

function processarEquacao() {
  while (equacao.includes("*") || equacao.includes("/")) {
    for (let i = 0; i < equacao.length; i++) {
      if (equacao[i] === "*") {
        let resultado = Number(equacao[i - 1]) * Number(equacao[i + 1]);
        equacao.splice(i - 1, 3, resultado);
        i = -1; // Reinicia do 0
      } else if (equacao[i] === "/") {
        let resultado = Number(equacao[i - 1]) / Number(equacao[i + 1]);
        equacao.splice(i - 1, 3, resultado);
        i = -1; // Reinicia do 0
      }
    }
  }

  while (equacao.includes("+") || equacao.includes("-")) {
    for (let i = 0; i < equacao.length; i++) {
      if (equacao[i] === "+") {
        let resultado = Number(equacao[i - 1]) + Number(equacao[i + 1]);
        equacao.splice(i - 1, 3, resultado);
        i = -1; // Reinicia do 0
      } else if (equacao[i] === "-") {
        let resultado = Number(equacao[i - 1]) - Number(equacao[i + 1]);
        equacao.splice(i - 1, 3, resultado);
        i = -1; // Reinicia do 0
      }
    }
  }
}

console.log("Resultado:", equacao[0]);
