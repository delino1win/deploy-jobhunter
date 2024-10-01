import Link from "next/link";

export default function SignInBtn() {
  return (
    <Link href={"/auth/signIn"} className="bg-steel-blue block text-white font-bold capitalize border border-solid border-steel-blue text-center transition px-[24px] py-[12px] hover:text-steel-blue hover:bg-white">
      login
    </Link>
  )
}
