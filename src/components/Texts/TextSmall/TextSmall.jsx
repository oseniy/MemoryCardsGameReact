export default function TextSmall({children, className, ...props}) {
    return (
        <p className={`font-small ${className || ""}`} {...props}>
            {children}
        </p>
    );
}