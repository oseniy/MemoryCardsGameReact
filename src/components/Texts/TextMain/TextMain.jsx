export default function TextMain({children, className, ...props}) {
    return (
        <p className={`font-main ${className || ""}`} {...props}>
            {children}
        </p>
    );
}