import localFont from "next/font/local";

export const nflVikings = localFont({
  src: [
    {
      path: "../../public/NflMinnesotaVikings.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nfl",
  display: "swap",
});


