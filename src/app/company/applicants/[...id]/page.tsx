"use client";

import { getDetailProfile } from "@/fetch";
import { checkEligibleCompany, formatDate, jobHunterUrl } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type CandidateInformation = {
  name: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  currentCity: string;
  latestExperience?: string;
  education?: string;
  bio?: string;
  skills: string;
};

//slug = candidate ID
export default function ApplicantDetails({
  params,
}: {
  params: { id: string[] };
}) {
  const { data: session } = useSession();

  const [candidateInfo, setCandidateInfo] = useState<CandidateInformation>();
  const [candidateApplicant, setCandidateApplicant] = useState<ApplyJob>();

  const router = useRouter();

  const applicantId = params.id[0];
  const candidateId = params.id[1];
  
  useEffect(() => {
    if (candidateId) {
      fetchUserInfo();
      
      fetchApplicantDetail();
    }

  }, [candidateId]);

  if (!params.id || params.id.length < 2) {
    alert("Invalid Route, click Ok to back");
    return router.back();
  }



  if (!candidateId) {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return router.back();
      }
    });
  }

  async function fetchApplicantDetail() {
    try {
      //Dapatin detail applicant by id
      const res = await fetch(jobHunterUrl + `/api/apply-job/${applicantId}`);

      console.log("appid: ", res);
      
      const getCandidateDetail: ApplyJob = await res.json();

      console.log("getCandidateDetail: ", getCandidateDetail);
      
      setCandidateApplicant(getCandidateDetail);
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        text: `${error}`,
      });
    }
  }

  async function fetchUserInfo() {
    let tempinfo = {} as CandidateInformation;
    try {
      //ntar dibuat function terpisah agar lebih rapih
      const userRes = await fetch(jobHunterUrl + `/api/user/${candidateId}`);
      const getUser: User = await userRes.json();

      const getDetailUser = (await getDetailProfile(
        getUser.detailId || ""
      )) as CandidateProfile;

      if (getUser) {
        tempinfo.name = getUser.name;
      }

      if (getDetailUser) {
        tempinfo.gender = getDetailUser.gender;
        tempinfo.phoneNumber = getDetailUser.phoneNumber;
        tempinfo.dateOfBirth = getDetailUser.dateOfBirth;
        tempinfo.currentCity = getDetailUser.currentCity;
        tempinfo.bio = getDetailUser?.bio;
        tempinfo.skills = getDetailUser.skills;
        tempinfo.latestExperience = getDetailUser.latestExperience;
        tempinfo.education = getDetailUser.education;
      }

      // if (!tempinfo.name || !tempinfo.phoneNumber || !tempinfo.skills) {
      //   return Swal.fire({
      //     icon: "error",
      //     title: "Invalid Input",
      //     text: "Name, Phone Number, or Skills must not Empty",
      //     showCloseButton: true,
      //   });
      // }

      setCandidateInfo({ ...tempinfo });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        text: `${error}`,
      });
    }
  }

  async function handleUpdateStatus(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const result = await Swal.fire({
        icon: "question",
        title: "Update Status",
        text: `Are you sure want to update?`,
        showCloseButton: true,
        showConfirmButton: true,
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        const isEligible = await checkEligibleCompany(
          session?.user?.detailId || ""
        );

        // console.log("isEligible: ", isEligible);

        if (!isEligible) {
          await Swal.fire({
            icon: "error",
            title: "Complete Your Company Profile first",
            showCloseButton: true,
          });

          return router.push("/company/profile");
        }

        const data = {
          ...candidateApplicant,
          status: formData.get("status"),
        } as ApplyJob;

        if (!data.status) {
          await Swal.fire({
            icon: "info",
            title: "No Update Applicant Status",
            text: "Your Applicant Status is same, therefore no update requested",
            showCloseButton: true,
          });
        }

        // console.log("data: ", data);
        // console.log(data.status, candidateApplicant?.status);
        // console.log(applicantId);

        const updateRes = await fetch(jobHunterUrl + `/api/apply-job/${applicantId}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        
        const res = await updateRes.json()

        // console.log(res);
        
        await Swal.fire({
          icon: "success",
          title: "Update Status Success",
          text: `${updateRes.status}`,
          showCloseButton: true,
        });

        return router.push("/company/applicants")
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        text: `${error}`,
      });
    }
  }

  return (
    <>
      <div className="dashboardApplicantDetails py-4 px-5">
        <div className="dashboardApplicantDetailsSection my-3 max-w-[700px]">
          <p className="font-semibold text-raisin-black capitalize text-[18px] mb-3">
            personal info
          </p>
          <div className="flex flex-wrap gap-5 mb-3">
            <div className="info">
              <div className="infoLabel text-[16px] text-slate-grey capitalize">
                full name
              </div>
              <div className="infoContent text-raisin-black capitalize text-[16px]">
                {candidateInfo?.name}
              </div>
            </div>
            <div className="info">
              <div className="infoLabel text-[16px] text-slate-grey capitalize">
                gender
              </div>
              <div className="infoContent text-raisin-black capitalize text-[16px]">
                {candidateInfo?.gender}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-3">
            <div className="info">
              <div className="infoLabel text-[16px] text-slate-grey capitalize">
                birth date
              </div>
              <div className="infoContent text-raisin-black capitalize text-[16px]">
                {formatDate(candidateInfo?.dateOfBirth as string)}
              </div>
            </div>
            <div className="info">
              <div className="infoLabel text-[16px] text-slate-grey capitalize">
                address
              </div>
              <div className="infoContent text-raisin-black capitalize text-[16px]">
                {candidateInfo?.currentCity}
              </div>
            </div>
          </div>
        </div>
        <hr className="max-w-[700px]" />
        <div className="dashboardApplicantDetailsSection my-3 max-w-[700px]">
          <p className="font-semibold text-raisin-black capitalize text-[18px] mb-3">
            professional info
          </p>
          <div className="info mb-3">
            <div className="infoLabel text-[16px] text-slate-grey capitalize">
              about me
            </div>
            <div className="infoContent text-raisin-black capitalize text-[16px]">
              {candidateInfo?.bio}
            </div>
          </div>
          <div className="info mb-3">
            <div className="infoLabel text-[16px] text-slate-grey capitalize">
              Current/Latest job
            </div>
            <div className="infoContent text-raisin-black capitalize text-[16px]">
              {candidateInfo?.latestExperience}
            </div>
          </div>
          <div className="info mb-3">
            <div className="infoLabel text-[16px] text-slate-grey capitalize">
              Highest Qualification Held
            </div>
            <div className="infoContent text-raisin-black capitalize text-[16px]">
              {candidateInfo?.education}
            </div>
          </div>
          <div className="info mb-3">
            <div className="infoLabel text-[16px] text-slate-grey capitalize">
              Skills
            </div>
            <div className="infoContent text-raisin-black capitalize text-[16px]">
              {candidateInfo?.skills}
            </div>
          </div>
        </div>
        {/* <div className="dashboardApplicantDetailsSection my-3 max-w-[700px]">
          <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
            <div className="formCardHeader flex items-center justify-between">
              <p className="m-0 text-raisin-black font-semibold capitalize text-[16px]">
                experiences
              </p>
            </div>
            <div className="formCardBody py-[24px] border-b border-solid border-slate-grey">
              <p className="mb-3 text-raisin-black font-semibold capitalize text-[18px]">
                product designer
              </p>
              <p className="mb-3 font-medium capitalize text-raisin-black text-[16px]">
                <b>Twitter</b> - full time - 4 years
              </p>
              <p className="mb-3 font-medium capitalize text-raisin-black text-[16px]">
                jakarta, indonesia
              </p>
              <p className="font-medium text-raisin-black text-[16px]">
                Created and executed social media plan for 10 brands utilizing
                multiple features and content types to increase brand outreach,
                engagement, and leads.
              </p>
            </div>
            <div className="formCardBody py-[24px] border-b border-solid border-slate-grey">
              <p className="mb-3 text-raisin-black font-semibold capitalize text-[18px]">
                product designer
              </p>
              <p className="mb-3 font-medium capitalize text-raisin-black text-[16px]">
                <b>Twitter</b> - full time - 4 years
              </p>
              <p className="mb-3 font-medium capitalize text-raisin-black text-[16px]">
                jakarta, indonesia
              </p>
              <p className="font-medium text-raisin-black text-[16px]">
                Created and executed social media plan for 10 brands utilizing
                multiple features and content types to increase brand outreach,
                engagement, and leads.
              </p>
            </div>
          </div>
        </div> */}

        <form
          onSubmit={handleUpdateStatus}
          className="dashboardApplicantUpdateStatus"
        >
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text">Update Applicant Status</span>
            </div>
            <select
              name="status"
              className="select select-bordered text-raisin-black"
            >
              <option value={candidateApplicant?.status} disabled selected>
                On Going
              </option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
          <button type="submit" className="bg-steel-blue w-full text-center md:w-fit text-white font-semibold text-base px-4 py-2 md:py-1 border-2 border-steel-blue hover:text-steel-blue hover:bg-white">
            Update !
          </button>
        </form>
      </div>
    </>
  );
}
