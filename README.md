# FoodAI Web — Consumer Marketplace & QR Menu Ordering

Standalone Next.js 15/16 web application for FoodAI Platform.

## Features
- Marketplace homepage with category filters and search
- AI Chat Ordering assistant
- In-restaurant QR Code menu & ordering
- Live order tracking with WebSocket updates
- Stripe Checkout integration

## Deploying

### Option 1: Vercel (1-Click)
1. Push this folder to a GitHub repository: `foodai-web`.
2. Connect to Vercel: Import Repository.
3. Framework Preset: **Next.js**.
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.co.uk`
   - `NEXT_PUBLIC_SOCKET_URL` = `https://api.yourdomain.co.uk`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
5. Click **Deploy**.

### Option 2: Netlify
1. Connect GitHub repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Set environment variables.

### Option 3: Docker
```bash
docker build -t foodai-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api:3001 foodai-web
```

## Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```
