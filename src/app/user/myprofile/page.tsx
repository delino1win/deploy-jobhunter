"use client";

import { getDetailProfile } from "@/fetch";
import { formatDate, jobHunterUrl } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyProfile() {
  const { data: session, status } = useSession();
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>();

  const router = useRouter()

  async function fetchData() {
    const getDetail = (await getDetailProfile(
      session?.user?.detailId || ""
    )) as CandidateProfile;
    // console.log("getDetail: ", getDetail);

    setCandidateProfile(getDetail);
  }

  useEffect(() => {
    //function ini taruh di luar gpp kok

    if (status === "authenticated") {
      fetchData();
      // console.log("companyDetail: ", companyDetail );
    }
  }, [session, status]);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);


    let data = {
    //   profilePicture: formData.get("image"),
        ...candidateProfile,
      phoneNumber: formData.get("number"),
      currentCity: formData.get("currentCity"),
      education: formData.get("education"),
      dateOfBirth: new Date(formData.get("birthdate") as string).toISOString(),
      gender: formData.get("gender"),
      latestExperience: formData.get("latestExperience"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      updatedAt: new Date().toISOString()
    } as CandidateProfile

    if(!data.phoneNumber || !data.gender || !data.latestExperience || !data.skills) {
        data.isEligible = false
        await Swal.fire({
            icon: "warning",
            title: "Complete Mandatory",
            text: "Phone Number, Gender, latest exp, and skills cant be empty. Therefore can't apply for job"
        })
    } else data.isEligible = true

    // console.log("Form Data:", data);
    try {
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
      
          return router.push("/FindJobs");

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <>
      <div className="dashboardProfile py-4 px-5 text-gray-800">
      <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                full name
              </span>
            </div>
            <input
                value={session?.user?.name}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                email
              </span>
            </div>
            <input
              type="text"
              value={session?.user?.name}
              placeholder="Email"
              className="input input-bordered w-full "
            />
          </label>
        <form onSubmit={handleFormSubmit}>
          
          
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                phone number
              </span>
            </div>
            <input
              type="number"
              name="number"
              placeholder={`${candidateProfile?.phoneNumber ? `${candidateProfile.phoneNumber}` : "08 or +62"}`}
              className="input input-bordered w-full placeholder-gray-600"
            />
          </label>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                Current Address
              </span>
            </div>
            <input
              type="text"
              name="currentCity"
              placeholder={`${candidateProfile?.currentCity ? `${candidateProfile.currentCity}` : "e.g City, District/Sub-District"}`}
              className="input input-bordered w-full placeholder-gray-600"
            />
          </label>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                birth date: {`${candidateProfile?.dateOfBirth ? `${formatDate(candidateProfile?.dateOfBirth)}` : ""}`}
              </span>
            </div>
            <input
              type="date"
              name="dateOfBirth"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                gender: {`${candidateProfile?.gender ? `${candidateProfile.gender}` : ""}`}
              </span>
            </div>
            <select
              name="gender"
              defaultValue={`${candidateProfile?.gender ? `${candidateProfile.gender}` : ""}`}
              className="select select-bordered text-raisin-black w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          {/* <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                Years of Experience
              </span>
            </div>
            <input
              name="yearsexperience"
              type="number"
              placeholder="Years of Experience"
              className="input input-bordered w-full"
            />
          </label> */}
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                about me
              </span>
            </div>
            <textarea
              name="bio"
              className="textarea textarea-bordered h-24 placeholder-gray-600"
              placeholder={`${candidateProfile?.bio ? `${candidateProfile.bio}` : "Bio About me"}`}
            ></textarea>
          </label>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text capitalize text-slate-grey">
                Latest Experience
              </span>
            </div>
            <input
              type="text"
              placeholder={`${candidateProfile?.latestExperience ? `${candidateProfile.latestExperience}` : "Last Job, Start - End Year"}`}
              name="latestExperience"
              className="input input-bordered w-full placeholder-gray-600"
            />
          </label>

          <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
            <div className="formCardHeader flex items-center justify-between mb-3">
              <p className="m-0 text-raisin-black font-semibold capitalize text-[16px]">
                Education
              </p>
            </div>
            <textarea
              name="education"
              className="textarea textarea-bordered h-36 w-full placeholder-gray-600"
              placeholder={`${candidateProfile?.education ? `${candidateProfile.education}` : "University/Similar, Start - End year: Degree of Major (e.g Harvard, 2021 - 2023: Bachelor of Computer Science)"}`}
            ></textarea>
          </div>

          <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
            <div className="formCardHeader flex items-center justify-between mb-3">
              <p className="m-0 text-raisin-black font-semibold capitalize text-[16px]">
                skills
              </p>
            </div>
            <textarea
              name="skills"
              className="textarea textarea-bordered h-36 w-full placeholder-gray-600"
              placeholder={`${candidateProfile?.skills ? `${candidateProfile.skills}` : "Describe your skill and experience"}`}
            ></textarea>
          </div>
          <label className="form-control w-full max-w-sm mb-3">
            <div className="label">
              <span className="label-text">Select Profile Image</span>
            </div>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full placeholder-gray-600"
            />
          </label>
          <button
            type="submit"
            className="bg-steel-blue block text-white font-bold capitalize border border-solid border-steel-blue text-center transition px-[24px] py-[12px] hover:text-steel-blue hover:bg-white"
          >
            Save Profile
          </button>
          
        </form>
      </div>
    </>
  );
}
