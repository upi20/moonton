import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head } from "@inertiajs/react";
import Flickity from "react-flickity-component";


export default function Dashboard({ auth, featuredMovies, movies }) {
    const flickityOption = {
        "cellAlign": "left",
        "contain": true,
        "groupCells": 1,
        "wrapAround": false,
        "pageDots": false,
        "prevNextButtons": false,
        "draggable": ">1"
    };

    return (<Authenticated auth={auth}>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />
            <title>Dashboard</title>
        </Head>

        <div>
            <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
            <Flickity className="gap-[30px]" options={flickityOption}>
                {featuredMovies.map((featuredMovie) => (
                    <FeaturedMovie
                        key={featuredMovie.id}
                        slug={featuredMovie.slug}
                        name={featuredMovie.name}
                        category={featuredMovie.category}
                        thumbnail={featuredMovie.thumbnail}
                        rating={featuredMovie.rating}
                    />
                ))}
            </Flickity>
        </div>

        <div>
            <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
            <Flickity className="gap-[30px]" options={flickityOption}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        slug={movie.slug}
                        name={movie.name}
                        category={movie.category}
                        thumbnail={movie.thumbnail}
                    />
                ))}
            </Flickity>
        </div>
    </Authenticated>);
}
