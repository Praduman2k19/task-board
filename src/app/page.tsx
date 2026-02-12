import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Simple Task Board</h1>
        <p className="home-desc">A minimal task management app built for assignment.</p>

        <div className="home-actions">
          <Link href="/login" className="btn btn-primary">Login</Link>
          <Link href="/signup" className="btn btn-ghost">Signup</Link>
        </div>
      </div>
    </div>
  );
}
