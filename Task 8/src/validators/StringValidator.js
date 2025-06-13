const Validator = require("./Validator");

/**
 * Валидатор для строковых значений
 */
class StringValidator extends Validator {
  constructor() {
    super();
    this.addRule(this.isString);
  }

  /**
   * Проверяет, является ли значение строкой
   */
  isString(value) {
    return {
      isValid: typeof value === "string",
      message: "Значение должно быть строкой",
    };
  }

  /**
   * Устанавливает минимальную длину строки
   * @param {number} length - Минимальная длина
   */
  minLength(length) {
    this.addRule((value) => ({
      isValid: value.length >= length,
      message: `Длина строки должна быть не менее ${length} символов`,
    }));
    return this;
  }

  /**
   * Устанавливает максимальную длину строки
   * @param {number} length - Максимальная длина
   */
  maxLength(length) {
    this.addRule((value) => ({
      isValid: value.length <= length,
      message: `Длина строки должна быть не более ${length} символов`,
    }));
    return this;
  }

  /**
   * Устанавливает регулярное выражение для проверки
   * @param {RegExp} pattern - Регулярное выражение
   */
  pattern(pattern) {
    this.addRule((value) => ({
      isValid: pattern.test(value),
      message: "Значение не соответствует требуемому формату",
    }));
    return this;
  }
}

module.exports = StringValidator;
