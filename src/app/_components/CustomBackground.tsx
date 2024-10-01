export default function CustomBackground() {
    return(
        <>
            <div className="bg-[#202430]">
                {/* Garis diagonal kiri atas */}
                <div className="absolute top-[25px] left-[63px]  w-[350px] h-[110px] border-t-[3px] border-l-[3px] border-[#4D7EA8] transform rotate-[160deg] "></div>

                {/* {/* Garis diagonal kiri */}
                <div className="absolute top-[140px] -left-[95px] w-[275px] h-[100px] border-t-[3px] border-[#4D7EA8] transform rotate-[90deg]"></div>

                {/* Garis diagonal kiri bawah */}
                {/* <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-blue-500 transform rotate-[45deg]"></div> */}

                {/* Garis diagonal kanan bawah */}
                {/* <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-spacing-10 border-blue-500 transform rotate-[45deg]"></div> */}

                {/* Garis diagonal tengah kiri */}
                <div className="absolute top-[260px] -left-[37px] w-[115px] h-24 border-t-[3px] border-[#4D7EA8] transform rotate-[155deg]"></div>

                {/* Garis diagonal tengah kanan */}
                <div className="absolute top-[140px] right-[12px] w-[159px] h-[95px] border-t-[3px] border-[#4D7EA8] transform rotate-[159deg]"></div>
                <div className="absolute top-[10px] right-[35px] w-[50px] h-[205px] border-l-[3px] border-[#4D7EA8] transform rotate-[180deg]"></div>
                <div className="absolute top-[258px] right-[0px] w-[150px] h-[145px] border-r-[3px] border-[#4D7EA8] transform rotate-[180deg]"></div>
                <div className="absolute top-[290px] right-[12px] w-[350px] h-[125px] border-t-[3px] border-[#4D7EA8] transform rotate-[159deg]"></div>

                
                {/* <div className="absolute top-1/3 right-0 w-24 h-24 border-t border-r border-blue-500 transform rotate-[90deg]"></div> */}
            </div>
        </>
    )
}