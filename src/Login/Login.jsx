import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import app from "../firebase.init.config";
import PasswordLogin from "../PasswordLogin/PasswordLogin.jsx";
import Profile from "../Profile/Profile.jsx";
const Login = () => {
  const auth = getAuth(app);
  const google = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const googleLogin = () => {
    signInWithPopup(auth, google)
      .then((r) => {
        setUser(r.user);
        toast.success(`Welcome ${r.user.displayName}`);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((e) => toast.error(e.message));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        const r = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(r.user, {
          displayName: name,
          photoURL: photoURL,
        });
        await auth.signOut();
        toast.success(`Account created for ${email}. Please login now.`);
        setIsRegister(false);
        setPassword("");
        setName("");
        setPhotoURL("");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const r = await signInWithEmailAndPassword(auth, email, password);
        await r.user.reload();
        setUser(r.user);
        toast.success(`Welcome ${r.user.displayName || r.user.email}`);
        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <ToastContainer position="top-center" /> */}
      {user ? (
        <Profile user={user} setUser={setUser} />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isRegister ? "Sign Up" : "Login"}
          </h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <input type="text" placeholder="Name" className="input input-bordered w-full mb-3 bg-gray-200" value={name}
                onChange={(e) => setName(e.target.value)} />
            )}
            <input type="email" placeholder="Email" className="input input-bordered w-full mb-3 bg-gray-200" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <PasswordLogin password={password} setPassword={setPassword} />
            {isRegister && (
              <input type="text" placeholder="Photo URL" className="input input-bordered w-full mb-3 bg-gray-200" value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)} />
            )}
            <button type="submit" className="btn btn-primary w-full">
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className="text-blue-500 text-sm text-center mt-2 cursor-pointer"
            onClick={() => navigate("/ForgotPassward", { state: { email } })}>
            Forgot Password?
          </p>
          <p className="text-center mt-2 text-sm">
            <span onClick={() => setIsRegister(!isRegister)} className="text-blue-500 cursor-pointer">
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
          <div className="divider my-4">OR</div>
          <button onClick={googleLogin} className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-50">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

