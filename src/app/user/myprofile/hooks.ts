import axios from "axios";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export type myProfileForm = {
  name: string;
  email: string;
  number: string;
  birthdate: string;
  gender: string;
  yearsexperience: string;
  about: string;
  skills: string;
  jobtype: string;
  location: string;
  jobdescription: string;
  institution: string;
  major: string;
  duration: string;
  education: string;
  company: string;
  jobtitle: string;
  durationexperience: string;
};

export const useMyProfile = () => {
  const { data: session, status } = useSession();

  const INITIAL_FORM = {
    name: "",
    email: "",
    number: "",
    birthdate: "",
    gender: "",
    yearsexperience: "",
    about: "",
    skills: "",
    jobtype: "",
    location: "",
    jobdescription: "",
    institution: "",
    major: "",
    duration: "",
    education: "",
    company: "",
    jobtitle: "",
    durationexperience: "",
  };
  const [input, setInput] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);

  async function getProfile(id: string) {
    try {
      let config = {
        method: "get",
        url: `http://localhost:3001/user/${id}`,
        data: input,
      };
      const result = await axios(config);

      if (result) {
        const profileData = {
          name: result?.data?.name ?? "",
          email: result?.data?.email ?? "",
          number: result?.data?.number ?? "",
          birthdate: result?.data?.birthdate ?? "",
          gender: result?.data?.gender ?? "",
          yearsexperience: result?.data?.yearsexperience ?? "",
          about: result?.data?.about ?? "",
          skills: result?.data?.skills ?? "",
          jobtype: result?.data?.jobtype ?? "",
          location: result?.data?.location ?? "",
          jobdescription: result?.data?.jobdescription ?? "",
          institution: result?.data?.institution ?? "",
          major: result?.data?.major ?? "",
          duration: result?.data?.duration ?? "",
          education: result?.data?.education ?? "",
          company: result?.data?.company ?? "",
          jobtitle: result?.data?.jobtitle ?? "",
          durationexperience: result?.data?.durationexperience ?? "",
        };
        console.log(profileData);

        setInput(profileData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session?.user.id) {
      getProfile(session?.user.id);
    }
  }, [session?.user.id]);

  function handleChangeInput(
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    console.log(name, value);

    setInput({ ...input, [name]: value });
  }

  async function handleSaveProfile() {
    try {
      let config = {
        method: "put",
        url: `http://localhost:3001/user/${session?.user.id}`,
        data: input,
      };
      await axios(config);
      await Swal.fire({
        icon: "success",
        title: "Save data succeed",
        showCloseButton: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   function handleChangeImage(event) {
  //     const image = event.target.files[0];
  //     setImage(image);
  //   }

  return {
    input,
    session,
    handleChangeInput,
    // handleChangeImage,
    handleSaveProfile,
  };
};
