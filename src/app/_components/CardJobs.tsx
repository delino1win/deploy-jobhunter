'use client'

export default function CardJobs(props: {jobData: JobVacancy}) {
    
    return (
        <>  
            <div className="homeCardWrap w-full lg:w-3/12 px-4 mb-4">
                <div className="homeCard bg-white p-[24px] ">
                    <div className="homeCardHeader flex items-center justify-between mb-2">
                        <img src="/logo-nomad.svg" alt="company name" className="max-w-full h-auto"/>
                        <div className="border border-solid border-steel-blue text-steel-blue text-[16px] capitalize px-2 py-1">
                            <h3>{props.jobData?.jobType}</h3>
                        </div>
                    </div>
                    <p className="jobTitle text-raisin-black font-semibold text-[18px]">
                       {props.jobData?.title}
                    </p>
                    <p className="text-slate-grey mb-2">
                        {props.jobData?.companyName} |
                        {props.jobData?.location}
                    </p>
                </div>
            </div>
        </>
    )
}