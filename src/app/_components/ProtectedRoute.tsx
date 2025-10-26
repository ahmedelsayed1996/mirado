// src/app/_components/ProtectedRoute.jsx
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrentLang from "../_hooks/useCurrentLang";
import { AppDispatch } from "../store";
import Loader from "./Loader";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const locale = useCurrentLang();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // حالة مؤقتة للتحقق من المصادقة

  const dispatch = useDispatch<AppDispatch>();
  const { tokenMainSite } = parseCookies();
  const user = useSelector((state: any) => state.user);

  const checkUserToken = async () => {
    // if (user) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me-name-avatar`, {
        method: "GET",
        headers: {
          "Accept-Language": locale,
          Authorization: `Bearer ${tokenMainSite}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const result = await res.json();
      setIsAuthenticated(true);
      // console.log(result);
    } catch (error: any) {
      router.push(`login`);
      console.log("error happen when get User data");
    }
  }


  useEffect(() => {

    if (!tokenMainSite) {
      router.push(`login`);
    } else {
      checkUserToken();
    }
  }, [router]);

  if (!isAuthenticated) {
    return <Loader />;
  }

  return children;

};

export default ProtectedRoute;
