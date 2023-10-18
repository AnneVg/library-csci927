FROM base
COPY --from=library-prod-deps /app/apps/book-mngt/node_modules/ /app/apps/book-mngt/node_modules
COPY --from=library-build /app/apps/book-mngt/dist /app/apps/book-mngt/dist
EXPOSE 4203
CMD [ "pnpm", "start" ]