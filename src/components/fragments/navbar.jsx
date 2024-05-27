import { BsThreeDotsVertical } from "react-icons/bs";
const Navbar = () => {
  return (
    <>
      <div className="px-2 md:container lg:container mx-auto py-2">
        <div className="flex justify-between">
        <div className="flex items-center justify-between">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-12"
            alt=""
          />
        </div>
        <div className="flex items-center">
          <BsThreeDotsVertical />
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
