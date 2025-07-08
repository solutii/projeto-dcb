import { useEffect, useState } from "react";

export function useScreenSize() {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    fontSize: 14,
    tickSize: 12,
    yAxisWidth: 80,
    dotRadius: 5,
    dotActiveRadius: 7,
    strokeWidth: 3,
    legendHeight: 40,
    legendIconSize: 10,
    legendFontSize: "14px",
    paddingBottom: "12px",
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreen({
          isMobile: true,
          isTablet: false,
          fontSize: 12,
          tickSize: 10,
          yAxisWidth: 60,
          dotRadius: 3,
          dotActiveRadius: 5,
          strokeWidth: 2,
          legendHeight: 30,
          legendIconSize: 8,
          legendFontSize: "12px",
          paddingBottom: "8px",
        });
      } else if (width < 1024) {
        setScreen({
          isMobile: false,
          isTablet: true,
          fontSize: 13,
          tickSize: 11,
          yAxisWidth: 70,
          dotRadius: 4,
          dotActiveRadius: 6,
          strokeWidth: 2.5,
          legendHeight: 35,
          legendIconSize: 10,
          legendFontSize: "13px",
          paddingBottom: "10px",
        });
      } else {
        setScreen({
          isMobile: false,
          isTablet: false,
          fontSize: 14,
          tickSize: 12,
          yAxisWidth: 80,
          dotRadius: 5,
          dotActiveRadius: 7,
          strokeWidth: 3,
          legendHeight: 40,
          legendIconSize: 10,
          legendFontSize: "14px",
          paddingBottom: "12px",
        });
      }
    };

    handleResize(); // executa na primeira renderização
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
}
