# Webapp Editorial UGT Sanidad Salamanca (MVP)

Base funcional con Next.js + Prisma para gestionar ejemplares, editor por bloques, publicación pública y exportación PDF.

## Arquitectura

- **Frontend (App Router):** dashboard, editor mobile-first y lector público `/read/{slug}`.
- **Backend (Route Handlers):** creación de issues, publicación, login y exportación PDF.
- **Persistencia:** PostgreSQL con Prisma ORM.
- **Estado editor:** Zustand para bloques y páginas.
- **PWA:** `manifest.ts` + `public/sw.js` con cache offline básica.
- **Escalabilidad futura:** modelo preparado para `IssueVersion`, `Approval`, `visibility` y roles.

## Módulos MVP incluidos

- Autenticación email/password (`/api/auth/login`).
- Dashboard editorial (`/dashboard`).
- Editor por bloques (`/editor/[issueId]`) con texto + cómic simple JSON.
- Publicación y snapshot de versión (`/api/publish`).
- Lector público por slug con deep-link de página (`/read/{slug}?page=2`).
- Exportación PDF con Puppeteer (`/api/export-pdf`).
- Base para pasatiempos (`Puzzle` + componente quiz).

## Estructura

- `app/` rutas de UI y API.
- `components/` módulos visuales (cómic/pasatiempos).
- `lib/` utilidades (Prisma, auth JWT, slug).
- `prisma/schema.prisma` modelo completo editorial.
- `store/editor-store.ts` estado del editor.

## Arranque local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Configurar `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASS@localhost:5432/ugt"
   JWT_SECRET="cambia-esto"
   ```
3. Generar cliente Prisma:
   ```bash
   npm run prisma:generate
   ```
4. Migrar base de datos:
   ```bash
   npm run prisma:migrate
   ```
5. Ejecutar:
   ```bash
   npm run dev
   ```

## Flujo funcional ejemplo

1. Abrir `/dashboard` y crear issue.
2. Añadir páginas y bloques en `/editor/[issueId]`.
3. Publicar (cambia estado a `published`, guarda snapshot versionado).
4. Verlo en `/read/{publicSlug}`.
5. Exportar con `POST /api/export-pdf` enviando `{ "url": "http://localhost:3000/read/slug" }`.

## Despliegue recomendado

- **Vercel:** frontend + API routes.
- **Railway/Supabase:** PostgreSQL gestionado.
- Variables: `DATABASE_URL`, `JWT_SECRET`.
- En Vercel, el build ejecuta `prisma generate` automáticamente (`build`/`vercel-build`) para evitar el error de Prisma Client desactualizado.
- Para Puppeteer en serverless, considerar build con Chromium compatible (o job worker dedicado).

## Próximos pasos de escalabilidad

- Multi-organización (`Organization`, `Membership`).
- Cola de trabajos para exportaciones pesadas.
- Revisión editorial avanzada con historial de cambios por bloque.
- Flipbook full feature (sonido, índice lateral, fullscreen y analytics por página).
