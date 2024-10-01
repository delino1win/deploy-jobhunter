"use client";

import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function LogoutBtn() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Are you Sure want to Logout?",
      showCancelButton: true,
      showCloseButton: true,
    });

    if (result.isConfirmed) {
      await signOut();
    }
  };

  return (
    <div className="flex flex-row gap-3">
      {/* <span>
        Welcome, {session?.user?.name} the {session?.user?.role}
      </span> */}

      <button className="text-red p-3 text-[16px] block w-full text-start transition hover:bg-red hover:text-white" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
}
