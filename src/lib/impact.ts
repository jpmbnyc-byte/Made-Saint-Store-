/**
 * Public pledge. No payment has been reported yet. The house names the rate
 * and says it will share the contribution each year.
 */
export const IMPACT = {
  publishEnabled: true,
  relationshipStatus: "pledged",
  recipientName: "Brace for IMPACT 46",
  informationUrl: "https://www.braceforimpact46.com/haiti/",
  agreedBasis: "5% of annual net profits",
  rateOrAmount: "5% of annual net profits",
  reportingPeriod: "annual",
  firstYear: null,
  paymentTiming: "Each year, shared with the work it supports",
  verifiedReportUrl: null,
  nameLogoPermission: true,
} as const;

export const PLEDGE = {
  line: "A future still being made.",
  promise: "Every child deserves nourishment, an education, and room to become.",
  dedication:
    "MADE SAiNT will dedicate 5% of annual net profits to supporting children in Cap-Haïtien, Haiti, through Brace for IMPACT 46.",
  growth: "As our house grows, so does our capacity to give. Each year, we will share our contribution and the work it supports.",
} as const;
