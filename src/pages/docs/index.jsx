import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();

  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/docs/general');
  }

  return <Link href='/docs/general'>Redirecting</Link>;
}
