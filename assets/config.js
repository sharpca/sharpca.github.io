/* Site configuration & backend integration points.
 *
 * Today: data loads from ./data/*.json (static hosting, GitHub Pages).
 * Upgrade path (needs YOUR accounts — no credentials are committed here):
 *
 * 1) Supabase — create a project (supabase.com), then fill url/anonKey and map
 *    table names. Tables expected: `results` (single JSON row), `notes`
 *    (rows: date, title, summary). RLS: public read.
 * 2) Cloudflare Pages — this repo is buildless static output; connect it in the
 *    Cloudflare dashboard (no build command, output dir "/"), or keep GitHub
 *    Pages and add a custom domain.
 */
window.SITE_CONFIG = {
  sources: {
    results: "data/q1_results.json",
    notes: "data/notes.json"
  },
  supabase: {
    url: null,        // e.g. "https://xxxx.supabase.co"
    anonKey: null,    // public anon key (safe to expose client-side)
    table: { results: "results", notes: "notes" }
  }
};
