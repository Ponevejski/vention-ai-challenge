/**
 * Базовый класс для всех валидаторов
 */
class Validator {
  constructor() {
    this.rules = [];
    this.customMessage = null;
  }

  /**
   * Добавляет правило валидации
   * @param {Function} rule - Функция правила валидации
   * @returns {Validator} - Возвращает this для цепочки вызовов
   */
  addRule(rule) {
    this.rules.push(rule);
    return this;
  }

  /**
   * Устанавливает пользовательское сообщение об ошибке
   * @param {string} message - Сообщение об ошибке
   * @returns {Validator} - Возвращает this для цепочки вызовов
   */
  withMessage(message) {
    this.customMessage = message;
    return this;
  }

  /**
   * Проверяет значение на соответствие всем правилам
   * @param {any} value - Значение для проверки
   * @returns {Object} - Результат валидации
   */
  validate(value) {
    for (const rule of this.rules) {
      const result = rule(value);
      if (!result.isValid) {
        return {
          isValid: false,
          errors: [this.customMessage || result.message],
        };
      }
    }
    return { isValid: true, errors: [] };
  }
}

module.exports = Validator;
