/**
 * customers.ts — the seven agency seals shown in the "Our Customers" strip.
 * Order matches the live site.
 */

export interface CustomerLogo {
  name: string;
  logo: string;
}

export const customersIntro =
  'We’re trusted by some of the most complex and critical teams in the nation.';

export const customers: CustomerLogo[] = [
  { name: 'U.S. Department of Homeland Security', logo: '/images/site/DHS_sq_logo.jpg' },
  { name: 'NASA', logo: '/images/site/NASA_sq_logo.jpg' },
  { name: 'DARPA', logo: '/images/site/DARPA_sq_logo.jpg' },
  { name: 'U.S. Department of Agriculture', logo: '/images/site/USDA_sq_logo.jpg' },
  { name: 'Federal Bureau of Investigation', logo: '/images/site/FBI_sq_logo.jpg' },
  { name: 'Smithsonian Institution', logo: '/images/site/SMITHSONIAN_sq_logo.jpg' },
  { name: 'U.S. Department of Transportation', logo: '/images/site/DOT_sq_logo.jpg' },
];

export default customers;
