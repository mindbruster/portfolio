# 💼 Abdul Aziz - Portfolio Website

A next-gen, cinematic portfolio website built with Next.js, featuring AI/ML expertise and full-stack development skills.

**🚀 Live Demo**: [https://portfolio-beta-gold-49.vercel.app/](https://portfolio-beta-gold-49.vercel.app/)

![Portfolio Preview](https://via.placeholder.com/1200x600/0B0F1A/06b6d4?text=Abdul+Aziz+Portfolio)

## ✨ Features

- **🌌 Particle Background** - Animated canvas particles with connection lines
- **✨ Glassmorphism** - Modern glass-effect cards throughout
- **🎨 Neon Accents** - Cyan & Violet gradient design
- **📊 Scroll Progress Bar** - Visual feedback during navigation
- **🎯 Cursor Glow Effect** - Enhanced hover interactions
- **📱 Fully Responsive** - Perfect on all devices
- **⚡ TypeScript** - Fully typed for reliability
- **🎭 Smooth Animations** - Framer Motion throughout
- **🔍 SEO Optimized** - Ready for search engines

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: ShadCN UI
- **Language**: TypeScript
- **Fonts**: Sora (Display), Inter (Body)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 📄 Sections

### 1. Hero Section
- Animated particle background
- Typewriter effect for roles
- Social media links
- CTA buttons

### 2. About Section
- Profile overview with stats
- Education details
- Expertise highlights

### 3. Experience
- Timeline layout
- 3 internships with details
- Tech stack badges

### 4. Projects
- 6 featured projects
- Tech stack display
- GitHub & Demo links

### 5. Skills
- Categorized by domain (AI/ML, Web, Database, Tools)
- Animated skill badges
- Interactive hover effects

### 6. Services
- 4 service offerings
- Glassmorphism cards
- Professional descriptions

### 7. Contact
- Contact form
- Social links
- Contact details

## 🎨 Color Scheme

- **Background**: `#0B0F1A` (Deep Navy)
- **Primary (Cyan)**: `#06b6d4`
- **Accent (Violet)**: `#a855f7`
- **Card Background**: `rgba(15, 20, 35, 0.8)`
- **Border**: `rgba(255, 255, 255, 0.1)`

## 📝 Configuration

### Update Personal Info

1. **Hero Section** - `components/Hero.tsx`
2. **About** - `components/About.tsx`
3. **Experience** - `components/Experience.tsx`
4. **Projects** - `components/Projects.tsx`
5. **Contact** - `components/Contact.tsx`

### Update Social Links

Replace placeholders in:
- `components/Hero.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `components/Contact.tsx`

### Add Resume PDF

Place your resume at: `public/resume.pdf`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify

```bash
npm run build
netlify deploy --prod
```

## 📦 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ParticleBackground.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Services.tsx
│   ├── Contact.tsx
│   ├── CursorGlow.tsx
│   └── ScrollProgress.tsx
└── public/
    └── resume.pdf
```

## 🔧 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: "#06b6d4",    // Cyan
  accent: "#a855f7",     // Violet
  dark: {
    bg: "#0B0F1A",       // Background
  }
}
```

### Animations

Adjust animations in component files using Framer Motion variants.

### Particle Effects

Modify particle count and behavior in `components/ParticleBackground.tsx`.

## 📊 Contact Info

- **Name**: Abdul Aziz
- **Email**: mughalabdulaziz4@gmail.com
- **Phone**: +92 3434489592
- **LinkedIn**: [linkedin.com/in/abdul-aziz](https://www.linkedin.com/in/abdul-aziz)
- **GitHub**: [github.com/mindbruster](https://github.com/mindbruster)
- **Location**: Lahore, Pakistan

## 🎓 Education

**Bachelor of Computer Science**  
FAST NUCES Lahore  
August 2021 - July 2025

## 💼 Experience

- **AI/ML Intern** - Vanar (Aug 2025 - Oct 2025)
- **FYP Collaboration** - PSCA Lahore (Nov 2024 - Jan 2025)
- **AI/ML Intern** - ITSOLERA (Jul 2024 - Sep 2024)

## 🛠️ Skills

### AI/ML
Python, TensorFlow, PyTorch, Scikit-learn, NumPy, OpenCV, YOLO, RAG

### Web Development
SvelteKit, FastAPI, Tailwind, REST API, HTML/CSS, JavaScript, TypeScript

### Database
PostgreSQL, MongoDB, Firebase, MySQL

### Tools
Android Studio, VS Code, Jupyter, N8N, LangChain, Docker, Git

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [ShadCN UI](https://ui.shadcn.com/)

---

**Built with ❤️ by Abdul Aziz**
