import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";


export default function Dashboard() {
    const flickityOption = {
        "cellAlign": "left",
        "contain": true,
        "groupCells": 1,
        "wrapAround": false,
        "pageDots": false,
        "prevNextButtons": false,
        "draggable": ">1"
    };

    return (<Authenticated>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
            <title>Dashboard</title>
        </Head>

        <div>
            <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
            <Flickity className="gap-[30px]" options={flickityOption}>
                {[1, 2, 3].map(i => (
                    <FeaturedMovie
                        key={i}
                        name="name"
                        slug="name"
                        category="Action • Horror"
                        thumbnail={`/assets/images/featured-${i}.png`}
                        rating={4}
                    />
                ))}
            </Flickity>
        </div>

        <div>
            <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
            <Flickity className="gap-[30px]" options={flickityOption}>
                {[1, 2, 3, 4].map((i) => (
                    <MovieCard
                        key={i}
                        slug="the-batman-in-love"
                        name={`The Batman in Love ${i}`}
                        category="Comedy"
                        thumbnail={`/assets/images/browse-${i}.png`}
                    />
                ))}
            </Flickity>
        </div>
    </Authenticated>);
}
