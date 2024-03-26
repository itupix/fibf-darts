"use client";

import { useEffect, useState } from "react";
import { ProfileType } from "./contexts/profile";

const getProfileFromLocalStorage = () => {
  const data = localStorage.getItem('profile')
  if (data) return JSON.parse(data)
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType | undefined>(getProfileFromLocalStorage())

  useEffect(() => {
    if (profile) localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  return {
    profile,
    setProfile
  }
}