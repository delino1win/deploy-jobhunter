//
"use client"

import { getAllApplicant, getAllUser, getListJobVacancy } from "@/fetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardUser() {
  const [listApplicant, setListApplicant] = useState<ApplyJob[]>([]);
  const [listJob, setListJob] = useState<JobVacancy[]>([]);
  const [listUser, setListUser] = useState<UserFiltered[]>([]);
  const { data: session, status } = useSession();

  //   const filterIndex = `userId=${session?.user.id}`;

  // console.log("session:", session?.user.id);
  // console.log(listJob);

  useEffect(() => {
    async function fetchData() {
      const resultAplicants = await getAllApplicant();
      const resultJobVacancy = await getListJobVacancy();
      const resultUser = await getAllUser(); //udah difilter cuman info yg yg ga sensifitif

      setListApplicant(resultAplicants);
      setListJob(resultJobVacancy);
      setListUser(resultUser);

      // console.log("result user: ", resultAplicants);
    }

    fetchData();
  }, [session]);

  if (status === "loading") {
    return <>Loading ...</>;
  }

  if (session?.user?.role !== "candidate") {
    return null;
  }

  //Dapatin list applicant/lamaran si authenticated candidate itu ke job apa aja
  const filteredApplicant = listApplicant.filter((user) => user.candidateId === session?.user?.id);

  //Dapatin list job/lamaran yg dibuat oleh perusahaan terus dilist
  const filteredJob = listJob.filter((job) => {
    for (let i = 0; i < filteredApplicant.length; i++) {
      if (job.id === filteredApplicant[i].jobId) {
        return job;
      }
    }
  });

  const filteredOngoing = filteredApplicant.filter(applicant => applicant.status === "ongoing")
  const filteredCompleted = filteredApplicant.filter(applicant => applicant.status === "accepted" || applicant.status === "rejected")

  return (
    <>
      <div className="dashboardHome flex flex-col md:flex-row flex-wrap items-center gap-6 py-4 px-5">
        <div className="dashboardHomeCard overflow-hidden border border-lavender border-solid bg-white relative p-[24px] min-w-[258px]">
          <p className="text-raisin-black font-semibold text-[20px] capitalize mt-0 mb-2">
            Total Jobs Applied
          </p>
          <p className="text-raisin-black font-semibold text-[72px] uppercase">
            {filteredJob.length}
          </p>

          <svg
            className="absolute right-0 bottom-0"
            width="88"
            height="68"
            viewBox="0 0 88 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.667 14.6667C24.6945 14.6667 23.7619 15.053 23.0743 15.7406C22.3866 16.4283 22.0003 17.3609 22.0003 18.3334V69.6667C22.0003 70.6392 22.3866 71.5718 23.0743 72.2594C23.7619 72.9471 24.6945 73.3334 25.667 73.3334H62.3337C63.3061 73.3334 64.2388 72.9471 64.9264 72.2594C65.614 71.5718 66.0003 70.6392 66.0003 69.6667L66.0003 34.5188L46.1486 14.6671L25.667 14.6667ZM17.8888 10.5552C19.9517 8.4923 22.7496 7.33337 25.667 7.33337H46.149C48.0936 7.33379 49.9591 8.10653 51.3341 9.48165M51.3341 9.48165L71.185 29.3326C71.1849 29.3325 71.1851 29.3327 71.185 29.3326C72.5601 30.7075 73.3332 32.5727 73.3337 34.5173V69.6667C73.3337 72.5841 72.1747 75.382 70.1118 77.4449C68.0489 79.5078 65.251 80.6667 62.3337 80.6667H25.667C22.7496 80.6667 19.9517 79.5078 17.8888 77.4449C15.8259 75.382 14.667 72.5841 14.667 69.6667V18.3334C14.667 15.416 15.8259 12.6181 17.8888 10.5552M29.3337 44C29.3337 41.975 30.9753 40.3334 33.0003 40.3334H55.0003C57.0254 40.3334 58.667 41.975 58.667 44C58.667 46.0251 57.0254 47.6667 55.0003 47.6667H33.0003C30.9753 47.6667 29.3337 46.0251 29.3337 44ZM29.3337 58.6667C29.3337 56.6417 30.9753 55 33.0003 55H55.0003C57.0254 55 58.667 56.6417 58.667 58.6667C58.667 60.6918 57.0254 62.3334 55.0003 62.3334H33.0003C30.9753 62.3334 29.3337 60.6918 29.3337 58.6667Z"
                fill="#515B6F"
              />
              <rect
                x="29.333"
                y="40.3334"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
              <rect
                x="29.333"
                y="55"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
            </g>
          </svg>
        </div>
        <div className="dashboardHomeCard overflow-hidden border border-lavender border-solid bg-white relative p-[24px] min-w-[258px]">
          <p className="text-raisin-black font-semibold text-[20px] capitalize mt-0 mb-2">
            On Going
          </p>
          <p className="text-raisin-black font-semibold text-[72px] uppercase">
            {filteredOngoing.length}
          </p>

          <svg
            className="absolute right-0 bottom-0"
            width="88"
            height="68"
            viewBox="0 0 88 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.667 14.6667C24.6945 14.6667 23.7619 15.053 23.0743 15.7406C22.3866 16.4283 22.0003 17.3609 22.0003 18.3334V69.6667C22.0003 70.6392 22.3866 71.5718 23.0743 72.2594C23.7619 72.9471 24.6945 73.3334 25.667 73.3334H62.3337C63.3061 73.3334 64.2388 72.9471 64.9264 72.2594C65.614 71.5718 66.0003 70.6392 66.0003 69.6667L66.0003 34.5188L46.1486 14.6671L25.667 14.6667ZM17.8888 10.5552C19.9517 8.4923 22.7496 7.33337 25.667 7.33337H46.149C48.0936 7.33379 49.9591 8.10653 51.3341 9.48165M51.3341 9.48165L71.185 29.3326C71.1849 29.3325 71.1851 29.3327 71.185 29.3326C72.5601 30.7075 73.3332 32.5727 73.3337 34.5173V69.6667C73.3337 72.5841 72.1747 75.382 70.1118 77.4449C68.0489 79.5078 65.251 80.6667 62.3337 80.6667H25.667C22.7496 80.6667 19.9517 79.5078 17.8888 77.4449C15.8259 75.382 14.667 72.5841 14.667 69.6667V18.3334C14.667 15.416 15.8259 12.6181 17.8888 10.5552M29.3337 44C29.3337 41.975 30.9753 40.3334 33.0003 40.3334H55.0003C57.0254 40.3334 58.667 41.975 58.667 44C58.667 46.0251 57.0254 47.6667 55.0003 47.6667H33.0003C30.9753 47.6667 29.3337 46.0251 29.3337 44ZM29.3337 58.6667C29.3337 56.6417 30.9753 55 33.0003 55H55.0003C57.0254 55 58.667 56.6417 58.667 58.6667C58.667 60.6918 57.0254 62.3334 55.0003 62.3334H33.0003C30.9753 62.3334 29.3337 60.6918 29.3337 58.6667Z"
                fill="#515B6F"
              />
              <rect
                x="29.333"
                y="40.3334"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
              <rect
                x="29.333"
                y="55"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
            </g>
          </svg>
        </div>
        <div className="dashboardHomeCard overflow-hidden border border-lavender border-solid bg-white relative p-[24px] min-w-[258px]">
          <p className="text-raisin-black font-semibold text-[20px] capitalize mt-0 mb-2">
            Completed
          </p>
          <p className="text-raisin-black font-semibold text-[72px] uppercase">
            {filteredCompleted.length}
          </p>

          <svg
            className="absolute right-0 bottom-0"
            width="88"
            height="68"
            viewBox="0 0 88 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.667 14.6667C24.6945 14.6667 23.7619 15.053 23.0743 15.7406C22.3866 16.4283 22.0003 17.3609 22.0003 18.3334V69.6667C22.0003 70.6392 22.3866 71.5718 23.0743 72.2594C23.7619 72.9471 24.6945 73.3334 25.667 73.3334H62.3337C63.3061 73.3334 64.2388 72.9471 64.9264 72.2594C65.614 71.5718 66.0003 70.6392 66.0003 69.6667L66.0003 34.5188L46.1486 14.6671L25.667 14.6667ZM17.8888 10.5552C19.9517 8.4923 22.7496 7.33337 25.667 7.33337H46.149C48.0936 7.33379 49.9591 8.10653 51.3341 9.48165M51.3341 9.48165L71.185 29.3326C71.1849 29.3325 71.1851 29.3327 71.185 29.3326C72.5601 30.7075 73.3332 32.5727 73.3337 34.5173V69.6667C73.3337 72.5841 72.1747 75.382 70.1118 77.4449C68.0489 79.5078 65.251 80.6667 62.3337 80.6667H25.667C22.7496 80.6667 19.9517 79.5078 17.8888 77.4449C15.8259 75.382 14.667 72.5841 14.667 69.6667V18.3334C14.667 15.416 15.8259 12.6181 17.8888 10.5552M29.3337 44C29.3337 41.975 30.9753 40.3334 33.0003 40.3334H55.0003C57.0254 40.3334 58.667 41.975 58.667 44C58.667 46.0251 57.0254 47.6667 55.0003 47.6667H33.0003C30.9753 47.6667 29.3337 46.0251 29.3337 44ZM29.3337 58.6667C29.3337 56.6417 30.9753 55 33.0003 55H55.0003C57.0254 55 58.667 56.6417 58.667 58.6667C58.667 60.6918 57.0254 62.3334 55.0003 62.3334H33.0003C30.9753 62.3334 29.3337 60.6918 29.3337 58.6667Z"
                fill="#515B6F"
              />
              <rect
                x="29.333"
                y="40.3334"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
              <rect
                x="29.333"
                y="55"
                width="29.3333"
                height="7.33333"
                rx="3.66667"
                fill="#26A4FF"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
