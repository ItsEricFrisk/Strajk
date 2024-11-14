import Menu from "../../components/menu/Menu";
import MenuIcon from "../../components/menuIcon/MenuIcon";
import logo from "../../assets/logo.svg";
import { fetchBooking } from "../../api/bookingApi";
import React, { useEffect, useState } from "react";
import { ApiRequest, ApiResponse } from "../../types/types";
import { useBookingStore, useFormatDateStore } from "../../zustand/store";
import { useNavigate } from "react-router-dom";

const months: string[] = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function Booking() {
  const dates = new Date();
  const todaysDate: string = dates.toISOString().split("T")[0]; // Get todays date and remove: T00:00:00
  const lastBookingTimeOfYear: string =
    dates.getFullYear().toString() + "-12-31"; // Get current year and add december 31
  const [showDate, setShowDate] = useState<string>("");

  const navigate = useNavigate(); // Helps navigate to /confirmation after submit

  // Set time and date
  const [selectedDate, setSelectedDate] = useState<string>(todaysDate);
  const [selectedTime, setSelectedTime] = useState<string>();

  // Zustand
  const setFormattedDate = useFormatDateStore(
    (state) => state.setFormattedDate
  );

  // Format the date and time
  useEffect(() => {
    const showcaseDate: string[] = selectedDate.split("-");
    const selectedMonth: string = showcaseDate[1];
    const selectedDay: string = showcaseDate[2];
    setShowDate(selectedDay + " " + months[parseInt(selectedMonth) - 1]);
    setFormattedDate(
      selectedTime +
        ", " +
        selectedDay +
        " " +
        months[parseInt(selectedMonth) - 1]
    );
  }, [selectedDate, selectedTime]);

  // Max players Allowed
  const maxPlayersAllowed = 20;
  const minPlayersRequired = 1;

  // Get number of players, lanes and shoes
  const [numOfPlayer, setNumOfPlayer] = useState<number | null>(
    minPlayersRequired
  );
  const [numOfLanes, setNumOfLanes] = useState<number>(1);
  const [shoes, setshoes] = useState<number[]>([0]);

  // Check the minimum possible number of lanes
  useEffect((): void => {
    if (numOfPlayer === null) return;

    if (numOfPlayer > 16 && numOfPlayer < maxPlayersAllowed + 1) {
      setNumOfLanes(5);
    } else if (numOfPlayer > 12 && numOfPlayer <= 16) {
      setNumOfLanes(4);
    } else if (numOfPlayer > 8 && numOfPlayer <= 12) {
      setNumOfLanes(3);
    } else if (numOfPlayer > 4 && numOfPlayer <= 8) {
      setNumOfLanes(2);
    } else {
      setNumOfLanes(1);
    }
  }, [numOfPlayer]);

  // Error messages
  const [errorMessagePlayerCount, setErrorMessagePlayerCount] =
    useState<string>(""); // Player
  const [errorMessageTime, setErrorMessageTime] = useState<string>(""); // Time
  const [errorMessageShoes, setErrorMessageShoes] = useState<string>(""); // Shoes

  // Error status
  const [isPlayerCountInvalid, setIsPlayerCountInvalid] =
    useState<boolean>(false); // Player
  const [isTimeInvalid, setIsTimeInvalid] = useState<boolean>(false); // Time
  const [isShoesInvalid, setIsShoesInvalid] = useState<boolean>(false); // Shoes
  const [invalidShoes, setInvalidShoes] = useState<number[]>([]); // Shoes array

  // Handle time
  const handleSelectedTime = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedTime(e.target.value);
    setIsTimeInvalid(false);
  };

  // // Handle player input
  const handleNumOfPlayer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const numOfPlayerValue = Number((e.target as HTMLInputElement).value);

    setIsPlayerCountInvalid(false);

    // If number of players is 0, set all fields to 0 and remove shoes field
    if (numOfPlayerValue === 0) {
      setNumOfPlayer(0);
      setNumOfLanes(0);
      setshoes([]);

      // Error message if players is to many
    } else if (numOfPlayerValue > maxPlayersAllowed) {
      setIsPlayerCountInvalid(true);
      setErrorMessagePlayerCount(
        `We are sorry, but we cannot book more than ${maxPlayersAllowed} players at a time.`
      );
      setshoes([]);

      // Error message if players are less than minimum
    } else if (numOfPlayerValue < minPlayersRequired) {
      setIsPlayerCountInvalid(true);
      setErrorMessagePlayerCount(
        "Please enter the number of players between 1 and 20."
      );
      setshoes([]);

      // If the validation passes, set the amount of players and increment the array for shoes
    } else {
      setNumOfPlayer(numOfPlayerValue);
      setshoes((prev): number[] => {
        const shoeArr = [...prev];
        shoeArr.length = numOfPlayerValue;
        shoeArr.fill(0, prev.length);
        return shoeArr;
      });
    }
  };

  // Updates the message with which shoe sizes that have not been selected
  useEffect(() => {
    setErrorMessageShoes(
      `Please select a size for person: ${invalidShoes.map(
        (index) => index + 1
      )}`
    );
  }, [invalidShoes]);

  // Handle submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Prevent refresh

    setInvalidShoes([]); // Clear invalid shoes before validation

    if (numOfPlayer === null) return;

    // Validate all fields to ensure correct data is sent
    let error: boolean = false;

    // If time is empty or undefined
    if (selectedTime === "" || selectedTime === undefined) {
      setIsTimeInvalid(true);
      setErrorMessageTime(
        "Time is required. Please choose a time to continue."
      );
      error = true;
    }

    // If players is 0
    if (numOfPlayer === 0) {
      setIsPlayerCountInvalid(true);
      setErrorMessagePlayerCount(
        `Please enter the number of players between ${minPlayersRequired} and ${maxPlayersAllowed}.`
      );
      error = true;
    }

    // If there is to many players
    if (numOfPlayer > maxPlayersAllowed) {
      setIsPlayerCountInvalid(true);
      setErrorMessagePlayerCount(
        `Too many players. Maximum allowed is ${maxPlayersAllowed}.`
      );
      error = true;
    }

    // If there is a negative number of players
    if (numOfPlayer < minPlayersRequired) {
      setIsPlayerCountInvalid(true);
      setErrorMessagePlayerCount(
        `Too few players. Minimum required is ${minPlayersRequired}.`
      );
      error = true;
    }

    // If the shoe size if not selected
    shoes.map((size, index) => {
      if (size === 0 || isNaN(size)) {
        setIsShoesInvalid(true);
        setInvalidShoes((prev): number[] => [...prev, index]);

        error = true;
      }
    });

    // If error is true, stop the function
    if (error) {
      return;
    }

    const bookingRequestData: ApiRequest = {
      when: `${selectedDate}T${selectedTime}`,
      lanes: numOfLanes,
      people: numOfPlayer,
      shoes: shoes,
    };

    try {
      const dataFromApi: ApiResponse | null = await fetchBooking(
        bookingRequestData
      );

      if (dataFromApi) {
        // Use Zustand to store the booking information
        const setBookingInformation =
          useBookingStore.getState().setBookingInformation;

        setBookingInformation(dataFromApi);

        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Error with booking:", error);
    }
  };

  return (
    <main className="w-full h-auto flex flex-col items-center justify-between py-10">
      <img src={logo} alt="Two flames and a bowling ball" /> {/* Logo */}
      {/* Title */}
      <h1 className="text-3xl font-bold text-primaryColor mt-4 mb-8">
        BOOKING
      </h1>
      {/* When, what and Who */}
      <div className="w-72 h-5 flex items-center justify-between text-secondaryColor font-bold text-sm mb-2">
        <div className="w-16 h-[1px] bg-secondaryColor"></div>
        <p className="">WHEN, WHAT & WHO</p>
        <div className="w-16 h-[1px] bg-secondaryColor"></div>
      </div>
      {/* BOOKING form */}
      <form
        onSubmit={handleSubmit}
        className="w-72 h-auto flex py-4 flex-col items-center"
      >
        {/* DATE and TIME*/}
        <div className="w-72 h-10 flex justify-between items-center relative">
          {/* DATE */}
          <div className="w-28 h-10 relative">
            <label
              htmlFor="date"
              className={`text-secondaryColor text-small font-semibold absolute -top-2 left-1 px-1 bg-default z-30`}
            >
              DATE
            </label>
            <input
              id="date"
              type="date"
              min={todaysDate}
              max={lastBookingTimeOfYear}
              defaultValue={todaysDate}
              className={`w-28 h-10 p-0 text-center leading-none focus:outline-none z-40 opacity-0`}
              onChange={(e): void =>
                setSelectedDate((e.target as HTMLInputElement).value)
              }
            />
            <div className="w-28 h-10 absolute top-0 -left-0 text-sm font-medium rounded-sm border border-secondaryColor bg-default pointer-events-none py-2 px-6">
              {showDate}
            </div>
          </div>
          {/* TIME */}
          <div className="w-28 h-10 relative">
            <label
              htmlFor="time"
              className={`${
                isTimeInvalid ? "text-primaryColor" : "text-secondaryColor"
              } text-small font-semibold absolute -top-2 left-1 px-1 bg-default`}
            >
              TIME
            </label>
            <select
              name="time"
              id="time"
              className={`${
                isTimeInvalid ? "border-primaryColor" : "border-secondaryColor"
              } w-28 h-10 rounded-sm text-sm border bg-default cursor-pointer focus:outline-none`}
              onChange={handleSelectedTime}
              value={selectedTime}
            >
              <option value=""></option>
              <option value="18:00">18.00</option>
              <option value="18:30">18.30</option>
              <option value="19:00">19.00</option>
              <option value="19:30">19.30</option>
              <option value="20:00">20.00</option>
              <option value="20:30">20.30</option>
              <option value="21:00">21.00</option>
              <option value="21:30">21.30</option>
              <option value="22:00">22.00</option>
              <option value="22:30">22.30</option>
              <option value="23:00">23.00</option>
            </select>
          </div>
          {/* Error message if TIME is empty */}
          <div
            className={`${
              isTimeInvalid ? "absolute" : "hidden"
            } top-12 -right-0 w-full bg-primaryColor text-white p-2 z-40 shadow-md rounded-sm`}
          >
            <span className="text-small font-semibold">{errorMessageTime}</span>
          </div>
        </div>

        {/* LANES & PLAYER */}
        <div className="w-auto h-32 flex flex-col justify-between mt-10 relative">
          {/* Player */}
          <div className="relative">
            <label
              htmlFor="player"
              className={`${
                isPlayerCountInvalid
                  ? "text-primaryColor"
                  : "text-secondaryColor"
              } absolute -top-2 left-1 px-1 text-small font-semibold bg-default`}
            >
              NUMBER OF AWESOME BOWLERS
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="player"
              className={`${
                isPlayerCountInvalid
                  ? "border-primaryColor"
                  : "border-secondaryColor"
              } w-72 h-10 bg-default border rounded-sm focus:outline-none px-2`}
              defaultValue={numOfPlayer !== null ? numOfPlayer : 0}
              onBlur={handleNumOfPlayer}
            />
          </div>
          {/* Error message if player input is empty */}
          <div
            className={`${
              isPlayerCountInvalid ? "absolute" : "hidden"
            } top-12 -right-0 w-full bg-primaryColor text-white p-2 z-40 shadow-md rounded-sm`}
          >
            <span className="text-small font-semibold">
              {errorMessagePlayerCount}
            </span>
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-1 px-1 text-secondaryColor text-small font-semibold bg-default">
              NUMBER OF LANES
            </label>
            <div
              className={`w-72 h-10 bg-default border border-secondaryColor rounded-sm focus:outline-none px-2 flex items-center`}
            >
              {numOfLanes}
            </div>
          </div>
        </div>

        {/* SHOES */}
        <div className="w-72 h-auto flex flex-col justify-between mt-10">
          <div className="w-72 h-5 flex items-center justify-between mb-2">
            <div className="w-28 h-[1px] bg-secondaryColor"></div>
            <p className="text-secondaryColor font-bold text-sm ">SHOES</p>
            <div className="w-28 h-[1px] bg-secondaryColor"></div>
          </div>
          <div className="w-full h-auto flex flex-col justify-between items-center my-4 relative">
            {/* Map the amount of shoes */}
            {shoes.map((_, index) => (
              <div className="w-auto h-auto relative" key={index}>
                <span
                  className={` ${
                    invalidShoes.includes(index)
                      ? "text-primaryColor"
                      : "text-secondaryColor"
                  } absolute top-3 left-3 text-small font-semibold px-1 bg-default tracking-widest`}
                >
                  SHOE SIZE / PERSON {index + 1}
                </span>
                <select
                  name="shoesize"
                  id="shoesize"
                  className={`${
                    invalidShoes.includes(index)
                      ? "border-primaryColor text-primaryColor"
                      : "border-secondaryColor"
                  } w-72 h-14 p-2 border rounded-sm mt-5 bg-default cursor-pointer focus:outline-none`}
                  onChange={(e) =>
                    setshoes((prev): number[] => {
                      const shoesize = [...prev];
                      shoesize[index] = parseInt(e.target.value);
                      return shoesize;
                    })
                  }
                >
                  <option label="Select size" value=""></option>
                  <option value={47}>EURO 47</option>
                  <option value={46}>EURO 46</option>
                  <option value={45}>EURO 45</option>
                  <option value={44}>EURO 44</option>
                  <option value={43}>EURO 43</option>
                  <option value={42}>EURO 42</option>
                  <option value={41}>EURO 41</option>
                  <option value={40}>EURO 40</option>
                  <option value={39}>EURO 39</option>
                  <option value={38}>EURO 38</option>
                  <option value={37}>EURO 37</option>
                  <option value={36}>EURO 36</option>
                </select>
              </div>
            ))}
            {/* Error message if shoe size is not selected */}
            <div
              className={`${
                isShoesInvalid ? "absolute" : "hidden"
              } -top-8 -right-0 w-full bg-primaryColor text-white p-2 z-40 shadow-md rounded-sm`}
            >
              <span className="text-small font-semibold">
                {errorMessageShoes}
              </span>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="STRIIIIIIKE!"
          className="w-72 h-14 bg-primaryColor text-white font-bold text-xl cursor-pointer rounded-sm"
        />
      </form>
      <MenuIcon />
      <Menu />
    </main>
  );
}
