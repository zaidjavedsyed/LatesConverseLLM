var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors')
const jwt = require('jsonwebtoken'); 

const chatBotUtils = require('../utils/chatbotutils.js');
//const generateChatBot = require('../utils/chatbotutils.js')


// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({extended:true})
router.use(bodyParser.json());
router.use(cors());
const jwtSecretKey = process.env.jwtSecretKey;
// Public route to mint a JWT must be defined BEFORE auth middleware
router.post('/signjwt',async(req,res)=>{
    const payload = {
        userId: 123,
        username: 'exampleUser',
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
      res.json({jwtToken:token})
});

// Simple test endpoint without authentication
router.post('/test-simple',async(req,res)=>{
    console.log("Testing simple endpoint...")
    try{
        const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
        const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
        const { createClient } = require("@supabase/supabase-js");
        
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004",
            apiKey: process.env.GOOGLE_API_KEY,
        });
        
        const supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL,
            process.env.PUBLIC_SUPABASE_PRIVATE_KEY
        );
        
        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabase,
            tableName: "documents",
            queryName: "match_documents",
        });
        
        const prompt = req.body.prompt || "apple juice";
        const websiteUrl = req.body.websiteUrl || "skippi.in";
        
        console.log("Testing search for:", prompt, "on website:", websiteUrl);
        
        // Test direct similarity search first
        const directResults = await vectorStore.similaritySearch(prompt, 5);
        console.log("Direct search found", directResults.length, "documents");
        
        // Test the hybrid search
        const hybridResults = await chatBotUtils.hybridSearch(vectorStore, prompt, websiteUrl, 5);
        
        const results = hybridResults.map((doc, index) => ({
            index: index,
            content: doc.pageContent.substring(0, 200),
            metadata: doc.metadata,
            relevanceScore: doc.relevanceScore
        }));
        
        res.json({ 
            success: true, 
            prompt: prompt,
            websiteUrl: websiteUrl,
            docCount: hybridResults.length,
            results: results
        });
    }catch(error){
        console.log("Test error:", error);
        res.status(500).json({ error: error.message });
    }
});
const verifyToken = (req, res, next) => {
  // Allow public access to JWT minting route and test endpoints
  if (req.path === '/signjwt' || req.path === '/test-simple' || req.path === '/debug-db') {
    return next();
  }
  var token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
 token = token.split(' ')[1];

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
        console.log(err)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Apply the middleware to all routes that require token verification
router.use(verifyToken);

router.get('/chatbot', (req, res) => {
    console.log(req.user)
    res.send('Hello World! im chatbot')
  })
router.post('/chatbot',async(req,res)=>{
    // console.log("In POST")
    // console.log(req.body);
    const fetchedUrl = req.body.url;
    // console.log(fetchedUrl)
    if(!fetchedUrl){
        res.json("Url required");
    }
    try{
        console.log("trying to send response")
        const answer = await chatBotUtils.generateChatBot(fetchedUrl);
        //res.json(answer);
        res.send(answer);
    }catch(error){
        console.log("Catch block error:",error);
        return res.status(500).send({error});
    }
    
});
router.post('/chatbotprompt',async(req,res)=>{
    console.log("In /chatbotprompt")
    const fetchedUrl = req.body.url; 
    const fetchedPrompt = req.body.prompt;
    const workspaceId = req.body.workspaceId; // Optional workspace ID
    
    if(!fetchedUrl){
        res.json("Url required")
    }
    if(!fetchedPrompt){
        res.json("Prompt required")
    }
    try{
        console.log("trying to send response")
        console.log("Workspace ID:", workspaceId);
        const answer = await chatBotUtils.createChatBot(fetchedUrl,fetchedPrompt);
        res.send(answer)
    }catch(error){
        console.log("Catch block error :",error);
        return res.status(500).send({error});
    }
    
});

// New endpoint for workspace-specific queries
router.post('/workspace-query',async(req,res)=>{
    console.log("In /workspace-query")
    const workspaceId = req.body.workspaceId;
    const prompt = req.body.prompt;
    const websiteUrl = req.body.websiteUrl; // Optional: specific website within workspace
    
    if(!workspaceId){
        return res.status(400).json({error: "Workspace ID required"});
    }
    if(!prompt){
        return res.status(400).json({error: "Prompt required"});
    }
    
    try{
        console.log("Processing workspace query for:", workspaceId);
        console.log("Website URL:", websiteUrl);
        
        const answer = await chatBotUtils.processWorkspaceQuery(workspaceId, prompt, websiteUrl);
        res.json({answer: answer, workspaceId: workspaceId});
    }catch(error){
        console.log("Workspace query error:", error);
        return res.status(500).json({error: error.message});
    }
});

// Test endpoint for improved search functionality
router.post('/test-improved-search',async(req,res)=>{
    console.log("Testing improved search functionality...")
    try{
        const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
        const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
        const { createClient } = require("@supabase/supabase-js");
        
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004",
            apiKey: process.env.GOOGLE_API_KEY,
        });
        
        const supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL,
            process.env.PUBLIC_SUPABASE_PRIVATE_KEY
        );
        
        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabase,
            tableName: "documents",
            queryName: "match_documents",
        });
        
        const prompt = req.body.prompt || "apple juice price";
        const websiteUrl = req.body.websiteUrl || "skippi.in";
        
        console.log("Testing hybrid search for:", prompt, "on website:", websiteUrl);
        
        // Test hybrid search
        const hybridResults = await chatBotUtils.hybridSearch(vectorStore, prompt, websiteUrl, 10);
        
        const results = hybridResults.map((doc, index) => ({
            index: index,
            content: doc.pageContent.substring(0, 500),
            metadata: doc.metadata,
            relevanceScore: doc.relevanceScore
        }));
        
        res.json({ 
            success: true, 
            prompt: prompt,
            websiteUrl: websiteUrl,
            docCount: hybridResults.length,
            results: results
        });
    }catch(error){
        console.log("Test improved search error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Simple test endpoint for Gemini using direct Google AI
router.post('/test-gemini-simple',async(req,res)=>{
    console.log("Testing Gemini simple connection...")
    try{
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        const result = await model.generateContent("Hello");
        const response = await result.response;
        const text = response.text();
        
        console.log("Gemini simple test response:", text);
        res.json({ success: true, response: text });
    }catch(error){
        console.log("Gemini simple test error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Debug endpoint to see what content is extracted
router.post('/debug-content',async(req,res)=>{
    console.log("Debugging content extraction...")
    try{
        const { RecursiveUrlLoader } = require("langchain/document_loaders/web/recursive_url");
        const { compile } = require("html-to-text");
        
        const compiledConvert = compile({
            wordwrap: 130,
            preserveNewlines: true,
            longWordSplit: { wrapCharacters: ['/', '-'] }
        });
        
        const loader = new RecursiveUrlLoader(req.body.url,{
            extractor: compiledConvert,
            maxDepth:2,
            excludeDirs:["https://js.langchain.com/docs/api/"],
        });
        
        const docs = await loader.load();
        console.log("Extracted content:", docs[0].pageContent.substring(0, 1000));
        
        res.json({ 
            success: true, 
            contentLength: docs[0].pageContent.length,
            preview: docs[0].pageContent.substring(0, 2000),
            fullContent: docs[0].pageContent
        });
    }catch(error){
        console.log("Debug error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Debug endpoint to test similarity search
router.post('/debug-search',async(req,res)=>{
    console.log("Debugging similarity search...")
    try{
        const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
        const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
        const { createClient } = require("@supabase/supabase-js");
        
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004",
            apiKey: process.env.GOOGLE_API_KEY,
        });
        
        const supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL,
            process.env.PUBLIC_SUPABASE_PRIVATE_KEY
        );
        
        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabase,
            tableName: "documents",
            queryName: "match_documents",
        });
        
        const docs = await vectorStore.similaritySearch(req.body.prompt, 5);
        console.log("Found", docs.length, "documents");
        
        const results = docs.map((doc, index) => ({
            index: index,
            content: doc.pageContent.substring(0, 500),
            metadata: doc.metadata
        }));
        
        res.json({ 
            success: true, 
            prompt: req.body.prompt,
            docCount: docs.length,
            results: results
        });
    }catch(error){
        console.log("Debug search error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Debug endpoint to check database contents
router.post('/debug-db',async(req,res)=>{
    console.log("Checking database contents...")
    try{
        const { createClient } = require("@supabase/supabase-js");
        
        const supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL,
            process.env.PUBLIC_SUPABASE_PRIVATE_KEY
        );
        
        const { data, error } = await supabase
            .from('documents')
            .select('id, content, metadata')
            .limit(5);
            
        if (error) {
            console.log("Database error:", error);
            return res.status(500).json({ error: error.message });
        }
        
        res.json({ 
            success: true, 
            count: data.length,
            documents: data
        });
    }catch(error){
        console.log("Debug DB error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Test endpoint to manually add a document
router.post('/test-add-doc',async(req,res)=>{
    console.log("Testing document addition...")
    try{
        const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
        const { SupabaseVectorStore } = require("langchain/vectorstores/supabase");
        const { createClient } = require("@supabase/supabase-js");
        
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004",
            apiKey: process.env.GOOGLE_API_KEY,
        });
        
        const supabase = createClient(
            process.env.PUBLIC_SUPABASE_URL,
            process.env.PUBLIC_SUPABASE_PRIVATE_KEY
        );
        
        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabase,
            tableName: "documents",
            queryName: "match_documents",
        });
        
        // Create a simple test document
        const testDoc = {
            pageContent: "Skippi Apple Juice costs ₹160. This is a test document.",
            metadata: { url: "skippi.in" }
        };
        
        console.log("Adding test document...");
        const ids = await vectorStore.addDocuments([testDoc]);
        console.log("Added document with IDs:", ids);
        
        res.json({ 
            success: true, 
            ids: ids,
            message: "Test document added successfully"
        });
    }catch(error){
        console.log("Test add doc error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Test embedding generation
router.post('/test-embeddings',async(req,res)=>{
    console.log("Testing embedding generation...")
    try{
        const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
        
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004",
            apiKey: process.env.GOOGLE_API_KEY,
        });
        
        console.log("Generating embeddings for test text...");
        const testText = "Skippi Apple Juice costs ₹160";
        const result = await embeddings.embedQuery(testText);
        
        console.log("Generated embedding with", result.length, "dimensions");
        
        res.json({ 
            success: true, 
            dimensions: result.length,
            message: "Embedding generation successful"
        });
    }catch(error){
        console.log("Test embeddings error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/chatbot',async(req,res)=>{
    console.log("In Delete")
    // console.log(req.body);
    const fetchedUrl = req.body.url;
  //  console.log(fetchedUrl)
    if(!fetchedUrl){
        res.json("Url required");
    }
    try{
        console.log("trying to delete")
        const answer = await chatBotUtils.removeEmbeddings(fetchedUrl);
        res.send(answer);
    }catch(error){
        console.log("Catch block error:",error);
        return res.status(500).send({error});
    }
    
});
router.put('/chatbot',async(req,res)=>{
    console.log("In IN PUT")
    // console.log(req.body);
    const fetchedUrl = req.body.url;
   // console.log(fetchedUrl)
    if(!fetchedUrl){
        res.json("Url required");
    }
    try{
        console.log("trying to send response")
        const answer = await chatBotUtils.updateEmbeddings(fetchedUrl);
        //res.json(answer);
        res.status(200).send(answer);
    }catch(error){
        console.log("Catch block error:",error);
        return res.status(500).send({error});
    }
});


module.exports=router;