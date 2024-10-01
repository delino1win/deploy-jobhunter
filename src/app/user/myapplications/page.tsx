"use client";

import MyApplicationTableRow from "@/app/_components/MyApplicationTableRow";
import { getAllApplicant, getAllUser, getListJobVacancy } from "@/fetch";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

//list applicant yang punya candidate id sama dengan authenticated candidate
//Applicant list yg didapat, diambil jobId nya
//Dapat info job id beserta company id
//company id diambil utk dapatin info si company
//flow nya candidateid (dari session) => dapatin job id => dapatin user id => filter user id as company => dapatin info company
//

export default function Myapplications() {
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

  const findCompany = listUser.filter((company) => {
    for (let i = 0; i < filteredJob.length; i++) {
      if (company.id === filteredJob[i].userId) {
        return company;
      }
    }
  });

  
  console.log(filteredApplicant);
  // console.log(filteredCompany);
  // console.log(vacancy);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-raisin-black">
          <thead className="text-slate-grey">
            <tr>
              <th className="font-medium text-[16] capitalized">#</th>
              <th className="font-medium text-[16] capitalized">
                Company Name
              </th>
              <th className="font-medium text-[16] capitalized">Roles</th>
              <th className="font-medium text-[16] capitalized">
                Date Applied
              </th>
              <th className="font-medium text-[16] capitalized">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {Array.from({ length: 10 }).map((_, i: number) => {
              return <MyApplicationTableRow index={i + 1} key={i} />;
            })} */}
            {filteredJob.length > 0 && (
              <>
                {filteredJob.map((vacancy, index) => (
                  <MyApplicationTableRow
                    key={vacancy.id}
                    vacancy={vacancy}
                    filteredApplicant={filteredApplicant}
                    filteredCompany={findCompany}
                    index={index + 1}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
