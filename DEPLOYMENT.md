# Deployment Guide for Check Cashing Website

## Quick Start - Deploy to Netlify in 5 Minutes

### Prerequisites
1. A [Netlify account](https://app.netlify.com/signup) (free)
2. A [Stripe account](https://dashboard.stripe.com/register) (free)
3. Your code pushed to GitHub

### Step-by-Step Deployment

#### 1. Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode, click "Reveal" to see it)
5. Copy both keys somewhere safe

#### 2. Deploy to Netlify

##### Option A: Using Netlify Dashboard (Easiest)

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your `check-` repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `public`
   - Click "Deploy site"

3. **Add Environment Variables**
   - After the site is deployed, go to "Site settings"
   - Click "Environment variables" in the sidebar
   - Click "Add a variable" and add:
     - Key: `STRIPE_PUBLISHABLE_KEY`
     - Value: Your Stripe publishable key (pk_test_...)
   - Click "Add a variable" again and add:
     - Key: `STRIPE_SECRET_KEY`
     - Value: Your Stripe secret key (sk_test_...)
   - Click "Save"

4. **Redeploy**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"
   - Wait for deployment to complete

5. **Your Site is Live!**
   - Click on the site URL (e.g., `https://your-site-name.netlify.app`)
   - Test the check cashing functionality

##### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Set environment variables
netlify env:set STRIPE_PUBLISHABLE_KEY "your_publishable_key_here"
netlify env:set STRIPE_SECRET_KEY "your_secret_key_here"

# Deploy to production
netlify deploy --prod
```

### 3. Test Your Deployment

#### Using Stripe Test Cards

Use these test card numbers to test payments:

| Card Number | Result |
|------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |

- Use any future expiration date
- Use any 3-digit CVC code
- Use any ZIP code

#### Test Flow

1. Visit your deployed site
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: (555) 123-4567
   - Amount: $100.00
3. Upload two images (any images will work for testing)
4. Click "Continue to Payment"
5. Enter test card: 4242 4242 4242 4242
6. Complete the payment
7. You should see a success message!

### 4. Going Live (Production Mode)

Once you're ready for real transactions:

1. **Activate Your Stripe Account**
   - In Stripe Dashboard, complete the account verification
   - Submit required business information
   - Connect your bank account

2. **Switch to Live Mode**
   - In Stripe Dashboard, toggle from "Test mode" to "Live mode"
   - Get your live API keys (they start with `pk_live_` and `sk_live_`)

3. **Update Netlify Environment Variables**
   - Go to your site in Netlify Dashboard
   - Site settings → Environment variables
   - Update both variables with your LIVE keys
   - Redeploy the site

4. **Important Production Considerations**
   - Review Stripe's terms of service
   - Understand your liability for fraudulent checks
   - Consider implementing additional security measures:
     - Identity verification
     - Check verification services
     - Fraud detection
     - Manual review process
   - Set up proper logging and monitoring
   - Implement a database to store transaction records
   - Set up email notifications
   - Create an admin dashboard for reviewing checks

## Advanced Configuration

### Custom Domain

1. In Netlify Dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

### Environment Variables for Different Environments

You can set different environment variables for:
- **Production**: Used for the live site
- **Deploy Previews**: Used for pull request previews
- **Branch Deploys**: Used for specific branches

### Webhook Setup (Optional)

For advanced features like automatic status updates:

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter your webhook URL: `https://your-site.netlify.app/.netlify/functions/webhook`
4. Select events to listen to
5. Copy the webhook signing secret
6. Add as environment variable: `STRIPE_WEBHOOK_SECRET`

### Monitoring and Analytics

1. **Netlify Analytics**
   - Enable in Site settings → Analytics
   - Track page views, top pages, and more

2. **Stripe Dashboard**
   - Monitor all payments
   - View failed payments
   - Track revenue
   - Generate reports

## Troubleshooting

### Issue: Functions not working
**Solution**: Make sure environment variables are set and site is redeployed

### Issue: Payment fails with "Invalid API key"
**Solution**: Check that STRIPE_SECRET_KEY is set correctly in Netlify

### Issue: Can't see Stripe publishable key in browser
**Solution**: Clear browser cache and reload the page

### Issue: CORS errors
**Solution**: Functions should return proper CORS headers (already configured)

## Security Checklist

- [ ] Never commit `.env` file to Git
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Keep dependencies updated
- [ ] Implement rate limiting (consider Netlify's built-in protection)
- [ ] Add CAPTCHA to prevent abuse
- [ ] Implement proper logging
- [ ] Regular security audits
- [ ] Monitor for suspicious activity

## Support

If you encounter issues:
1. Check the Netlify deploy logs
2. Check browser console for errors
3. Check Stripe logs for payment issues
4. Open an issue on GitHub

## Cost Estimates

### Netlify (Free tier includes)
- 100GB bandwidth/month
- 300 build minutes/month
- 125k serverless function requests/month

**Cost**: FREE for most small to medium sites

### Stripe Fees
- 2.9% + $0.30 per successful transaction
- No monthly fees
- No setup fees

**Example**: For a $100 check with 3% service fee:
- Service fee collected: $3.00
- Stripe fee: $0.39 (2.9% of $3.00 + $0.30)
- Your net: $2.61

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Test with Stripe test mode
3. ⏭️ Implement additional features:
   - Email notifications
   - Database integration
   - Admin dashboard
   - Check verification
4. ⏭️ Go live with real payments

Happy deploying! 🚀
