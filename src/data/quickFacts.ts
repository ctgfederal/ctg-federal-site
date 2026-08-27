/**
 * quickFacts.ts — the "Quick Facts" block that appears on About, Customers,
 * and Resources: registration IDs, the compliance/certification list, and
 * the short list of downloadable documents beside it.
 * Copy is verbatim from the live Resources page.
 */

export interface Fact {
  label: string;
  value: string;
}

export interface DownloadLink {
  label: string;
  href: string;
  external?: boolean;
}

export const facts: Fact[] = [
  { label: 'TIN', value: '82-2775723' },
  { label: 'DUNS', value: '080932836' },
  { label: 'UEI', value: 'G2D4Q7UKR5P5' },
  { label: 'Cage Code', value: '7ZHE9' },
  { label: 'NAICS Primary Code', value: '541519' },
  { label: 'Business Type', value: 'LLC' },
];

export const compliance: string[] = [
  'Small Business Concern',
  'NIST 800-171 Certified',
  'OTTP-S Certified',
  'US Top Secret Facility Cleared',
  'DOE Q Facility Cleared',
  'Low Risk High Excellence FHR 3rd party financial health rating 2021-present',
  'ISO 9001 Certified',
  'CMMC L2 C3PAO Certified',
];

export const downloads: DownloadLink[] = [
  {
    label: 'When to Engage',
    href: '/downloads/WHEN-TO-ENGAGE_CTGF_Download.7.17.26.pdf',
    external: true,
  },
  { label: 'Online Order Status Tool', href: '/online-status-tool/' },
  {
    label: 'Complete List of Partners',
    href: '/downloads/Line_Card-CTG_Federal_7.20.26.pdf',
    external: true,
  },
  {
    label: 'Capabilities Sheet',
    href: '/downloads/CTG_Federal-Overview_Capabilities_Statement_7.20.26.pdf',
    external: true,
  },
  {
    label: 'Contracts Capabilities',
    href: '/downloads/CTG-Federal-Contracts-Capabilities_External_7.20.26.pdf',
    external: true,
  },
  {
    label: 'Warehouse Capabilities',
    href: '/downloads/CTG-Federal-Secure-Warehousing-Integration-Deployment-Services.7.20.26.pdf',
    external: true,
  },
];

export default { facts, compliance, downloads };
