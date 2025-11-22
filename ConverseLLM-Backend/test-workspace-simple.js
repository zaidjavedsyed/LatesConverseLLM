// Simple test script for workspace endpoint
const http = require('http');

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

function makeRequest(path, method = 'POST', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function testWorkspaceEndpoint() {
    console.log('🚀 Testing Workspace Endpoint with Skippi Apple Juice Queries\n');
    
    try {
        // Test 1: Get JWT token
        console.log('📋 Test 1: Getting JWT token...');
        const tokenResponse = await makeRequest('/signjwt');
        console.log('✅ Token received:', tokenResponse.data.jwtToken ? 'Yes' : 'No');
        
        const token = tokenResponse.data.jwtToken;
        const authHeaders = { 'Authorization': `Bearer ${token}` };
        
        // Test 2: Check database contents
        console.log('\n📋 Test 2: Checking database contents...');
        const dbResponse = await makeRequest('/debug-db', 'POST', null, authHeaders);
        console.log('✅ Database response:', dbResponse.data);
        
        // Test 3: Test simple search (no auth required)
        console.log('\n📋 Test 3: Testing simple search...');
        const simpleResponse = await makeRequest('/test-simple', 'POST', {
            prompt: 'apple juice price',
            websiteUrl: 'skippi.in'
        });
        console.log('✅ Simple search response:', simpleResponse.data);
        
        // Test 4: Test workspace query
        console.log('\n📋 Test 4: Testing workspace query...');
        const workspaceResponse = await makeRequest('/workspace-query', 'POST', {
            workspaceId: TEST_CONFIG.workspaceId,
            prompt: TEST_CONFIG.prompts[0],
            websiteUrl: TEST_CONFIG.websiteUrl
        }, authHeaders);
        console.log('✅ Workspace query response:', workspaceResponse.data);
        
        // Test 5: Test all prompts
        console.log('\n📋 Test 5: Testing all apple juice prompts...');
        for (let i = 0; i < TEST_CONFIG.prompts.length; i++) {
            const prompt = TEST_CONFIG.prompts[i];
            console.log(`\n   Testing prompt ${i + 1}: "${prompt}"`);
            
            try {
                const response = await makeRequest('/workspace-query', 'POST', {
                    workspaceId: TEST_CONFIG.workspaceId,
                    prompt: prompt,
                    websiteUrl: TEST_CONFIG.websiteUrl
                }, authHeaders);
                
                console.log(`   ✅ Response:`, response.data.answer || response.data);
            } catch (error) {
                console.log(`   ❌ Error:`, error.message);
            }
        }
        
    } catch (error) {
        console.error('❌ Error testing workspace endpoint:', error.message);
    }
}

// Run the tests
testWorkspaceEndpoint().then(() => {
    console.log('\n✅ Test suite completed!');
}).catch(console.error);
