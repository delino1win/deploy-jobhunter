"use client";

export default function AuthOptionBtn() {
    function authSwitch(e: HTMLElement) {
        const authOptions = document.querySelectorAll(".authOptions");
      
        authOptions.forEach((el) => {
          el.classList.remove("bg-slate-300");
        });
      
        e.classList.add("bg-slate-300");
    }
  return (
    <>
        <div className="flex flex-row justify-center items-center">
            <button className="authOptions w-1/2 px-2 py-2 text-steel-blue text-base font-semibold hover:bg-slate-300 bg-slate-300" onClick={(e) => authSwitch(e.currentTarget)}>Job Seeker</button>
            <button className="authOptions w-1/2 px-2 py-2 text-steel-blue text-base font-semibold hover:bg-slate-300" onClick={(e) => authSwitch(e.currentTarget)}>Company</button>
        </div>
    </>
  )
}
