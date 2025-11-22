# Chatbot System Improvements

## Overview
This document outlines the major improvements made to address the chatbot's performance issues, particularly with specific product queries like "price of apple juice from Skippi".

## Problems Identified

### 1. Single Table Problem
- **Issue**: All documents from different websites were stored in one `documents` table without proper context separation
- **Impact**: Queries about Skippi products would return irrelevant Python documentation results
- **Solution**: Implemented URL-based filtering and workspace system

### 2. Poor Similarity Search
- **Issue**: The similarity search didn't filter by URL/website context
- **Impact**: Cross-contamination of results between different websites
- **Solution**: Enhanced search with URL filtering and hybrid search approach

### 3. Inadequate Chunking
- **Issue**: Documents were split into 800-character chunks without considering semantic boundaries
- **Impact**: Important information was split across chunks, reducing retrieval accuracy
- **Solution**: Improved chunking strategy with better separators and overlap

## Implemented Solutions

### 1. Enhanced Similarity Search with URL Filtering

```javascript
// New processPrompt function with website context
async function processPrompt(model, vectorStore, prompt, websiteUrl = null) {
    // Enhanced similarity search with URL filtering
    let docs = [];
    
    // Use hybrid search for better results
    docs = await hybridSearch(vectorStore, prompt, websiteUrl, 10);
    
    // Filter by URL if provided
    if (websiteUrl) {
        const urlToCheck = removeProtocol(websiteUrl);
        docs = docs.filter(doc => 
            doc.metadata && 
            doc.metadata.url && 
            doc.metadata.url.includes(urlToCheck)
        );
    }
}
```

### 2. Hybrid Search Implementation

```javascript
async function hybridSearch(vectorStore, query, websiteUrl = null, k = 10) {
    // Semantic search
    const semanticDocs = await vectorStore.similaritySearch(query, k);
    
    // Keyword search simulation (filtering by keyword presence)
    const keywordDocs = semanticDocs.filter(doc => {
        const content = doc.pageContent.toLowerCase();
        const queryWords = query.toLowerCase().split(/\s+/);
        return queryWords.some(word => content.includes(word));
    });
    
    // Filter by website if provided
    let filteredDocs = keywordDocs;
    if (websiteUrl) {
        const urlToCheck = removeProtocol(websiteUrl);
        filteredDocs = keywordDocs.filter(doc => 
            doc.metadata && 
            doc.metadata.url && 
            doc.metadata.url.includes(urlToCheck)
        );
    }
    
    // Rank by relevance score
    const rankedDocs = filteredDocs.map(doc => ({
        ...doc,
        relevanceScore: calculateRelevanceScore(doc.pageContent, query)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    return rankedDocs;
}
```

### 3. Improved Document Chunking

```javascript
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,        // Increased from 800
    chunkOverlap: 200,      // Added overlap
    separators: ["\n\n", "\n", ". ", "! ", "? ", " ", ""]  // Better separators
});
```

### 4. Workspace System

```javascript
// New endpoint for workspace-specific queries
router.post('/workspace-query', async(req, res) => {
    const workspaceId = req.body.workspaceId;
    const prompt = req.body.prompt;
    const websiteUrl = req.body.websiteUrl; // Optional: specific website within workspace
    
    const answer = await chatBotUtils.processWorkspaceQuery(workspaceId, prompt, websiteUrl);
    res.json({answer: answer, workspaceId: workspaceId});
});
```

### 5. Enhanced Context Creation

```javascript
// Enhanced context creation with better ranking
const context = docs.map((doc, index) => {
    const relevanceScore = doc.relevanceScore || calculateRelevanceScore(doc.pageContent, prompt);
    const source = doc.metadata?.url || 'Unknown source';
    return `[Source ${index + 1}: ${source}, Relevance: ${relevanceScore.toFixed(2)}]\n${doc.pageContent}`;
}).join('\n\n');
```

## New API Endpoints

### 1. Workspace Query Endpoint
- **URL**: `POST /workspace-query`
- **Purpose**: Query within a specific workspace context
- **Body**: `{workspaceId, prompt, websiteUrl?}`

### 2. Improved Search Test Endpoint
- **URL**: `POST /test-improved-search`
- **Purpose**: Test the new hybrid search functionality
- **Body**: `{prompt?, websiteUrl?}`

## Usage Examples

### 1. Query Skippi Products Specifically
```javascript
// Frontend call
const response = await fetch('/api/chatbotprompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: 'https://skippi.in',
        prompt: 'What is the price of apple juice?'
    })
});
```

### 2. Workspace-Based Query
```javascript
// Query within a specific workspace
const response = await fetch('/api/workspace-query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        workspaceId: 'ecommerce-workspace',
        prompt: 'apple juice price',
        websiteUrl: 'skippi.in'
    })
});
```

### 3. Test Improved Search
```javascript
// Test the hybrid search functionality
const response = await fetch('/api/test-improved-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        prompt: 'apple juice price',
        websiteUrl: 'skippi.in'
    })
});
```

## Benefits of the Improvements

### 1. Better Context Isolation
- Queries about Skippi products will only return Skippi-related information
- No more cross-contamination with Python documentation

### 2. Improved Accuracy
- Hybrid search combines semantic understanding with keyword matching
- Better relevance scoring and ranking

### 3. Enhanced Chunking
- Larger chunks (1000 chars) with overlap preserve more context
- Better separators maintain semantic boundaries

### 4. Workspace Support
- Multiple workspaces can be managed separately
- Each workspace can contain multiple websites

### 5. Better Debugging
- Enhanced logging shows relevance scores and source information
- Test endpoints help debug search functionality

## Migration Guide

### For Existing Users
1. **No Breaking Changes**: Existing API endpoints continue to work
2. **Enhanced Functionality**: Existing calls now benefit from improved search
3. **Optional Features**: New workspace features are optional

### For New Implementations
1. **Use Workspace System**: Implement workspace-based queries for better organization
2. **Test Search Quality**: Use the test endpoints to verify search quality
3. **Monitor Relevance Scores**: Check relevance scores in responses for quality assurance

## Future Enhancements

### 1. Database Schema Improvements
- Add workspace metadata to documents table
- Implement proper workspace isolation at database level

### 2. Advanced Search Features
- Implement full-text search with PostgreSQL
- Add faceted search capabilities
- Implement search result caching

### 3. Performance Optimizations
- Add search result caching
- Implement incremental indexing
- Add search analytics

## Testing the Improvements

### 1. Test Specific Product Queries
```bash
curl -X POST http://localhost:3001/api/test-improved-search \
  -H "Content-Type: application/json" \
  -d '{"prompt": "apple juice price", "websiteUrl": "skippi.in"}'
```

### 2. Compare Old vs New Search
```bash
# Old search (still works)
curl -X POST http://localhost:3001/api/chatbotprompt \
  -H "Content-Type: application/json" \
  -d '{"url": "https://skippi.in", "prompt": "apple juice price"}'

# New workspace search
curl -X POST http://localhost:3001/api/workspace-query \
  -H "Content-Type: application/json" \
  -d '{"workspaceId": "test", "prompt": "apple juice price", "websiteUrl": "skippi.in"}'
```

## Conclusion

These improvements address the core issues with the chatbot system:
- **Context Isolation**: Proper separation of different website contexts
- **Search Quality**: Hybrid search with better relevance scoring
- **Chunking Strategy**: Improved document processing
- **Workspace Support**: Multi-workspace architecture for better organization

The system should now provide much better results for specific product queries like "price of apple juice from Skippi" while maintaining good performance for general questions.

