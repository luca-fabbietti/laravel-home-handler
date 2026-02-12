php artisan -q storage:link && \
php artisan -q migrate --force && \
php artisan -q optimize:clear && \
php artisan -q optimize

