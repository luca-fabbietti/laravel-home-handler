docker run --rm \
  -p 80:80 \
  -v "$(pwd)/infra/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/infra/certbot/www:/var/www/certbot" \
  certbot/certbot certonly \
    --standalone \
    --preferred-challenges http \
    -d example.com \ #TODO: replace with your domain
    -d www.example.com \ #TODO: replace with your domain
    --email you@example.com \ #TODO: replace with your e-mail
    --agree-tos \
    --no-eff-email
