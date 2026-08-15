const SITE_NAV = [
  { href: "/", label: "홈" },
  { href: "/about.html", label: "소개" },
  { href: "/portfolio.html", label: "포트폴리오" },
  { href: "https://blog.tigrelli.com/", label: "블로그" },
];

function isCurrentPage(href) {
  const path = window.location.pathname;
  if (href === "/") return path === "/" || path === "/index.html";
  return path === href || path === href.replace(/\/$/, "/index.html");
}

function renderHeader() {
  const nav = SITE_NAV.map((item) => {
    const current = isCurrentPage(item.href);
    const cls = current ? "nav-link nav-link-current" : "nav-link";
    const aria = current ? ' aria-current="page"' : "";
    return `<a href="${item.href}" class="${cls}"${aria}>${item.label}</a>`;
  }).join("");
  return `<header class="site-header"><div class="site-header-inner"><a href="/" class="wordmark" aria-label="정태희"><span class="wordmark-badge">TH</span></a><nav class="site-nav">${nav}</nav></div></header>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer"><div class="site-footer-inner"><p class="footer-contact">문의 suraholic@gmail.com</p><p class="footer-copyright">&copy; ${year} 정태희. All rights reserved.</p></div></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.outerHTML = renderHeader();
  if (footerEl) footerEl.outerHTML = renderFooter();
});
