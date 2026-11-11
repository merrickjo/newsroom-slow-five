# Newsroom Slow Five

Five slow-journalism long reads, digested twice a week (Monday and Thursday, 06:00 WIB). E-ink-first installable PWA.

- 80%: Works in Progress, Palladium, Quanta Magazine, Noema
- 10%: theology (doctrinal discourse or a recent paper), alternate editions
- 10%: other rigorous long-form or primary research, the other editions

Each edition is one JSON file in `editions/` (`YYYY-MM-DD.json`) listed in `editions/index.json`. New editions are written and pushed automatically by a scheduled Claude task.

## Recall

A private five-minute essay can accompany an edition. After saving the essay as
`Newsroom Recall/YYYY-MM-DD.md` in the Obsidian vault named `Vault`, set
`"recall": true` in that edition's JSON. The reader opens the note in Obsidian
from the edition and the last story. The device needs Obsidian and the synced
note. Editions without the marker render as usual. The public JSON and mirror
carry only the boolean. Keep essay text, titles, source notes and links in the
vault.
