#!/bin/bash
# Commit and push a new Newsroom Slow Five edition.
# Usage: scripts/publish-edition.sh YYYY-MM-DD
set -euo pipefail
export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH
DATE="${1:?date required, e.g. 2026-10-01}"
cd "$(dirname "$0")/.."
test -f "editions/$DATE.json" || { echo "missing editions/$DATE.json"; exit 1; }
python3 -c "import json,sys; e=json.load(open('editions/$DATE.json')); assert len(e['stories'])==5; json.load(open('editions/index.json'))" \
  || { echo "edition JSON invalid"; exit 1; }
git pull -q --rebase origin main || true
git add editions/
if git diff --cached --quiet; then echo "nothing to commit"; exit 0; fi
NUM=$(python3 -c "import json; print(json.load(open('editions/$DATE.json'))['number'])")
git commit -q -m "Edition No. $NUM · $DATE"
git push -q origin main
echo "pushed: $(git log --oneline -1)"
