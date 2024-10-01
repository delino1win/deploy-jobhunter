"use client";

import { getDetailProfile } from "@/fetch";
import { jobHunterUrl } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CompanyProfile() {
  const { data: session, status } = useSession();
  const [companyDetail, setCompanyDetail] = useState<CompanyProfile>();

  const router = useRouter();

  // console.log("detail id: ", session?.user?.detailId);

  async function fetchData() {
    const getDetail = await getDetailProfile(session?.user?.detailId || "") as CompanyProfile
    // console.log("getDetail: ", getDetail);

    setCompanyDetail(getDetail);
  }

  useEffect(() => {
    //function ini taruh di luar gpp kok

    if (status === "authenticated") {
      fetchData();
      // console.log("companyDetail: ", companyDetail );
    }
  }, [session, status]);

  async function handleUpdateDetail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let data = {
      ...companyDetail,
      companyName: formData.get("companyName"),
      companyDescription: formData.get("companyDescription"),
    } as CompanyProfile;

    // if (!data.companyName || !data.companyDescription) {
    //   data.isEligible = false;
    // } else {
    //   data.isEligible = true;
    // }

    const res = await fetch(
      jobHunterUrl + `/api/user-profile/${session?.user?.detailId}`,
      {
        method: "put",
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      return await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: `error code: ${res.status}`,
        showCloseButton: true,
      });
    }

    await Swal.fire({
      icon: "success",
      title: "Update Success",
      text: res.statusText,
      showCloseButton: true,
    });

    return router.push("/company/joblisting");
  }

  if (status === "loading") {
    return <>Loading ...</>;
  }

  return (
    <>
      <div className="dashboardCompanyProfile py-4 px-5 text-gray-800">
        <form onSubmit={handleUpdateDetail}>
          <div className="dashboardPostjobsSection my-5">
            <div className="flex flex-wrap">
              <div className="info md:w-6/12">
                <div className="infoLabel text-[16px] text-raisin-black capitalize">
                  Company Logo
                </div>
                <div className="infoContent text-slate-grey capitalize text-[16px]">
                  This image will be shown publicly as company logo.
                </div>
              </div>
              <div className="inputWrap md:w-6/12">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full "
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="dashboardPostjobsSection my-5">
            <div className="flex flex-wrap">
              <div className="info md:w-6/12">
                <div className="infoLabel text-[16px] text-raisin-black capitalize">
                  Company Name
                </div>
                <div className="infoContent text-slate-grey capitalize text-[16px]">
                  Introduce your company core info quickly to users by fill up
                  company details
                </div>
              </div>
              <div className="inputWrap md:w-6/12">
                <input
                  name="companyName"
                  type="text"
                  placeholder={`${
                    companyDetail?.companyName
                      ? `${companyDetail?.companyName}`
                      : "Insert your Company Name Here"
                  }`}
                  className="input input-bordered w-full max-w-sm placeholder-gray-600"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="dashboardPostjobsSection my-5">
            <div className="flex flex-wrap">
              <div className="info md:w-6/12">
                <div className="infoLabel text-[16px] text-raisin-black capitalize">
                  About Company
                </div>
                <div className="infoContent text-slate-grey capitalize text-[16px]">
                  Brief description for your company. URLs are hyperlinked.
                </div>
              </div>
              <div className="inputWrap md:w-6/12">
                <textarea
                  name="companyDescription"
                  className="textarea textarea-bordered h-36 w-full placeholder-gray-600"
                  placeholder={`${
                    companyDetail?.companyDescription
                      ? `${companyDetail?.companyDescription}`
                      : "Enter Description"
                  }`}
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-steel-blue text-white font-bold border border-solid border-steel-blue text-center transition px-[24px] py-[12px] my-3 hover:text-steel-blue hover:bg-white"
          >
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
}
