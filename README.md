# Quick Check Cash 💰

A modern, secure web application for cashing checks online with Stripe payment integration. Built for deployment on Netlify with serverless functions.

## Features

- 📸 **Easy Check Upload** - Snap photos of both sides of your check
- 💳 **Secure Payment Processing** - Powered by Stripe
- ⚡ **Fast Processing** - Get your money in 1-2 business days
- 🔒 **Bank-Level Security** - All data is encrypted and secure
- 📱 **Mobile Friendly** - Works perfectly on phones and tablets
- 🌐 **Serverless Architecture** - Scalable and cost-effective

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Payment Processing**: Stripe API
- **Hosting**: Netlify
- **Serverless Functions**: Netlify Functions (AWS Lambda)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- A Netlify account
- A Stripe account

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd check-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Stripe API keys:
     - Get your publishable key from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
     - Get your secret key from the same location
   ```bash
   cp .env.example .env
   # Edit .env and add your keys
   ```

4. **Run locally with Netlify Dev**
   ```bash
   npm run dev
   ```
   This will start a local server at `http://localhost:8888`

### Deployment to Netlify

#### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```

4. **Set environment variables**
   ```bash
   netlify env:set STRIPE_PUBLISHABLE_KEY "your_publishable_key"
   netlify env:set STRIPE_SECRET_KEY "your_secret_key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

#### Option 2: Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `public`
6. Add environment variables in Site Settings → Environment Variables:
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
7. Deploy!

## Configuration

### Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Dashboard](https://dashboard.stripe.com/apikeys)
3. For testing, use test mode keys (starting with `pk_test_` and `sk_test_`)
4. For production, switch to live mode keys
5. Configure webhook endpoints if needed for advanced features

### Fee Structure

The default fee structure is:
- **Service Fee**: 3% of check amount
- **Minimum Check**: $10.00
- **Maximum Check**: $5,000.00

To modify fees, edit the calculation in `public/app.js`:
```javascript
const fee = amount * 0.03; // Change 0.03 to your desired percentage
```

## Project Structure

```
check-/
├── public/                  # Static frontend files
│   ├── index.html          # Main HTML page
│   ├── styles.css          # Styling
│   └── app.js              # Frontend JavaScript
├── netlify/
│   └── functions/          # Serverless functions
│       ├── get-config.js   # Config endpoint
│       ├── create-payment-intent.js  # Payment processing
│       └── process-check.js          # Check submission
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── README.md              # This file
```

## API Endpoints

### `GET /.netlify/functions/get-config`
Returns public configuration (Stripe publishable key)

### `POST /.netlify/functions/create-payment-intent`
Creates a Stripe payment intent for the service fee
- **Body**: `{ amount: number, email: string, name: string }`
- **Returns**: `{ clientSecret: string }`

### `POST /.netlify/functions/process-check`
Processes the check submission after payment
- **Body**: `{ name, email, phone, amount, checkFront, checkBack, paymentIntentId }`
- **Returns**: `{ success: boolean, transactionId: string }`

## Security Considerations

- Never commit `.env` file with real API keys
- Always use HTTPS in production
- Validate all user inputs on both client and server
- Store check images securely (implement S3 or similar in production)
- Implement rate limiting to prevent abuse
- Use Stripe's built-in fraud detection
- Consider adding CAPTCHA for form submission

## Future Enhancements

- [ ] OCR integration for automatic check data extraction
- [ ] Email notifications via SendGrid/AWS SES
- [ ] Database integration for transaction history
- [ ] Admin dashboard for check management
- [ ] Mobile app version
- [ ] ACH integration for direct deposits
- [ ] Advanced fraud detection
- [ ] Multi-language support

## Troubleshooting

### "Stripe key not found" error
- Ensure environment variables are set in Netlify dashboard
- Redeploy the site after adding environment variables

### Payment fails
- Check that you're using test cards in test mode
- Verify Stripe keys are correct
- Check browser console for detailed errors

### Functions not working locally
- Make sure you're using `netlify dev` not a regular http-server
- Check that dependencies are installed (`npm install`)

## Testing

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for secure and convenient check cashing
