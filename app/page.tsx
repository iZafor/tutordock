import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dot-pattern";
import Footer from "@/components/home/footer";
import Reviews from "@/components/home/reviews";
import PopularSubjects from "@/components/home/popular-subjects";
import Hero from "@/components/home/hero";
import FeaturedTutors from "@/components/home/featured-tutors";

export default function Home() {
    return (
        <div className="flex flex-col gap-20">
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                )}
            />

            <Hero className="px-20" />

            <FeaturedTutors className="px-20" />

            <PopularSubjects className="px-20" />

            <Reviews className="px-20" />

            <Footer />
        </div>
    );
}
