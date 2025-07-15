FROM alpine:3.22

RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" \
      >> /etc/apk/repositories \
 && apk update \
 && apk add --no-cache \
      nginx=1.28.0-r4 \
      nginx-mod-http-brotli=1.28.0-r4

COPY docker/prod/nginx/default.conf /etc/nginx/http.d/default.conf
COPY public /var/www/html/public

CMD ["nginx","-g","daemon off;"]
