import { Suspense } from "react"
import LoadingFallback from "@/components/loading"

const RecadLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
}

export default RecadLayout
