export type category =
  "technology"
  | "devs"
  | "finance"
  | "marketing"
  | "creative"
  | "engineering"
  | "education"
  | "administrative"
  | "hr"
  | "legal"
  | "scientist"

export type location =
  "jakarta pusat"
  | "jakarta selatan"
  | "jakarta utara"
  | "jakarta barat"
  | "jakarta timur"
  | "depok"
  | "bekasi"
  | "tanggerang"
  | "surabaya"
  | "bogor"
  | "bandung"
  | "remote";

export type jobType = 
  "full time" 
  | "part time" 
  | "contract" 
  | "internship"
  | undefined;

declare global {
  interface JobVacancy {
    id: string;
    userId: string;
    companyLogo: string
    category: category;
    jobType?: jobType;
    title: string;
    companyName: string;
    location: string;
    details: {
      description: string;
      responsibilities?: string;
      requirements?: string;
      preferences?: string;
      benefits?: string;
      salary?: string;
    };
    salary: number;
    applicationDeadline?: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    experienceLevel?: "entry" | "mid" | "senior" | "executive";
  }
}

export {};
