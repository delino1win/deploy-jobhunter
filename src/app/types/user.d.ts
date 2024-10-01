declare global {
  interface User {
    id: string;
    name: string
    email: string;
    imageUrl: string;
    provider?: "google" | "twitter" | "facebook" | "github" | "none"
    detailId?: string
    password?: string; // jangan lupa di hash
    role: "candidate" | "company";
    createdAt: string;
    isVerified: boolean;
  }

  interface UserFiltered {
    name: string,
    email: string,
    id: string
    detailId: string
  }
}

export {};
