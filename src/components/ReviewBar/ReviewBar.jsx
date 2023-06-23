import { useState } from "react";
import "./ReviewBar.scss";

function ReviewBar() {
  const [progress, setProgress] = useState(0); // Update initial state to 0

  const handleProgressChange = (event) => {
    const progressBar = event.currentTarget;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const newProgress = (clickPosition / progressBarWidth) * 100;
    setProgress(newProgress);
  };

  const handleCircleDrag = (event) => {
    const circle = event.target;
    const progressBar = circle.parentNode;
    const progressBarWidth = progressBar.offsetWidth;
    const dragOffset = event.clientX - progressBar.getBoundingClientRect().left;

    const handleMouseMove = (event) => {
      const newClickPosition =
        event.clientX - progressBar.getBoundingClientRect().left;
      let newProgress =
        ((newClickPosition - dragOffset) / progressBarWidth) * 100;
      newProgress = Math.min(Math.max(newProgress, 0), 100); // Restrict progress within 0-100 range
      setProgress(newProgress);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="circle_container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
          onClick={handleProgressChange}
        ></div>
      </div>
      <div
        className="circle"
        style={{ left: `${progress}%` }}
        onMouseDown={handleCircleDrag}
      ></div>
    </div>
  );
}

export default ReviewBar;
