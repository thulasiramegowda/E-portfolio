const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testUpload() {
  try {
    // 1. Login
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin'
    });
    
    // Extract cookie
    const cookie = loginRes.headers['set-cookie'][0];
    
    // 2. Upload
    const form = new FormData();
    form.append('file', fs.createReadStream('test.txt'));
    
    const uploadRes = await axios.post('http://localhost:5000/api/upload', form, {
      headers: {
        ...form.getHeaders(),
        Cookie: cookie
      }
    });
    
    console.log("SUCCESS:", uploadRes.data);
  } catch (err) {
    console.error("ERROR:", err.response ? err.response.data : err.message);
  }
}

testUpload();
