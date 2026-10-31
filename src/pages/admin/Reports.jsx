import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { PageHeader, secondaryBtn } from "../../components/admin/ui";

export default function Reports() {
    useDocumentTitle("Sales Reports");

    return (
        <div className="flex flex-col gap-5">
            <PageHeader title="Sales Reports" subtitle="Basic transaction records for a date range."
                action={<button type="button" className={secondaryBtn}>Export this page (CSV)</button>} />

            
        </div>
    );
}
