const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //projectId: "52jy828i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  //dataset: "production",
  useCdn: process.NODE_ENV === "production",
});
export const previewClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //projectId: "52jy828i",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  //dataset: "production",
  useCdn: false,
  token:
    "skgdUKrWyBZBFFFnND0tWBn25HwH0dyus4w6zklZPBNUnU3XBHs7dz0nbKznTTwoQuOrnZZ5TEDSXCy7PFf5b8W0WpDmLmJZybEHL41NPWQGwMHkLzwMxbUyMNKrA77wUrYudKLKp2mX01cUvGFOLQ4xHOBLhvgztAcHQCipGL57G6rmQtBT",
});
export default client;
