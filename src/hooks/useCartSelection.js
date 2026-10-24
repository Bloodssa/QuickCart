import { useState } from "react";

export function useCartSelection(items) {
    const [checked, setChecked] = useState(() => new Set());

    // out of stock items cannot be selected
    const selectable = items.filter((item) => item.stockQuantity > 0);
    const selected = selectable.filter((item) => checked.has(item.id));

    const allSelected = selectable.length > 0 && selected.length === selectable.length;
    const someSelected = selected.length > 0 && !allSelected;

    const isSelected = (item) => item.stockQuantity > 0 && checked.has(item.id);

    function toggle(id) {
        setChecked((previous) => {
            const next = new Set(previous);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function toggleAll() {
        setChecked(allSelected ? new Set() : new Set(selectable.map((item) => item.id)));
    }

    return {
        selected,
        selectableCount: selectable.length,
        selectedQuantity: selected.reduce((sum, item) => sum + item.quantity, 0),
        selectedSubTotal: selected.reduce((sum, item) => sum + item.subTotal, 0),
        allSelected,
        someSelected,
        isSelected,
        toggle,
        toggleAll,
    };
}