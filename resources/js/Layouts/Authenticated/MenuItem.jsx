import { Link } from "@inertiajs/react";

export default function MenuItem({
    link,
    icon,
    text,
    isActive,
    method = "get",
    as
}) {
    return (
        <Link href={link ? route(link) : null} className={`side-link ${isActive && "active"}`} method={method} as={as} >
            {icon}
            {text}
        </Link>
    );
}
