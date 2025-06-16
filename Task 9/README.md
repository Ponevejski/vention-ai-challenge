# Service Analyzer

A console application for analyzing digital services and products using OpenAI API. The application generates detailed markdown-formatted reports including information about business model, tech stack, target audience, and other aspects of the service.

## Requirements

- Node.js 18 or higher
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd service-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

## Usage

Start the application:
```bash
npm start
```

The application will prompt you to choose the type of analysis:
1. Known Service - for analyzing a known service (e.g., Spotify, Notion)
2. Service Description - for analyzing based on a service description

After entering the data, the application will generate a detailed markdown report that can be saved to a file.

## Usage Examples

### Analyzing a Known Service
```
=== Service Analyzer ===

? What would you like to analyze? Known Service
? Enter the name of the service (e.g., Spotify, Notion): Notion

Analyzing... Please wait...

Analysis complete!
[Markdown report]

? Would you like to save this analysis to a file? Yes
```

### Analyzing from Description
```
=== Service Analyzer ===

? What would you like to analyze? Service Description
? Enter the service description: Our platform helps creators monetize their content through subscriptions and donations

Analyzing... Please wait...

Analysis complete!
[Markdown report]

? Would you like to save this analysis to a file? Yes
```

## Report Structure

Each report includes the following sections:
- Brief History
- Target Audience
- Core Features
- Unique Selling Points
- Business Model
- Tech Stack Insights
- Perceived Strengths
- Perceived Weaknesses 