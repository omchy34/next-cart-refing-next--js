import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const content = {
  headline: ["Better picks.", "Fair prices.", "Fast delivery."],
  sub: "Handpicked products, easy returns and cash on delivery on most orders.",
  primary: { label: "Shop new arrivals", href: "/shop" },
  secondary: { label: "Browse categories", href: "#" },
  intro: {
    image: {
      src: "https://images.pexels.com/photos/4920461/pexels-photo-4920461.jpeg",
      alt: "Man wearing headphones and a green sweater",
    },
  },
  bestSeller: {
    tag: "Best seller",
    name: "Studio headphones",
    price: 1499,
    oldPrice: 1999,
    href: "#",
    image: {
      src: "https://images.pexels.com/photos/18542286/pexels-photo-18542286.jpeg",
      alt: "White wireless earbuds on dark fabric",
    },
    cutout: false as boolean, // true = transparent PNG product, false = normal photo
    thumb: {
      src: "https://images.pexels.com/photos/11181971/pexels-photo-11181971.jpeg",
      alt: "",
    },
  },
  category: {
    label: "Shop audio",
    href: "#",
    image: {
      src: "https://images.pexels.com/photos/11398246/pexels-photo-11398246.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Black headphones with glowing accents on a dark surface",
    },
  },
  deal: {
    title: "Up to 40% off",
    sub: "This week's deals",
    href: "#",
    image: {
      src: "/product_img10.png",
      alt: "",
    },
  },
  perks: ["Free delivery over ₹999", "7-day easy returns", "Cash on delivery"],
} as const;

const INK = "#101433";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101433]";
const FOCUS_LIGHT =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Hero() {
  const { bestSeller, category, deal } = content;
  const discount = Math.round(
    ((bestSeller.oldPrice - bestSeller.price) / bestSeller.oldPrice) * 100
  );

  return (
    <section
      className={`${display.variable} ${body.variable} bg-[#EEF0F3] px-3 py-3 font-(family-name:--font-body) sm:px-5 sm:py-5`}
    >
      {/* Bento grid: 2 cols on mobile, 12 cols on desktop */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:h-176 lg:grid-cols-12 lg:grid-rows-3 lg:gap-4">
        {/* ---------- A: message tile ---------- */}
        <div className="col-span-2 flex flex-col rounded-[2.5rem] bg-[#1F7A5F] p-6 text-white sm:p-9 lg:col-span-5 lg:row-span-3">
          <div>
            <h1 className="font-(family-name:--font-display) text-4xl font-semibold leading-[1.05] tracking-tight lg:text-[2.1rem] xl:text-[2.6rem]">
              {content.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-white/85">
              {content.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={content.primary.href}
                className={`rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#101433] transition hover:bg-[#EEF0F3] ${FOCUS_LIGHT}`}
              >
                {content.primary.label}
              </Link>
              <Link
                href={content.secondary.href}
                className={`rounded-full border-2 border-white/60 px-5 py-2.5 text-sm font-semibold transition hover:border-white hover:bg-white/10 ${FOCUS_LIGHT}`}
              >
                {content.secondary.label}
              </Link>
            </div>
          </div>

          <div className="relative mt-8 min-h-56 flex-1 overflow-hidden rounded-3xl bg-[#175C48]">
            <Image
              src={content.intro.image.src}
              alt={content.intro.image.alt}
              fill
              sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ---------- B: big product image tile ---------- */}
        <div className="group relative col-span-2 min-h-120 overflow-hidden rounded-[2.5rem] bg-[#CBD3E6] lg:col-span-4 lg:row-span-3">
          <Image
            src={bestSeller.image.src}
            alt={bestSeller.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, 100vw"
            className={`transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${
              bestSeller.cutout
                ? "object-contain p-8 pb-32 drop-shadow-[0_24px_30px_rgba(16,20,51,0.35)]"
                : "object-cover"
            }`}
          />
          <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#101433]">
            {bestSeller.tag}
          </span>

          <Link
            href={bestSeller.href}
            className={`absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-3xl bg-white/90 p-3 backdrop-blur transition hover:bg-white ${FOCUS}`}
          >
            <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-[#EEF0F3]">
              <Image
                src={bestSeller.thumb.src}
                alt={bestSeller.thumb.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0 flex-1 text-[#101433]">
              <span className="block truncate text-sm font-semibold">
                {bestSeller.name}
              </span>
              <span className="flex items-baseline gap-2">
                <span className="text-base font-bold">
                  {inr.format(bestSeller.price)}
                </span>
                <span className="text-xs text-[#5B6274] line-through">
                  {inr.format(bestSeller.oldPrice)}
                </span>
                <span className="text-xs font-semibold text-[#1F7A5F]">
                  {discount}% off
                </span>
              </span>
            </span>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#101433] text-white">
              <Arrow />
            </span>
          </Link>
        </div>

        {/* ---------- C: category tile (image) ---------- */}
        <Link
          href={category.href}
          className={`group relative col-span-2 min-h-44 overflow-hidden rounded-4xl bg-[#CBD3E6] lg:col-span-3 ${FOCUS}`}
        >
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
          <span
            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
            <span className="font-(family-name:--font-display) text-lg font-semibold leading-tight">
              {category.label}
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#101433] transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              <Arrow />
            </span>
          </span>
        </Link>

        {/* ---------- D: deal tile ---------- */}
        <Link
          href={deal.href}
          className={`group col-span-1 flex min-h-44 flex-col justify-between rounded-4xl bg-[#FF7A45] p-5 text-[#101433] transition hover:bg-[#ff8a5c] lg:col-span-3 lg:p-6 ${FOCUS}`}
        >
          <span>
            <span className="block font-(family-name:--font-display) text-2xl font-semibold leading-[1.1] lg:text-3xl">
              {deal.title}
            </span>
            <span className="mt-2 block text-xs font-medium">{deal.sub}</span>
          </span>
          <span className="flex items-end justify-between gap-3">
            <span className="relative size-16 overflow-hidden rounded-2xl lg:size-24">
              <Image
                src={deal.image.src}
                alt={deal.image.alt}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
              />
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#101433] text-white transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              <Arrow />
            </span>
          </span>
        </Link>

        {/* ---------- E: perks tile ---------- */}
        <div className="col-span-1 flex min-h-44 flex-col justify-center gap-3 rounded-4xl bg-[#101433] p-5 text-white lg:col-span-3 lg:p-6">
          {content.perks.map((p) => (
            <p key={p} className="flex items-start gap-2.5 text-xs font-medium lg:text-sm">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2FA37F]">
                <Check />
              </span>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}