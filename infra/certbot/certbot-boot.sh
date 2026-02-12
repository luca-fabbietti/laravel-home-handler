docker run --rm \
  -p 80:80 \
  -v "$(pwd)/conf:/etc/letsencrypt" \
  -v "$(pwd)/www:/var/www/certbot" \
  certbot/certbot certonly \
    --webroot -w /var/www/certbot \
    --preferred-challenges http \
    -d example.com \
    --email you@example.com \
    --agree-tos \
    --no-eff-email