import { create } from "zustand";
import { ApiResponse } from "../types/types";

// Interfaces for Zustand

// Loading 
interface LoadingState {
  loading: boolean;
  setLoading: () => void;
}

// Toggle menu
interface ToggleMenu {
  menu: boolean;
  setToggle: () => void
}

// Set formatted date and time
interface SelectedDateFormatted {
  formattedDate: string;
  setFormattedDate: (date: string) => void
}

// Booking information
interface ApiData {
  bookingInformation: ApiResponse | null;
  setBookingInformation: (newBooking: ApiResponse) => void
}

// Loading
export const useLoadingStore = create<LoadingState>()((set) => ({
    loading: true,
    setLoading: () => set((state) => ({loading:  !state.loading}))
}));

// Toggle menu
export const toggleMenu = create<ToggleMenu>()((set) => ({
  menu: false,
  setToggle: () => set((state) => ({menu: !state.menu}))
}))

// Formatted date and time
export const useFormatDateStore = create<SelectedDateFormatted>()((set) => ({
  formattedDate: "",
  setFormattedDate: (date: string) => set(() => ({formattedDate: date}))
}))

// Booking information
export const useBookingStore = create<ApiData>()((set) => ({
  bookingInformation: null,
    setBookingInformation: (newBooking: ApiResponse) => set(() => ({bookingInformation: newBooking}))
}))