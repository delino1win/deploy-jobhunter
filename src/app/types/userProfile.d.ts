export type experience = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
};

declare global {
  interface CandidateProfile {
    id: string;
    userId: string; // Referensi ke user id
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    profilePicture: string; // URL ke profile picture, defaultnya ntar aku buat static url gambar profile hambar
    bio?: string;
    currentCity: string;
    currentCountry?: string; //kita pake city aja, tapi kalo mau tambahin negara bolehh
    latestExperience?: string
    education?: string
    // experience?: experience;

    // education?: {
    //   //Array of Objects, edukasi
    //   institution: string;
    //   degree: string;
    //   graduationYear: string;
    // };

    skills: string; // Array of Strings
    isEligible: boolean;

    //nah ini ga wajib semua
    resumeUrl?: string;
    socialProfiles?: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
    };
    desiredJobTitle?: string;
    desiredSalary?: number;
    willingToRelocate?: boolean;
    preferredWorkEnvironment?: ("onsite" | "remote" | "hybrid")[];
    updatedAt: string;
  }

  interface CompanyProfile {
    id: string;
    userId: string; // Referensi ke user id
    companyName: string;
    companyWebsite?: string;
    industry?: string;
    companySize?: string;
    foundedYear?: string;
    companyDescription: string;
    headquarters?: string;
    logoUrl?: string;
    socialProfiles?: {
      //akun company
      linkedin?: string;
      twitter?: string;
    };
    benefits?: string[];
    culture?: string;
    hiringProcess?: string;
    isEligible: boolean;
    updatedAt: string;
  }
}

export {};
