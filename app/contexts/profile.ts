"use client";
import { createContext } from "react";

export type ProfileType = {
  name: string;
}

type ProfileContextType = {
  profile?: ProfileType;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType | undefined>>
}

export const ProfileContext = createContext<ProfileContextType>({
  setProfile: () => { },
});
