import { useEffect, useState } from "react";

export function useCountdown(key = "auth-cooldown") {
    const [endsAt, setEndsAt] = useState(() => {
        try { return Number(localStorage.getItem(key)) || 0; } catch { return 0; }
    });
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (endsAt <= Date.now()) return;

        const id = setInterval(() => {
            const current = Date.now();
            setNow(current);
            if (current >= endsAt) clearInterval(id);
        }, 1000);

        return () => clearInterval(id);
    }, [endsAt]);

    const seconds = Math.max(0, Math.ceil((endsAt - now) / 1000));

    function start(secs) {
        const end = Date.now() + secs * 1000;
        try { localStorage.setItem(key, String(end)); } catch { /* ignore */ }
        setNow(Date.now());
        setEndsAt(end);
    }

    return [seconds, start];
}