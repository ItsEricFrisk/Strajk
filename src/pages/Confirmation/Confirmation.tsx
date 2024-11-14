import { useEffect } from "react";
import Menu from "../../components/menu/Menu";
import MenuIcon from "../../components/menuIcon/MenuIcon";
import logo from "../../assets/logo.svg";
import { useBookingStore, useFormatDateStore } from "../../zustand/store";
import { Link } from "react-router-dom";
import { ApiResponse } from "../../types/types";

export default function Confirmation() {
  // Zustand
  const bookingInformation: ApiResponse | null = useBookingStore(
    (state) => state.bookingInformation
  );

  const formattedDate = useFormatDateStore((state) => state.formattedDate);

  useEffect((): void => {
    bookingInformation;
  }, [bookingInformation]);

  return (
    <main className="w-screen h-auto flex flex-col items-center py-10">
      <img src={logo} alt="STRAJK logo" /> {/* Logo */}
      {/* Title */}
      <h1 className={` text-3xl font-bold text-primaryColor mt-4 mb-8`}>
        SEE YOU SOON!
      </h1>
      {/* Booking details */}
      <div className="w-72 h-5 flex items-center justify-between text-secondaryColor font-bold text-sm mb-2">
        <div className="w-16 h-[1px] bg-secondaryColor"></div>
        <p className="">BOOKING DETAILS</p>
        <div className="w-16 h-[1px] bg-secondaryColor"></div>
      </div>
      {/* Booking information */}
      {bookingInformation ? (
        <section className="w-72 h-72 flex flex-col items-center justify-between mt-5 relative">
          <p className="absolute -top-2 left-2 px-1 bg-default text-secondaryColor text-small font-semibold">
            WHEN
          </p>
          <div className="w-full h-14 border border-secondaryColor rounded-sm flex justify-start items-center px-2 text-lg">
            <p className="">{formattedDate}</p>
          </div>
          <p className="absolute top-[69px] left-2 px-1 bg-default text-secondaryColor text-small font-semibold">
            WHO
          </p>
          <div className="w-full h-14 border border-secondaryColor rounded-sm flex justify-start items-center px-2 text-lg">
            <p className="">{`${bookingInformation.people} ${
              bookingInformation.people > 1 ? "players" : "player"
            }`}</p>
          </div>
          <p className="absolute top-[146px] left-2 px-1 bg-default text-secondaryColor text-small font-semibold">
            LANES
          </p>
          <div className="w-full h-14 border border-secondaryColor rounded-sm flex justify-start items-center px-2 text-lg">
            <p className="">{`${bookingInformation.lanes} ${
              bookingInformation.lanes > 1 ? "lanes" : "lane"
            }`}</p>
          </div>
          <p className="absolute top-56 left-2 px-1 bg-default text-secondaryColor text-small font-semibold">
            BOOKING NUMBER
          </p>
          <div className="w-full h-14 border border-secondaryColor rounded-sm flex justify-start items-center px-2 text-lg">
            <p className="">{bookingInformation.id}</p>
          </div>
        </section>
      ) : (
        <div className="w-72 h-32 flex flex-col items-center justify-between mt-6">
          <p className="text-2xl font-bold text-primaryColor">
            No strikes found.
          </p>
          <button className="w-full h-14 bg-primaryColor">
            <Link to={"/"} className="text-xl font-bold text-white">
              ROLL INTO BOOKING
            </Link>
          </button>
        </div>
      )}
      {/* Price and Button */}
      {bookingInformation ? (
        <section className="flex flex-col justify-between items-center w-72 h-auto relative mt-10">
          <div className="w-full h-14 border border-primaryColor text-primaryColor rounded-sm flex justify-between items-center px-3 text-lg">
            <p className="font-bold">TOTAL </p>
            <p className="">{bookingInformation.price} SEK</p>
          </div>
          <button className="w-full h-14 bg-primaryColor text-white font-bold text-xl cursor-pointer rounded-sm mt-2">
            SWEET, LETS GO!
          </button>
        </section>
      ) : (
        ""
      )}
      {/* Menu and Hamburgermenu */}
      <Menu />
      <MenuIcon />
    </main>
  );
}
