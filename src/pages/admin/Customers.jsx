import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PageHeader } from "../../components/admin/ui";


export default function Customers() {
    useDocumentTitle("Customers");

    return (
        <div className="flex flex-col gap-5">
            <PageHeader title="Customers" subtitle="Look up a customer and their order history. Read-only." />
            <div className="flex flex-wrap items-start gap-4">

            </div>
        </div>
    );
}
