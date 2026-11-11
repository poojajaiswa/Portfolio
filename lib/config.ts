/* ===========================================================================
 * SITE CONFIG — edit this file first.
 * Everything here is a plain value: no build step, no CMS, no API keys.
 * ===========================================================================
 *
 *  >>> ACTION REQUIRED <<<
 *  Replace the two empty social URLs below with your real profiles. While a
 *  URL is an empty string the matching button renders in a clearly disabled
 *  state (instead of linking somewhere wrong), so nothing on the live site is
 *  ever a broken or invented link.
 */

export const site = {
  name: 'Pooja Jaiswal',
  shortName: 'Pooja Jaiswal',
  initials: 'PJ',
  title: 'Data Scientist | AI/ML Engineer | Generative AI & Agentic AI Enthusiast',
  roleShort: 'Data Scientist & AI/ML Engineer',
  tagline: 'Building Intelligent Solutions Through Data & AI.',
  location: 'Indore, Madhya Pradesh, India',
  locationShort: 'Indore, India',
  availability: 'Open to Remote & Onsite Opportunities',
  email: 'iampoojajaiswal7440@gmail.com',
  phone: '+91 7440970588',
  phoneHref: '+917440970588',

  /** Canonical production URL — also used for sitemap + social cards. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://poojajaiswal.vercel.app',

  socials: {
    /** e.g. 'https://www.linkedin.com/in/pooja-jaiswal-xxxxxxx' */
    linkedin: 'https://www.linkedin.com/in/poojajaiswal88/',
    /** e.g. 'https://github.com/your-username' */
    github: 'https://github.com/poojajaiswa',
  },

  /**
   * Resume file served from /public. Swap the PDF at
   * public/resume/Pooja-Jaiswal-Resume.pdf — keep the filename and this
   * path keeps working everywhere on the site.
   */
  resumePath: '/resume/Pooja-Jaiswal-Resume.pdf',

  /**
   * Optional profile photo. Drop a square image at
   * public/images/profile.jpg and set: profilePhoto: '/images/profile.jpg'.
   * While empty, an elegant monogram card is shown instead.
   */
  profilePhoto: '',
} as const;

/** A social/profile link counts as usable only when it is a real absolute URL. */
export const isLinkReady = (url?: string): boolean =>
  typeof url === 'string' && /^https?:\/\/\S+\.\S+/.test(url.trim());

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;

export const sectionIds = navLinks.map((l) => l.href.slice(1));
