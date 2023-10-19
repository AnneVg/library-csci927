FROM library-build:latest
COPY package.json /app/
COPY turbo.json /app/
CMD ["/bin/bash", "-c", "pnpm db:deploy;pnpm db:seeds"]
