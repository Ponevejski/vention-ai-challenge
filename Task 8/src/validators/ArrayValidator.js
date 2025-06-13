const Validator = require("./Validator");

/**
 * Валидатор для массивов
 */
class ArrayValidator extends Validator {
  constructor(itemValidator) {
    super();
    this.itemValidator = itemValidator;
    this.addRule(this.isArray);
  }

  /**
   * Проверяет, является ли значение массивом
   */
  isArray(value) {
    return {
      isValid: Array.isArray(value),
      message: "Значение должно быть массивом",
    };
  }

  /**
   * Устанавливает минимальную длину массива
   * @param {number} length - Минимальная длина
   */
  minLength(length) {
    this.addRule((value) => ({
      isValid: value.length >= length,
      message: `Длина массива должна быть не менее ${length} элементов`,
    }));
    return this;
  }

  /**
   * Устанавливает максимальную длину массива
   * @param {number} length - Максимальная длина
   */
  maxLength(length) {
    this.addRule((value) => ({
      isValid: value.length <= length,
      message: `Длина массива должна быть не более ${length} элементов`,
    }));
    return this;
  }

  /**
   * Проверяет массив на соответствие схеме
   * @param {Array} value - Массив для проверки
   * @returns {Object} - Результат валидации
   */
  validate(value) {
    const baseValidation = super.validate(value);
    if (!baseValidation.isValid) {
      return baseValidation;
    }

    const errors = [];
    for (let i = 0; i < value.length; i++) {
      const result = this.itemValidator.validate(value[i]);
      if (!result.isValid) {
        errors.push(...result.errors.map((error) => `[${i}]: ${error}`));
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = ArrayValidator;
