import { StarIcon } from "lucide-react";

const RatingStars = ({ value, size = 16 }: { value: number; size?: number }) => (
    <div className="flex items-center gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon
                key={i}
                size={size}
                className={i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
            />
        ))}
    </div>
);

export default RatingStars;