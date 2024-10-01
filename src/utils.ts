import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import Swal from "sweetalert2";
import { experience } from "./app/types/userProfile";

export const jobHunterUrl = "http://localhost:3000"
export const baseUrl = "https://rough-chartreuse-windshield.glitch.me"

// "http://localhost:3001";

export const generateId = () => {
  return nanoid(5);
};

// export const createDefaultProfile<T> = async (): Promise<T> => {

// }

const defaultCandidateProfile = {
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s",
  bio: "",
  currentCity: "",
  currentCountry: "",
  latestExperience: "",
  education: "",
  // experience: {},

  // education: {

  // },

  skills: "",

  isEligible: false,

  resumeUrl: "",
  socialProfiles: {
    linkedin: "",
    github: "",
    portfolio: "",
  },
  desiredJobTitle: "",
  desiredSalary: 0,
  willingToRelocate: false,
  preferredWorkEnvironment: [],
  updatedAt: "",
};

const defaultCompanyProfile = {
  companyName: "",
  companyWebsite: "",
  industry: "",
  companySize: "",
  foundedYear: "",
  companyDescription: "",
  headquarters: "",
  logoUrl: "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png",
  socialProfiles: {
    linkedin: "",
    twitter: "",
  },
  benefits: [],
  culture: "",
  hiringProcess: "",
  isEligible: false,
  updatedAt: "",
};

//ini hanya digunakan ketika membuat akun pertama kali
//penganti yg Route API
export async function createDefaultProfile(
  role: User["role"],
  id: User["detailId"],
  userId: User["id"]
) {
  const createProfileUrl = baseUrl + "/profile";

  let newData = {};

  try {
    if (role === "candidate") {
      newData = {
        ...defaultCandidateProfile,
        id: id,
        userId: userId,
      } as CandidateProfile;
    } else {
      newData = {
        ...defaultCompanyProfile,
        id: id,
        userId: userId,
      } as CompanyProfile;
    }

    const res = await fetch(createProfileUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!res.ok) {
      return {message: "Failed to create user profile", status: res.status, error: res.statusText};
    }

    return { message: `${role}, ${res.text}`, status: res.status };
  } catch (error) {
    console.log(error); 
  }
}

// function jobExperienceValidation (experiences: experience[]) {

//   experiences.forEach((obj, index) => {
//     for(let key in obj) {
//       if(!obj[key as keyof experience]) {
//         return false
//       } else return true
//     }
//   })

// }

// export async function updateProfile (prop: CandidateProfile | CompanyProfile, role: User["role"]){

//   const updateJobUrl = baseUrl + `/profile/${prop.id}`

//   let newData = {} as CandidateProfile | CompanyProfile

//   if(role === "candidate") {

//     newData = {
//       ...prop,
//     updatedAt: new Date().toISOString()
//     } as CandidateProfile

    
//     // const checkExpValidness = jobExperienceValidation(newData.experience)
    
//     if(
//       !newData.dateOfBirth 
//       || !newData.gender 
//       || !newData.phoneNumber 
//       || !newData.profilePicture 
//       || !newData.currentCity
//       || !newData.skills
//     ) {
//       newData.isEligible = false
//     } else newData.isEligible = true
//   } else if(role === "company") {
//     newData = {
//       ...prop,
//     updatedAt: new Date().toISOString()
//     } as CompanyProfile

//     if(
//       !newData.companyName
//       || !newData.industry
//       || !newData.companyDescription
//     ) {
//       newData.isEligible = false
//     } else newData.isEligible = true 
//   } else throw new Error("Unauthorized")

//   try {
//     const res = await fetch(updateJobUrl, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newData)
//     })

//     if(!res.ok) {
//       return
//     }

//     await Swal.fire({
//       icon: "success",
//       title: "Update",
//       text: `${res.status}`
//     })

//     revalidatePath("/FindJobs")

//   } catch (error) {
//     console.error(error)
//   }
// }

export async function updateJob (prop: JobVacancy) {
  const updateJobUrl = baseUrl + `/job-vacancy/${prop.id}`
  
  const newData: JobVacancy = {
    ...prop,
    updatedAt: new Date().toISOString()
  }

  try {
    const res = await fetch(updateJobUrl, {
      method: 'put',
      body: JSON.stringify(newData)
    })

    if(!res.ok) {
      return 
    }

    await Swal.fire({
      icon: "success",
      title: "Update",
      text: `${res.status}`
    })

    revalidatePath("/FindJobs")

  } catch (error) {
    console.error(error)
  }
}

export async function deleteJob (id: string) {

  const deleteJobUrl = baseUrl + `/job-vacancy/${id}`
  
  try {
    const res = await fetch(deleteJobUrl, {
      method: 'delete'
    })

    if(!res.ok) {
      return {message: "Failed to delete", status: res.status, error: res.statusText};
    }

    await Swal.fire({
      icon: "success",
      title: "Delete",
      text: `${res.status}`
    })

    revalidatePath("/FindJobs")

  } catch (error) {
    console.error(error)
  }
}

export async function getDetailApplicant (id: string) {

  const appliedUrl = baseUrl + `/applicant/${id}`;

  // console.log("id:", id);
  // console.log("url:", appliedUrl);
  

  const res = await fetch(appliedUrl)

  console.log(res);
  
  if(!res.ok) {
    return {
      error: "Get Applicant Detail Error",
      status: res.status || 500
    }
  }

  const data = await res.json()

  // console.log("this is data: ", data);

  return data
  
}

export async function getDetailWishlist (id: string) {

  const wishlistUrl = baseUrl + `/wishlist-job/${id}`;

  // console.log("id:", id);
  // console.log("url:", appliedUrl);
  

  const res = await fetch(wishlistUrl)

  console.log(res);
  
  if(!res.ok) {
    return {
      error: "Get Wishlist Error",
      status: res.status || 500
    }
  }

  const data = await res.json()

  // console.log("this is data: ", data);

  return data
    
}

export async function checkEligibleCompany(userId: string) {
  try {
    const res = await fetch(jobHunterUrl + `/api/user-profile/${userId}`)

    // console.log("result :", userId);

    if(!res.ok) {
      throw new Error(res.statusText)
    }

    const result: CompanyProfile = await res.json()

    // console.log("result :", userId);

    // if(!result.isEligible) {
    //   return {message: "Complete your Company Profile", status: 400};
    // }

    return result.isEligible

  } catch (error) {
    console.error(error)
  }
}

export async function checkEligibleCandidate(userId: string) {
  try {
    const res = await fetch(jobHunterUrl + `/api/user-profile/${userId}`)

    // console.log("result :", userId);

    if(!res.ok) {
      throw new Error(res.statusText)
    }

    const result: CandidateProfile = await res.json()

    // console.log("result :", userId);

    // if(!result.isEligible) {
    //   return {message: "Complete your Company Profile", status: 400};
    // }

    return result.isEligible

  } catch (error) {
    console.error(error)
  }
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  // Convert the ISO string into the format "12 April 2023"
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formattedDate;
}