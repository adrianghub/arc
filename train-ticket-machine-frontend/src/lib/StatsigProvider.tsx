import {
  StatsigProvider as StatsigReactProvider,
  useClientAsyncInit,
} from "@statsig/react-bindings";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";
import type { ReactNode } from "react";

export function StatsigProvider({ children }: { children: ReactNode }) {
  const clientKey = import.meta.env.VITE_STATSIG_CLIENT_KEY;

  const getUserId = () => {
    let userId = localStorage.getItem("statsig_user_id");
    if (!userId) {
      userId = `user_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("statsig_user_id", userId);
    }
    return userId;
  };

  const { client } = useClientAsyncInit(
    clientKey,
    { userID: getUserId() },
    { plugins: [new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin()] },
  );

  return <StatsigReactProvider client={client}>{children}</StatsigReactProvider>;
}
