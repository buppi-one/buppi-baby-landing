import type { AlternatesMap } from "@/lib/blog/types";

const REDIRECT = `(function(){try{
var alt=window.__articleAlternates;if(!alt)return;
var stored=localStorage.getItem('locale');if(!stored)return;
var match=location.pathname.match(/^\\/(en|es|fr)?\\/?blog\\/([^/]+)\\/?$/);if(!match)return;
var current=match[1]||'pt-BR';if(current===stored)return;
var next=alt[stored];if(!next)return;
var prefix=stored==='pt-BR'?'':'/' + stored;
location.replace(prefix+'/blog/'+next+'/'+location.search+location.hash);
}catch(e){}})();`;

/**
 * Server component that emits two inline scripts at the very top of the
 * article page body:
 *   1. assigns window.__articleAlternates with this article's slug map
 *   2. runs the redirect logic — if the visitor has a stored locale
 *      preference different from the current page, jump to the equivalent
 *      slug in their language.
 *
 * Both run synchronously before the article paints, avoiding visible flash.
 */
export function RedirectScript({
  articleId,
  alternates,
}: {
  articleId: string;
  alternates: AlternatesMap;
}) {
  const map = alternates[articleId] ?? {};
  const payload = `window.__articleAlternates=${JSON.stringify(map)};`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: payload }} />
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
    </>
  );
}
