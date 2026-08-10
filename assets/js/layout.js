const SITE_NAV = [
  { href: "/", label: "홈" },
  { href: "/about.html", label: "소개" },
  { href: "/portfolio.html", label: "포트폴리오" },
  { href: "/blog/", label: "블로그" },
];

function renderHeader() {
  const nav = SITE_NAV.map(
    (item) => `<a href="${item.href}">${item.label}</a>`
  ).join("");
  return `<header><nav>${nav}</nav></header>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `<footer><p>&copy; ${year} 정태희</p></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.outerHTML = renderHeader();
  if (footerEl) footerEl.outerHTML = renderFooter();
});
