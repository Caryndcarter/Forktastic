import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fef3d0] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <img
          src="/placeholder.svg?height=200&width=200"
          alt="A confused chef"
          className="mx-auto mb-8 rounded-full shadow-lg"
        />
        <h1 className="text-6xl font-bold text-[#e75456] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#a84e24] mb-2">Page Not Found!</h2>
        <p className="text-lg text-[#a84e24] mb-6">
          Oops! Looks like this page got burned. Let's head back to the kitchen!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-4 py-2 bg-[#ff9e40] text-white rounded-lg shadow hover:bg-[#e7890c] transition-colors duration-300"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center px-4 py-2 bg-[#a84e24] text-white rounded-lg shadow hover:bg-[#8a3d1d] transition-colors duration-300"
            aria-label="Go to home page"
          >
            <Home className="mr-2 h-5 w-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
