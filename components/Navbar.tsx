'use client'
import { Menu, PackageIcon, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const cartTotalItem = useSelector((state: RootState) => state.cart.total);
    const { user } = useUser();
    const { openSignIn } = useClerk();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = search.trim();
        if (!query) return;
        router.push(`/shop?search=${encodeURIComponent(query)}`);
        setMenuOpen(false);
    };

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const CartBadge = () =>
        cartTotalItem > 0 ? (
            <span className="absolute -top-1 -right-1 grid min-w-4.5 h-4.5 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
                {cartTotalItem}
            </span>
        ) : null;

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
                ? "border-slate-200/80 bg-white/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur-xl"
                : "border-transparent bg-white/60 backdrop-blur-md"
                }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18">
                {/* Logo */}
                <Link href="/" className="relative shrink-0 text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
                    <span className="bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Moto</span>
                    cart
                    <span className="text-indigo-600">.</span>
                    <span className="absolute -right-7 -top-1 rounded-full bg-indigo-600 px-2 py-px text-[10px] font-semibold text-white">
                        plus
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive(href)
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop right side */}
                <div className="hidden items-center gap-3 md:flex">
                    <form
                        onSubmit={handleSearch}
                        className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 lg:flex lg:w-56 xl:w-72"
                    >
                        <Search size={16} className="shrink-0 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products"
                            aria-label="Search products"
                            className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </form>

                    <Link
                        href="/cart"
                        aria-label={`Cart, ${cartTotalItem} items`}
                        className="relative grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                    >
                        <ShoppingCart size={18} />
                        <CartBadge />
                    </Link>

                    {!user ? (
                        <button onClick={() => openSignIn()} className="rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 active:scale-95">
                            Login
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={() => router.push('/orders')} />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}
                </div>

                {/* Mobile Right Side (Simplified layout match) */}
                <div className="flex items-center gap-2 sm:hidden">
                    {!user ? (
                        <button onClick={() => openSignIn()} className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                            Login
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={() => router.push('/orders')} />
                            </UserButton.MenuItems>
                        </UserButton>
                    )}

                    <Link
                        href="/cart"
                        aria-label={`Cart, ${cartTotalItem} items`}
                        className="relative grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
                    >
                        <ShoppingCart size={18} />
                        <CartBadge />
                    </Link>

                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition active:scale-95"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                id="mobile-menu"
                className={`grid transition-[grid-template-rows] duration-300 ease-out sm:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="space-y-4 border-t border-slate-200/70 px-4 pb-5 pt-4">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100"
                        >
                            <Search size={18} className="shrink-0 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products"
                                className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </form>

                        <ul className="space-y-1">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive(href)
                                            ? "bg-indigo-50 text-indigo-600"
                                            : "text-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;