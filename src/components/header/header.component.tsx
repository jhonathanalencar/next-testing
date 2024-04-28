import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>Todo ID: {id}</h1>

      <Link href={`/contacts/?id=${id}&from=${pathname}`}>Contacts Page</Link>

      <button
        onClick={() => {
          router.push(
            `/contacts?id=${id}&from=${pathname}&something=${pathname}`
          );
        }}
      >
        Some Action
      </button>
    </div>
  );
}
