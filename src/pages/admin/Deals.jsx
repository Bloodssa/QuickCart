// MOCK
import { useState } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatPrice } from "../../lib/format";
import { Card, EmptyState, ErrorState, PageHeader, inputCls, primaryBtn, secondaryBtn } from "../../components/admin/ui";
import { useFeatured, useProductSearch, useSetFeatured } from "../../queries/admin";

const MAX_FEATURED = 8;

export default function Deals() {
    useDocumentTitle("Deals & Promotions");
    const [q, setQ] = useState("");
    const featured = useFeatured();
    const search = useProductSearch(q);
    const setFeatured = useSetFeatured();

    const items = featured.data?.items ?? [];
    const results = (search.data?.items ?? []).filter((p) => !p.isFeatured);
    const full = items.length >= MAX_FEATURED;

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA
            </div>
            <PageHeader title="Deals & Promotions" subtitle="Choose which products appear in the featured sections of the storefront." />

            <Card className="p-5">
                <h2 className="mb-4 text-base font-bold">Featured now ({items.length} of {MAX_FEATURED} slots)</h2>
                {featured.isError ? <ErrorState onRetry={featured.refetch} /> : items.length === 0 && !featured.isPending ? (
                    <EmptyState title="Nothing featured yet" message="Search below and add products." />
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                        {items.map((p) => (
                            <div key={p.id} className="flex flex-col gap-2 rounded-md border border-gray-300 p-3">
                                {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-28 w-full rounded object-cover" /> : <div className="h-28 rounded bg-gray-100" />}
                                <p className="text-sm font-bold">{p.name}</p>
                                <p className="text-xs text-gray-600">{formatPrice(p.price)} · {p.stock} in stock</p>
                                <button type="button" className={secondaryBtn} disabled={setFeatured.isPending}
                                    onClick={() => setFeatured.mutate({ id: p.id, isFeatured: false })}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            <Card className="flex flex-col gap-3 p-5">
                <h2 className="text-base font-bold">Add products</h2>
                <label htmlFor="deal-q" className="sr-only">Search products to feature</label>
                <input id="deal-q" type="search" placeholder="Search products (2+ letters)" value={q} onChange={(e) => setQ(e.target.value)} className={`${inputCls} max-w-sm`} />
                {full && <p className="text-sm text-gray-600">All {MAX_FEATURED} slots are used. Remove one first.</p>}
                {results.length > 0 && (
                    <ul className="divide-y divide-gray-100 rounded-md border border-gray-300">
                        {results.map((p) => (
                            <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                                <span><b>{p.name}</b> <span className="text-gray-600">· {p.stock} in stock</span></span>
                                <button type="button" className={`${primaryBtn} h-9! px-4!`} disabled={full || setFeatured.isPending}
                                    onClick={() => setFeatured.mutate({ id: p.id, isFeatured: true })}>Feature</button>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    );
}
