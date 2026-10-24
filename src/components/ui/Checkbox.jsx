export default function Checkbox({ indeterminate = false, className = "", ...props }) {
    return (
        <input
            type="checkbox"
            ref={(element) => {
                if (element) element.indeterminate = indeterminate;
            }}
            className={`size-4 shrink-0 cursor-pointer accent-accent-100 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
            {...props}
        />
    );
}