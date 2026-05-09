
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShieldCheck, Sparkles } from "lucide-react";
// import { registerUser } from "../services/authService";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";

// export default function RegisterPage() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await registerUser(form);

//       if (res.token) {
//         localStorage.setItem("token", res.token);
//         localStorage.setItem("user", JSON.stringify(res.user));
//         navigate(res.user?.role === "admin" ? "/" : "/submit-ticket");
//       } else {
//         setError(res.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//    const handleGoogleAuth = async (credential) => {
//     try {
//       setError("");
//       setLoading(true);

//       if (!credential) {
//         setError("Google credential was not received.");
//         return;
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
//     <div className="relative overflow-hidden bg-[rgb(var(--primary))] px-6 py-10 text-[rgb(var(--primary-foreground))] lg:flex lg:flex-col lg:justify-center lg:p-14">
//       <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
//       <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

//       <div className="relative z-10 flex items-center gap-3">
//         <div className="rounded-2xl bg-white/15 p-3">
//           <ShieldCheck size={26} />
//         </div>
//         <div>
//           <h1 className="text-xl font-bold">Smart Support</h1>
//           <p className="text-sm text-white/70">AI support automation</p>
//         </div>
//       </div>

//       <div className="relative z-10 mt-16 max-w-xl ">
//         <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/80">
//           <Sparkles size={16} />
//           Build a smarter workflow
//         </div>

//         <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
//           Turn requests into organized tickets.
//         </h2>

//         <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
//           Submit issues, classify them automatically, generate replies, and
//           track support performance.
//         </p>
//       </div>
//     </div>

//     <div className="flex items-center justify-center px-5 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-2xl sm:p-8"
//       >
//         <div className="mb-8">
//           <h2 className="text-3xl font-black text-[rgb(var(--foreground))]">
//             Create account
//           </h2>
//           <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
//             Start managing support requests smarter.
//           </p>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
//               Full name
//             </label>
//             <Input
//               placeholder="Your name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
//               Email address
//             </label>
//             <Input
//               type="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
//               Password
//             </label>
//             <Input
//               type="password"
//               placeholder="Create a password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//             />
//           </div>

//           {error && (
//             <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
//               {error}
//             </div>
//           )}

//           <Button type="submit" disabled={loading} className="h-12 w-full rounded-2xl">
//             {loading ? "Creating account..." : "Create account"}
//           </Button>
//         </div>

//         <p className="mt-6 text-center text-sm text-[rgb(var(--muted-foreground))]">
//           Already have an account?{" "}
//           <Link to="/login" className="font-bold text-[rgb(var(--primary))]">
//             Sign in
//           </Link>
//         </p>
//       </form>
//     </div>
//   </div>
// );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";
import { registerUser } from "../services/authService";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// ✅ ADDED NOW: Google auth components
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

// ✅ ADDED NOW: Google auth service
import { googleLogin } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectAfterAuth = (user) => {
    navigate(user?.role === "admin" ? "/" : "/submit-ticket");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await registerUser(form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        redirectAfterAuth(res.user);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED NOW: shared Google auth handler
  const handleGoogleAuth = async (credential) => {
    try {
      setError("");
      setLoading(true);

      const res = await googleLogin(credential);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        redirectAfterAuth(res.user);
      } else {
        setError(res.message || "Google registration failed");
      }
    } catch (err) {
      setError("Google registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADDED NOW: modern One Tap experience
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      handleGoogleAuth(credentialResponse.credential);
    },
    onError: () => {
      setError("Google registration failed.");
    },
    disabled: Boolean(localStorage.getItem("token")),
  });

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
      {/* Branding side */}
      {/* <div className="relative overflow-hidden bg-[rgb(var(--primary))] px-6 py-10 text-[rgb(var(--primary-foreground))] lg:flex lg:flex-col lg:justify-center lg:p-14">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" /> */}
        {/* LEFT SIDE */}
      <div className="relative overflow-hidden bg-[rgb(var(--primary))] px-6 py-10 text-[rgb(var(--primary-foreground))] lg:flex lg:flex-col lg:justify-center lg:p-14">

        {/* DESKTOP RIGHT CURVE */}
        <div className="absolute right-[-140px] top-[-120px] hidden h-[320px] w-[320px] rounded-full bg-[rgb(var(--background))] lg:block" />

        <div className="absolute bottom-[-120px] right-[-140px] hidden h-[320px] w-[320px] rounded-full bg-[rgb(var(--background))] lg:block" />

          {/* MOBILE/TABLET CURVED SHAPE */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none lg:hidden">
          <svg
            className="relative block h-[70px] w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="rgb(var(--background))"
              d="M0,64L60,69.3C120,75,240,85,360,90.7C480,96,600,96,720,85.3C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            />
          </svg>
        </div>
         {/* content */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <ShieldCheck size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Smart Support</h1>
            <p className="text-sm text-white/70">
              AI support automation
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-16 max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/80">
            <Sparkles size={16} />
            Build a smarter workflow
          </div>

          <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Turn requests into organized tickets.
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
            Submit issues, classify them automatically, generate replies,
            and track support performance.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-10 lg:justify-start lg:px-24">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-2xl sm:p-8"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[rgb(var(--foreground))]">
              Create account
            </h2>

            <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
              Start managing support requests smarter.
            </p>
          </div>

          {/* ✅ ADDED NOW: Google registration button */}
          <div className="mb-5 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-white">
            {/* <GoogleLogin
              onError={() => setError("Google registration failed")}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
              ux_mode="redirect"
              login_uri="http://localhost:5000/api/auth/google/callback"
            /> */}

                  <a
  href="http://localhost:5000/api/auth/google"
  className="
    flex h-14 w-full items-center justify-center gap-3
    rounded-2xl
    border border-[rgb(var(--border))]
    bg-[rgb(var(--muted))]
    text-[rgb(var(--foreground))]
    shadow-sm
    transition
    hover:scale-[1.01]
    hover:bg-[rgb(var(--card))]
  "
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="h-5 w-5"
  />

  <span className="text-sm font-semibold">
    Continue with Google
  </span>
</a>
          </div>

          {/* ✅ ADDED NOW: divider between Google and manual registration */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[rgb(var(--border))]" />

            <span className="text-xs font-medium text-[rgb(var(--muted-foreground))]">
              OR
            </span>

            <div className="h-px flex-1 bg-[rgb(var(--border))]" />
          </div>

          {/* Manual registration */}
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
                Full name
              </label>

              <Input
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
                Email address
              </label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[rgb(var(--foreground))]">
                Password
              </label>

              <Input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-[rgb(var(--muted-foreground))]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[rgb(var(--primary))]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}