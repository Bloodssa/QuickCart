export default function Row({ header, details }) {
    return (
        <div className="flex flex-col gap-1 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-neutral-900">{ header }</dt>
            <dd className="text-sm font-medium text-neutral-900">{ details }</dd>
        </div>
    );
}