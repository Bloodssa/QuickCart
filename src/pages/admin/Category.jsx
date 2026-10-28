import { useState } from "react";
import { Plus } from "lucide-react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ConfirmDeleteModal from "../../components/ConfirmModal";
import { Card, EmptyState, ErrorState, PageHeader, TableSkeleton, Th, inputCls, primaryBtn, secondaryBtn, smallBtn, tdCls } from "../../components/admin/ui";
import { useCategories, useDeleteCategory, useSaveCategory } from "../../queries/categories";

function CategoryForm({ category, onDone }) {
    const [name, setName] = useState(category.name ?? "");
    const save = useSaveCategory();
    const isEdit = !!category.id;
    const invalid = name.trim().length < 2;

    function submit(e) {
        e.preventDefault();
        if (invalid) return;
        save.mutate({ id: category.id, name: name.trim() }, { onSuccess: onDone });
    }

    return (
        <Card className="p-5">
            <form onSubmit={submit} className="flex flex-col gap-4">
                <h2 className="text-base font-bold">{isEdit ? "Edit category" : "New category"}</h2>
                <div>
                    <label htmlFor="cat-name" className="text-sm font-semibold">Name</label>
                    <input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className={`${inputCls} mt-1.5`} />
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
    const [editing, setEditing] = useState(null); // null | {} (new) | category
    const [deleteTarget, setDeleteTarget] = useState(null);

    const { data, isPending, isError, refetch } = useCategories();
    const del = useDeleteCategory();
    const items = data ?? [];

    return (
        <div className="flex flex-col gap-5">
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
                            <table className="w-full min-w-120 border-collapse">
                                <thead><tr><Th>Name</Th><Th>Products</Th><Th align="right">Actions</Th></tr></thead>
                                <tbody>
                                    {items.map((c) => (
                                        <tr key={c.id}>
                                            <td className={`${tdCls} font-semibold`}>{c.name}</td>
                                            <td className={tdCls}>{c.productCount ?? "–"}</td>
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
                    onConfirm={() => del.mutate(deleteTarget.id, { onSettled: () => setDeleteTarget(null) })}
                    onClose={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}