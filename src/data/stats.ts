/**
 * stats.ts — the six-up credibility bar shown on home, solutions, and about.
 * `value` is the large Oswald number, `label` the small Roboto caption below.
 * Copy is verbatim from the live site; do not invent or round these.
 */

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 'ISO 9001 & CMMC L2 C3PAO', label: 'Certified' },
  { value: 'Great Place to Work', label: '8 years running' },
  { value: 'Over $2.5 Billion', label: 'of Solutions Implemented' },
  { value: '350+', label: 'OEM Technologies Represented' },
  { value: '200+', label: 'Unique Customers Served' },
  { value: 'Dozens', label: 'of Industries Served' },
];

export default stats;
