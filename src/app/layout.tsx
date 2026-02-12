import "./globals.css";

export const metadata = {
  title: "Task Board",
  description: "Simple task board app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <header className="site-header">
          <div className="container header-inner">
            <a href="/" className="brand">Task Board</a>
            <nav className="nav">
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="nav-link">Signup</a>
            </nav>
          </div>
        </header>
        <main className="container main-content">{children}</main>
      </body>
    </html>
  );
}
