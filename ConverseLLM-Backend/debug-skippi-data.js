// Debug script to check Skippi data in database
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

async function debugSkippiData() {
    console.log('🔍 Debugging Skippi data in database...\n');
    
    try {
        // Get JWT token
        const tokenResponse = await makeRequest('/signjwt');
        const token = tokenResponse.data.jwtToken;
        const authHeaders = { 'Authorization': `Bearer ${token}` };
        
        // Check all database contents
        console.log('📋 Step 1: Checking all database contents...');
        const dbResponse = await makeRequest('/debug-db', 'POST', null, authHeaders);
        console.log('✅ Database contents:', JSON.stringify(dbResponse.data, null, 2));
        
        // Test different search terms
        console.log('\n📋 Step 2: Testing different search terms...');
        const searchTerms = [
            'skippi',
            'apple',
            'juice',
            'price',
            'cost',
            'product'
        ];
        
        for (const term of searchTerms) {
            console.log(`\n   Searching for: "${term}"`);
            const searchResponse = await makeRequest('/test-simple', 'POST', {
                prompt: term,
                websiteUrl: 'skippi.in'
            });
            console.log(`   Results: ${searchResponse.data.docCount} documents`);
            if (searchResponse.data.results && searchResponse.data.results.length > 0) {
                console.log(`   First result: ${searchResponse.data.results[0].content.substring(0, 100)}...`);
            }
        }
        
        // Test without website filter
        console.log('\n📋 Step 3: Testing search without website filter...');
        const globalSearchResponse = await makeRequest('/test-simple', 'POST', {
            prompt: 'skippi',
            websiteUrl: null
        });
        console.log('✅ Global search response:', globalSearchResponse.data);
        
        // Test debug search endpoint
        console.log('\n📋 Step 4: Testing debug search endpoint...');
        const debugSearchResponse = await makeRequest('/debug-search', 'POST', {
            prompt: 'skippi'
        }, authHeaders);
        console.log('✅ Debug search response:', debugSearchResponse.data);
        
    } catch (error) {
        console.error('❌ Error debugging Skippi data:', error.message);
    }
}

// Run the debug script
debugSkippiData().then(() => {
    console.log('\n✅ Debug completed!');
}).catch(console.error);

