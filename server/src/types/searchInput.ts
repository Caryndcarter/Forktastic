import { cuisine } from "./cuisine.js";
import { diet } from "./diet.js";

interface searchInput {
  query: string;
  cuisine?: cuisine;
  diet?: diet;
}

export default searchInput;
