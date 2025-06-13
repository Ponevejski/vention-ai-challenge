const Validator = require("./Validator");

/**
 * Валидатор для числовых значений
 */
class NumberValidator extends Validator {
  constructor() {
    super();
    this.addRule(this.isNumber);
  }

  /**
   * Проверяет, является ли значение числом
   */
  isNumber(value) {
    return {
      isValid: typeof value === "number" && !isNaN(value),
      message: "Значение должно быть числом",
    };
  }

  /**
   * Устанавливает минимальное значение
   * @param {number} min - Минимальное значение
   */
  min(min) {
    this.addRule((value) => ({
      isValid: value >= min,
      message: `Значение должно быть не менее ${min}`,
    }));
    return this;
  }

  /**
   * Устанавливает максимальное значение
   * @param {number} max - Максимальное значение
   */
  max(max) {
    this.addRule((value) => ({
      isValid: value <= max,
      message: `Значение должно быть не более ${max}`,
    }));
    return this;
  }

  /**
   * Устанавливает, что значение должно быть целым числом
   */
  integer() {
    this.addRule((value) => ({
      isValid: Number.isInteger(value),
      message: "Значение должно быть целым числом",
    }));
    return this;
  }

  /**
   * Устанавливает, что значение должно быть положительным
   */
  positive() {
    this.addRule((value) => ({
      isValid: value > 0,
      message: "Значение должно быть положительным",
    }));
    return this;
  }
}

module.exports = NumberValidator;
