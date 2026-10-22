// text block: first line is the intro the next lines after it are feature points.
function splitDescription(text = "") {
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    return { intro: lines[0] ?? "", highlights: lines.slice(1) };
}

// highlight text like list text
function Highlight({ line }) {
    const colon = line.indexOf(":");
    if (colon === -1 || colon > 40) return <>{line}</>;

    return (
        <>
            <span className="font-semibold text-heading">{line.slice(0, colon + 1)}</span>
            {line.slice(colon + 1)}
        </>
    );
}


export default function ProductDescription({ description }) {
    const { intro, highlights } = splitDescription(description);

    return (
        <section className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="font-bold text-heading">About this item</h2>

            {intro ? (
                <p className="mt-3 text-sm leading-6 text-neutral-600">{intro}</p>
            ) : (
                <p className="mt-3 text-sm leading-6 text-neutral-600">No description available.</p>
            )}

            {highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600 marker:text-accent-100">
                    {highlights.map((line) => (
                        <li key={line}>
                            <Highlight line={line} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}