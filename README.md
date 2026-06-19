# 🚀 SEDECIA Technologies — Official Website

> **SEDECIA Technologies — Smart Solutions**
> Enterprise-grade AI company website built with React + Vite

---

## 🎨 Brand Identity

| Element       | Value           |
|---------------|-----------------|
| Primary Color | `#F47920` Orange |
| Navy Color    | `#1B2A4A`       |
| Background    | `#FFFFFF` White |
| Font Display  | Syne (headings) |
| Font Body     | DM Sans         |

---

## 🗂️ Project Structure

```
smart-technologies/
├── public/                     # Static assets (favicon, og-image, etc.)
├── src/
│   ├── assets/                 # Images, SVGs, icons
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Layout wrapper
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx  + Navbar.css
│   │   │   └── Footer.jsx  + Footer.css
│   │   ├── sections/           # Homepage & reusable page sections
│   │   │   ├── HeroSection.jsx + .css
│   │   │   ├── StatsSection.jsx + .css
│   │   │   ├── ServicesSection.jsx + .css
│   │   │   ├── AboutPreview.jsx + .css
│   │   │   ├── TechStackSection.jsx + .css
│   │   │   ├── IndustriesSection.jsx + .css
│   │   │   ├── TestimonialsSection.jsx + .css
│   │   │   └── CTASection.jsx + .css
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── LoadingScreen.jsx + .css
│   │   │   ├── ChatbotWidget.jsx + .css
│   │   │   └── ScrollToTop.jsx
│   │   └── animations/         # (Add custom animation components here)
│   ├── pages/                  # Route-level page components
│   │   ├── Home.jsx
│   │   ├── About.jsx  + About.css
│   │   ├── Services.jsx
│   │   ├── Solutions.jsx
│   │   ├── Industries.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx + Contact.css
│   │   ├── Careers.jsx
│   │   ├── FAQ.jsx
│   │   └── NotFound.jsx
│   ├── hooks/                  # Custom React hooks (useScrollY, useMediaQuery, etc.)
│   ├── context/                # React Context providers (ThemeContext, AuthContext, etc.)
│   ├── utils/                  # Utility functions (formatDate, api.js, etc.)
│   ├── i18n/
│   │   ├── index.js            # i18next configuration + LANGUAGES array
│   │   └── locales/
│   │       ├── en.json         # English
│   │       ├── ar.json         # Arabic (RTL)
│   │       ├── fr.json         # French
│   │       ├── am.json         # Amharic
│   │       ├── om.json         # Afaan Oromo
│   │       └── es.json         # Spanish
│   ├── styles/
│   │   └── globals.css         # CSS variables, reset, utility classes
│   ├── App.jsx                 # Router + Providers + Lazy imports
│   └── main.jsx                # React DOM entry point
├── index.html                  # HTML shell with meta tags + Google Fonts
├── vite.config.js              # Vite config with path aliases
├── vercel.json                 # Vercel deployment config (SPA rewrite)
├── .eslintrc.cjs               # ESLint configuration
├── .gitignore
└── package.json
```

---

## ⚙️ PyCharm Setup (Optimized)

### Step 1 — Open Project in PyCharm

1. Open **PyCharm**
2. Go to **File → Open** and select the `sedecia-technologies/` folder
3. PyCharm will detect it as a JavaScript/Node project

### Step 2 — Configure Node.js Interpreter

1. Go to **File → Settings → Languages & Frameworks → Node.js**
2. Set **Node interpreter** to your installed Node.js (v18+ recommended)
3. Click **Apply**

### Step 3 — Install Dependencies

Open the **PyCharm Terminal** (bottom panel) and run:

```bash
npm install
```

### Step 4 — Configure Path Aliases (Auto-import)

1. Go to **File → Settings → Languages & Frameworks → JavaScript → Webpack**
2. Set webpack config to: `vite.config.js`
3. This enables `@/`, `@components/`, `@pages/` etc. in auto-import

### Step 5 — Enable ESLint

1. **File → Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint**
2. Select **Automatic ESLint configuration**
3. Click **Apply**

### Step 6 — Run Development Server

In PyCharm Terminal:

```bash
npm run dev
```

Your site will be live at: **http://localhost:5173**

### Step 7 — Configure npm Scripts in PyCharm

1. Open `package.json`
2. Click the ▶ icon next to `"dev"` to run directly from PyCharm
3. Or go to **Run → Edit Configurations → npm** and add a new config

---

## 🌐 Available Scripts

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint on all source files
```

---

## 🌍 Multilingual Support

The site supports **6 languages**:

| Code | Language     | Direction |
|------|--------------|-----------|
| `en` | English      | LTR       |
| `ar` | Arabic       | RTL ✓     |
| `fr` | French       | LTR       |
| `am` | Amharic      | LTR       |
| `om` | Afaan Oromo  | LTR       |
| `es` | Spanish      | LTR       |

**To add translations:**
- Open `src/i18n/locales/[lang].json`
- Add new keys matching the English `en.json` structure

**To add a new language:**
1. Create `src/i18n/locales/[code].json`
2. Add it to `src/i18n/index.js` → `resources` and `LANGUAGES` array
3. Import the JSON file in `index.js`

---

## 🚀 Deployment to Vercel

### Option A — Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Framework: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**

The `vercel.json` file handles SPA routing automatically ✓

---

## 🔧 Customization Guide

### Adding Your Logo

1. Place your logo PNG/SVG in `src/assets/`
2. Import in `Navbar.jsx` and `Footer.jsx`
3. Replace the inline SVG icon with: `<img src={logo} alt="Smart Technologies" />`

### Updating Brand Colors

All colors are CSS variables in `src/styles/globals.css`:

```css
:root {
  --orange: #F47920;       /* Your primary brand orange */
  --navy:   #1B2A4A;       /* Your navy text color */
  --white:  #FFFFFF;       /* Dominant background */
}
```

Change `--orange` to match any orange shade from your logo exactly.

### Adding a New Page

1. Create `src/pages/MyPage.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Add lazy import at the top of `App.jsx`:
   ```jsx
   const MyPage = lazy(() => import('@pages/MyPage'));
   ```
4. Add link in `Navbar.jsx` → `NAV_LINKS` array

### Adding a New Service Card

In `src/components/sections/ServicesSection.jsx`, add to the `SERVICES` array:
```js
{ key: 'newservice', icon: '🔮', title: 'New Service', desc: 'Description here.' }
```

---

## 🤖 AI Chatbot Integration

The chatbot widget in `src/components/ui/ChatbotWidget.jsx` currently uses rule-based responses.

**To connect to OpenAI/Claude API:**

1. Create `src/utils/api.js`:
```js
export async function askAI(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}
```

2. Replace `getBotResponse()` in `ChatbotWidget.jsx` with an API call
3. Add your API key securely via Vercel Environment Variables

---

## 🔐 Environment Variables

Create a `.env` file in the project root (never commit this):

```env
VITE_API_URL=https://your-backend.com/api
VITE_OPENAI_KEY=sk-...
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Access in code with: `import.meta.env.VITE_API_URL`

---

## 📦 Key Dependencies

| Package               | Purpose                          |
|-----------------------|----------------------------------|
| `react` + `react-dom` | UI Framework                     |
| `react-router-dom`    | Client-side routing              |
| `framer-motion`       | Animations & transitions         |
| `i18next`             | Internationalization             |
| `react-i18next`       | React i18n bindings              |
| `react-helmet-async`  | SEO meta tags management         |
| `react-countup`       | Animated number counters         |
| `react-hot-toast`     | Toast notifications              |
| `react-intersection-observer` | Scroll-triggered animations |
| `lenis`               | Smooth scrolling                 |
| `axios`               | HTTP client for API calls        |
| `swiper`              | Touch slider/carousel            |

---

## 📋 Roadmap (Future Features)

- [ ] **Admin Dashboard** — CMS panel for managing content
- [ ] **Blog System** — Markdown-based blog with categories
- [ ] **Portfolio CMS** — Dynamic project showcase with filters
- [ ] **Authentication** — Login system for client portal
- [ ] **Payment Integration** — Stripe for service packages
- [ ] **Email Integration** — EmailJS or Resend for contact form
- [ ] **Dark Mode** — Toggle between light and dark themes
- [ ] **PWA** — Progressive Web App with offline support
- [ ] **Analytics** — Google Analytics 4 integration
- [ ] **Live AI Chatbot** — Claude/GPT-powered chat

---

## 🆘 Support

**Email:** info@smarttechnologies.com
**Website:** https://smarttechnologies.com

---

*Built with ❤️ by Smart Technologies — Smart Solutions*
