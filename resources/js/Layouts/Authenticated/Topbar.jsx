import { Link } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function Topbar({ userName = "User" }) {
    const topSearchStyle = {
        backgroundImage: "url('/assets/icons/ic_search.svg')"
    };

    const [dropDownOpen, setDropDownOpen] = useState(true);
    const dropDownTarget = useRef();

    const triggerDropDown = () => {
        if (dropDownOpen) {
            dropDownTarget.current.classList.remove('hidden');
        } else {
            dropDownTarget.current.classList.add('hidden');
        }

        setDropDownOpen(!dropDownOpen);
    }

    return (<>
        <div className="flex justify-between items-center">
            <input type="text" className="top-search" placeholder="Search movie, cast, genre" style={topSearchStyle} />
            <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">Welcome, {userName}</span>

                <div className="collapsible-dropdown flex flex-col gap-2 relative ">
                    <div href="#!" className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button cursor-pointer">
                        <img src="/assets/images/avatar.png" className="rounded-full object-cover w-full" alt="" onClick={triggerDropDown} />
                    </div>
                    <div className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
                        ref={dropDownTarget}>
                        <Link href={route('dashboard')} className="transition-all hover:bg-sky-100 p-4">Dashboard</Link>
                        <a href="#!" className="transition-all hover:bg-sky-100 p-4">Settings</a>
                        <Link href={route('logout')} method="post" className="transition-all hover:bg-sky-100 p-4 text-left" as="button">Sign Out</Link>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
