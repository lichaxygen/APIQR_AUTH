FROM oven/bun:alpine
LABEL "owner.name"="xygen.io"

WORKDIR /app
COPY package.json ./app
COPY bun.lockb ./app
COPY src ./app

ENV PORT=3000
ENV SECRET_JWT=secret
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

EXPOSE 3000
RUN bun install \
    bun run dev
