const { Enigma } = require("./enigma");

describe("Enigma Machine", () => {
  test("Symmetry: encrypt and decrypt returns original", () => {
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const message = "HELLO";
    const encrypted = enigma1.process(message);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const decrypted = enigma2.process(encrypted);
    expect(decrypted).toBe(message);
  });

  test("Special characters are preserved", () => {
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const message = "HELLO WORLD!";
    const encrypted = enigma1.process(message);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const decrypted = enigma2.process(encrypted);
    expect(decrypted).toBe(message);
  });

  test("Plugboard swaps work", () => {
    const plugboard = [
      ["A", "B"],
      ["C", "D"],
    ];
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
    const message = "ABCD";
    const encrypted = enigma1.process(message);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
    const decrypted = enigma2.process(encrypted);
    expect(decrypted).toBe(message);
  });
});

// To run: npx jest Task 6/enigma.test.js
