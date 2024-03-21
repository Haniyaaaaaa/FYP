import React from 'react'

export default function questions(props) {
    return (
        // question
        <div className="border rounded-md mb-1">
            <button
                className="w-full p-3 text-left bg-gray-10 
						hover:bg-blue-100 transition duration-300"
                onClick={props.toggleAccordion}
            >
                {props.title}
                <span className={`float-right transform ${props.isOpen ?
                    'rotate-180' : 'rotate-0'} 
								transition-transform duration-300`}>
                    &#9660;
                </span>
            </button>
            {props.isOpen && (
                // answer
                <div className="p-3 bg-white">
                    {props.data}
                </div>
            )}
        </div>
    );
}; 
