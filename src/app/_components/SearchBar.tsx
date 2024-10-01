import { useState } from "react"

type Props = { 
  handleSearch: (text: string) => void 
}

export default function SearchBar(props: Props) {
  const [searchText, setSearchText] = useState('')

    return(
        <>
          <div className="container p-[24px] max-w-full bg-white rounded">
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-2 lg:gap-2">
              <label className="input input-bordered flex items-center gap-2 w-full lg:w-auto grow">
                <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11.7666" cy="11.7666" r="8.98856" stroke="#25324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.0183 18.4851L21.5423 22" stroke="#25324B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  className="grow" 
                  placeholder="Job title or keyword" 
                  value={searchText} 
                  onChange={(e) => setSearchText(e.currentTarget.value as string)} 
                  onKeyDown={(e) => {if (e.key === 'Enter') props.handleSearch(searchText as string)}}
                />
              </label>  
              <button 
                className="bg-steel-blue block text-white font-bold capitalize border border-solid border-steel-blue text-center rounded-lg transition px-[24px] py-[12px] hover:text-steel-blue hover:bg-white w-full lg:w-fit"
                onClick={() => props.handleSearch(searchText)}
              >
                search
              </button>
            </div>
          </div>
        </>
    )
}