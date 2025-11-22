// Script to add Skippi website data to vector database
const http = require('http');

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

async function addSkippiData() {
    console.log('🍎 Adding Skippi website data to vector database...\n');
    
    try {
        // Get JWT token
        console.log('📋 Step 1: Getting JWT token...');
        const tokenResponse = await makeRequest('/signjwt');
        const token = tokenResponse.data.jwtToken;
        const authHeaders = { 'Authorization': `Bearer ${token}` };
        console.log('✅ Token received');
        
        // Add Skippi website data using the chatbot endpoint
        console.log('\n📋 Step 2: Adding Skippi website data...');
        const addResponse = await makeRequest('/chatbot', 'POST', {
            url: 'https://skippi.in'
        }, authHeaders);
        
        console.log('✅ Skippi data addition response:', addResponse.data);
        
        // Wait a moment for processing
        console.log('\n⏳ Waiting for data processing...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Test the data was added
        console.log('\n📋 Step 3: Testing if data was added...');
        const testResponse = await makeRequest('/test-simple', 'POST', {
            prompt: 'apple juice',
            websiteUrl: 'skippi.in'
        });
        
        console.log('✅ Test search response:', testResponse.data);
        
        // Test workspace query with the new data
        console.log('\n📋 Step 4: Testing workspace query with new data...');
        const workspaceResponse = await makeRequest('/workspace-query', 'POST', {
            workspaceId: 'test-workspace',
            prompt: 'What is the price of apple juice?',
            websiteUrl: 'skippi.in'
        }, authHeaders);
        
        console.log('✅ Workspace query response:', workspaceResponse.data);
        
    } catch (error) {
        console.error('❌ Error adding Skippi data:', error.message);
    }
}

// Run the script
addSkippiData().then(() => {
    console.log('\n✅ Skippi data addition completed!');
}).catch(console.error);

