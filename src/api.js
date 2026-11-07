import axios from "axios";
import { CONFIG } from "./config";

const http = axios.create({ timeout: 15000 });

/* Data layer: local JSON today, Supabase REST when configured. */
export async function loadData(name) {
  const s = CONFIG.supabase;
  if (s.url && s.anonKey) {
    const { data } = await http.get(`${s.url}/rest/v1/${s.table[name]}?select=*`, {
      headers: { apikey: s.anonKey, Authorization: `Bearer ${s.anonKey}` },
    });
    return name === "results" ? data[0] : data;
  }
  const { data } = await http.get(CONFIG.sources[name]);
  return data;
}
