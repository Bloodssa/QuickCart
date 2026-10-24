import { useAddresses } from "../../queries/addresses";
import Row from "./Row";

export default function AccountDetails({ label, user, onNavigate }) {
    const { data: addresses = [], isPending } = useAddresses();

    const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

    return (
        <section className="min-w-0 rounded-md bg-white p-5 md:p-6">
            <h2 id="account-section-title" className="text-xl font-bold text-heading">{label}</h2>

            <div className="mt-4">
                <Row header="Full Name" details={user?.fullName} />
                <Row header="Username" details={user?.username} />
                <Row header="Email" details={user?.email} />
            </div>

            <div className="py-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-6">
                <div className="text-sm text-neutral-900">Default delivery address</div>
                <dd className="text-sm leading-6 sm:max-w-sm sm:text-right">
                    {defaultAddress ? (
                        <>
                            <p className="font-semibold text-neutral-900">{defaultAddress.recipientName}</p>
                            <p className="text-neutral-500">{defaultAddress.contactNumber}</p>
                            <p className="text-neutral-500">{defaultAddress.addressLine}</p>
                        </>
                    ) : (
                        <p className="text-neutral-500">No address saved yet.</p>
                    )}
                    {!isPending && (
                        <button
                            type="button"
                            onClick={() => onNavigate("address")}
                            className="mt-2 font-semibold text-accent-100 hover:text-accent-hover"
                        >
                            {defaultAddress ? "Manage addresses" : "Add an address"}
                        </button>
                    )}
                </dd>
            </div>
        </section>
    );
}