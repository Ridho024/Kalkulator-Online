const display = document.querySelector(".display");
const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tmpResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let disHistory = "";
let disInput = "";
let disResult = null;
let isDot = false;
let lastOperation = "";
let result = "";

// const comaNumberFormat = (angka) => {

//   // Memeriksa apakah string sudah berisi "."
//   if (angka.includes(".")) {
//     return angka; // Mengembalikan string asli jika sudah berisi "."
//   }

//   let angkaString = angka.toString();

//   // Membuat array untuk menyimpan bagian-bagian angka yang akan dipisahkan dengan koma
//   let bagianAngka = [];

//   // Menambahkan bagian-bagian angka dengan koma setiap 3 digit dari belakang
//   while (angkaString.length > 3) {
//     bagianAngka.unshift(angkaString.slice(-3)); // Menambahkan bagian dari belakang
//     angkaString = angkaString.slice(0, -3); // Menghapus 3 digit dari belakang
//   }

//   // Menambahkan sisa digit yang kurang dari 3 digit
//   bagianAngka.unshift(angkaString);

//   // Menggabungkan bagian-bagian angka dengan koma
//   return bagianAngka.join(",");
// };

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !isDot) {
      console.log(e.target.innerText);
      isDot = true;
    } else if (e.target.innerText === "." && isDot) {
      return;
    }

    // Display input

    disInput += e.target.innerText;
    if (disInput.length > 10) {
      disInput = parseFloat(disInput).toExponential(4);
    } else {
      disInput = parseFloat(disInput);
    }

    displayInput.innerText = disInput;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!disInput) return;
    isDot = false;
    const operationName = e.target.innerText;
    if (disHistory && disInput && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(disInput);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

const clearVar = (name = "") => {
  disHistory += disInput + " " + name + " ";
  displayHistory.innerText = disHistory;
  displayInput.innerText = "0";
  disInput = "";
  tmpResult.innerText = result;
};

const mathOperation = () => {
  if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(disInput);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(disInput);
  } else if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(disInput);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(disInput);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(disInput);
  }
};

equal.addEventListener("click", () => {
  if (!disHistory || !disInput) return;
  isDot = false;
  mathOperation();
  clearVar();
  displayInput.innerText = result;
  tmpResult.innerText = "";
  disInput = result;
  disHistory = "";
});

clearAll.addEventListener("click", () => {
  disHistory = "";
  disInput = "";
  isDot = false;
  displayHistory.innerText = "0";
  displayInput.innerText = "0";
  tmpResult.innerText = "0";
  result = "";
  lastOperation = "";
});

clearLast.addEventListener("click", () => {
  const number = displayInput.innerText;
  let newNumber = number.slice(0, -1);

  if (newNumber === "") {
    displayInput.innerText = "0";
  } else {
    displayInput.innerText = newNumber;
    disInput = "";
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" || e.key === "8" || e.key === "9") {
    clickNumber(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Delete") {
    deleteAll();
  }
});

const clickNumber = (key) => {
  numbers.forEach((number) => {
    if (number.innerText === key) {
      number.click();
    }
  });
};

const clickOperation = (key) => {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
};

const clickEqual = () => {
  equal.click();
};

const deleteLast = () => {
  clearLast.click();
};

const deleteAll = () => {
  clearAll.click();
};
