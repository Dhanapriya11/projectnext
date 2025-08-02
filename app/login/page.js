'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/quiz");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔐 Login</h1>

      <form onSubmit={handleCredentialsLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>

      <div style={styles.divider}>or</div>

      <button onClick={() => signIn("github", { callbackUrl: "/quiz" })} style={styles.githubBtn}>
        Sign in with GitHub
      </button>

      <p style={styles.signupText}>
        Don&apos;t have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    background: '#0070f3',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  divider: {
    margin: '20px 0',
    color: '#888',
  },
  githubBtn: {
    padding: '10px',
    background: '#24292f',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  signupText: {
    marginTop: '15px',
    fontSize: '14px',
  }
};
