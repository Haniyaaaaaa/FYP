import React from 'react'

export default function Accordion(props) {
	return (
		<div className="mb-2">
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
				<div className="p-3 bg-white">
					{props.data}
				</div>
			)}
		</div>
	);
}; 
