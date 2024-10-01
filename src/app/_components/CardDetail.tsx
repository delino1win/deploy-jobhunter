type Props = {
    detailData?: JobVacancy
    handleApply: () => void
}

export default function CardDetail(props: Props) {
    return (
        <>  
            <div className="detailCard bg-white  p-[24px] w-full max-w-full md:max-w-[1100px]">
                <div className="flex flex-wrap items-center justify-between w-full">
                    <div className="flex items-center gap-[20px] mb-2">
                        <img src="/logo-nomad.svg" alt="company name" className="max-w-full h-auto w-[88px]"/>
                        
                        <div>
                            <h1 className="detailTitle text-[32px] font-semibold text-raisin-black">
                                {props.detailData?.title}
                            </h1>
                            <h3 className="font-semibold text-raisin-black">{props.detailData?.companyName}</h3>
                        </div>
                    </div>
                    <button
                    onClick={props.handleApply}
                    className="bg-steel-blue w-full text-center md:w-fit text-white font-semibold text-base px-10 py-3 md:py-3 border-2 border-steel-blue hover:text-steel-blue hover:bg-white" 
                    >Apply</button>
                </div>
            </div>
        </>
    )
}