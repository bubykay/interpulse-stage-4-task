import { JSONFilePreset } from "lowdb/node";

const db = await JSONFilePreset("./db.json", { products: ["hello world"] });

export default db;
