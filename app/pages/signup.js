import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push("/login");
    else alert("Signup failed");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
