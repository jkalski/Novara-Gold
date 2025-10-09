// Simple test script for email functionality
const testEmailAPI = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com", 
    phone: "(555) 123-4567",
    formType: "lead",
    smsConsent: true
  };

  try {
    console.log('Testing email API...');
    console.log('Sending data:', testData);
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', result);
    
    if (response.ok) {
      console.log('✅ Email API test successful!');
    } else {
      console.log('❌ Email API test failed');
    }
  } catch (error) {
    console.error('❌ Error testing email API:', error);
  }
};

// Run the test
testEmailAPI();
