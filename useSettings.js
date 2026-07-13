import {
  useSettings as useSettingsContext
} from "../context/SettingsContext";


export default function useSettings(){

  return useSettingsContext();

}
