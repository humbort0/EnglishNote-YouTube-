# Next.js Blog with n8n Integration

n8n에서 전송한 데이터를 블로그 형태로 표시하는 미니멀한 Next.js 애플리케이션입니다. Supabase를 백엔드로 사용하여 포스트를 저장하고 관리합니다.

## 주요 기능

- 📝 n8n 워크플로우에서 POST API로 블로그 포스트 생성
- 🎨 깔끔한 Notion 스타일 디자인
- 🏷️ 태그 지원
- ⚡ Next.js 14 App Router 사용
- 🗄️ Supabase 데이터베이스
- 🚀 Vercel 배포 최적화

## 빠른 시작

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요.
2. Supabase SQL Editor에서 `schema.sql` 파일의 SQL 명령을 실행하여 `posts` 테이블과 정책을 생성하세요.
3. 환경 변수 파일을 생성하세요:
   ```bash
   cp .env.local.example .env.local
   ```
4. `.env.local` 파일에 Supabase 프로젝트 정보를 입력하세요:
   - Project URL
   - Anon Key
   - Service Role Key (API 라우트용)

### 2. 로컬 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 블로그를 확인하세요.

## n8n에서 사용하기

### API 엔드포인트

**URL:** `POST /api/new-post`

**요청 본문 (JSON):**
```json
{
  "title": "포스트 제목",
  "content": "포스트 내용입니다. 마크다운도 사용할 수 있습니다.",
  "tags": ["태그1", "태그2"]
}
```

**필수 필드:**
- `title` (string, 최대 200자)
- `content` (string, 최대 50,000자)

**선택 필드:**
- `tags` (string[], 최대 10개)

### n8n 워크플로우 예제

1. **HTTP Request 노드** 추가
   - Method: POST
   - URL: `https://your-domain.vercel.app/api/new-post`
   - Body Content Type: JSON
   - JSON Body:
     ```json
     {
       "title": "{{ $json.title }}",
       "content": "{{ $json.content }}",
       "tags": {{ $json.tags }}
     }
     ```

2. 워크플로우를 활성화하면 자동으로 블로그에 포스트가 생성됩니다!

### curl 예제

```bash
curl -X POST https://your-domain.vercel.app/api/new-post \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "content": "This is my first post from n8n!",
    "tags": ["n8n", "automation"]
  }'
```

## Vercel 배포

### 1. Vercel 프로젝트 생성

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 프로젝트 배포
vercel
```

### 2. 환경 변수 설정

Vercel 대시보드의 프로젝트 설정에서 다음 환경 변수를 추가하세요:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key

또는 CLI로 설정:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### 3. 재배포

환경 변수를 추가한 후 재배포:

```bash
vercel --prod
```

## 프로젝트 구조

```
.
├── app/
│   ├── api/
│   │   └── new-post/
│   │       └── route.ts        # API 엔드포인트
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 페이지
├── components/
│   └── PostCard.tsx            # 포스트 카드 컴포넌트
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트
│   ├── supabase-server.ts      # Supabase 서버 클라이언트
│   └── types.ts                # TypeScript 타입 정의
├── schema.sql                  # 데이터베이스 스키마
├── vercel.json                 # Vercel 설정
└── .env.local.example          # 환경 변수 예제
```

## 데이터베이스 스키마

```sql
posts {
  id: bigint (primary key)
  title: text
  content: text
  tags: text[]
  created_at: timestamp
}
```

## 기술 스택

- **Frontend:** Next.js 14 (App Router), React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Integration:** n8n 워크플로우

## 문제 해결

### 빌드 에러가 발생하는 경우

1. 환경 변수가 올바르게 설정되었는지 확인하세요.
2. Supabase 프로젝트가 활성화되어 있는지 확인하세요.
3. `schema.sql`의 모든 명령이 실행되었는지 확인하세요.

### 포스트가 생성되지 않는 경우

1. Supabase RLS 정책이 올바르게 설정되었는지 확인하세요.
2. API 요청의 JSON 형식이 올바른지 확인하세요.
3. Supabase Service Role Key가 올바르게 설정되었는지 확인하세요.

### Vercel 배포 실패

1. 모든 환경 변수가 Vercel에 설정되었는지 확인하세요.
2. 빌드 로그를 확인하여 에러 메시지를 확인하세요.
3. 로컬에서 `npm run build`를 실행하여 빌드 에러가 없는지 확인하세요.

## 라이선스

MIT

## 지원

문제가 발생하거나 질문이 있으시면 GitHub Issues를 통해 문의해주세요.
