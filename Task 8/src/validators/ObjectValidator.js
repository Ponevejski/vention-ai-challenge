const Validator = require("./Validator");

/**
 * Валидатор для объектов
 */
class ObjectValidator extends Validator {
  constructor(schema) {
    super();
    this.schema = schema;
    this.addRule(this.isObject);
  }

  /**
   * Проверяет, является ли значение объектом
   */
  isObject(value) {
    return {
      isValid:
        typeof value === "object" && value !== null && !Array.isArray(value),
      message: "Значение должно быть объектом",
    };
  }

  /**
   * Проверяет объект на соответствие схеме
   * @param {Object} value - Объект для проверки
   * @returns {Object} - Результат валидации
   */
  validate(value) {
    const baseValidation = super.validate(value);
    if (!baseValidation.isValid) {
      return baseValidation;
    }

    const errors = [];
    for (const [key, validator] of Object.entries(this.schema)) {
      if (value[key] === undefined && !validator.optional) {
        errors.push(`Поле "${key}" обязательно`);
        continue;
      }

      if (value[key] !== undefined) {
        const result = validator.validate(value[key]);
        if (!result.isValid) {
          errors.push(...result.errors.map((error) => `${key}: ${error}`));
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = ObjectValidator;
