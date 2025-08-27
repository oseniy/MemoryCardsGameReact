export default function TextSmall({children, className, ...props}) {
    return (
        <h1 className={`font-small ${className || ""}`} {...props}>
            {children}
        </h1>
    );
}