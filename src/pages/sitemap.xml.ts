import type { APIRoute } from 'astro';
import { seo } from '../config/seo.mjs';

export const prerender = true;

const xmlEntities: Record<string, string> = {
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
};
const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => xmlEntities[character] ?? character);

// 現在はトップページのみ。ページ内アンカーを別ページとして列挙しません。
// 更新日は実際の更新日を管理するまで省略します。
export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapeXml(seo.siteUrl)}</loc></url>\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
