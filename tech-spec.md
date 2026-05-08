# TaxVAD — Technical Specification

## 1. Component Inventory

### shadcn/ui Components (built-in)
- **Button** — CTAs (primary gold, secondary outline)
- **Input** — Contact form fields
- **Textarea** — Contact form message
- **Card** — Testimonial cards, package cards
- **Badge** — Industry chips, result pills
- **Separator** — Hairline dividers

### Custom Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `SplitSection` | Reusable pinned split-layout section | `direction: 'left' \| 'right'`, `photoSrc`, `photoAlt`, `label`, `children` |
| `PhotoCard` | Rounded image container with optional parallax | `src`, `alt`, `className` |
| `InfoCard` | White rounded panel with shadow | `children`, `className` |
| `VerticalLabel` | Rotated mono text label | `text`, `position: 'left' \| 'right'` |
| `ServiceItem` | Icon + text service row | `icon`, `title` |
| `StatBlock` | Number + label stat display | `value`, `label` |
| `IndustryChip` | Rounded industry tag | `label` |
| `ProcessStep` | Numbered step block | `number`, `title`, `description` |
| `TestimonialCard` | Quote card with result pill | `quote`, `author`, `role`, `result` |
| `PackageBlock` | Pricing package item | `name`, `description`, `featured?` |
| `ContactForm` | Form with validation | `onSubmit` |
| `GrainOverlay` | Static noise texture overlay | `opacity`, `blendMode` |
| `Navigation` | Fixed header with logo + links | — |

---

## 2. Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Hero load entrance** | GSAP | Timeline on mount: photo/text cards slide from ±60vw, headline words stagger reveal | High |
| **Pinned section entrance (0-30%)** | GSAP ScrollTrigger | `fromTo()` transforms: x ±60vw → 0, opacity 0 → 1, scale 0.98 → 1 | High |
| **Pinned section settle (30-70%)** | GSAP ScrollTrigger | Hold state (no animation), ambient loops only | Low |
| **Pinned section exit (70-100%)** | GSAP ScrollTrigger | `fromTo()` transforms: x ±18vw, opacity 1 → 0.25 (to 95%), then 0 | High |
| **Text stagger reveals** | GSAP | Split text to words/spans, stagger 0.03–0.06s with y + opacity | Medium |
| **Service list stagger** | GSAP ScrollTrigger | Each item: x -6vw → 0, opacity 0 → 1, stagger 0.06 | Medium |
| **Industry chips stagger** | GSAP ScrollTrigger | y +6vh → 0, scale 0.96 → 1, opacity 0 → 1, stagger 0.06 | Medium |
| **Stats row stagger** | GSAP ScrollTrigger | y +8vh → 0, opacity 0 → 1, stagger 0.08 | Medium |
| **Process steps stagger** | GSAP ScrollTrigger | x +6vw → 0, opacity 0 → 1, stagger 0.08 | Medium |
| **Testimonial card reveals** | GSAP ScrollTrigger (flowing) | y +40px → 0, opacity 0 → 1, rotate -0.5deg → 0 | Medium |
| **Contact panels slide** | GSAP ScrollTrigger (flowing) | x ±6vw → 0, opacity 0 → 1 | Low |
| **Icon float ambient** | CSS @keyframes | y: -6px loop, 3.5s yoyo, ease-in-out | Low |
| **Photo parallax ambient** | CSS @keyframes | backgroundPositionY 52% → 48%, 6s linear | Low |
| **Button hover states** | CSS transitions | scale 1.02, background color shift, 200ms | Low |
| **Scroll snap** | GSAP ScrollTrigger | Global snap derived from pinned section centers | High |

---

## 3. Animation Library Choices

### Primary: GSAP + ScrollTrigger
- **Why**: Best-in-class scrubbed scroll animations, precise timeline control, reverse scroll support
- **Use for**: All pinned section animations, text staggers, scroll-driven reveals

### Secondary: CSS Animations
- **Why**: Lightweight for ambient loops, better performance for continuous motion
- **Use for**: Icon floating, subtle parallax on photos, button hovers

### Optional: Lenis
- **Why**: Smooth scrolling can improve perceived quality
- **Note**: Only add if needed; ensure ScrollTrigger scrollerProxy is configured

---

## 4. Project File Structure

```
app/
├── public/
│   ├── images/
│   │   ├── hero_office_collaboration.jpg
│   │   ├── services_laptop_workspace.jpg
│   │   ├── expertise_professional_portrait.jpg
│   │   ├── industries_team_meeting.jpg
│   │   ├── process_desk_overhead.jpg
│   │   ├── pricing_modern_office.jpg
│   │   └── contact_map_static.jpg
│   └── grain_overlay.png
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── PhotoCard.tsx
│   │   ├── InfoCard.tsx
│   │   ├── VerticalLabel.tsx
│   │   ├── ServiceItem.tsx
│   │   ├── StatBlock.tsx
│   │   ├── IndustryChip.tsx
│   │   ├── ProcessStep.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── PackageBlock.tsx
│   │   ├── ContactForm.tsx
│   │   ├── GrainOverlay.tsx
│   │   ├── Navigation.tsx
│   │   └── SplitSection.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── IndustriesSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── ContactSection.tsx
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Dependencies

### Core
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.344.0"
  }
}
```

### Dev
```json
{
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

---

## 6. Key Implementation Notes

### Pinned Section Pattern
```tsx
// Each pinned section follows this structure
<section className="section-pinned" style={{ zIndex: sectionIndex * 10 }}>
  <div className="section-content">
    {/* Cards, text, images */}
  </div>
</section>

// ScrollTrigger config
{
  trigger: sectionRef.current,
  start: "top top",
  end: "+=130%",
  pin: true,
  scrub: 0.6,
  // animations...
}
```

### Scroll Snap Implementation
```tsx
// Global snap derived from pinned sections only
const pinned = ScrollTrigger.getAll()
  .filter(st => st.vars.pin)
  .sort((a, b) => a.start - b.start);

const maxScroll = ScrollTrigger.maxScroll(window);

// Build ranges and snap targets from pinned sections
const pinnedRanges = pinned.map(st => ({
  start: st.start / maxScroll,
  end: (st.end ?? st.start) / maxScroll,
  center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
}));

ScrollTrigger.create({
  snap: {
    snapTo: value => {
      // Find nearest pinned center
      const target = pinnedRanges.find(r => value >= r.start - 0.02 && value <= r.end + 0.02);
      if (!target) return value; // flowing section: no snap
      return target.center;
    },
    duration: { min: 0.18, max: 0.45 },
    delay: 0,
    ease: "power2.out"
  }
});
```

### Reverse Scroll Support
- Always use `fromTo()` with explicit start/end states
- Never use `to()`-only animations with scrub
- Add `onLeaveBack` to force visible state when returning to top

### Reduced Motion
```tsx
const prefersReducedMotion = useReducedMotion();

// In animations:
if (prefersReducedMotion) {
  // Skip transforms, set immediate visible state
  gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 });
  return;
}
```

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Stack cards vertically, reduce motion distances |
| Tablet | 640–1024px | Narrower cards, maintain split layout |
| Desktop | > 1024px | Full split composition as designed |

### Mobile Transform Adjustments
- Entrance: `±30vw` instead of `±60vw`
- Exit: `±10vw` instead of `±18vw`
- Photo card height: `42vh` instead of `64vh`

---

## 8. Performance Checklist

- [ ] Use `will-change: transform` on animated elements
- [ ] Use CSS transforms only (no layout properties)
- [ ] Lazy load images below the fold
- [ ] Use `transform: translateZ(0)` for GPU acceleration
- [ ] Debounce resize handlers
- [ ] Test on mid-tier mobile devices
- [ ] Verify 60fps in Chrome DevTools Performance panel

---

## 9. Color Tokens (Tailwind Config)

```js
colors: {
  background: {
    primary: '#F4F6FA',
    secondary: '#0B1C3E',
  },
  accent: {
    gold: '#C8A14E',
    'gold-dark': '#B08D3F',
  },
  text: {
    primary: '#0B1C3E',
    secondary: '#6B7280',
  }
}
```

---

## 10. Typography Scale

```css
/* Headings - Space Grotesk */
.h1 { font-size: clamp(44px, 5vw, 72px); font-weight: 300; line-height: 0.95; letter-spacing: -0.02em; }
.h2 { font-size: clamp(34px, 3.6vw, 52px); font-weight: 300; line-height: 1.0; }

/* Body - Inter */
.body { font-size: clamp(16px, 1.1vw, 18px); font-weight: 400; line-height: 1.55; }

/* Labels - IBM Plex Mono */
.label { font-size: 12px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
```