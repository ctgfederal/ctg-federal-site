/**
 * site.ts — single source of truth for company identity, contact details,
 * and federal registration IDs. Used by BaseLayout (JSON-LD), Footer, and
 * any page that prints an address, phone, or registration number.
 */

export const site = {
  name: 'CTG Federal',
  legalLine: 'a Cohesive Technology Group company™',
  legalLineFooter: 'a Cohesive Technology Group company®',
  parentName: 'Cohesive Technology Group',
  parentUrl: 'https://www.ctgnational.com/',
  url: 'https://www.ctgfederal.com',
  tagline: 'Equipping agencies nationwide to operate with velocity and scale',
  description:
    'Empowering organizations with best-in-class IT. We deliver scalable solutions, reduce risk, and provide nationwide support.',

  address: {
    street: '1818 Library Street, Suite 500',
    locality: 'Reston',
    region: 'VA',
    postalCode: '20190',
    country: 'US',
    full: '1818 Library Street, Suite 500, Reston, VA 20190',
    mapUrl: 'https://maps.app.goo.gl/QSbB1yrWPmeDrvdx7',
  },

  phone: '703-278-3885',
  phoneHref: 'tel:703-278-3885',
  email: 'contact@ctgfederal.com',
  emailHref: 'mailto:contact@ctgfederal.com',

  linkedin: 'https://www.linkedin.com/company/ctgfednat/',
  linkedinLabel: 'CTG-Federal',
  orderStatusUrl: 'https://orders.ctgfederal.com/',

  // Federal registration identifiers
  tin: '82-2775723',
  duns: '080932836',
  uei: 'G2D4Q7UKR5P5',
  cage: '7ZHE9',
  naics: '541519',
  businessType: 'LLC',

  logo: '/images/brand/logo-horizontal-color.png',
  logoFooter: '/images/site/CTG-Federal-logo-footer.png',
  emblem: '/images/brand/emblem-navy.png',

  copyrightYear: 2026,
  fortuneLicense:
    'From Fortune Magazine. © 2025 Fortune Media IP Limited. All rights reserved. Used under license.',
} as const;

export default site;
