import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
    return (
        <div style={{ position: "relative", zIndex: "9999" }}>
            {/* your code for rendering the video */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: "10000" }} // Set a higher z-index for the ToastContainer
            />
        </div>
    )
}
