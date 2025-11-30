#!/usr/bin/env bash
set -euo pipefail

REMOTE=${REMOTE:-origin}
BRANCH=${BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
MESSAGE="Düzeltmeleri uygula"
REMOTE_URL=${REMOTE_URL:-}

# Argümanlar: isteğe bağlı bayraklar + commit mesajı
while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote-url)
      REMOTE_URL="$2"
      shift 2
      ;;
    --remote)
      REMOTE="$2"
      shift 2
      ;;
    --branch)
      BRANCH="$2"
      shift 2
      ;;
    *)
      MESSAGE="$1"
      shift 1
      ;;
  esac
done

# Yanlışlıkla commit mesajı yerine URL verilmişse REMOTE_URL olarak ele al
if [[ -z "$REMOTE_URL" ]]; then
  if [[ "$MESSAGE" =~ ^https?:// || "$MESSAGE" =~ ^git@ ]]; then
    REMOTE_URL="$MESSAGE"
    MESSAGE="Düzeltmeleri uygula"
  fi
fi

echo "[bilgi] Uzak depo: $REMOTE | Branch: $BRANCH"

# Remote gerçekten mevcut mu kontrol et, yoksa REMOTE_URL verilmişse ekle
if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  if [[ -n "${REMOTE_URL:-}" ]]; then
    echo "[bilgi] '$REMOTE' remote'u tanımlı değil. REMOTE_URL kullanılarak ekleniyor: $REMOTE_URL"
    git remote add "$REMOTE" "$REMOTE_URL"
  else
    echo "[hata] '$REMOTE' remote'u tanımlı değil. REMOTE_URL ortam değişkeniyle URL vererek otomatik ekleyebilir veya manuel eklemek için 'git remote add $REMOTE <url>' komutunu kullanabilirsiniz."
    exit 1
  fi
fi

REMOTE_URL=$(git remote get-url "$REMOTE")
echo "[bilgi] $REMOTE remote adresi: $REMOTE_URL"

git status --short

git add -A

if git diff --cached --quiet; then
  echo "[uyarı] Commit/push atlanıyor: kaydedilecek değişiklik yok."
  exit 0
fi

git commit -m "$MESSAGE"

if git ls-remote --exit-code "$REMOTE" "$BRANCH" >/dev/null 2>&1; then
  git pull --rebase "$REMOTE" "$BRANCH"
else
  echo "[bilgi] Uzakta '$BRANCH' dalı bulunamadı, rebase atlandı (ilk push olabilir)."
fi

git push "$REMOTE" "$BRANCH"

echo "[tamamlandı] Değişiklikler $REMOTE/$BRANCH'a gönderildi."
