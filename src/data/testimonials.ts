/**
 * testimonials.ts — customer quotes, verbatim from the live site.
 * Bracketed edits ([CTG], [They]) are the customer's own redactions; keep them.
 */

export interface Testimonial {
  quote: string;
  attribution: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '“We have relied heavily on the expertise, knowledge and professionalism of [CTG]. They have been more than willing to support us in large and small efforts, extremely tight deadlines and off the wall requests….[They] have been an integral part of our success this year, and we could not have done it without them.”',
    attribution: 'National Defense Customer',
  },
  {
    quote:
      '“… I would like to give a massive shoutout to [CTG team member] Jeff …. No matter the time of day, he always finds a way to help or inform me on whatever I ask for. His insights and knowledge on a lot of our topics have been instrumental to getting us to where we are today.”',
    attribution: 'US Federal Missile and Space Program Customer',
  },
];

export default testimonials;
