const fs = require("fs");
const readline = require("readline");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

class ProductSearch {
  constructor(apiKey) {
    this.client = new OpenAI({ apiKey });
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync("products.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("Error: products.json file not found!");
      } else if (error instanceof SyntaxError) {
        console.error("Error: Invalid JSON format in products.json file!");
      } else {
        console.error("Error reading file:", error.message);
      }
      process.exit(1);
    }
  }

  getFilterFunction() {
    return {
      type: "function",
      name: "filter_products",
      description: "Filters products based on user preferences",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description:
              "Product category (Electronics, Fitness, Kitchen, Books, Clothing)",
            enum: ["Electronics", "Fitness", "Kitchen", "Books", "Clothing"],
          },
          max_price: {
            type: "number",
            description: "Maximum product price",
          },
          min_rating: {
            type: "number",
            description: "Minimum product rating (from 1 to 5)",
          },
          in_stock: {
            type: "boolean",
            description: "Whether the product should be in stock",
          },
          keywords: {
            type: "array",
            items: { type: "string" },
            description: "Keywords to search in product name",
          },
        },
      },
    };
  }

  filterProducts(filters = {}) {
    const filteredProducts = [];

    for (const product of this.products) {
      // Category check
      if (filters.category && product.category !== filters.category) {
        continue;
      }

      // Maximum price check
      if (filters.max_price && product.price > filters.max_price) {
        continue;
      }

      // Minimum rating check
      if (filters.min_rating && product.rating < filters.min_rating) {
        continue;
      }

      // Stock availability check
      if (
        filters.in_stock !== undefined &&
        product.in_stock !== filters.in_stock
      ) {
        continue;
      }

      // Keywords check
      if (filters.keywords && filters.keywords.length > 0) {
        const productNameLower = product.name.toLowerCase();
        const hasKeyword = filters.keywords.some((keyword) =>
          productNameLower.includes(keyword.toLowerCase())
        );
        if (!hasKeyword) {
          continue;
        }
      }

      filteredProducts.push(product);
    }

    return filteredProducts;
  }

  async searchProducts(userQuery) {
    try {
      const response = await this.client.responses.create({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content:
              "You are a product search assistant. Analyze user queries and extract filtering criteria. Use the filter_products function to search for suitable products in the database.",
          },
          {
            role: "user",
            content: `Find products for the query: ${userQuery}`,
          },
        ],
        tools: [this.getFilterFunction()],
      });

      // Extract filtering parameters from new format
      const output = response.output;
      if (output && output.length > 0) {
        const firstOutput = output[0];
        if (
          firstOutput.type === "function_call" &&
          firstOutput.name === "filter_products"
        ) {
          const args = JSON.parse(firstOutput.arguments);
          return this.filterProducts(args);
        }
      }

      console.log(
        "Error: Could not extract filtering parameters from OpenAI response"
      );
      return [];
    } catch (error) {
      console.error(`Error calling OpenAI API: ${error.message}`);
      return [];
    }
  }

  displayResults(products) {
    if (products.length === 0) {
      console.log("No products found for your query.");
      return;
    }

    console.log(`\nFound ${products.length} products:`);
    console.log("=".repeat(50));

    products.forEach((product, index) => {
      const stockStatus = product.in_stock ? "In Stock" : "Out of Stock";
      console.log(
        `${index + 1}. ${product.name} - $${product.price.toFixed(
          2
        )}, Rating: ${product.rating}, ${stockStatus}`
      );
    });
  }

  async run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("🔍 AI Product Search System");
    console.log("=".repeat(40));
    console.log("Enter your query in natural language.");
    console.log(
      "Examples: 'smartphone under $800 with good camera', 'programming books'"
    );
    console.log("To exit, type 'quit' or 'exit'");
    console.log("=".repeat(40));

    const askQuestion = () => {
      rl.question("\nEnter your query: ", async (userInput) => {
        const input = userInput.trim();

        if (["quit", "exit"].includes(input.toLowerCase())) {
          console.log("Goodbye!");
          rl.close();
          return;
        }

        if (!input) {
          console.log("Please enter a query.");
          askQuestion();
          return;
        }

        console.log("🔍 Searching for products...");
        try {
          const results = await this.searchProducts(input);
          this.displayResults(results);
        } catch (error) {
          console.error(`An error occurred: ${error.message}`);
        }

        askQuestion();
      });
    };

    askQuestion();
  }
}

async function main() {
  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY environment variable not set");
    console.error("Set the OPENAI_API_KEY environment variable");
    console.error("Example: export OPENAI_API_KEY='your-api-key-here'");
    process.exit(1);
  }

  // Create and run the application
  const app = new ProductSearch(apiKey);
  await app.run();
}

// Handle interruption
process.on("SIGINT", () => {
  console.log("\n\nGoodbye!");
  process.exit(0);
});

if (require.main === module) {
  main().catch((error) => {
    console.error("Critical error:", error.message);
    process.exit(1);
  });
}

module.exports = ProductSearch;
