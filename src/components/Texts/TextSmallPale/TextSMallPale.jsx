export default function TextSmallPale({children, className, ...props}) {
    return (
        <p className={`font-small-pale ${className || ""}`} {...props}>
            {children}
        </p>
    );
}