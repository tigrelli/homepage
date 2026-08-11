const PORTFOLIO_ORDER = [
  { slug: "carbon-slim", title: "Carbon Slim" },
  { slug: "industrial-carbon-platform", title: "산업단지 탄소중립 통합관제 플랫폼" },
  { slug: "msds-saas", title: "MSDS 구독형 솔루션 운영·고도화" },
  { slug: "msds-onpremise", title: "MSDS 솔루션 온프레미스 구축" },
  { slug: "account-book", title: "가계부" },
  { slug: "tft-hideout", title: "TFT Hideout" },
];

function currentSlug() {
  const match = window.location.pathname.match(/\/portfolio\/([^/]+)\.html$/);
  return match ? match[1] : null;
}

function renderPrevNext() {
  const slug = currentSlug();
  const index = PORTFOLIO_ORDER.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? PORTFOLIO_ORDER[index - 1] : null;
  const next = index >= 0 && index < PORTFOLIO_ORDER.length - 1 ? PORTFOLIO_ORDER[index + 1] : null;

  const prevHtml = prev ? `<a href="${prev.slug}.html">&larr; 이전 프로젝트</a>` : "<span></span>";
  const nextHtml = next ? `<a href="${next.slug}.html">다음 프로젝트 &rarr;</a>` : "<span></span>";

  return `<div class="detail-prevnext">${prevHtml}<a href="../portfolio.html">목록으로</a>${nextHtml}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("detail-prevnext");
  if (el) el.outerHTML = renderPrevNext();
});
