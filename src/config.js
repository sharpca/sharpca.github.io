/* Backend integration points.
 * Static data now; Supabase ready — fill url/anonKey and api.js switches automatically. */
export const CONFIG = {
  sources: {
    results: "data/q1_results.json",
    notes: "data/notes.json",
    forensics: "data/forensics.json",
  },
  supabase: {
    url: null,
    anonKey: null,
    table: { results: "results", notes: "notes", forensics: "forensics" },
  },
};
