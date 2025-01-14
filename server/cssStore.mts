import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS_STORE_PATH = path.join(__dirname, ".css-store.json");

export class CssStore {
  private styles = new Map<string, string>();

  add(moduleId: string, css: string) {
    console.log("[CSS-Store] Adding CSS for:", moduleId);
    this.styles.set(moduleId, css);
    this.persist();
  }

  getCss() {
    console.log(
      "[CSS-Store] Getting CSS from:",
      Array.from(this.styles.keys())
    );
    try {
      const data = fs.readFileSync(CSS_STORE_PATH, "utf-8");
      const entries = JSON.parse(data);
      return entries.map(([_, css]: [string, string]) => css).join("\n");
    } catch (e) {
      console.log("[CSS-Store] Using in-memory CSS");
      return Array.from(this.styles.values()).join("\n");
    }
  }

  clear() {
    console.log("[CSS-Store] Clearing store");
    this.styles.clear();
    this.persist();
  }

  private persist() {
    try {
      fs.writeFileSync(
        CSS_STORE_PATH,
        JSON.stringify(Array.from(this.styles.entries()))
      );
    } catch (e) {
      console.warn("[CSS-Store] Failed to persist:", e);
    }
  }
}

export const getCssStore = () => new CssStore();
