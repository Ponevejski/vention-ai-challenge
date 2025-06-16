import OpenAI from "openai";
import inquirer from "inquirer";
import chalk from "chalk";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert service analyst. Your task is to analyze digital services and products, providing comprehensive insights from multiple perspectives.
Please structure your response in markdown format with the following sections:
- Brief History
- Target Audience
- Core Features
- Unique Selling Points
- Business Model
- Tech Stack Insights
- Perceived Strengths
- Perceived Weaknesses

For known services, use your knowledge to provide accurate information.
For unknown services, analyze the provided description and make reasonable inferences.`;

const FEW_SHOT_EXAMPLES = [
  {
    input: "Spotify",
    output: `# Spotify Analysis

## Brief History
Founded in 2006 in Stockholm, Sweden, Spotify revolutionized music streaming by offering legal access to millions of songs. Launched publicly in 2008, it quickly became a market leader.

## Target Audience
- Music enthusiasts
- Casual listeners
- Podcast consumers
- Mobile users
- Multi-device users

## Core Features
- Music streaming with vast catalog
- Personalized playlists and recommendations
- Podcast streaming
- Offline listening
- Cross-platform availability

## Unique Selling Points
- Extensive music library
- Advanced recommendation algorithms
- Social sharing features
- Free tier with ads
- High-quality audio streaming

## Business Model
- Freemium model
- Premium subscription
- Family plans
- Student discounts
- Advertising revenue

## Tech Stack Insights
- Microservices architecture
- Machine learning for recommendations
- Cloud infrastructure
- Real-time streaming technology
- Cross-platform development

## Perceived Strengths
- User-friendly interface
- Excellent music discovery
- Strong social features
- Reliable streaming quality
- Extensive platform support

## Perceived Weaknesses
- Royalty payment controversies
- Premium pricing
- Limited high-fidelity options
- Regional content restrictions
- Competition from other platforms`,
  },
];

async function analyzeService(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...FEW_SHOT_EXAMPLES.map((example) => [
          { role: "user", content: example.input },
          { role: "assistant", content: example.output },
        ]).flat(),
        { role: "user", content: input },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(chalk.red("Error analyzing service:"), error);
    throw error;
  }
}

async function saveToFile(content, filename) {
  try {
    await fs.writeFile(filename, content);
    console.log(chalk.green(`\nReport saved to ${filename}`));
  } catch (error) {
    console.error(chalk.red("Error saving file:"), error);
  }
}

async function main() {
  console.log(chalk.blue("=== Service Analyzer ===\n"));

  const { inputType } = await inquirer.prompt([
    {
      type: "list",
      name: "inputType",
      message: "What would you like to analyze?",
      choices: ["Known Service", "Service Description"],
    },
  ]);

  const { input } = await inquirer.prompt([
    {
      type: "input",
      name: "input",
      message:
        inputType === "Known Service"
          ? "Enter the name of the service (e.g., Spotify, Notion):"
          : "Enter the service description:",
    },
  ]);

  console.log(chalk.yellow("\nAnalyzing... Please wait...\n"));

  try {
    const analysis = await analyzeService(input);
    console.log(chalk.green("Analysis complete!\n"));
    console.log(analysis);

    const { shouldSave } = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldSave",
        message: "Would you like to save this analysis to a file?",
        default: true,
      },
    ]);

    if (shouldSave) {
      const filename = `analysis_${Date.now()}.md`;
      await saveToFile(analysis, filename);
    }
  } catch (error) {
    console.error(chalk.red("\nFailed to analyze service. Please try again."));
  }
}

main().catch(console.error);
