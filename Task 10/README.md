# 🔍 AI Product Search System

Console application for product search using OpenAI API and function calling. The application accepts natural language queries and returns filtered results from a product database.

## 🚀 Features

- Natural language product search
- Filtering by categories, price, rating, and availability
- OpenAI API integration for query understanding
- Function calling for structured search
- Intuitive console interface

## 📋 Requirements

- Node.js (version 14 or higher)
- OpenAI API key
- Internet connection for OpenAI API access

## 🛠️ Installation

1. **Clone the repository or navigate to Task 10 folder:**
   ```bash
   cd Task\ 10
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variable with your OpenAI API key:**
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   ```
   
   For Windows (PowerShell):
   ```powershell
   $env:OPENAI_API_KEY='your-api-key-here'
   ```
   
   For Windows (Command Prompt):
   ```cmd
   set OPENAI_API_KEY=your-api-key-here
   ```

## 🎯 Running the Application

Start the application with:
```bash
npm start
```

Or directly:
```bash
node product_search.js
```

## 📝 Usage Examples

After starting the application, you can enter natural language queries:

### Example Queries:

1. **"smartphone under $800 with good camera"**
   - Will find smartphones in Electronics category with price under $800

2. **"programming books"**
   - Will find books in Books category with "programming" keyword

3. **"electronics with rating above 4.5"**
   - Will find electronic products with rating 4.5 and above

4. **"fitness equipment in stock"**
   - Will find Fitness category products that are in stock

5. **"kitchen appliances under $100"**
   - Will find kitchen appliances with price under $100

### Supported Categories:
- **Electronics** - Electronic devices and accessories
- **Fitness** - Fitness equipment and accessories
- **Kitchen** - Kitchen appliances and tools
- **Books** - Books and publications
- **Clothing** - Clothing and accessories

### Filtering Criteria:
- **Category** - specific product category
- **Maximum price** - upper price limit
- **Minimum rating** - minimum rating from 1 to 5
- **Stock availability** - products in stock or not
- **Keywords** - search in product name

## 🔧 Project Structure

```
Task 10/
├── product_search.js    # Main application
├── products.json        # Product database
├── package.json         # Dependencies and scripts
├── README.md           # Documentation
└── sample_outputs.md   # Usage examples
```

## 🐛 Troubleshooting

### Error "OPENAI_API_KEY environment variable not set"
Make sure you have set the environment variable:
```bash
export OPENAI_API_KEY='your-actual-api-key'
```

### Error "products.json file not found"
Make sure the `products.json` file is in the same folder as `product_search.js`.

### Error calling OpenAI API
- Check your API key is correct
- Ensure you have internet connection
- Check your OpenAI account limits

## 📊 Output Format

Search results are displayed in the following format:
```
Found 3 products:
==================================================
1. Wireless Headphones - $99.99, Rating: 4.5, In Stock
2. Smart Watch - $199.99, Rating: 4.6, In Stock
3. Bluetooth Speaker - $49.99, Rating: 4.4, In Stock
```

## 🔄 Exiting the Application

To exit the application, type:
- `quit`
- `exit`

Or press `Ctrl+C`

## 📄 License

MIT License 