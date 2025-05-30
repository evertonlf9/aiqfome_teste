import { readFileSync } from "fs";
import { join } from "path";

export const getDataJson = () => {
  const filePath = join(process.cwd(), "src/data", "restaurants.json");
  const jsonData = readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};
