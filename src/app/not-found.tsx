import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-zinc-900">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-zinc-700">
        Page Not Found
      </h2>
      <p className="mb-8 text-zinc-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Go Home
      </Link>
    </div>
  );
}
