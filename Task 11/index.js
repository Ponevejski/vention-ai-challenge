const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(audioFilePath) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: "whisper-1",
    });
    return transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
}

async function summarizeText(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes text.",
        },
        {
          role: "user",
          content: `Please summarize the following text:\n\n${text}`,
        },
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
}

async function extractTopicsWithGPT(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an assistant that identifies and counts frequently mentioned topics in a given text. Respond with a JSON array of objects, each with "topic" and "mentions" keys. Only include the top 3-5 most relevant topics. Return only valid JSON.',
        },
        {
          role: "user",
          content: `Please analyze the following text and extract the most frequently mentioned topics along with their mention counts:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0].message.content;

    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error("Error extracting topics with GPT:", error);
    return [];
  }
}

function analyzeTranscription(text) {
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  const speakingSpeedWPM = Math.round(wordCount / ((2.3 * 60) / 150)); // Placeholder - needs actual audio duration

  // Old topic extraction removed

  return {
    word_count: wordCount,
    speaking_speed_wpm: speakingSpeedWPM,
    // frequently_mentioned_topics will be populated by main()
    frequently_mentioned_topics: [], // Temporarily empty, will be filled after GPT call
  };
}

async function saveToFile(filePath, content) {
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`Content saved to ${filePath}`);
  } catch (error) {
    console.error(`Error saving to ${filePath}:`, error);
    throw error;
  }
}

async function main() {
  const audioFilePath = process.argv[2];

  if (!audioFilePath) {
    console.log("Usage: node index.js <path_to_audio_file>");
    return;
  }

  if (!fs.existsSync(audioFilePath)) {
    console.error(`Error: Audio file not found at ${audioFilePath}`);
    return;
  }

  console.log(`Processing audio file: ${audioFilePath}`);

  try {
    // Ensure output directory exists
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const transcription = await transcribeAudio(audioFilePath);
    console.log("\nTranscription:\n", transcription);
    await saveToFile(path.join(outputDir, "transcription.md"), transcription);

    const summary = await summarizeText(transcription);
    console.log("\nSummary:\n", summary);
    await saveToFile(path.join(outputDir, "summary.md"), summary);

    const analytics = analyzeTranscription(transcription);
    console.log("\nAnalytics:\n", JSON.stringify(analytics, null, 2));
    await saveToFile(
      path.join(outputDir, "analysis.json"),
      JSON.stringify(analytics, null, 2)
    );

    const topics = await extractTopicsWithGPT(transcription);
    analytics.frequently_mentioned_topics = topics;
    await saveToFile(
      path.join(outputDir, "analysis.json"),
      JSON.stringify(analytics, null, 2)
    );
  } catch (error) {
    console.error("Application error:", error);
  }
}

main();
