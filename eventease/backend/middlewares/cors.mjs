import cors from "cors";

// Export preconfigured CORS middleware
export default cors({
	origin: "http://localhost:5173", // Allow requests only from frontend (Vite dev server)
	credentials: true, // Allow sending cookies and authorization headers
});
