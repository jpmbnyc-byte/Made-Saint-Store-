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
    alt: "A man in an ivory knit and navy trousers, standing full length on a stone terrace above the water",
  },
  {
    id: "world-courtyard",
    path: "/world/courtyard.webp",
    role: "place-city",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "no person",
    productIds: [],
    representation: "concept",
    alt: "A shaded masonry courtyard in morning light, campaign frame",
  },
  {
    id: "world-coast",
    path: "/world/coast.webp",
    role: "place-coast",
    creator: "house campaign, commissioned for this revision",
    rightsStatus: "commissioned for the house",
    deployable: true,
    location: CAMPAIGN,
    subjectConsentStatus: "no person",
    productIds: [],
    representation: "concept",
    alt: "Blue water and a green headland in early light, campaign frame",
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
    alt: "Two people walking a masonry street, full length, campaign frame",
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
    alt: "Four adults talking at a shaded table, campaign frame",
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
