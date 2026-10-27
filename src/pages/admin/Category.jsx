// MOCK
import { useState } from "react";
import { Plus } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ConfirmDeleteModal from "../../components/ConfirmModal";
import { Card, EmptyState, ErrorState, Pagination, PageHeader, TableSkeleton, Th, inputCls, primaryBtn, secondaryBtn, smallBtn, tdCls } from "../../components/admin/ui";
import { useCategories, useDeleteCategory, useSaveCategory } from "../../queries/admin";

const PAGE_SIZE = 10;

function CategoryForm({ category, onDone }) {
    const [name, setName] = useState(category.name ?? "");
    const [description, setDescription] = useState(category.description ?? "");
    const save = useSaveCategory();
    const isEdit = !!category.id;
    const invalid = name.trim().length < 2;

    function submit(e) {
        e.preventDefault();
        if (invalid) return;
        save.mutate({ id: category.id, name: name.trim(), description: description.trim() }, { onSuccess: onDone });
    }

    return (
        <Card className="p-5">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <h2 className="text-base font-bold">{isEdit ? "Edit category" : "New category"}</h2>
                <div>
                    <label htmlFor="cat-name" className="text-sm font-semibold">Name</label>
                    <input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className={`${inputCls} mt-1.5`} />
                    {isEdit && <p className="mt-1 text-xs text-gray-600">Slug: {category.slug}</p>}
                </div>
                <div>
                    <label htmlFor="cat-desc" className="text-sm font-semibold">Description (optional)</label>
                    <textarea id="cat-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300}
                        className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-50" />
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onDone} className={secondaryBtn}>Cancel</button>
                    <button type="submit" disabled={invalid || save.isPending} className={primaryBtn}>
                        {save.isPending ? "Saving…" : "Save"}
                    </button>
                </div>
            </form>
        </Card>
    );
}

export default function Categories() {
    useDocumentTitle("Categories");
    const [page, setPage] = useState(1);
    const [editing, setEditing] = useState(null); // null | {} (new) | category
    const [deleteTarget, setDeleteTarget] = useState(null);

    const { data, isPending, isError, refetch } = useCategories({ page, pageSize: PAGE_SIZE });
    const del = useDeleteCategory();
    const items = data?.items ?? [];
    const totalPages = Math.max(1, Math.ceil((data?.totalResults ?? 0) / PAGE_SIZE));

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full h-15 bg-accent-100 rounded-md flex justify-center items-center text-white font-medium">
                NOTE: MOCK DATA FOR UI PREVIEW
            </div>
            <PageHeader
                title="Categories"
                subtitle="Organize the catalog. A category with products cannot be deleted."
                action={
                    <button type="button" onClick={() => setEditing({})} className={primaryBtn}>
                        <Plus size={16} className="mr-1.5" aria-hidden="true" /> Add category
                    </button>
                }
            />

            <div className="flex flex-wrap items-start gap-4">
                <Card className="min-w-0 flex-[2_1_520px] overflow-hidden">
                    {isPending ? <TableSkeleton /> : isError ? <ErrorState onRetry={refetch} /> : items.length === 0 ? (
                        <EmptyState title="No categories yet" message="Create your first category to organize products." />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-140 border-collapse">
                                <thead><tr><Th>Name</Th><Th>Slug</Th><Th>Products</Th><Th align="right">Actions</Th></tr></thead>
                                <tbody>
                                    {items.map((c) => (
                                        <tr key={c.id}>
                                            <td className={`${tdCls} font-semibold`}>{c.name}</td>
                                            <td className={`${tdCls} text-gray-600`}>{c.slug}</td>
                                            <td className={tdCls}>{c.productCount}</td>
                                            <td className={`${tdCls} text-right`}>
                                                <div className="flex justify-end gap-2">
                                                    <button type="button" className={smallBtn} onClick={() => setEditing(c)}>Edit</button>
                                                    <button type="button" className={`${smallBtn} text-red-600`} disabled={c.productCount > 0}
                                                        title={c.productCount > 0 ? "Move or delete its products first" : undefined}
                                                        onClick={() => setDeleteTarget(c)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </Card>

                {editing && (
                    <div className="min-w-0 flex-[1_1_300px]">
                        <CategoryForm key={editing.id ?? "new"} category={editing} onDone={() => setEditing(null)} />
                    </div>
                )}
            </div>

            {deleteTarget && (
                <ConfirmDeleteModal
                    title="Delete category?"
                    message={`"${deleteTarget.name}" will be permanently removed.`}
                    loading={del.isPending}
                    onConfirm={() => del.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })}
                    onClose={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
