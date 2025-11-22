# ConverseLLM - Complete Workflow Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Complete Workflow](#complete-workflow)
4. [Technology Stack](#technology-stack)
5. [Key Components](#key-components)

---

## 🎯 Overview

**ConverseLLM** is an AI-powered chatbot platform that transforms any website into an intelligent conversational experience. It uses AI to understand website content and enable natural language interactions with visitors.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  Next.js + React + Clerk Auth + TailwindCSS                 │
│  - User Dashboard                                            │
│  - Create Chatbot Interface                                  │
│  - Chat Interface                                            │
│  - Theme Support (Dark/Light)                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND API                           │
│  Express.js + Node.js                                         │
│  Port: 3001                                                   │
│  - /chatbot (POST) - Generate embeddings                      │
│  - /chatbotprompt (POST) - Query chatbot                      │
│  - /chatbot (DELETE) - Remove embeddings                      │
│  - /chatbot (PUT) - Update embeddings                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    PROCESSING PIPELINE                        │
│                                                               │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ Website URL     │→ │ Extract Content│→ │ Create Embeddings│ │
│  │ Input           │  │ (RAG Loader)  │  │ (Google GenAI)  │ │
│  └─────────────────┘  └──────────────┘  └─────────────────┘ │
│                                                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE VECTOR DATABASE                    │
│  - Stores embeddings                                         │
│  - Similarity search                                         │
│  - Metadata filtering                                        │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      GEMINI AI (Google)                      │
│  - Query processing                                          │
│  - Context retrieval                                         │
│  - Response generation                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Workflow

### **Phase 1: User Registration & Authentication**
1. User visits the application
2. Signs up/Logs in using **Clerk Authentication**
3. Clerk provides JWT tokens for backend API calls
4. User lands on the dashboard

### **Phase 2: Creating a Chatbot**

#### **Step 1: User Input**
- User navigates to dashboard
- Clicks "Create New Chatbot" button
- Enters a website URL (e.g., `https://skippi.in`)

#### **Step 2: Backend Processing**
```
POST /chatbot
Body: { url: "https://skippi.in" }
```

**Backend Flow:**
1. **Content Extraction**
   - Uses **LangChain's RecursiveUrlLoader** or **Playwright**
   - Crawls website (max depth: 4 levels)
   - Extracts content from:
     - HTML structure
     - Product listings
     - Descriptions
     - Prices
     - Testimonials
   - Converts HTML to clean text using `html-to-text`

2. **Content Processing**
   - Chunks large documents
   - Cleans and normalizes text
   - Removes navigation, headers, footers

3. **Embedding Generation**
   - Uses **Google Generative AI (text-embedding-004)**
   - Converts each chunk into a vector embedding
   - Creates embeddings with ~768 dimensions

4. **Vector Storage**
   - Stores embeddings in **Supabase** vector database
   - Adds metadata (URL, timestamp, content type)
   - Creates index for fast similarity search

#### **Step 3: Confirmation**
- Backend returns success response
- Frontend shows success message
- User can now use the chatbot

---

### **Phase 3: Querying the Chatbot**

#### **Step 1: User Query**
- User types a question (e.g., "What's the price of apple juice?")
- Message is sent to backend

#### **Step 2: Backend Processing**
```
POST /chatbotprompt
Body: { 
  url: "https://skippi.in",
  prompt: "What's the price of apple juice?"
}
```

**Backend Flow:**
1. **Create Embeddings for Query**
   - Converts user query to embedding using same model
   - This creates a "search vector"

2. **Similarity Search (Hybrid Approach)**
   - Searches Supabase for similar content
   - Uses **hybrid search**:
     - Semantic similarity (vector search)
     - Keyword matching
     - Website-specific filtering
   - Returns top 5 most relevant chunks

3. **Context Retrieval**
   - Retrieves relevant website content
   - Composes context from found documents
   - Includes metadata for source references

4. **AI Response Generation**
   - Uses **Google Gemini 2.0 Flash** model
   - Constructs prompt with:
     - User query
     - Retrieved context
     - System instructions
   - Generates intelligent response

5. **Return Response**
   - Sends AI-generated answer to frontend
   - Frontend displays response in chat interface

---

### **Phase 4: Chat Interface**

**Features:**
- Modern, clean UI with message bubbles
- Real-time typing indicators
- Loading animations
- History of conversations
- Responsive design (mobile & desktop)
- Dark mode support

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14** - React framework
- **React 18** - UI library
- **TailwindCSS** - Styling
- **Clerk** - Authentication
- **Lucide React** - Icons
- **next-themes** - Dark mode

### **Backend**
- **Node.js** - Runtime
- **Express.js** - Web framework
- **LangChain** - AI orchestration
- **Google Generative AI** - Embeddings & LLM
- **Supabase** - Vector database

### **Key AI Libraries**
- **@langchain/google-genai** - Google AI integration
- **@supabase/supabase-js** - Vector database
- **langchain/document_loaders** - Web scraping
- **html-to-text** - HTML parsing
- **playwright** - Advanced web scraping

---

## 🔑 Key Components

### **1. Frontend Components**

#### **Navbar** (`navbar.js`)
- Logo and branding
- Navigation links (Dashboard, Chatbots, Settings)
- User profile (Clerk integration)
- Dark mode toggle

#### **Dashboard** (`user-dashboard/page.js`)
- Welcome section with features
- "Create Chatbot" button
- Getting started guide
- Modern UI with gradient cards

#### **Chat Interface** (`chatbot/page.js`)
- Header with back button
- Message display area
- Input form with send button
- Loading animations
- Real-time conversation flow

#### **Create Chatbot Dialog** (`createChatbot.js`)
- URL input field
- Action buttons (Generate, Update, Delete)
- Loading states
- Toast notifications

---

### **2. Backend API Endpoints**

#### **POST /chatbot**
- **Purpose**: Create chatbot and embeddings
- **Input**: Website URL
- **Process**:
  1. Extract website content
  2. Generate embeddings
  3. Store in Supabase
- **Output**: Success/Error message

#### **POST /chatbotprompt**
- **Purpose**: Query the chatbot
- **Input**: URL + User prompt
- **Process**:
  1. Embed the query
  2. Similarity search in Supabase
  3. Generate AI response
- **Output**: AI-generated answer

#### **DELETE /chatbot**
- **Purpose**: Remove chatbot data
- **Input**: Website URL
- **Process**: Delete embeddings from Supabase
- **Output**: Confirmation

#### **PUT /chatbot**
- **Purpose**: Update chatbot content
- **Input**: Website URL
- **Process**: Re-scrape and re-embed
- **Output**: Success message

---

### **3. Core Utilities** (`chatbotutils.js`)

#### **Main Functions:**

1. **`generateChatBot(url)`**
   - Main function for creating chatbots
   - Orchestrates entire embedding process

2. **`createChatBot(url, prompt)`**
   - Handles user queries
   - Performs similarity search
   - Generates AI responses

3. **`hybridSearch(vectorStore, prompt, websiteUrl, k)`**
   - Combines semantic and keyword search
   - Filters by website
   - Returns top-k results

4. **`loadWithFallback(url)`**
   - Primary: RecursiveUrlLoader (fast)
   - Fallback: Playwright (thorough)
   - Extracts and cleans content

---

## 📊 Data Flow Example

### Example: Querying for "Apple Juice Price"

```
User Input: "What's the price of apple juice?"
                    ↓
           Frontend sends to backend
                    ↓
    POST /chatbotprompt
    {
      url: "https://skippi.in",
      prompt: "What's the price of apple juice?"
    }
                    ↓
        1. Create query embedding
        2. Similarity search in Supabase
        3. Find: "Skippi Apple Juice - ₹160"
        4. Retrieve context + metadata
                    ↓
        Send to Gemini AI with context:
        "Based on the following website content:
         [Skippi Apple Juice - ₹160...]
         Answer this query: What's the price of apple juice?"
                    ↓
        Gemini generates: "The price of apple juice is ₹160."
                    ↓
           Return to frontend
                    ↓
    User sees: "The price of apple juice is ₹160."
```

---

## 🎨 UI/UX Features

### **Dashboard**
- ✅ Modern gradient designs
- ✅ Clean card layouts
- ✅ Responsive grid system
- ✅ Dark mode support
- ✅ Smooth animations
- ✅ Hover effects

### **Chatbot Page**
- ✅ Message bubbles
- ✅ Avatar system
- ✅ Loading animations
- ✅ Typing indicators
- ✅ Clean input area
- ✅ Responsive design

### **Authentication**
- ✅ Clerk integration
- ✅ Secure JWT tokens
- ✅ User profile management
- ✅ Protected routes

---

## 🔐 Security

1. **JWT Authentication** - All API calls require valid tokens
2. **Clerk Integration** - Professional auth system
3. **Secure API Keys** - Environment variables
4. **CORS Protection** - Controlled access
5. **Input Validation** - Sanitized inputs

---

## 🚀 Key Advantages

### **1. Intelligent Content Extraction**
- Handles dynamic websites
- Extracts structured data
- Cleans unnecessary HTML
- Preserves important information

### **2. Hybrid Search**
- Combines semantic + keyword search
- More accurate results
- Faster retrieval
- Website-specific filtering

### **3. Modern UI**
- Beautiful, intuitive design
- Dark mode support
- Fully responsive
- Smooth animations

### **4. Scalable Architecture**
- Vector database for performance
- Efficient embeddings
- Fast similarity search
- Easy to extend

---

## 📝 How to Use

### **For Development:**

#### **Start Backend:**
```bash
cd ConverseLLM-Backend
npm start
```

#### **Start Frontend:**
```bash
cd ConversLLM-Frontend
npm run dev
```

#### **Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

---

## 🎯 Use Cases

1. **E-commerce Sites** - Product inquiries
2. **Documentation Sites** - Technical support
3. **Corporate Websites** - General inquiries
4. **Blogs** - Content exploration
5. **Educational Sites** - Learning assistance

---

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Custom training on user data
- [ ] Integration with more websites
- [ ] Advanced chat features
- [ ] Export conversations
- [ ] Team collaboration

---

## 📞 Support

For issues or questions:
- Check the documentation
- Review API logs
- Test with `/test-simple` endpoint
- Debug with `/debug-*` endpoints

---

**Built with ❤️ using Next.js, LangChain, Google AI, and Supabase**








