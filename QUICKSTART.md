# Quick Start Guide

Get your check cashing website running in under 10 minutes!

## Prerequisites

- Node.js 14+ installed
- A Stripe account (free at [stripe.com](https://stripe.com))
- A Netlify account (free at [netlify.com](https://netlify.com))

## Local Development (5 minutes)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd check-
npm install
```

### 2. Get Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 3. Set Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 4. Run Locally
```bash
npm run dev
```

Visit `http://localhost:8888` 🎉

## Deploy to Netlify (5 minutes)

### Option 1: One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Then add environment variables in Netlify dashboard.

### Option 2: Manual Deploy

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `public`

3. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add `STRIPE_PUBLISHABLE_KEY`
   - Add `STRIPE_SECRET_KEY`

4. **Deploy!**
   - Trigger a new deploy
   - Your site is live! 🚀

## Test Your Site

### Using Stripe Test Cards

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Card declined |
| 4000 0000 0000 9995 | ❌ Insufficient funds |

**Any expiration date in the future, any 3-digit CVC**

### Test Flow
1. Fill in the form with test data
2. Upload any two images (jpg/png)
3. Enter amount: $100.00
4. Use test card: 4242 4242 4242 4242
5. Complete payment
6. See success message! ✨

## Troubleshooting

### "Stripe is not defined" error
- Make sure environment variables are set
- Redeploy after adding variables

### Functions not working locally
- Use `npm run dev` (not `http-server`)
- Make sure port 8888 is available

### Payment fails
- Check you're using test mode keys
- Verify keys are correct in .env
- Check browser console for errors

## Next Steps

1. ✅ Test the complete flow
2. ✅ Customize the design (edit `public/styles.css`)
3. ✅ Adjust fees (edit `public/app.js`)
4. ✅ Add your branding
5. ⏭️ Go live with real Stripe keys!

## Going Live

When ready for production:

1. Complete Stripe account verification
2. Get live API keys (start with `pk_live_` and `sk_live_`)
3. Update environment variables in Netlify
4. Redeploy
5. Test with a small transaction
6. You're live! 🎊

## Need Help?

- 📖 Read the [full README](./README.md)
- 📝 Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🔍 See [FEATURES.md](./FEATURES.md)
- 🐛 Open an issue on GitHub

---

**Happy check cashing!** 💰
