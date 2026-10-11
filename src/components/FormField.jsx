const FormField = ({ label, id, ...inputProps }) => {
    return (
        <div>
            <label htmlFor="id" className="mb-1 block text-sm font-meduim">
                {label}
            </label>
            <input
                id={id}
                name={id}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
                {...inputProps}
            />
        </div>
    );
}

export default FormField;