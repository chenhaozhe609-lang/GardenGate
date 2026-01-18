# Garden Gate

A content launch platform implementing the "mullet strategy" - high-impact visuals on social mediafront-end, SEO-friendly digital garden back-end.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Image Generation**: @vercel/og + html-to-image
- **Internationalization**: next-intl
- **Theme**: next-themes
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
GardenGate/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts & providers
│   ├── page.tsx           # Homepage
│   ├── p/[id]/           # Static detail pages
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── templates/        # Layout templates (BoldInsight, CheatSheet, ZenWriter)
│   ├── ThemeProvider.tsx # Dark mode provider
│   └── ...
├── lib/                   # Utilities & core logic
│   ├── layout-engine/    # Smart layout detection & CJK optimization
│   ├── image-generator.ts
│   └── ...
└── public/               # Static assets
```

## Features (MVP)

- ✅ Smart text input with clipboard sniffer
- ✅ Automatic layout detection (3 modes)
- ✅ CJK typography optimization
- ✅ 3:4 & 9:16 aspect ratios with safe areas
- ✅ Brand watermark insertion
- ✅ High-resolution PNG export
- ✅ Static detail pages with SEO
- ✅ Dark mode support
- ✅ Chinese/English UI

## License

Private - All Rights Reserved
