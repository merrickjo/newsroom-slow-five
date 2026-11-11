# Newsroom Slow Five

Five slow-journalism long reads, digested twice a week (Monday and Thursday, 06:00 WIB). E-ink-first installable PWA.

- 80%: Works in Progress, Palladium, Quanta Magazine, Noema
- 10%: theology (doctrinal discourse or a recent paper), alternate editions
- 10%: other rigorous long-form or primary research, the other editions

Each edition is one JSON file in `editions/` (`YYYY-MM-DD.json`) listed in `editions/index.json`. New editions are written and pushed automatically by a scheduled Claude task.

## Recall

Add one five-minute, non-theology essay as the optional top-level `recall`
object in the edition JSON. The five news entries remain in `stories`.
Recall uses `kicker`, `headline`, `dek`, `body` (paragraph strings and
`## ` subheads), `questions` (one prompt), and `sources` (public attribution
strings). It appears after story five in the same reader, with read tracking
and offline caching. Keep vault paths, private clip links and raw notes out
of the published edition and its mirror.
