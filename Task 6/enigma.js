const readline = require("readline");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function mod(n, m) {
  return ((n % m) + m) % m;
}

const ROTORS = [
  { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" }, // Rotor I
  { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" }, // Rotor II
  { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" }, // Rotor III
];
const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

function plugboardSwap(c, pairs) {
  for (const [a, b] of pairs) {
    if (c === a) return b;
    if (c === b) return a;
  }
  return c;
}

class Rotor {
  constructor(wiring, notch, ringSetting = 0, position = 0) {
    this.wiring = wiring;
    this.notch = notch;
    this.ringSetting = ringSetting;
    this.position = position;
  }
  step() {
    this.position = mod(this.position + 1, 26);
  }
  atNotch() {
    return alphabet[this.position] === this.notch;
  }
  forward(c) {
    const idx = mod(alphabet.indexOf(c) + this.position - this.ringSetting, 26);
    return this.wiring[idx];
  }
  backward(c) {
    const idx = this.wiring.indexOf(c);
    return alphabet[mod(idx - this.position + this.ringSetting, 26)];
  }
}

class Enigma {
  constructor(rotorIDs, rotorPositions, ringSettings, plugboardPairs) {
    this.rotors = rotorIDs.map(
      (id, i) =>
        new Rotor(
          ROTORS[id].wiring,
          ROTORS[id].notch,
          ringSettings[i],
          rotorPositions[i]
        )
    );
    this.plugboardPairs = plugboardPairs;
  }
  stepRotors() {
    if (this.rotors[2].atNotch()) this.rotors[1].step();
    if (this.rotors[1].atNotch()) this.rotors[0].step();
    this.rotors[2].step();
  }
  encryptChar(c) {
    if (!alphabet.includes(c)) return c;
    this.stepRotors();
    c = plugboardSwap(c, this.plugboardPairs);

    // Pass through rotors right to left
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      c = this.rotors[i].forward(c);
    }

    // Reflection
    c = REFLECTOR[alphabet.indexOf(c)];

    // Pass through rotors left to right
    for (let i = 0; i < this.rotors.length; i++) {
      c = this.rotors[i].backward(c);
    }

    c = plugboardSwap(c, this.plugboardPairs);
    return c;
  }
  process(text) {
    return text
      .toUpperCase()
      .split("")
      .map((c) => {
        if (!alphabet.includes(c)) return c;
        return this.encryptChar(c);
      })
      .join("");
  }
}

function promptEnigma() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter message: ", (message) => {
    rl.question("Rotor positions (e.g. 0 0 0): ", (posStr) => {
      const rotorPositions = posStr.split(" ").map(Number);
      rl.question("Ring settings (e.g. 0 0 0): ", (ringStr) => {
        const ringSettings = ringStr.split(" ").map(Number);
        rl.question("Plugboard pairs (e.g. AB CD): ", (plugStr) => {
          const plugPairs =
            plugStr
              .toUpperCase()
              .match(/([A-Z]{2})/g)
              ?.map((pair) => [pair[0], pair[1]]) || [];

          const enigma = new Enigma(
            [0, 1, 2],
            rotorPositions,
            ringSettings,
            plugPairs
          );
          const result = enigma.process(message);
          console.log("Output:", result);
          rl.close();
        });
      });
    });
  });
}

// Добавляем тесты
function runTests() {
  console.log("Running Enigma tests...");

  // Тест 1: Проверка симметричности шифрования
  const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
  const message = "HELLO";
  const encrypted = enigma1.process(message);

  // Создаем новую машину с теми же настройками для расшифровки
  const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
  const decrypted = enigma2.process(encrypted);

  console.log("Test 1 - Symmetry:", message === decrypted ? "PASS" : "FAIL");
  console.log("Original:", message);
  console.log("Encrypted:", encrypted);
  console.log("Decrypted:", decrypted);

  // Тест 2: Проверка работы с пробелами и специальными символами
  const enigma3 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
  const message2 = "HELLO WORLD!";
  const encrypted2 = enigma3.process(message2);
  // Для расшифровки создаём новую машину с теми же начальными настройками
  const enigma4 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
  const decrypted2 = enigma4.process(encrypted2);

  console.log(
    "\nTest 2 - Special characters:",
    message2 === decrypted2 ? "PASS" : "FAIL"
  );
  console.log("Original:", message2);
  console.log("Encrypted:", encrypted2);
  console.log("Decrypted:", decrypted2);

  // Тест 3: Проверка работы с plugboard
  const enigma5 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    [
      ["A", "B"],
      ["C", "D"],
    ]
  );
  const message3 = "ABCD";
  const encrypted3 = enigma5.process(message3);
  const enigma6 = new Enigma(
    [0, 1, 2],
    [0, 0, 0],
    [0, 0, 0],
    [
      ["A", "B"],
      ["C", "D"],
    ]
  );
  const decrypted3 = enigma6.process(encrypted3);
  console.log(
    "\nTest 3 - Plugboard:",
    message3 === decrypted3 ? "PASS" : "FAIL"
  );
  console.log("Original:", message3);
  console.log("Encrypted:", encrypted3);
  console.log("Decrypted:", decrypted3);
}

if (require.main === module) {
  if (process.argv.includes("--test")) {
    runTests();
  } else {
    promptEnigma();
  }
}

module.exports = { Enigma };
