// Video.js 
import React from "react";

export default function Video(props) {
    return (
        <div className="w-screen flex flex-row mx-12">
            <div className="w-full ml-10 mt-4 
							 border-1 border-slate-200">
                <iframe title={props.title} src={props.link} className="w-full h-5/6"></iframe>
                <div className="mt-1 text-left text-xl text-slate-1000" style={{ marginLeft: "15px", paddingTop: "2rem" }}>
                    {props.title}

                </div>
            </div>
        </div>
    );
}

