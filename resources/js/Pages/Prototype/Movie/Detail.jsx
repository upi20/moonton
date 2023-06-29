import { Link } from "@inertiajs/react";
import ReactPlayer from 'react-player'

export default function Detail({ slug }) {
    return <>
        <section className="mx-auto w-screen relative watching-page font-poppins" id="stream">
            <div className="overflow-hidden h-screen w-screen">
                <ReactPlayer url='https://www.youtube.com/watch?v=zTitoHKsyJg' height={'100%'} width={'100%'} />

            </div>

            <div className="absolute top-5 left-5 z-20">
                <Link href={route('prototype.dashboard')}>
                    <img src="/assets/icons/ic_arrow-left.svg" className="transition-all btn-back w-[46px]" alt="stream" />
                </Link>
            </div>


            <div className="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                <span className="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                    Details Screen Part Final
                </span>
            </div>
        </section>
    </>;
}
