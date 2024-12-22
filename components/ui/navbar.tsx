import { cn } from "@/lib/utils";

export default function Navbar({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return (
        <nav
            className={cn(
                "border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between py-4 px-20",
                className
            )}
        >
            {children}
        </nav>
    );
}
