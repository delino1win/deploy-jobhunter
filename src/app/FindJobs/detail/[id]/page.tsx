"use client";

import CardDetail from "@/app/_components/CardDetail";
import { baseUrl, checkEligibleCandidate} from "@/utils";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function DetailJob({ params }: { params: { id: string } }) {
  const [detailData, setDetailData] = useState<JobVacancy>();
  const { data: session } = useSession();
  const router = useRouter();
  const jobDate = dayjs(detailData?.updatedAt).format("DD MMMM YYYY");

  async function getDetailsJob() {
    let url = baseUrl + `/job-vacancy/${params.id}`;
    const res = await fetch(url);
    const responseJson: JobVacancy = await res.json();
    setDetailData(responseJson);
  }

  useEffect(() => {
    getDetailsJob();
  }, [session]);

  async function handleApply() {
    try {
      const isEligible = await checkEligibleCandidate(
        session?.user?.detailId || ""
      );

      console.log("isEligible: ", isEligible);

      if (!isEligible) {
        await Swal.fire({
          icon: "error",
          title: "Complete Your Candidate Profile first",
          showCloseButton: true,
        });

        return router.push("/user/myprofile");
      }
      let config = {
        method: "post",
        url: `http://localhost:3000/api/apply-job/${params.id}`,
      };
      await axios(config);
      await Swal.fire({
        icon: "success",
        title: "Apply succeed",
        showCloseButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="detail pt-4">
        <div className="detailHeader bg-raisin-black flex items-center justify-center min-h-[350px] px-5">
          <CardDetail detailData={detailData} handleApply={handleApply} />
        </div>
        <div className="detailBody bg-white">
          <div className="detailBodyWrap flex flex-wrap justify-center py-5 max-w-full md:max-w-[1200px] m-auto">
            <div className="detailBodyLeft px-6 w-full md:w-8/12">
              <div className="detailBodyLeftSection mb-6">
                <h2 className="detailBodyLeftSectionTitle font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                  Description
                </h2>
                <p className="detailBodyLeftSectionDescription text-slate-grey m-0 text-[16px]">
                  {detailData?.details.description}
                </p>
              </div>
              <div className="detailBodyLeftSection mb-6">
                <h2 className="detailBodyLeftSectionTitle font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                  Responsibilities
                </h2>
                <p className="detailBodyLeftSectionDescription text-slate-grey m-0 text-[16px]">
                  {detailData?.details.responsibilities}
                </p>
              </div>
              <div className="detailBodyLeftSection mb-6">
                <h2 className="detailBodyLeftSectionTitle font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                  Requirements
                </h2>
                <p className="detailBodyLeftSectionDescription text-slate-grey m-0 text-[16px]">
                  {detailData?.details.requirements}
                </p>
              </div>
              <div className="detailBodyLeftSection mb-6">
                <h2 className="detailBodyLeftSectionTitle font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                  Nice to Haves
                </h2>
                <p className="detailBodyLeftSectionDescription text-slate-grey m-0 text-[16px]">
                  {detailData?.details.preferences}
                </p>
              </div>
              <div className="detailBodyLeftSection mb-6">
                <h2 className="detailBodyLeftSectionTitle font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                  Perks and Benefits
                </h2>
                <p className="detailBodyLeftSectionDescription text-slate-grey m-0 text-[16px]">
                  {detailData?.details.benefits}
                </p>
              </div>
            </div>
            <div className="detailBodyRight px-6 w-full md:w-4/12">
              <h2 className="detailBodyLeftSectionTitle text-center md:text-left font-semibold text-raisin-black capitalize mb-3 text-[32px]">
                About this role
              </h2>
              <div className="flex flex-wrap items-center justify-between mb-3">
                <p className="m-0 text-slate-grey text-[16px]">Job Posted On</p>
                <p className="m-0 text-raisin-black text-[16px] md:text-right font-bold">
                  {jobDate}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-3">
                <p className="m-0 text-slate-grey text-[16px]">Job Type</p>
                <p className="m-0 text-raisin-black text-[16px] md:text-right font-bold">
                  {detailData?.jobType}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-3">
                <p className="m-0 text-slate-grey text-[16px]">Salary</p>
                <p className="m-0 text-raisin-black text-[16px] md:text-right font-bold">
                  {detailData?.details.salary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
