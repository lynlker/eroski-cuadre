// DEFINITIONS
const coin = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
const note = [200, 100, 50, 20, 10, 5];
const coinName = ["2€", "1€", "50c", "20c", "10c", "5c", "2c", "1c"];
const noteName = ["200€", "100€", "50€", "20€", "10€", "5€"];

const inputNote = [
  "200eurinput",
  "100eurinput",
  "50eurinput",
  "20eurinput",
  "10eurinput",
  "5eurinput",
];
const inputCoin = [
  "2eurinput",
  "1eurinput",
  "50ceninput",
  "20ceninput",
  "10ceninput",
  "5ceninput",
  "2ceninput",
  "1ceninput",
];
const inputMods = [
  "2rulinput",
  "1rulinput",
  "50rulinput",
  "20rulinput",
  "10rulinput",
  "5rulinput",
  "2cenrulinput",
  "1cenrulinput",
];

const eur = [0, 0, 0, 0, 0, 0, 0, 0];
const bil = [0, 0, 0, 0, 0, 0];
const mods = [50, 25, 20, 8, 4, 2.5, 1, 0.5];
const coinAmt = [0, 0, 0, 0, 0, 0, 0, 0];
const modsAmt = [0, 0, 0, 0, 0, 0, 0, 0];
const bilAmt = [0, 0, 0, 0, 0, 0];
const modsValue = [0, 0, 0, 0, 0, 0, 0, 0];
const coinValue = [0, 0, 0, 0, 0, 0, 0, 0];

let boxTill = document.getElementById("resultTill");
let boxTotal = document.getElementById("resultTotal");
let importeCaja = document.getElementById("cajaInput");
let importeVentaNeta = document.getElementById("ventaNetaInput");
let importeImp = document.getElementById("importeInput");
let finalCalcBtn = document.getElementById("finalCalcu");

// FUNCTIONS

// ROUNDTO FUNCTION: Rounds a number :shrug:

function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}

// TILL CALC FUNCTION: Calcula el total de euros que tienes, y basándose en la cantidad de monedas/billetes que tienes, recomienda lo que debes entregar a caja fuerte.

function tillCalc() {
  // Lo primero sería asignar los valores de las cajas de texto a las variables previamente definidas.

  for (i = 0; i < 6; i++) {
    // billetes primero, aqui se obtiene la cantidad de billetes.
    bilAmt[i] = document.getElementById(inputNote[i]).value;
    // ahora se multiplicaría la cantidad por el valor de cada billete y se guardaría en "bil"
    bil[i] = bilAmt[i] * note[i];
  }

  for (i = 0; i < 8; i++) {
    // mismo proceso, ahora con monedas.
    coinAmt[i] = document.getElementById(inputCoin[i]).value;
    coinValue[i] = coinAmt[i] * coin[i];

    // ahora se le añade el valor de las rulas
    modsAmt[i] = document.getElementById(inputMods[i]).value;
    modsValue[i] = modsAmt[i] * mods[i];
    eur[i] = coinValue[i] + modsValue[i];

    // alert(`${capCoinName[i]}: ${coinAmt[i]} monedas y ${modsAmt[i]} rulas. ${eur[i]}€ en total, de los cuales ${coinValue[i]}€ son en monedas y ${modsValue[i]}€ son en rulas.`);
  }
  // Habiendo obtenido el valor, faltaría sumarlo todo y calcular lo que se debe entregar (diferencia).
  let moneyTotal =
    eur.reduce((partialSum, a) => partialSum + a, 0) +
    bil.reduce((partialSum, a) => partialSum + a, 0);
  let dif1 = moneyTotal - 150;
  let dif2 = dif1;

  // Aquí se calcula la diferencia y los billetes/monedas a entregar.
  if (moneyTotal < 150) {
    boxTill.innerHTML = `Tienes, en total, ${moneyTotal.toFixed(
      2
    )}€. Tienes menos de 150€! Esto no debería pasar... No te habrás olvidado de algo?<br>`;
    importeCaja.value = dif2.toFixed(2);
  } else if (moneyTotal === 150) {
    boxTill.innerHTML = `Tienes exactamente 150€! Qué suerte... No deberías entregar nada de caja, supongo.<br>`;
    importeCaja.value = dif2.toFixed(2);
  } else {
    boxTill.innerHTML = `Tienes, en total, ${moneyTotal.toFixed(
      2
    )}€. Lo siguiente sería entregar ${dif1.toFixed(2)}€ al mando. <br>
        Deberías poder entregar:<hr>`;
    for (i = 0; i < 6; i++) {
      let quickTest = Math.floor(dif1 / note[i]);
      if (bilAmt[i] <= quickTest) {
        dif1 = roundTo(dif1 - bilAmt[i] * note[i], 2);
      } else if (bilAmt[i] > quickTest) {
        bilAmt[i] = quickTest;
        dif1 = roundTo(dif1 - bilAmt[i] * note[i], 2);
      }

      if (bilAmt[i] === 0 || bilAmt[i] === "0" || bilAmt[i] === "") {
      } else if (bilAmt[i] === 1) {
        boxTill.insertAdjacentHTML(
          "beforeend",
          `- ${bilAmt[i]} billete de ${noteName[i]}.<br>`
        );
      } else {
        boxTill.insertAdjacentHTML(
          "beforeend",
          `- ${bilAmt[i]} billetes de ${noteName[i]}.<br>`
        );
      }
    }

    for (i = 0; i < 8; i++) {
      let quickTest = Math.floor(dif1 / coin[i]);
      if (coinAmt[i] <= quickTest) {
        dif1 = roundTo(dif1 - coinAmt[i] * coin[i], 2);
      } else if (coinAmt[i] > quickTest) {
        coinAmt[i] = quickTest;
        dif1 = roundTo(dif1 - coinAmt[i] * coin[i], 2);
      }

      if (coinAmt[i] === 0 || coinAmt[i] === "0" || coinAmt[i] === "") {
      } else if (coinAmt[i] === 1) {
        boxTill.insertAdjacentHTML(
          "beforeend",
          `- ${coinAmt[i]} moneda de ${coinName[i]}.<br>`
        );
      } else {
        boxTill.insertAdjacentHTML(
          "beforeend",
          `- ${coinAmt[i]} monedas de ${coinName[i]}.<br>`
        );
      }
    }
    importeCaja.value = dif2.toFixed(2);
  }
}

// FINAL CALC FUNCTION: Calcula, a partir del total de caja y la Venta Neta, el total de cajera (Para mostrarlo en el ticket)
// Además, muestra un desglose de caja

function finalCalc() {
  if (
    importeCaja.value === 0 ||
    importeCaja.value === "0" ||
    importeCaja.value === "" ||
    importeVentaNeta.value === 0 ||
    importeVentaNeta.value === "0" ||
    importeVentaNeta.value === "" ||
    importeImp.value === "" ||
    importeImp.value === 0 ||
    importeImp.value === "0"
  ) {
    alert(
      "Por favor, asegúrate de que tanto el importe Caja como el importe Venta Neta no estén vacíos y que ambos sean mayores que 0."
    );
  } else {
    let cuadre = roundTo(importeCaja.value - importeImp.value, 2);
    let ventaNeta = roundTo(importeVentaNeta.value, 2);
    let totalCajera = ventaNeta + cuadre;
    boxTotal.innerHTML = `Tu cuadre es de ${cuadre}€, y tu total de cajera es de ${totalCajera}€!<br>`;
  }
}
