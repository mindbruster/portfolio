# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**

3. **Sign in with GitHub**

4. **Click "Add New Project"**

5. **Import your repository**

6. **Vercel will detect Next.js automatically**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

7. **Click "Deploy"**

8. **Your site will be live in ~2 minutes!**

   - Live URL: `https://your-project-name.vercel.app`
   - You can add a custom domain in Vercel settings

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

   For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables

If you add any environment variables, add them in Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## Custom Domain Setup

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

Example DNS records:
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

OR

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

## Post-Deployment Checklist

- [ ] Update social media links in components
- [ ] Add your resume PDF to `public/resume.pdf`
- [ ] Update email addresses in Contact and Footer
- [ ] Test all links and buttons
- [ ] Verify mobile responsiveness
- [ ] Submit sitemap to Google Search Console
- [ ] Test contact form functionality
- [ ] Check page load speed

## SEO Optimization

Your portfolio includes:
- ✅ Meta tags in `app/layout.tsx`
- ✅ Open Graph tags for social sharing
- ✅ Descriptive titles and descriptions
- ✅ Semantic HTML structure
- ✅ Responsive design

### Add Analytics (Optional)

**Google Analytics:**
1. Create a Google Analytics account
2. Get your tracking ID
3. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_TRACKING_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Monitoring & Performance

**Vercel Analytics:**
- Automatically included with Vercel deployments
- View in Vercel Dashboard → Analytics

**Lighthouse Score:**
Run Lighthouse audit:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-site.vercel.app --view
```

## Troubleshooting

### Build Fails on Vercel

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)
4. Check for TypeScript errors locally:
   ```bash
   npm run build
   ```

### Static Export Issues

If you need static export:

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Update build script:
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && next export"
  }
}
```

### Image Optimization

For external images, configure in `next.config.ts`:
```typescript
const nextConfig = {
  images: {
    domains: ['example.com'],
  },
}
```

## Alternative Hosting Options

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Cloudflare Pages
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `.next`

### Self-Hosted
```bash
npm run build
npm start
```

## Continuous Deployment

Every push to main branch will automatically trigger a new deployment on Vercel. No manual steps needed!

---

**Need Help?** Check the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) or [Vercel Documentation](https://vercel.com/docs).

