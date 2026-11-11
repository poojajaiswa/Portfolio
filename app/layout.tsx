import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import { site } from '@/lib/config';
import { BackgroundFX } from '@/components/BackgroundFX';
import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Preloader } from '@/components/Preloader';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

const description =
  'Pooja Jaiswal — Data Scientist and AI/ML Engineer in Indore, India. Machine learning, Generative AI, LLM and RAG applications, Agentic AI workflows, and AI for cybersecurity. Open to remote and onsite opportunities.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Data Scientist & AI/ML Engineer`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    'Pooja Jaiswal',
    'Data Scientist',
    'AI/ML Engineer',
    'Machine Learning Engineer',
    'Generative AI',
    'Agentic AI',
    'Multi-Agent AI',
    'LLM Engineering',
    'RAG',
    'Retrieval-Augmented Generation',
    'Anomaly Detection',
    'AI for Cybersecurity',
    'Threat Intelligence',
    'Python',
    'Indore',
    'Remote AI Engineer',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — Data Scientist & AI/ML Engineer`,
    description,
    url: site.url,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Data Scientist & AI/ML Engineer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05070d' },
    { media: '(prefers-color-scheme: light)', color: '#f7f9fd' },
  ],
};

/** Structured data so search engines understand who this page is about. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Data Scientist | AI/ML Engineer',
  description,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Mysore' },
    { '@type': 'CollegeOrUniversity', name: 'Prestige College' },
  ],
  knowsAbout: [
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Large Language Models',
    'Agentic AI',
    'Retrieval-Augmented Generation',
    'Data Science',
    'Anomaly Detection',
    'AI for Cybersecurity',
    'Computer Vision',
    'Natural Language Processing',
  ],
  sameAs: [site.socials.linkedin, site.socials.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Preloader />
          <BackgroundFX />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
