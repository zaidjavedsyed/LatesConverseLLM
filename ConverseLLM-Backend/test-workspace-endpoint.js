const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const TEST_CONFIG = {
    workspaceId: 'test-workspace',
    websiteUrl: 'skippi.in',
    prompts: [
        'What is the price of apple juice?',
        'How much does Skippi apple juice cost?',
        'Tell me about apple juice pricing',
        'What are the apple juice prices on Skippi?',
        'Show me apple juice cost information'
    ]
};

async function testWorkspaceEndpoint() {
    console.log('🚀 Testing Workspace Endpoint with Skippi Apple Juice Queries\n');
    
    try {
        // Test 1: Basic workspace query
        console.log('📋 Test 1: Basic workspace query');
        const response1 = await axios.post(`${BASE_URL}/workspace-query`, {
            workspaceId: TEST_CONFIG.workspaceId,
            prompt: TEST_CONFIG.prompts[0],
            websiteUrl: TEST_CONFIG.websiteUrl
        });
        
        console.log('✅ Response:', response1.data);
        console.log('---\n');
        
        // Test 2: Test without website URL (workspace-wide search)
        console.log('📋 Test 2: Workspace-wide search (no specific website)');
        const response2 = await axios.post(`${BASE_URL}/workspace-query`, {
            workspaceId: TEST_CONFIG.workspaceId,
            prompt: TEST_CONFIG.prompts[1]
        });
        
        console.log('✅ Response:', response2.data);
        console.log('---\n');
        
        // Test 3: Test improved search endpoint
        console.log('📋 Test 3: Improved search functionality');
        const response3 = await axios.post(`${BASE_URL}/test-improved-search`, {
            prompt: TEST_CONFIG.prompts[2],
            websiteUrl: TEST_CONFIG.websiteUrl
        });
        
        console.log('✅ Response:', response3.data);
        console.log('---\n');
        
        // Test 4: Debug database contents
        console.log('📋 Test 4: Debug database contents');
        const response4 = await axios.post(`${BASE_URL}/debug-db`);
        
        console.log('✅ Database contents:', response4.data);
        console.log('---\n');
        
        // Test 5: Test similarity search
        console.log('📋 Test 5: Debug similarity search');
        const response5 = await axios.post(`${BASE_URL}/debug-search`, {
            prompt: TEST_CONFIG.prompts[3]
        });
        
        console.log('✅ Search results:', response5.data);
        console.log('---\n');
        
    } catch (error) {
        console.error('❌ Error testing workspace endpoint:', error.response?.data || error.message);
        
        // If server is not running, provide helpful message
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure the server is running:');
            console.log('   cd ConverseLLM-Backend');
            console.log('   npm start');
            console.log('\n   Or:');
            console.log('   node index.js');
        }
    }
}

async function testAllPrompts() {
    console.log('🔄 Testing all apple juice prompts...\n');
    
    for (let i = 0; i < TEST_CONFIG.prompts.length; i++) {
        const prompt = TEST_CONFIG.prompts[i];
        console.log(`📋 Test ${i + 1}: "${prompt}"`);
        
        try {
            const response = await axios.post(`${BASE_URL}/workspace-query`, {
                workspaceId: TEST_CONFIG.workspaceId,
                prompt: prompt,
                websiteUrl: TEST_CONFIG.websiteUrl
            });
            
            console.log('✅ Response:', response.data.answer);
            console.log('---\n');
            
        } catch (error) {
            console.error('❌ Error:', error.response?.data || error.message);
            console.log('---\n');
        }
    }
}

// Main execution
async function main() {
    console.log('🧪 Workspace Endpoint Test Suite');
    console.log('================================\n');
    
    await testWorkspaceEndpoint();
    
    console.log('\n🔄 Running all prompt tests...\n');
    await testAllPrompts();
    
    console.log('✅ Test suite completed!');
}

// Run the tests
main().catch(console.error);

