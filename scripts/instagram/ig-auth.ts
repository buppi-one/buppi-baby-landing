/**
 * Instagram Graph API token helper.
 *
 * Turns a SHORT-LIVED user token (from the Graph API Explorer) into what the
 * publisher needs:
 *   - the Instagram Business Account ID
 *   - a long-lived Page access token (does not expire while permissions hold)
 *
 * You only do the manual part once:
 *   1. developers.facebook.com/tools/explorer → pick your app → User Token →
 *      add permissions: instagram_basic, instagram_content_publish,
 *      pages_show_list, pages_read_engagement, business_management → Generate.
 *   2. App ID + secret: app dashboard → Settings → Basic.
 *
 * Then run (values via env, never hard-coded):
 *   FB_APP_ID=... FB_APP_SECRET=... FB_SHORT_TOKEN=... \
 *     npx tsx scripts/instagram/ig-auth.ts
 *
 * It prints the IG_BUSINESS_ACCOUNT_ID and IG_ACCESS_TOKEN to store as secrets
 * (e.g. in ~/.zshrc, like CLOUDFLARE_TOKEN). Read-only against Graph — it never
 * publishes anything.
 */
const V = "v21.0";
const BASE = `https://graph.facebook.com/${V}`;

async function get(path: string, params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/${path}?${qs}`);
  const json = await res.json();
  if (json.error) throw new Error(`Graph API: ${json.error.message} (code ${json.error.code})`);
  return json;
}

async function main() {
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;
  const shortToken = process.env.FB_SHORT_TOKEN;
  if (!appId || !appSecret || !shortToken) {
    console.error(
      "Faltam variáveis. Rode assim:\n" +
        "  FB_APP_ID=... FB_APP_SECRET=... FB_SHORT_TOKEN=... npx tsx scripts/instagram/ig-auth.ts\n\n" +
        "FB_APP_ID / FB_APP_SECRET: app dashboard → Settings → Basic.\n" +
        "FB_SHORT_TOKEN: token gerado no Graph API Explorer (com as permissões do cabeçalho).",
    );
    process.exit(1);
  }

  console.log("1/3 · trocando por token de longa duração (60 dias)…");
  const longUser = await get("oauth/access_token", {
    grant_type: "fb_exchange_token",
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: shortToken,
  });
  const longUserToken: string = longUser.access_token;

  console.log("2/3 · buscando a(s) Página(s) do Facebook…");
  const pages = await get("me/accounts", { access_token: longUserToken, fields: "name,id,access_token" });
  const list = (pages.data ?? []) as { id: string; name: string; access_token: string }[];
  if (list.length === 0) {
    console.error(
      "\nNenhuma Página encontrada. O Instagram Business precisa estar LIGADO a uma Página do Facebook.\n" +
        "Ligue em: Página do FB → Configurações → Contas vinculadas → Instagram (ou no app do IG → conta → compartilhar em outros apps).",
    );
    process.exit(1);
  }
  if (list.length > 1) {
    console.log(`  (${list.length} páginas — usando a primeira; se for a errada, veja a lista abaixo)`);
    list.forEach((p) => console.log(`    - ${p.name} (${p.id})`));
  }
  const page = list[0];
  console.log(`  Página: ${page.name} (${page.id})`);

  console.log("3/3 · buscando a conta Instagram Business ligada…");
  const igInfo = await get(page.id, { access_token: page.access_token, fields: "instagram_business_account" });
  const igId: string | undefined = igInfo.instagram_business_account?.id;
  if (!igId) {
    console.error(
      `\nA Página "${page.name}" não tem uma conta Instagram Business vinculada.\n` +
        "Confirme que o @ é Business/Creator E está vinculado a ESSA Página.",
    );
    process.exit(1);
  }

  console.log("\n=========================================================");
  console.log("✅ Pronto! Guarde os dois valores abaixo como secrets");
  console.log("   (ex.: no ~/.zshrc, como o CLOUDFLARE_TOKEN — NUNCA commitar):\n");
  console.log(`export IG_BUSINESS_ACCOUNT_ID=${igId}`);
  console.log(`export IG_ACCESS_TOKEN=${page.access_token}`);
  console.log("\n(o IG_ACCESS_TOKEN é o token da Página derivado de um token de");
  console.log(" longa duração — não expira enquanto a senha/permissões não mudarem.)");
  console.log("=========================================================");
}

main().catch((e) => {
  console.error("\n❌ " + e.message);
  process.exit(1);
});
