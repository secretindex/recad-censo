import { Spinner } from "./ui/spinner"

const LoadingFallback = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-2">
        <Spinner />
        <span className="text-xs text-gray-500">Carregando conteúdo...</span>
      </div>
    </div>
  )
}

export default LoadingFallback
