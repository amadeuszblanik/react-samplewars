import { useEffect, useState } from "react";
import { initialState, settingsStore } from "./settings";
import { Settings } from "./types";

export const useSettings = (): Settings => {
  const [settings, setSettings] = useState(initialState);

  const handleSubscription = (next: Settings) => {
    setSettings(next);
  };

  useEffect(() => {
    const subscription = settingsStore.subscription().subscribe(handleSubscription);

    const cleanUp = () => {
      subscription.unsubscribe();
    };

    return cleanUp;
  });

  return settings;
};
