import { Button } from "antd";
import "./Success.css";

interface SuccessProps {
  onGoBack: () => void;
}

const Success = ({ onGoBack }: SuccessProps) => {
  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Request Submitted Successfully!</h2>
        <p className="success-message">
          <div>Your financing request has been submitted successfully.</div>
          <div>We will review your application and get back to you soon.</div>
        </p>
        <Button type="primary" onClick={onGoBack} className="go-back-button">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Success;
