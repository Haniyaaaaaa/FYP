// Video.js 
import React from "react";

export default function Video(props) {
    return (
        <div className="w-screen flex h-screen flex-row mx-12">
            <div className="w-full h-2/3 ml-44 mt-4 
							 border-1 border-slate-200">
                <iframe title={props.title} src={props.link} className="w-full h-5/6"></iframe>
                <div className="mt-1 h-1/3 text-left text-xl text-slate-600" style={{ marginLeft: "15px", paddingTop: "1rem" }}>
                    {props.title}

                </div>
            </div>
        </div>
    );
}

