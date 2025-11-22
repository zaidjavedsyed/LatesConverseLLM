// Script to examine the Skippi documents found
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

async function examineSkippiDocuments() {
    console.log('🔍 Examining Skippi documents in detail...\n');
    
    try {
        // Get JWT token
        const tokenResponse = await makeRequest('/signjwt');
        const token = tokenResponse.data.jwtToken;
        const authHeaders = { 'Authorization': `Bearer ${token}` };
        
        // Search for "juice" to get the Skippi documents
        console.log('📋 Step 1: Searching for "juice" to find Skippi documents...');
        const juiceResponse = await makeRequest('/test-simple', 'POST', {
            prompt: 'juice',
            websiteUrl: 'skippi.in'
        });
        
        console.log('✅ Juice search response:', JSON.stringify(juiceResponse.data, null, 2));
        
        // Search without website filter to see all results
        console.log('\n📋 Step 2: Searching for "juice" without website filter...');
        const globalJuiceResponse = await makeRequest('/test-simple', 'POST', {
            prompt: 'juice'
        });
        
        console.log('✅ Global juice search response:', JSON.stringify(globalJuiceResponse.data, null, 2));
        
        // Try different search terms that might be in Skippi
        console.log('\n📋 Step 3: Testing various Skippi-related search terms...');
        const searchTerms = [
            'skippi',
            'hello@skippi',
            '9429692378',
            'contact',
            'email',
            'phone'
        ];
        
        for (const term of searchTerms) {
            console.log(`\n   Searching for: "${term}"`);
            const searchResponse = await makeRequest('/test-simple', 'POST', {
                prompt: term
            });
            console.log(`   Results: ${searchResponse.data.docCount} documents`);
            if (searchResponse.data.results && searchResponse.data.results.length > 0) {
                console.log(`   First result preview: ${searchResponse.data.results[0].content.substring(0, 200)}...`);
                console.log(`   Metadata: ${JSON.stringify(searchResponse.data.results[0].metadata)}`);
            }
        }
        
        // Test workspace query with broader terms
        console.log('\n📋 Step 4: Testing workspace query with broader terms...');
        const workspaceResponse = await makeRequest('/workspace-query', 'POST', {
            workspaceId: 'test-workspace',
            prompt: 'Tell me about Skippi contact information',
            websiteUrl: 'skippi.in'
        }, authHeaders);
        
        console.log('✅ Workspace query response:', workspaceResponse.data);
        
    } catch (error) {
        console.error('❌ Error examining Skippi documents:', error.message);
    }
}

// Run the examination script
examineSkippiDocuments().then(() => {
    console.log('\n✅ Examination completed!');
}).catch(console.error);













