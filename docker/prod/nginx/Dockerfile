FROM nginx:1.28-alpine

RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache nginx-mod-http-brotli  \
    && sed -i '1i load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;' /etc/nginx/nginx.conf \
    && sed -i '2i load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf

COPY docker/prod/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/html/public
