const normalize = (s = "") =>
    s.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\(.*?\)/g, " ")         
      .replace(/\b(city of|municipality of|city|municipality|barangay|brgy|brg)\b/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

export function findMatch(list = [], names = []) {
    const candidates = names.filter(Boolean).map(normalize).filter(Boolean);

    // exact match first
    for (const n of candidates) {
        const hit = list.find((o) => normalize(o.name) === n);
        if (hit) return hit;
    }

    for (const n of candidates) {
        if (n.length < 4) continue;
        const hit = list.find((o) => {
            const m = normalize(o.name);
            return m.length >= 4 && (m.includes(n) || n.includes(m));
        });
        if (hit) return hit;
    }
    return undefined;
}