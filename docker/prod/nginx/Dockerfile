FROM alpine:3.22

RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" \
      >> /etc/apk/repositories \
 && apk update \
 && apk add --no-cache \
      nginx \
      nginx-mod-http-brotli

COPY docker/prod/nginx/default.conf /etc/nginx/http.d/default.conf

CMD ["nginx","-g","daemon off;"]
