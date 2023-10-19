FROM library-build:latest
RUN pnpm db:deploy
CMD ["pnpm", "db:seeds"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]