exports.handler = async function(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'amount', 'checkFront', 'checkBack', 'paymentIntentId'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Missing required field: ${field}` })
        };
      }
    }

    // In a real application, you would:
    // 1. Store the check images securely (e.g., AWS S3, Cloudinary)
    // 2. Save the transaction details to a database
    // 3. Send confirmation email to the customer
    // 4. Notify admin/processing team
    // 5. Potentially use OCR to extract check details
    // 6. Integrate with banking APIs for actual check processing

    // For this demo, we'll just log the transaction
    console.log('Check processing request:', {
      name: data.name,
      email: data.email,
      amount: data.amount,
      fee: data.fee,
      paymentIntentId: data.paymentIntentId,
      timestamp: new Date().toISOString()
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Check submitted successfully',
        transactionId: `CHK-${Date.now()}`,
        estimatedProcessingTime: '1-2 business days'
      })
    };
  } catch (error) {
    console.error('Error processing check:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
