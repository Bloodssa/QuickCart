// MOCK
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PageHeader } from "../../components/admin/ui";

export default function Deals() {
    useDocumentTitle("Deals & Promotions");

    return (
        <div className="flex flex-col gap-5">
            <PageHeader title="Deals & Promotions" subtitle="Choose which products appear in the featured sections of the storefront." />
        </div>
    );
}
