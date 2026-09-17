FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY app.js ./
COPY index.html ./
COPY styles.css ./
COPY logo.png ./
COPY README.md ./

EXPOSE 3000

ENV PORT=3000 \
    NODE_ENV=production

USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
