#!/usr/bin/env bash
set -euo pipefail

REMOTE=${REMOTE:-origin}
BRANCH=${BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
MESSAGE=${1:-"Düzeltmeleri uygula"}

echo "[bilgi] Uzak depo: $REMOTE | Branch: $BRANCH"

# Remote gerçekten mevcut mu kontrol et
if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "[hata] '$REMOTE' remote'u tanımlı değil. Önce 'git remote add $REMOTE <url>' komutuyla ekleyin."
  exit 1
fi

git status --short

git add -A

git commit -m "$MESSAGE" || echo "[uyarı] Commit atlanıyor: kaydedilecek değişiklik yok."

if git ls-remote --exit-code "$REMOTE" "$BRANCH" >/dev/null 2>&1; then
  git pull --rebase "$REMOTE" "$BRANCH"
else
  echo "[bilgi] Uzakta '$BRANCH' dalı bulunamadı, rebase atlandı (ilk push olabilir)."
fi

git push "$REMOTE" "$BRANCH"

echo "[tamamlandı] Değişiklikler $REMOTE/$BRANCH'a gönderildi."
