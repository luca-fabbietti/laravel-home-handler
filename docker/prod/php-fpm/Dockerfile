FROM php:8.4-fpm-alpine AS php-fpm
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
 && docker-php-ext-install pdo_mysql bcmath \
 && apk del .build-deps
WORKDIR /var/www/html
COPY --chown=www-data:www-data . /var/www/html/
RUN rm -rf ./node_modules
RUN chmod -R 775 storage bootstrap/cache
USER www-data
EXPOSE 9000
