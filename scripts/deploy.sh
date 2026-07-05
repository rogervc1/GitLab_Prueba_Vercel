#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Script de deploy en el servidor de producción
# Ruta en servidor: /var/www/psec/deploy.sh
#
# Llamado por el pipeline GitLab CI/CD via SSH:
#   ssh deployer@$PROD_HOST "bash /var/www/psec/deploy.sh"
#
# =============================================================================

set -euo pipefail

APP_DIR="/var/www/psec"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

echo "──────────────────────────────────────────────"
echo "  Deploy iniciado: ${TIMESTAMP}"
echo "  Commit: ${CI_COMMIT_SHA:-local}"
echo "──────────────────────────────────────────────"

# ── 1. Actualizar código ──────────────────────────────────────────────────────
echo "[1/6] git pull origin main..."
cd "${APP_DIR}"

git fetch origin main
git reset --hard origin/main
DEPLOY_COMMIT="$(git rev-parse --short HEAD)"
echo "Commit desplegado: ${DEPLOY_COMMIT}"
printf 'commit=%s\n' "${DEPLOY_COMMIT}" > public/deploy-marker.txt

echo "[2/6] Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader --no-interaction

echo "[3/6] Instalando dependencias frontend y compilando assets..."
rm -f public/hot public/index.html public/logo.png
npm ci
npm run build

echo "[4/6] Ejecutando migraciones y optimizando Laravel..."
php artisan config:clear
php artisan view:clear
php artisan migrate --force
php artisan cache:clear || echo "No se pudo limpiar cache; se continua porque las migraciones ya fueron ejecutadas."
php artisan config:cache
php artisan view:cache
php -r 'function_exists("opcache_reset") && opcache_reset();' || true

echo "[5/6] Reiniciando queue workers..."
php artisan queue:restart 2>/dev/null || true

echo "[6/6] Ajustando permisos..."
if command -v sudo >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
    sudo chown -R deployer:www-data storage bootstrap/cache
else
    echo "Sin sudo no interactivo; se omite chown."
fi
chmod -R ug+rwX storage/framework/cache storage/framework/views storage/logs bootstrap/cache 2>/dev/null \
    || echo "No se pudieron ajustar todos los permisos; revisar ownership de storage en el servidor."

test -f public/build/manifest.json
grep -E '^(APP_URL|ASSET_URL)=' .env 2>/dev/null || true
echo "Assets generados:"
ls -1 public/build/assets | head -10

# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "  [OK] Deploy completado: $(date '+%Y-%m-%d %H:%M:%S')"
echo "──────────────────────────────────────────────"
