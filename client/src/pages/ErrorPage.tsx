import { useRouteError } from "react-router-dom"

interface ErrorMessages {
  [key: number]: {
    title: string
    description: string
  }
}

const errorMessages: ErrorMessages = {
  400: {
    title: "Bad ingredients!",
    description: "Looks like there was something wrong with your recipe request.",
  },
  401: {
    title: "No chef's hat!",
    description: "You need to be logged in to access this kitchen.",
  },
  403: {
    title: "Kitchen's closed!",
    description: "You don't have permission to access this recipe section.",
  },
  404: {
    title: "This page is toast!",
    description: "Looks like you bit off more than you could chew or used the wrong ingredient.",
  },
  500: {
    title: "Kitchen disaster!",
    description: "Our chefs are having some technical difficulties. Please try again later.",
  },
  503: {
    title: "Kitchen's too busy!",
    description: "Our servers are experiencing high heat. Please come back later.",
  },
}

const ErrorPage = () => {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string }

  // Default to 404 if no error code is found
  const errorCode = error?.status || 404
  const defaultError = errorMessages[404]
  const errorDetails = errorMessages[errorCode] || defaultError

  return (
    <div className="min-h-screen bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
        <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">Error</div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 text-center">
        <h1 className="text-6xl font-bold text-[#e75456]">{errorCode}</h1>
        <p className="text-2xl mt-4 text-[#a84e24]">{errorDetails.title}</p>
        <p className="mt-2 text-[#a84e24]">{errorDetails.description}</p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="mt-4 text-sm text-gray-600 max-w-md mx-auto">{error.message}</p>
        )}

        <div className="mt-6 space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-[#ff9e40] text-white rounded-lg shadow hover:bg-[#e7890c] transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-[#a84e24] text-white rounded-lg shadow hover:bg-[#8e4220] transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

