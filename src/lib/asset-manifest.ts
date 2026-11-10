export type Representation = "reference" | "concept" | "sample_photo" | "production_photo";

export type AssetRecord = {
  id: string;
  path: string;
  role: string;
  creator: string;
  rightsStatus: string;
  deployable: boolean;
  location: string;
  subjectConsentStatus: string;
  productIds: string[];
  representation: Representation;
  alt: string;
};

const CAMPAIGN = "campaign study, not a documented site";

export const ASSET_MANIFEST: AssetRecord[] = [
  {
    id: "world-hero",
    path: "/world/hero.webp",
    role: "campaign-hero",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: [],
    representation: "concept",
    alt: "Lucien in an olive zip set and olive mules, campaign frame",
  },
  {
    id: "world-courtyard",
    path: "/world/courtyard.webp",
    role: "place-city",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: [],
    representation: "concept",
    alt: "Inès in the camel Saint John jacket, campaign frame",
  },
  {
    id: "world-coast",
    path: "/world/coast.webp",
    role: "place-coast",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: [],
    representation: "concept",
    alt: "Solène in the printed jersey over a white shirt and black trousers, campaign frame",
  },
  {
    id: "world-walk",
    path: "/world/walk.webp",
    role: "people-walk",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: [],
    representation: "concept",
    alt: "Ren in a sage fleece set, campaign frame",
  },
  {
    id: "world-gathering",
    path: "/world/gathering.webp",
    role: "people-table",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: [],
    representation: "concept",
    alt: "Inès in a black zip jacket, campaign frame",
  },
  {
    id: "world-milot",
    path: "/world/milot.webp",
    role: "campaign-hero",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: ["R010", "R067", "R035", "R046", "N014"],
    representation: "concept",
    alt: "Cast 003 standing in the ruins at Milot, a campaign study of Sans-Souci",
  },
  {
    id: "world-coastline",
    path: "/world/coastline.webp",
    role: "place-coast",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "original cast, not a person from a location shoot",
    productIds: ["R067"],
    representation: "concept",
    alt: "MADE SAiNT runners, duffel, and tees on the north coast, a campaign study",
  },
  ...[
    ["ref-01-cathedral", "reference_only/01-cathedral.jpg"],
    ["ref-02", "reference_only/02.jpg"],
    ["ref-03", "reference_only/03.jpg"],
    ["ref-04", "reference_only/04.jpg"],
    ["ref-05", "reference_only/05.jpg"],
    ["ref-06", "reference_only/06.jpg"],
    ["ref-07-palace", "reference_only/07-palace.jpg"],
    ["ref-08-coast", "reference_only/8-coast.jpg"],
    ["ref-09-coast", "reference_only/9-coast.jpg"],
  ].map(([id, path]): AssetRecord => ({
    id,
    path,
    role: "research",
    creator: "third-party photograph, research only",
    rightsStatus: "no commercial license or model release verified",
    deployable: false,
    location: "research reference only, not copied into the site",
    subjectConsentStatus: "not verified",
    productIds: [],
    representation: "reference",
    alt: "",
  })),
];
