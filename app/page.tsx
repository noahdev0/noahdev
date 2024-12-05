// import { auth } from "@/auth";
import HeroSection from "@/components/HeroSection";
// import bcrypt from "bcryptjs";

export default async function Home() {
  // const { user, expires } = await auth();
  // const pw = bcrypt.hash("280cfc04233c6", 10);
  // console.log(pw);

  return (
    <>
      <HeroSection />
    </>
  );
}
