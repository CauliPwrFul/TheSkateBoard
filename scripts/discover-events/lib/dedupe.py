import json
import os

LEDGER_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "data", "discovered-events-seen.json"
)


def load_seen():
    if not os.path.exists(LEDGER_PATH):
        return set()
    with open(LEDGER_PATH, "r", encoding="utf-8") as f:
        return set(json.load(f))


def save_seen(seen_keys):
    os.makedirs(os.path.dirname(LEDGER_PATH), exist_ok=True)
    with open(LEDGER_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(seen_keys), f, indent=2)
        f.write("\n")
