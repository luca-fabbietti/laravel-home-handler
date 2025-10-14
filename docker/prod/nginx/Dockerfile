FROM alpine:3.22

RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" \
      >> /etc/apk/repositories \
 && apk update \
 && apk add --no-cache \
      nginx \
      nginx-mod-http-brotli

RUN mkdir -p /var/www/html/portfolio/public && \
    mkdir -p /var/www/html/laravel-home/public

COPY docker/prod/nginx/default.conf /etc/nginx/http.d/default.conf

CMD ["nginx","-g","daemon off;"]
