# 🚀 Deploy to Vercel - Simple Steps

Your portfolio is ready to deploy! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `abdul-aziz-portfolio`)
3. **Don't initialize with README** (we already have one)

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/abdul-aziz-portfolio.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"** or **"Import Project"**
4. Select your repository (`abdul-aziz-portfolio`)
5. Vercel will auto-detect Next.js settings:
   - Framework Preset: Next.js ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
   - Install Command: `npm install` ✅
6. Click **"Deploy"**

## Step 4: Your Site is Live! 🎉

Your portfolio will be live at:
- **Automatic URL**: `https://abdul-aziz-portfolio-xxxxx.vercel.app`
- You can add a custom domain later in Vercel settings

## 🎯 After Deployment

Your site will have:
- ✅ All your real CV data
- ✅ Professional design with animations
- ✅ Resume download working
- ✅ All social links updated
- ✅ Full responsiveness
- ✅ SEO optimized

## 📝 Next Steps (Optional)

1. **Add Custom Domain**: In Vercel dashboard → Settings → Domains
2. **Update Analytics**: Add Google Analytics (optional)
3. **Connect Form**: Integrate contact form with Formspree or EmailJS

---

## 🆘 Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

**Need to update?**
- Just push new changes to GitHub
- Vercel auto-deploys on every push

---

**Good luck with your deployment! 🚀**

