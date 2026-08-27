/**
 * nav.ts — the whole navigation tree in one place.
 *
 *   utilityLinks  → thin bar above the header
 *   mainNav       → 4 top-level items, each a real link, each with children
 *   ctaButton     → navy "Contact" button on the right of the header
 *   footerColumns → link columns in the footer
 *
 * `external: true` renders target="_blank" rel="noopener".
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export const utilityLinks: NavLink[] = [
  { label: 'Contracts', href: '/contracts/' },
  { label: 'Tech Support', href: '/techsupport/' },
  { label: 'Resources', href: '/resources/' },
];

export const mainNav: NavItem[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Culture', href: '/culture/' },
      { label: 'History', href: '/timeline/' },
      { label: 'Philanthropy', href: '/philanthropy/' },
      {
        label: 'Sustainability',
        href: '/downloads/CTG_Sustainability_Management_and_ESG_Report-May_2024.pdf',
        external: true,
      },
      { label: 'Careers', href: '/careers/' },
      { label: 'Warehouse', href: '/warehouse/' },
      { label: 'Conference', href: '/conference/' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions/',
    children: [
      { label: 'Modern Infrastructure', href: '/modern-infrastructure/' },
      { label: 'HPC & AI/ML + GenAI', href: '/hpc-ai-ml-genai/' },
      { label: 'Cybersecurity', href: '/cybersecurity/' },
      { label: 'Networking', href: '/advanced-networking/' },
      { label: 'Cloud & Infrastructure', href: '/hybrid-cloud/' },
      {
        label: 'Unified Communications & Contact Center',
        href: '/unified-communications-contact-center/',
      },
    ],
  },
  { label: 'Partners', href: '/partners/' },
  {
    label: 'Customers',
    href: '/customers/',
    children: [
      { label: 'When to Engage', href: '/when-to-engage/' },
      { label: 'Online Order Status Tool', href: '/online-status-tool/' },
      { label: 'Become a Customer', href: '/customers/#become-a-customer' },
    ],
  },
  { label: 'Procurement Options', href: '/procurement-options/' },
];

export const ctaButton: NavLink = { label: 'Contact', href: '/contacts/' };

export const footerColumns: { links: NavLink[] }[] = [
  {
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Culture', href: '/culture/' },
      { label: 'History', href: '/timeline/' },
      { label: 'Philanthropy', href: '/philanthropy/' },
      {
        label: 'Sustainability',
        href: '/downloads/CTG_Sustainability_Management_and_ESG_Report-May_2024.pdf',
        external: true,
      },
      { label: 'Careers', href: '/careers/' },
    ],
  },
  {
    links: [
      { label: 'Solutions', href: '/solutions/' },
      { label: 'Customers', href: '/customers/' },
      { label: 'Online Order Status Tool', href: '/online-status-tool/' },
      { label: 'Procurement Options', href: '/procurement-options/' },
      { label: 'Contracts', href: '/contracts/' },
      { label: 'Tech Support', href: '/techsupport/' },
    ],
  },
];
