FROM base
COPY --from=library-prod-deps /app/apps/borrow-mngt/node_modules/ /app/apps/borrow-mngt/node_modules
COPY --from=library-build /app/apps/borrow-mngt/dist /app/apps/borrow-mngt/dist
EXPOSE 4203
CMD [ "pnpm", "start" ]