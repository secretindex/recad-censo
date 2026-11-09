import { Spinner } from "./ui/spinner"

const LoadingFallback = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner />
        <span className="text-xs text-gray-400">Carregando conteúdo...</span>
      </div>
    </div>
  )
}

export default LoadingFallback
