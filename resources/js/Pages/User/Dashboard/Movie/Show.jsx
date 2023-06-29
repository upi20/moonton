import { Head, Link } from "@inertiajs/react";
import ReactPlayer from 'react-player'

export default function Show({ movie }) {
    return <>
        <Head title={movie.name} />
        <section className="mx-auto w-screen relative watching-page font-poppins" id="stream">
            <div className="overflow-hidden h-screen w-screen">
                <ReactPlayer url={movie.video_url} height={'100%'} width={'100%'} config={{
                    youtube: {
                        playerVars: { modestbranding: 1 },
                        embedOptions: {
                            title: movie.name,
                            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                            allowfullscreen: 0,
                        }
                    },
                }} />
            </div>

            <div className="absolute top-5 left-5 z-20">
                <Link href={route('dashboard')}>
                    <img src="/assets/icons/ic_arrow-left.svg" className="transition-all btn-back w-[46px]" alt="stream" />
                </Link>
            </div>


            <div className="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                <span className="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                    {movie.name}
                </span>
            </div>
        </section>
    </>;
}
