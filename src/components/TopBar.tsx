import Image from "next/image";
import { owner } from "@/data/owner";

export function TopBar() {
  return (
    <div className="w-full bg-white/90 dark:bg-[#111] text-[#111] dark:text-white backdrop-blur-sm border-b border-black/[0.06] dark:border-transparent text-xs py-2 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: phone + email */}
      <div className="flex items-center gap-4">
        <a
          href={`tel:${owner.phone}`}
          className="flex items-center gap-1.5 hover:text-[#a3b899] transition-colors"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <span className="hidden sm:inline">{owner.phone}</span>
        </a>
        <a
          href={`mailto:${owner.email}`}
          className="flex items-center gap-1.5 hover:text-[#a3b899] transition-colors"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span className="hidden sm:inline">{owner.email}</span>
        </a>
      </div>

      {/* Right: Facebook + Zalo icons */}
      <div className="flex items-center gap-3">
        <a
          href={owner.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          className="hover:text-[#a3b899] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href={owner.socials.zalo}
          target="_blank"
          rel="noopener noreferrer"
          title="Zalo"
          className="hover:opacity-70 transition-opacity"
        >
          <Image src="/zalo.svg" alt="Zalo" width={28} height={10} className="dark:brightness-0 dark:invert" />
        </a>
      </div>
    </div>
  );
}
