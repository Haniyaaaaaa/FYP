import Video from "./Video";
import { useState } from "react";
import Data from "./Data";

export default function Gallery() {
    const [activeVid, setActiveVid] = useState(
        "https://www.youtube.com/embed/LiZ5hryi2Sw"
    );
    const [actTitle, setActTitle] = useState("Flooding 'Be Prepared'");

    const arr = Data;
    return (
        <div >

            <h4 style={{ marginLeft: "11rem", marginTop: "40px", marginBottom: "-10px" }}>E-Learning Course</h4>

            <div className="flex flex-row w-11/12 pt-2">
                <Video
                    link={activeVid}
                    title={actTitle}

                />
                <div
                    className="w-3/6 
						overflow-y-scroll flex flex-col 
						mt-4 border-slate-100 
						border-2 rounded-lg"
                    style={{ height: "min(40vw)" }}
                >

                    {arr.map((e, index) => {
                        return (
                            <div
                                key={index}
                                className="hover:bg-gray-200 p-2 
									border-2 rounded-sm h-2/6 
									shadow-xl shadow-gray-300"
                                onClick={() => {
                                    setActiveVid(e.link);
                                    setActTitle(e.title);

                                }}
                            >
                                <img
                                    className="w-1/2 h-20
										mx-2 float-left"
                                    src={e.img}
                                    alt="img"
                                />
                                <p
                                    className="ml-2 font-semibold 
										pt-6 pl-8 text-sm"
                                >
                                    {e.title}
                                </p>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}
