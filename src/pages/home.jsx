import HomeLayout from "../components/layouts/homeLayout";
import NavbarLayout from "../components/layouts/navbarLayout";
import { useLogin } from "../hooks/useLogin";

const HomePage = () => {
  useLogin();
  return (
    <>
      <NavbarLayout />
      <HomeLayout />
    </>
  );
};

export default HomePage;
