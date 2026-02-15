# CMS Services - AI Agent Instructions

## Project Overview
This is a React + TypeScript CMS for Canadian immigration/tax services with WhatsApp broadcasting capabilities. The frontend serves as a marketing website for services like tax filing, immigration, insurance, and investments, while Python scripts handle automated WhatsApp messaging campaigns.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite, single-page app with client-side routing
- **Backend**: Python scripts for WhatsApp Business API integration (Facebook Graph API)
- **Data**: Static JSON files in `public/` (reviews, etc.)
- **Styling**: Custom CSS with CSS variables, responsive design using clamp(), Bootstrap utility classes

## Key Components Structure
```
src/
├── components/Home/     # Reusable components (Header, Footer, HeroSection, etc.)
├── pages/              # Route components (Home, TaxFiling, ImmigrationServices, etc.)
├── styles/             # CSS files (HomeStyles.css, page-specific styles)
└── App.tsx             # Main router setup
```

## Development Workflow
- **Start dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Lint**: `npm run lint` (ESLint with React rules)
- **WhatsApp scripts**: Run with `python3 cmsWhatsapp.py` (requires CSV input, API tokens)

## Coding Patterns
- **Components**: Functional components with TypeScript, AOS animations initialized in `App.tsx`
- **Styling**: CSS variables in `:root` (brand colors: purple `#852085`, orange `#fd851d`)
- **SEO**: H1 tags with keyword-rich content, as seen in `HeroSection.tsx`
- **Responsive**: `clamp()` for fluid typography, Bootstrap classes (`d-none d-md-block`)
- **Imports**: Relative paths for components/styles, absolute for external libraries

## WhatsApp Integration
- Uses Facebook Graph API v18.0 with template messages
- CSV input format: "Name" and "Number" columns
- Rate limiting: 3-second delays between messages
- Phone cleaning: Strips spaces/dashes, adds +1 prefix for Canada
- Error handling: Continues on failures, logs status codes

## Data Handling
- Static JSON in `public/reviews.json` for testimonials
- CSV files for WhatsApp contacts (external path, not in repo)
- No database; all data is static or external

## Dependencies
- **UI**: React Router, AOS (animations), Swiper (carousels), React Icons
- **Build**: Vite, TypeScript, ESLint
- **Python**: pandas, requests (for WhatsApp scripts)

## Common Tasks
- Adding new service pages: Create in `src/pages/`, add route in `App.tsx`, style in `src/styles/pages/`
- Updating testimonials: Edit `public/reviews.json`
- WhatsApp campaigns: Update `ACCESS_TOKEN`, `PHONE_NUMBER_ID`, `TEMPLATE_NAME` in Python scripts
- Styling: Use CSS variables from `:root`, maintain responsive design patterns

## File Examples
- Component pattern: `src/components/Home/HeroSection.tsx`
- Page structure: `src/pages/Home.tsx`
- Styling approach: `src/styles/HomeStyles.css`
- WhatsApp script: `cmsWhatsapp.py`