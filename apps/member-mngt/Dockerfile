FROM base
COPY --from=library-prod-deps /app/apps/member-mngt/node_modules/ /app/apps/member-mngt/node_modules
COPY --from=library-build /app/apps/member-mngt/dist /app/apps/member-mngt/dist
EXPOSE 4201
CMD [ "pnpm", "start" ]