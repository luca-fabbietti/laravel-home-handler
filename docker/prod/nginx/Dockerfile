FROM nginx:1.29-alpine

RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache nginx-mod-http-brotli=1.29.0-r0  \
    && sed -i '1i load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;' /etc/nginx/nginx.conf \
    && sed -i '2i load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf

COPY docker/prod/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY public /var/www/html/public
