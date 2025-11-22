# AI-Powered Website Chatbot Using Retrieval-Augmented Generation (RAG) - Frontend

## Project Title and Description

**ConverseLLM Frontend** is the client-side web application for an AI-powered chatbot system that transforms any website into an intelligent conversational interface. Built with Next.js and React, it provides a modern, responsive user interface for creating chatbots, managing workspaces, and interacting with AI-powered chat assistants.

The frontend enables users to input website URLs, create chatbots with automatic content processing, and engage in natural language conversations with website-specific knowledge bases powered by Retrieval-Augmented Generation (RAG) architecture.

## Step-by-Step Setup Instructions

### Prerequisites

- Node.js (version 18.17.1 or higher)
- npm or yarn package manager
- Git
- Clerk account (for authentication) - Optional
- Backend API running (see Backend README)

### 1. Cloning the Repository

```bash
git clone <your-repository-url>
cd ConversLLM-Frontend
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

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/user-dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/user-dashboard
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** Replace the placeholder values with your actual Clerk keys and backend API URL.

### 4. Running the Development Server

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:3000`

### 5. Building for Production

```bash
npm run build
npm start
```

## Dataset Information

This frontend application does not use a traditional dataset. It interacts with:

- **Backend API:** Sends website URLs and user queries to the backend
- **User Input:** Website URLs provided through the UI
- **Chat History:** Stored in component state during session
- **Authentication Data:** Managed by Clerk authentication service

**Data Flow:**
1. User enters website URL in the dashboard
2. Frontend sends POST request to backend `/chatbot` endpoint
3. Backend processes website and creates embeddings
4. User queries are sent to `/chatbotprompt` endpoint
5. Backend returns AI-generated responses
6. Responses are displayed in the chat interface

## Repository Directory Structure

```
ConversLLM-Frontend/
├── src/
│   ├── app/
│   │   ├── page.js                    # Landing page
│   │   ├── layout.js                  # Root layout
│   │   ├── user-dashboard/
│   │   │   └── page.js                # User dashboard
│   │   ├── chatbot/
│   │   │   └── page.js                # Chat interface
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.jsx           # Sign-in page
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.jsx           # Sign-up page
│   ├── components/
│   │   ├── navbar.js                  # Navigation bar
│   │   ├── createChatbot.js           # Chatbot creation dialog
│   │   ├── heroSection.js             # Hero section
│   │   ├── features.js                # Features section
│   │   ├── faqs.js                    # FAQ section
│   │   ├── footer.js                  # Footer component
│   │   └── ui/                        # Reusable UI components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       └── ...
│   ├── lib/
│   │   └── utils.js                   # Utility functions
│   └── styles/
│       └── globals.css                # Global styles
├── public/
│   ├── logo.svg
│   └── ...                            # Static assets
├── package.json                        # Dependencies
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── README.md                          # This file
```

## Input and Output Examples

### Example 1: Creating a Chatbot

**User Action:**
1. Navigate to dashboard
2. Click "Create New Chatbot" button
3. Enter website URL: `https://skippi.in`
4. Click "Generate" button

**Expected Behavior:**
- Loading indicator appears
- Success toast notification: "Data added successfully"
- Chatbot is ready for queries

### Example 2: Chatting with the Bot

**User Input:**
```
"What products does Skippi offer?"
```

**Expected Output:**
```
"Skippi offers a variety of ice pops and frozen treats including Apple Juice, Orange, Mango, and other fruit-flavored ice pops. All products are made with natural ingredients."
```

### Example 3: Querying Product Information

**User Input:**
```
"What is the price of apple juice?"
```

**Expected Output:**
```
"The price of Skippi Apple Juice is ₹160. This product is available for purchase on our website."
```

## Screenshots and Diagrams

### Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                            │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │    Chat      │      │
│  │    Page      │  │              │  │  Interface   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTP/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                               │
│  - Content Extraction                                         │
│  - Embedding Generation                                       │
│  - Vector Search                                              │
│  - AI Response Generation                                     │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App Layout
├── Navbar
├── Page Content
│   ├── Hero Section
│   ├── Features Section
│   ├── Dashboard
│   │   └── Create Chatbot Dialog
│   └── Chat Interface
│       ├── Message History
│       └── Input Form
└── Footer
```

## Technologies and Libraries Used

### Programming Languages
- **JavaScript** - Primary language
- **JSX** - React component syntax

### Core Frameworks
- **Next.js** (v14.0.3) - React framework with server-side rendering
- **React** (v18) - UI library for building component-based interfaces

### UI Libraries and Styling
- **TailwindCSS** (v3.4.3) - Utility-first CSS framework
- **@radix-ui/react-*** - Accessible UI component primitives
  - react-dialog (v1.0.5)
  - react-dropdown-menu (v2.0.6)
  - react-accordion (v1.1.2)
  - react-label (v2.0.2)
- **lucide-react** (v0.359.0) - Icon library
- **framer-motion** (v11.2.4) - Animation library
- **next-themes** (v0.2.1) - Dark mode support

### Authentication
- **@clerk/nextjs** (v5.1.3) - Authentication and user management
- **@clerk/clerk-react** (v5.2.2) - React hooks for Clerk
- **@clerk/clerk-js** (v4.73.2) - Clerk JavaScript SDK

### HTTP Client
- **axios** (v1.6.1) - HTTP client for API requests

### Utilities
- **clsx** (v2.1.1) - Conditional class names
- **tailwind-merge** (v2.3.0) - Merge Tailwind classes
- **class-variance-authority** (v0.7.0) - Component variants

### Development Tools
- **ESLint** (v8) - Code linting
- **PostCSS** (v8.4.31) - CSS processing
- **Autoprefixer** (v10.4.16) - CSS vendor prefixing

## Team Members

- **Zaid Syed** - Developer
- **Gokul Gupta** - Developer
- **Mohit Pandita** - Developer
- **Ayush Khurana** - Developer
- **Pratyush Bhat** - Developer

## Collaborators

- **surajamit** (Amit Purushottam Pimpalkar) - Project Supervisor

## Additional Features

### Dark Mode Support
The application includes full dark mode support using `next-themes`. Users can toggle between light and dark themes.

### Responsive Design
The UI is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

### Key Features
- User authentication with Clerk
- Real-time chat interface
- Loading states and error handling
- Toast notifications for user feedback
- Modern gradient designs
- Smooth animations and transitions

## Troubleshooting

### Common Issues

1. **Authentication not working:**
   - Verify Clerk keys are correctly set in `.env.local`
   - Check that Clerk URLs match your application routes

2. **API connection errors:**
   - Ensure backend server is running on the specified port
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check CORS configuration on backend

3. **Build errors:**
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed
   - Check Node.js version compatibility

## License

MIT License
