const BASE = import.meta.env.VITE_PSGC_URL ?? "https://psgc.gitlab.io/api";
const NCR_REGION_CODE = "130000000";

export const NCR = { code: "NCR", name: "Metro Manila" };

async function getJson(path, signal) {
    const res = await fetch(`${BASE}${path}`,  { signal });
    if (!res.ok) throw new Error(`PSGC request failed (${res.status})`);
    const list = await res.json();
    return list.map(({ code, name }) => ({code, name}))
                .sort((a,b) => a.name.localeCompare(b.name));
}

export async function getProvinces(signal) {
    const provinces = await getJson("/provinces/", signal);
    return [NCR, ...provinces].sort((a, b) => a.name.localeCompare(b.name));
}

export const getCities = (provinceCode, signal) =>
    getJson(
        provinceCode === NCR.code ? 
            `/regions/${NCR_REGION_CODE}/cities-municipalities/`
            : `/provinces/${provinceCode}/cities-municipalities/`,
        signal
    );

export const getBarangays = (cityCode, signal) => 
    getJson(`/cities-municipalities/${cityCode}/barangays/`, signal);

export async function getAllCities(signal) {
    const res = await fetch(`${BASE}/cities-municipalities/`, { signal });
    if (!res.ok) throw new Error(`PSGC request failed (${res.status})`);
    const list = await res.json();
    return list
        .map(({ code, name, provinceCode, regionCode }) => ({
            code, name, provinceCode: provinceCode || (regionCode === NCR_REGION_CODE ? NCR.code : ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}