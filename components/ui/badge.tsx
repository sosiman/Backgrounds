import { cn } from "@/lib/utils"

export const Badge = ({ label }: { label: string }) => {
  return (
    <div
      className={cn(
        'absolute top-2 left-[-44] m-1 p-0.5 px-12 uppercase -rotate-45 transition-all duration-150 ease-linear',
        'font-sans font-bold text-sm bg-red-400'
      )}
    >
      {label}
    </div>
  )
}
