export default function TextSmallPale({children, className, ...props}) {
    return (
        <h1 className={`font-small-pale ${className || ""}`} {...props}>
            {children}
        </h1>
    );
}