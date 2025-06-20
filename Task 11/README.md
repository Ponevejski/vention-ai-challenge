# Audio Analyzer Application

This is a console application built with Node.js that transcribes spoken audio files using OpenAI's Whisper API, summarizes the transcription using a GPT model, and extracts custom statistics.

## Features

-   **Audio Transcription**: Converts spoken audio into text.
-   **Text Summarization**: Provides a concise summary of the transcribed text.
-   **Analytics Extraction**: Calculates word count, speaking speed (words per minute), and identifies frequently mentioned topics.
-   **File Output**: Saves transcription, summary, and analytics to separate files.

## Requirements

-   Node.js (LTS version recommended)
-   npm (Node Package Manager)
-   An OpenAI API key

## Setup Instructions

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repository-url>
    cd VentionChallenge/Task 11
    ```

2.  **Install Dependencies**:
    Navigate to the `Task 11` directory and install the necessary Node.js packages:
    ```bash
    cd Task 11
    npm install
    ```

3.  **Configure OpenAI API Key**:
    Create a `.env` file in the `Task 11` directory:
    ```
    touch .env
    ```
    Open the `.env` file and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```
    Replace `your_openai_api_key_here` with your actual OpenAI API key.

## How to Run the Application

To run the application, execute the `index.js` script with the path to your audio file as an argument:

```bash
node index.js <path_to_audio_file>
```

**Example**:

Assuming your audio file is named `CAR0004.mp3` and is located in the `Task 11` directory:

```bash
node index.js "CAR0004.mp3"
```

### Output Files

Upon successful execution, the application will create an `output` directory within `Task 11` and save the following files:

-   `transcription.md`: The full transcription of the audio.
-   `summary.md`: A summary of the transcription.
-   `analysis.json`: A JSON file containing word count, speaking speed, and frequently mentioned topics.

## Project Structure

```
Task 11/
├── .env                 (Your OpenAI API key)
├── index.js             (Main application logic)
├── package.json         (Project metadata and dependencies)
├── package-lock.json    (Resolved dependency tree)
├── CAR0004.mp3          (Sample audio file)
└── output/              (Generated output files)
    ├── transcription.md
    ├── summary.md
    └── analysis.json
``` 