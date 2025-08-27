export default function Header({children, className, ...props}) {
    return (
        <h1 className={`font-header ${className || ""}`} {...props}>
            {children}
        </h1>
    );
}