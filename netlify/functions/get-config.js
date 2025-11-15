exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
    })
  };
};
