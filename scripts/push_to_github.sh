#!/usr/bin/env bash
set -euo pipefail

REMOTE=${REMOTE:-origin}
BRANCH=${BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
MESSAGE=${1:-"Düzeltmeleri uygula"}

echo "[bilgi] Uzak depo: $REMOTE | Branch: $BRANCH"

git status --short

git add -A

git commit -m "$MESSAGE" || echo "[uyarı] Commit atlanıyor: kaydedilecek değişiklik yok."

git pull --rebase "$REMOTE" "$BRANCH"

git push "$REMOTE" "$BRANCH"

echo "[tamamlandı] Değişiklikler $REMOTE/$BRANCH'a gönderildi."
