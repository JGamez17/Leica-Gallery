const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const path = require('path');

async function testUpload() {
  // Path to test image (change this)
  const imagePath = path.join(__dirname, 'test-photo.PNG');
  
  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    console.error('❌ Test image not found at:', imagePath);
    console.log('Please create a test-image.jpg in your project root');
    return;
  }

  // Create form data
  const form = new FormData();
  form.append('title', `Test Upload ${Date.now()}`);
  form.append('image', fs.createReadStream(imagePath));

  try {
    console.log('📤 Uploading image...');
    
    const response = await fetch('http://localhost:3000/api/photos', {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload successful!');
      console.log('Photo ID:', data.photo.id);
      console.log('Image URL:', data.photo.imageUrl);
    } else {
      console.log('❌ Upload failed');
      console.log('Error:', data);
    }
  } catch (error) {
    console.error('❌ Upload error:', error.message);
  }
}

testUpload();