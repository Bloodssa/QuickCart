const ERRORS = {
    1: "Location permission was denied. Allow it in your browser settings, or enter the address manually.",
    2: "Could not determine your location. Please enter the address manually.",
    3: "Finding your location timed out. Please try again."
}

export function getPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Your browser does not support location."));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => reject(new Error(ERRORS[err.code] ?? ERRORS[2])),
            { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 }
        );
    });
}

export async function reverseGeocode(latitude, longitude) {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.search = new URLSearchParams({
        format: "jsonv2",
        lat: latitude,
        lon: longitude,
        zoom: 18,
        addressdetails: 1,
        "accept-language": "en",
    });

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error("Could not look up your address. Please enter it manually.");

    const data = await res.json();
    return data.address ?? {};
}