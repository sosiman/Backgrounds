export const Navbar = () => {
  return (
    <div className="fixed right-4 top-4 z-50">
      <a
        href="https://github.com/sosiman/Backgrounds.git"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-2 backdrop-blur-3xl"
      >
        <GithubLogoIcon size={26} />
      </a>
    </div>
  )
}

import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
