# Библиотека валидации данных

Библиотека для валидации сложных структур данных в JavaScript.

## Установка

```bash
npm install
```

## Использование

### Базовые валидаторы

```javascript
const Schema = require('./src/Schema');

// Валидация строк
const stringValidator = Schema.string()
  .minLength(3)
  .maxLength(10)
  .pattern(/^[a-z]+$/);

// Валидация чисел
const numberValidator = Schema.number()
  .min(0)
  .max(100)
  .integer();

// Валидация булевых значений
const booleanValidator = Schema.boolean();

// Валидация массивов
const arrayValidator = Schema.array(Schema.string())
  .minLength(1)
  .maxLength(5);
```

### Валидация объектов

```javascript
const userSchema = Schema.object({
  name: Schema.string().minLength(2),
  age: Schema.number().min(0).max(120),
  email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  isActive: Schema.boolean(),
  tags: Schema.array(Schema.string())
});

const userData = {
  name: "John",
  age: 30,
  email: "john@example.com",
  isActive: true,
  tags: ["user", "admin"]
};

const result = userSchema.validate(userData);
console.log(result.isValid); // true/false
console.log(result.errors); // массив ошибок
```

### Вложенные объекты и массивы

```javascript
const addressSchema = Schema.object({
  street: Schema.string(),
  city: Schema.string(),
  postalCode: Schema.string().pattern(/^\d{5}$/)
});

const userSchema = Schema.object({
  name: Schema.string(),
  addresses: Schema.array(addressSchema)
});
```

## Запуск тестов

```bash
npm test
```

## Покрытие тестами

```bash
npm run test:coverage
```

## API

### Schema.string()
Создает валидатор для строковых значений.

Методы:
- `minLength(length)` - минимальная длина
- `maxLength(length)` - максимальная длина
- `pattern(regex)` - регулярное выражение

### Schema.number()
Создает валидатор для числовых значений.

Методы:
- `min(value)` - минимальное значение
- `max(value)` - максимальное значение
- `integer()` - проверка на целое число
- `positive()` - проверка на положительное число

### Schema.boolean()
Создает валидатор для булевых значений.

### Schema.object(schema)
Создает валидатор для объектов.

### Schema.array(itemValidator)
Создает валидатор для массивов.

Методы:
- `minLength(length)` - минимальная длина массива
- `maxLength(length)` - максимальная длина массива 