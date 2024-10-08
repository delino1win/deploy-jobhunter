/* eslint-disable react/jsx-key */
import { checkBoxTypeCategory, checkBoxTypeEmployment, checkBoxTypeRange } from "../constants/checkbox"

type Props = {
    selectedEmployment: string[]
    selectedCategory: string[]
    selectedSallary: string[], 
    handleCheckbox: (value : string, checkboxType : 'employment' | 'category' | 'sallary') => void
    handleApplyCheckbox: () => void
}

export default function Checkbox(props: Props){
    function closeMenu(){
        document.querySelector(".checkboxes")?.classList.remove("opened");
        document.body.classList.remove('overflow-hidden');
    }
    return(
        <div className="checkboxes w-full bg-white md:h-auto p-5 md:p-0 absolute md:relative z-[2] md:z-auto top-0 md:top-[unset] md:w-2/12">
            <div>
                <h3 className="text-black font-semibold pb-4 ">Type of Employment</h3>
                {checkBoxTypeEmployment.map((value) => (
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            value={value} 
                            checked={props.selectedEmployment.includes(value as string)} 
                            onChange={() => props.handleCheckbox(value as string, 'employment')}
                            className="checkbox checkbox-sm border-2 border-gray-300" />
                            <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-light text-gray-700"
                        >
                            {value}
                        </label>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-black font-semibold pb-4 pt-5">Categories</h3>
                {checkBoxTypeCategory.map((value) => (
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            value={value} 
                            checked={props.selectedCategory.includes(value)} 
                            onChange={() => props.handleCheckbox(value, 'category')}
                            className="checkbox checkbox-sm border-2 border-gray-300" />
                            <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-light text-gray-700"
                        >
                            {value}
                        </label>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-black font-semibold pb-4 pt-5">Salary Range</h3>
                {checkBoxTypeRange.map((value) => (
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox" 
                            value={value} 
                            checked={props.selectedSallary.includes(value)} 
                            onChange={() => props.handleCheckbox(value, 'sallary')}
                            className="checkbox checkbox-sm border-2 border-gray-300" />
                            <label
                            htmlFor="default-checkbox"
                            className="ms-2 text-sm font-light text-gray-700"
                        >
                            {value}
                        </label>
                    </div>
                ))}
            </div>
            <button 
            className=" bg-steel-blue w-full text-white font-semibold text-base px-4 py-2 border-2 border-steel-blue hover:text-steel-blue hover:bg-white" 
            onClick={props.handleApplyCheckbox}
            >Apply</button>

            <button className="md:hidden bg-transparent border-0 absolute right-5 top-5 w-fit" onClick={closeMenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.15161 5.15162C5.37664 4.92666 5.68181 4.80028 6.00001 4.80028C6.3182 4.80028 6.62337 4.92666 6.84841 5.15162L12 10.3032L17.1516 5.15162C17.2623 5.03701 17.3947 4.94559 17.5411 4.8827C17.6875 4.81981 17.845 4.78671 18.0043 4.78532C18.1637 4.78394 18.3217 4.8143 18.4692 4.87464C18.6166 4.93497 18.7506 5.02408 18.8633 5.13675C18.976 5.24942 19.0651 5.3834 19.1254 5.53088C19.1857 5.67836 19.2161 5.83637 19.2147 5.99571C19.2133 6.15504 19.1802 6.3125 19.1173 6.45891C19.0544 6.60531 18.963 6.73773 18.8484 6.84842L13.6968 12L18.8484 17.1516C19.067 17.3779 19.1879 17.6811 19.1852 17.9957C19.1825 18.3103 19.0563 18.6113 18.8338 18.8338C18.6113 19.0563 18.3103 19.1825 17.9957 19.1852C17.6811 19.188 17.3779 19.067 17.1516 18.8484L12 13.6968L6.84841 18.8484C6.62208 19.067 6.31896 19.188 6.00432 19.1852C5.68969 19.1825 5.38871 19.0563 5.16622 18.8338C4.94373 18.6113 4.81753 18.3103 4.8148 17.9957C4.81206 17.6811 4.93302 17.3779 5.15161 17.1516L10.3032 12L5.15161 6.84842C4.92664 6.62339 4.80026 6.31822 4.80026 6.00002C4.80026 5.68183 4.92664 5.37666 5.15161 5.15162Z" fill="#333"/>
                </svg>
            </button>
        </div>
    )
}