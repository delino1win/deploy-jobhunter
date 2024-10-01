// "use client";
// import { useState } from "react";
// import ExperienceCardForm from "./ExperienceCardForm";

// export default function ExperienceCard() {
//     const [experience, setExperience] = useState([<ExperienceCardForm key={0}/>])
//     let handleAddExperience = (e: any) => {
//         e.preventDefault()
//         setExperience([...experience,<ExperienceCardForm key={experience.length} />]);
//     }
//   return (
//     <>
//         <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
//             <div className="formCardHeader flex items-center justify-between">
//                 <p className="m-0 text-raisin-black font-semibold capitalize text-[16px]">
//                     experiences
//                 </p>
//                 <button className="bg-transparent border-0" onClick={handleAddExperience}>
//                     <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <rect x="0.5" y="0.5" width="39" height="39" stroke="#D6DDEB"/>
//                         <g clipPath="url(#clip0_178_5701)">
//                         <path fillRule="evenodd" clipRule="evenodd" d="M20 12C20.5523 12 21 12.4477 21 13V27C21 27.5523 20.5523 28 20 28C19.4477 28 19 27.5523 19 27V13C19 12.4477 19.4477 12 20 12Z" fill="#4D7EA8"/>
//                         <path fillRule="evenodd" clipRule="evenodd" d="M12 20C12 19.4477 12.4477 19 13 19H27C27.5523 19 28 19.4477 28 20C28 20.5523 27.5523 21 27 21H13C12.4477 21 12 20.5523 12 20Z" fill="#4D7EA8"/>
//                         </g>
//                         <defs>
//                         <clipPath id="clip0_178_5701">
//                         <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
//                         </clipPath>
//                         </defs>
//                     </svg>
//                 </button>
//             </div>
//             {experience}
//         </div>
//     </>
//   )
// }
