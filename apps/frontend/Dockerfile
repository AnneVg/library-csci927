FROM library-build AS frontend-build
COPY . /app
ENV REACT_APP_LIBRARY_API_URL=$REACT_APP_LIBRARY_API_URL
RUN pnpm build

FROM nginx:alpine
COPY --from=frontend-build /app/apps/frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENV REACT_APP_LIBRARY_API_URL=$REACT_APP_LIBRARY_API_URL
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=frontend-build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]