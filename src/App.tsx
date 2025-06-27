import "./App.css";
import FinancingRequestForm from "./components/FinancingRequestForm";

export default function App() {
  return (
    <div className="root">
      <div className="header">
        <div className="app-name">Create Financing Request</div>
      </div>
      <FinancingRequestForm />
    </div>
  );
}
