# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your portfolio is now running locally.

---

## 📝 Before You Deploy

### 1. Update Your Personal Information

**Update in `components/About.tsx`:**
- Edit the bio text
- Update location
- Modify your interests

**Update in `components/Experience.tsx`:**
- Add your work experiences
- Update dates and descriptions

**Update in `components/Projects.tsx`:**
- Replace placeholder projects with your real ones
- Add actual GitHub and demo links
- Update descriptions and tech stacks

**Update in `components/Skills.tsx`:**
- Modify the skills array to match your expertise
- Add or remove skill categories

**Update in `components/Contact.tsx`:**
- Update email address (change `abdulaziz@example.com` to your real email)
- Add your actual social media links

**Update in `components/Navbar.tsx` and `components/Footer.tsx`:**
- Add your LinkedIn, GitHub, and other social links

### 2. Add Your Resume

Create a PDF file and save it as:
```
public/resume.pdf
```

### 3. Update SEO

In `app/layout.tsx`, ensure the metadata reflects your information:
- Title
- Description  
- Keywords
- Open Graph tags

---

## 🎨 Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Cyan colors
    500: "#06b6d4", // Main cyan
  },
  accent: {
    // Purple colors
    500: "#a855f7", // Main purple
  },
}
```

---

## 🔧 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## 📦 Project Structure

```
portfolio/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── Navbar.tsx      # Navigation
│   ├── Footer.tsx      # Footer
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Experience.tsx  # Experience timeline
│   ├── Projects.tsx    # Projects grid
│   ├── Skills.tsx      # Skills section
│   ├── Services.tsx    # Services section
│   └── Contact.tsx     # Contact form
└── public/             # Static files
    └── favicon.ico     # Favicon
```

---

## 🚀 Deploy to Vercel

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 💡 Tips

- **Mobile Testing**: Use Chrome DevTools to test mobile responsiveness
- **Performance**: Run `npm run build` to check for optimization issues
- **SEO**: Test with Google Search Console after deployment
- **Analytics**: Consider adding Google Analytics or Vercel Analytics

---

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

**TypeScript errors?**
```bash
npm run build
# Fix any errors shown
```

---

## ✅ Pre-Deployment Checklist

- [ ] All personal information updated
- [ ] Resume PDF added to public folder
- [ ] All links and emails updated
- [ ] Social media links updated
- [ ] Projects are real and accurate
- [ ] Contact form tested
- [ ] Mobile responsive checked
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors
- [ ] All images and assets loaded correctly

---

## 🎉 Ready to Launch!

Once everything is updated, you're ready to deploy. See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

Good luck! 🚀

