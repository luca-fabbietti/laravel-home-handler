php artisan -q storage:link && \
php artisan -q migrate --force && \
php artisan -q optimize:clear && \
php artisan -q view:cache && \
php artisan -q config:cache && \
php artisan -q route:cache

