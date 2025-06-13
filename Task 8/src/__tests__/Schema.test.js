const Schema = require("../Schema");

describe("Schema", () => {
  describe("string()", () => {
    it("должен валидировать строковые значения", () => {
      const validator = Schema.string();
      expect(validator.validate("test").isValid).toBe(true);
      expect(validator.validate(123).isValid).toBe(false);
    });

    it("должен проверять минимальную длину", () => {
      const validator = Schema.string().minLength(3);
      expect(validator.validate("test").isValid).toBe(true);
      expect(validator.validate("te").isValid).toBe(false);
    });

    it("должен проверять максимальную длину", () => {
      const validator = Schema.string().maxLength(3);
      expect(validator.validate("te").isValid).toBe(true);
      expect(validator.validate("test").isValid).toBe(false);
    });

    it("должен проверять регулярное выражение", () => {
      const validator = Schema.string().pattern(/^[a-z]+$/);
      expect(validator.validate("test").isValid).toBe(true);
      expect(validator.validate("test123").isValid).toBe(false);
    });
  });

  describe("number()", () => {
    it("должен валидировать числовые значения", () => {
      const validator = Schema.number();
      expect(validator.validate(123).isValid).toBe(true);
      expect(validator.validate("123").isValid).toBe(false);
    });

    it("должен проверять минимальное значение", () => {
      const validator = Schema.number().min(5);
      expect(validator.validate(6).isValid).toBe(true);
      expect(validator.validate(4).isValid).toBe(false);
    });

    it("должен проверять максимальное значение", () => {
      const validator = Schema.number().max(5);
      expect(validator.validate(4).isValid).toBe(true);
      expect(validator.validate(6).isValid).toBe(false);
    });

    it("должен проверять целые числа", () => {
      const validator = Schema.number().integer();
      expect(validator.validate(5).isValid).toBe(true);
      expect(validator.validate(5.5).isValid).toBe(false);
    });
  });

  describe("boolean()", () => {
    it("должен валидировать булевы значения", () => {
      const validator = Schema.boolean();
      expect(validator.validate(true).isValid).toBe(true);
      expect(validator.validate(false).isValid).toBe(true);
      expect(validator.validate("true").isValid).toBe(false);
    });
  });

  describe("object()", () => {
    it("должен валидировать объекты", () => {
      const schema = {
        name: Schema.string(),
        age: Schema.number(),
      };
      const validator = Schema.object(schema);

      const validData = {
        name: "John",
        age: 30,
      };
      expect(validator.validate(validData).isValid).toBe(true);

      const invalidData = {
        name: 123,
        age: "30",
      };
      expect(validator.validate(invalidData).isValid).toBe(false);
    });

    it("должен проверять обязательные поля", () => {
      const schema = {
        name: Schema.string(),
        age: Schema.number(),
      };
      const validator = Schema.object(schema);

      const data = {
        name: "John",
      };
      expect(validator.validate(data).isValid).toBe(false);
    });
  });

  describe("array()", () => {
    it("должен валидировать массивы", () => {
      const validator = Schema.array(Schema.string());
      expect(validator.validate(["test"]).isValid).toBe(true);
      expect(validator.validate([123]).isValid).toBe(false);
    });

    it("должен проверять минимальную длину массива", () => {
      const validator = Schema.array(Schema.string()).minLength(2);
      expect(validator.validate(["test", "test2"]).isValid).toBe(true);
      expect(validator.validate(["test"]).isValid).toBe(false);
    });

    it("должен проверять максимальную длину массива", () => {
      const validator = Schema.array(Schema.string()).maxLength(2);
      expect(validator.validate(["test", "test2"]).isValid).toBe(true);
      expect(validator.validate(["test", "test2", "test3"]).isValid).toBe(
        false
      );
    });
  });

  describe("комплексные схемы", () => {
    it("должен валидировать вложенные объекты и массивы", () => {
      const addressSchema = Schema.object({
        street: Schema.string(),
        city: Schema.string(),
        postalCode: Schema.string().pattern(/^\d{5}$/),
      });

      const userSchema = Schema.object({
        name: Schema.string(),
        age: Schema.number(),
        addresses: Schema.array(addressSchema),
      });

      const validData = {
        name: "John",
        age: 30,
        addresses: [
          {
            street: "Main St",
            city: "New York",
            postalCode: "12345",
          },
        ],
      };

      expect(userSchema.validate(validData).isValid).toBe(true);

      const invalidData = {
        name: "John",
        age: "30",
        addresses: [
          {
            street: "Main St",
            city: "New York",
            postalCode: "1234",
          },
        ],
      };

      expect(userSchema.validate(invalidData).isValid).toBe(false);
    });
  });
});
