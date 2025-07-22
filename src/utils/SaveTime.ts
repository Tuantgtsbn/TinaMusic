import { LOCAL_STORAGE_KEY_CURRENT_TIME } from "../constant/index";
export const saveCurrentTime = (time: number) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_TIME, time.toString());
};
export const getCurrentTime = (): number => {
  const time = localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_TIME);
  return time ? parseFloat(time) : 0;
};
