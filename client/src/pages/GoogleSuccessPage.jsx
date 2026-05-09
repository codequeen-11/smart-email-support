// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export default function GoogleSuccessPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const role = searchParams.get("role");

//     if (token) {
//       localStorage.setItem("token", token);

//       if (role) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             role,
//             name: "Google User",
//           })
//         );
//       }

//       navigate(role === "admin" ? "/" : "/submit-ticket");
//     } else {
//       navigate("/login");
//     }
//   }, [navigate, searchParams]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
//       <p className="text-sm text-[rgb(var(--muted-foreground))]">
//         Signing you in with Google...
//       </p>
//     </div>
//   );
// }


import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const redirect = searchParams.get("redirect");

    if (token) {
      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name || "User",
          email: email || "",
          role: role || "user",
        })
      );

      navigate(redirect || (role === "admin" ? "/" : "/submit-ticket"));
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <p className="text-sm text-[rgb(var(--muted-foreground))]">
        Signing you in with Google...
      </p>
    </div>
  );
}