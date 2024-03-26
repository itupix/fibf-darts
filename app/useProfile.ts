"use client";
import { useEffect, useState } from "react";
import { ProfileType } from "./contexts/profile";

const getProfileFromLocalStorage = () => {
  const data = typeof window !== 'undefined' ? localStorage.getItem('profile') : null
  if (data) return JSON.parse(data)
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType | undefined>(getProfileFromLocalStorage())

  useEffect(() => {
    if (profile && typeof window !== 'undefined') localStorage.setItem('profile', JSON.stringify(profile))
  }, [profile])

  return {
    profile,
    setProfile
  }
}