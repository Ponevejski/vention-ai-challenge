const StringValidator = require("./validators/StringValidator");
const NumberValidator = require("./validators/NumberValidator");
const BooleanValidator = require("./validators/BooleanValidator");
const ObjectValidator = require("./validators/ObjectValidator");
const ArrayValidator = require("./validators/ArrayValidator");

/**
 * Класс для построения схем валидации
 */
class Schema {
  /**
   * Создает валидатор для строк
   */
  static string() {
    return new StringValidator();
  }

  /**
   * Создает валидатор для чисел
   */
  static number() {
    return new NumberValidator();
  }

  /**
   * Создает валидатор для булевых значений
   */
  static boolean() {
    return new BooleanValidator();
  }

  /**
   * Создает валидатор для объектов
   * @param {Object} schema - Схема валидации объекта
   */
  static object(schema) {
    return new ObjectValidator(schema);
  }

  /**
   * Создает валидатор для массивов
   * @param {Validator} itemValidator - Валидатор для элементов массива
   */
  static array(itemValidator) {
    return new ArrayValidator(itemValidator);
  }
}

module.exports = Schema;
