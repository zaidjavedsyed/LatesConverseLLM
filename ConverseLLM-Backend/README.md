# AI-Powered Website Chatbot Using Retrieval-Augmented Generation (RAG) - Backend

## Project Title and Description

**ConverseLLM Backend** is the server-side component of an AI-powered chatbot system that transforms any website into an intelligent conversational interface using Retrieval-Augmented Generation (RAG) architecture. The backend handles web content extraction, vector embedding generation, similarity search, and AI-powered response generation using Google Gemini models.

The system processes website URLs, extracts content using intelligent web scraping techniques, generates vector embeddings, stores them in Supabase vector database, and retrieves relevant context to generate accurate, context-aware responses to user queries.

## Step-by-Step Setup Instructions

### Prerequisites

- Node.js (version 18.17.1 or higher)
- npm or yarn package manager
- Git
- Google Generative AI API key
- Supabase account with pgvector extension enabled

### 1. Cloning the Repository

```bash
git clone <your-repository-url>
cd ConverseLLM-Backend
```

### 2. Installing Dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
GOOGLE_API_KEY=your_google_api_key_here
PUBLIC_SUPABASE_URL=your_supabase_url_here
PUBLIC_SUPABASE_PRIVATE_KEY=your_supabase_private_key_here
jwtSecretKey=your_jwt_secret_key_here
```

**Note:** Replace the placeholder values with your actual API keys and credentials.

### 4. Running the Project

**Development mode:**
```bash
npm start
```

Or using yarn:
```bash
yarn start
```

**With nodemon (auto-restart on changes):**
```bash
npm install -g nodemon
nodemon index.js
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

### 5. Testing the API

You can test the API endpoints using Postman or curl:

```bash
# Test chatbot creation
curl -X POST http://localhost:3001/chatbot \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"url": "https://example.com"}'

# Test chatbot query
curl -X POST http://localhost:3001/chatbotprompt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"url": "https://example.com", "prompt": "What products do you offer?"}'
```

## Dataset Information

This project does not use a traditional static dataset. Instead, it processes dynamic website content in real-time:

- **Data Source:** Website URLs provided by users
- **Data Type:** HTML content extracted from websites
- **Preprocessing Steps:**
  1. Web scraping using RecursiveUrlLoader (primary) or Playwright (fallback)
  2. HTML to text conversion using html-to-text library
  3. Content cleaning (removes navigation, headers, footers)
  4. Text chunking using RecursiveCharacterTextSplitter (1500 characters per chunk, 300 character overlap)
  5. Vector embedding generation using Google text-embedding-004 model
  6. Storage in Supabase vector database with metadata

**Example Website:** The system has been tested with various websites including e-commerce sites, documentation sites, and corporate websites.

## Repository Directory Structure

```
ConverseLLM-Backend/
├── api/
│   └── chatbot.js          # API routes for chatbot operations
├── utils/
│   └── chatbotutils.js     # Core functions for content extraction, embedding, and response generation
├── test/
│   └── chatbotApiIntTest.js # Integration tests
├── deploy/
│   └── deploy-to-lambda.ps1 # Deployment script for AWS Lambda
├── docs/
│   └── data.index/         # Vector index files (if using local storage)
├── index.js                 # Main server entry point
├── package.json             # Dependencies and scripts
├── serverless.yml          # Serverless framework configuration
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## Input and Output Examples

### Input Example (Create Chatbot)

**Request:**
```json
POST /chatbot
Headers: {
  "Authorization": "Bearer JWT_TOKEN",
  "Content-Type": "application/json"
}
Body: {
  "url": "https://skippi.in"
}
```

**Expected Output:**
```
"Successfully created"
```

### Input Example (Query Chatbot)

**Request:**
```json
POST /chatbotprompt
Headers: {
  "Authorization": "Bearer JWT_TOKEN",
  "Content-Type": "application/json"
}
Body: {
  "url": "https://skippi.in",
  "prompt": "What is the price of apple juice?"
}
```

**Expected Output:**
```
"The price of Skippi Apple Juice is ₹160. This product is available on our website."
```

### Input Example (Workspace Query)

**Request:**
```json
POST /workspace-query
Headers: {
  "Authorization": "Bearer JWT_TOKEN",
  "Content-Type": "application/json"
}
Body: {
  "workspaceId": "workspace_123",
  "prompt": "Tell me about your products",
  "websiteUrl": "https://skippi.in"
}
```

**Expected Output:**
```json
{
  "answer": "Based on our website, we offer various ice pop flavors including Apple Juice, Orange, and Mango. All products are made with natural ingredients.",
  "workspaceId": "workspace_123"
}
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Frontend)                         │
│  Sends website URL and user queries                          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER                        │
│  Express.js + Node.js                                        │
│  - /chatbot (POST) - Create embeddings                       │
│  - /chatbotprompt (POST) - Query chatbot                     │
│  - /workspace-query (POST) - Workspace queries               │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│  CONTENT         │      │  AI SERVICES     │
│  EXTRACTION      │      │                  │
│  - RecursiveUrl  │      │  Google Gemini   │
│  - Playwright    │      │  - Embeddings    │
│  - Text Chunking │      │  - Generation    │
└──────────────────┘      └──────────────────┘
        │                          │
        └────────────┬──────────────┘
                     ▼
        ┌──────────────────────────┐
        │  SUPABASE VECTOR DB     │
        │  - Embeddings Storage    │
        │  - Similarity Search    │
        │  - Metadata Management  │
        └──────────────────────────┘
```

## Technologies and Libraries Used

### Programming Languages
- **JavaScript (Node.js)** - Primary language for backend development

### Core Libraries and Frameworks
- **Express.js** (v4.18.2) - Web application framework
- **LangChain** (v0.0.181) - AI orchestration and document processing
- **@langchain/google-genai** (v0.2.18) - Google AI integration for LangChain
- **@google/generative-ai** (v0.24.1) - Google Gemini API client
- **@supabase/supabase-js** (v2.38.4) - Supabase client for vector database

### Web Scraping and Processing
- **langchain/document_loaders** - Web scraping utilities
  - RecursiveUrlLoader - Fast static website extraction
  - PlaywrightWebBaseLoader - Dynamic JavaScript-rendered website extraction
- **html-to-text** (v9.0.5) - HTML to clean text conversion
- **playwright** (v1.56.0) - Advanced web scraping for dynamic sites

### Database and Storage
- **Supabase** - PostgreSQL-based vector database with pgvector extension
- **HNSW Indexing** - Fast approximate nearest neighbor search

### Authentication and Security
- **jsonwebtoken** (v9.0.2) - JWT token generation and verification
- **cors** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.3.1) - Environment variable management

### Development Tools
- **serverless-http** (v3.2.0) - Serverless framework adapter
- **body-parser** (v1.20.2) - Request body parsing

### Testing
- **mocha** (v10.2.0) - Test framework
- **chai** (v4.3.10) - Assertion library
- **supertest** (v6.3.3) - HTTP assertion library

## Team Members

- **Zaid Syed** - Developer
- **Gokul Gupta** - Developer
- **Mohit Pandita** - Developer
- **Ayush Khurana** - Developer
- **Pratyush Bhat** - Developer

## Collaborators

Please add the following as collaborators to this repository:
- **surajamit** (Amit Purushottam Pimpalkar) - Project Supervisor

## Additional Resources

### API Documentation
- All API endpoints require JWT authentication
- Base URL: `http://localhost:3001` (development)
- See `api/chatbot.js` for detailed endpoint documentation

### Deployment
- The project can be deployed to AWS Lambda using the serverless framework
- Configuration files: `serverless.yml`, `deploy/deploy-to-lambda.ps1`
- Environment variables must be configured in the deployment platform

### Troubleshooting
- Ensure all environment variables are set correctly
- Verify Google API key has proper permissions
- Check Supabase connection and pgvector extension is enabled
- Review logs for detailed error messages

## License

MIT License
