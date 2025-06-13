const Validator = require("./Validator");

/**
 * Валидатор для булевых значений
 */
class BooleanValidator extends Validator {
  constructor() {
    super();
    this.addRule(this.isBoolean);
  }

  /**
   * Проверяет, является ли значение булевым
   */
  isBoolean(value) {
    return {
      isValid: typeof value === "boolean",
      message: "Значение должно быть булевым",
    };
  }
}

module.exports = BooleanValidator;
