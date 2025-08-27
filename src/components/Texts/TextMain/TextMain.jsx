export default function TextMain({children, className, ...props}) {
    return (
        <h1 className={`font-main ${className || ""}`} {...props}>
            {children}
        </h1>
    );
}