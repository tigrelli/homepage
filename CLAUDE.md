# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 항상 먼저 참고하는 규칙 문서입니다.

## 프로젝트 개요

정태희 개인 홈페이지(포트폴리오) + 블로그. 서버·빌드 과정 없는 순수 정적 HTML/CSS/JS로 제작하며, PM(사용자)이 내용을 의뢰하면 Claude Code가 직접 HTML을 생성·수정한다. 블로그는 카테고리 분류와 방문자 댓글 기능을 가진다.

상세 기획/기술 결정 근거는 `docs/블로그-댓글-운영방안-기술스택.md` 참고. 이 문서와 내용이 충돌하면 `docs/블로그-댓글-운영방안-기술스택.md` 쪽을 우선하고, 그 결과를 이 CLAUDE.md에도 반영한다.

## 기술 스택 (요약)

| 영역 | 선택 |
|---|---|
| 버전관리/배포 | GitHub + GitHub Pages, push 시 자동 배포 |
| 빌드 | 없음 (순수 HTML/CSS/JS) |
| 블로그 목록/카테고리 | `blog/posts.json`, `blog/categories.json` 정적 인덱스 + 클라이언트 JS 필터링 |
| 댓글 | Supabase (Postgres + Edge Function `submit-comment`), 스팸 방지: Cloudflare Turnstile + IP rate limit |
| 이미지 | Claude Code가 생성, `/assets/images`에 WebP로 저장 |
| SEO/메타 | 페이지별 title·description·OG 태그 + `sitemap.xml`/`robots.txt`, Google Search Console + 네이버 서치어드바이저 등록 |

호스팅은 Vercel 대비 검토 후 GitHub Pages로 확정했다 (근거: `docs/블로그-댓글-운영방안-기술스택.md` 4장).

세부 스키마(comments 테이블, RLS 정책 등)는 `docs/블로그-댓글-운영방안-기술스택.md` 5장을 그대로 따른다. 여기서 반복하지 않는다.

## 폴더 구조

```
index.html, about.html, portfolio.html   # 홈페이지
blog/index.html                          # 블로그 목록
blog/posts.json                          # 글 메타데이터 인덱스
blog/categories.json                     # 카테고리 고정 목록
blog/posts/*.html                        # 개별 글
assets/images/, assets/js/, assets/css/  # 공통 리소스
docs/                                    # 기획 문서 (수정 금지, 참고만)
진행현황.md                              # 작업 체크리스트 (매 작업 전/후 확인)
```

## 작업 원칙 (토큰 절약이 목적)

1. **한 번의 요청 = 진행현황.md의 체크리스트 항목 1개.** 여러 항목을 한번에 처리하려 하지 않는다. 항목이 크면 진행현황.md에 하위 항목으로 더 쪼갠다.
2. **필요한 파일만 연다.** 작업과 무관한 파일이나 `docs/` 전체를 습관적으로 읽지 않는다. `docs/블로그-댓글-운영방안-기술스택.md`는 해당 기능(댓글, 카테고리 등) 작업 시에만 필요한 절만 참고한다.
3. **작업 시작 전 진행현황.md에서 다음 미완료 항목을 확인**하고, 그 항목의 완료 기준을 벗어나는 범위까지 손대지 않는다.
4. **작업 완료 후 진행현황.md의 체크박스와 "현재 상태"를 갱신**한다. 커밋에도 포함한다.
5. 기존 코드를 크게 갈아엎는 리팩터링은 지시받았을 때만 한다. 요청받지 않은 개선은 하지 않는다.

## 코딩 컨벤션

- HTML/CSS/JS는 파일당 자기완결적으로 작성 (프레임워크·번들러 없음)
- 공통 UI(헤더/푸터/댓글/카테고리 필터)는 `assets/js/`의 공용 스크립트로 분리해 각 페이지에서 재사용
- 새 블로그 글의 `slug`는 `YYYY-MM-DD-영문요약` 형식, 파일명과 `posts.json`의 키를 동일하게 유지
- 새 페이지·블로그 글을 추가할 때는 해당 URL을 `sitemap.xml`에 함께 추가하고, `title`/`meta description`/OG 태그를 반드시 채운다
- 커밋 메시지: `[home]`, `[blog]`, `[comment]`, `[setup]` 등 영역 접두사 + 한 줄 요약

## 절대 하지 말 것

- Supabase **service role key**를 클라이언트 HTML/JS에 넣지 않는다. Edge Function 환경변수에만 둔다.
- `.env`, API 키, Turnstile secret key를 커밋하지 않는다 (`.gitignore` 확인).
- `comments` 테이블에 anon 역할의 INSERT 정책을 추가하지 않는다 (Edge Function 경유 원칙 유지).
- `docs/` 폴더의 기획 문서 내용을 임의로 고치지 않는다 (수정이 필요하면 PM에게 먼저 알린다).
