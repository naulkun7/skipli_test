import { useState, useEffect, useContext } from "react";
import {
  sendAccessCodeEmail,
  sendAccessCodePhone,
  validateAccessCode,
} from "../api";

import { AuthContext } from "../context/AuthContext";
import PageLayout from "../components/theme/PageLayout";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";

type Props = {};
const Login = (props: Props) => {
  const [type, setType] = useState("phone");
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("+84");
  const [dialog, setDialog] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated, login } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/services");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = type === "email" ? value : `${countryCode}${value}`;

    type === "email"
      ? sendAccessCodeEmail(formData)
          .then((res) => {
            console.log(res);
            setDialog(true);
          })
          .catch((err) => {
            console.error(err);
          })
      : sendAccessCodePhone(formData)
          .then((res) => {
            console.log(res);
            setDialog(true);
          })
          .catch((err) => {
            console.error(err);
          });
  };

  const handleValidateCode = () => {
    validateAccessCode({
      accessCode,
      [type === "email" ? "email" : "phoneNumber"]: value,
    })
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          login(value);
          setSuccessMessage("Access code validated successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setSuccessMessage("Invalid access code. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setSuccessMessage("An error occurred. Please try again.");
      });
  };

  return (
    <PageLayout
      title="Welcome to Skipli AI"
      desc={
        !dialog
          ? "Enter a mobile phone number that you have access to. This number will be use to login to SkipliAI."
          : "Enter the verification code that was sent to your phone."
      }
    >
      {!dialog && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          <div>
            <label htmlFor="loginType">Select login method:</label>
            <select
              id="loginType"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <Input
            type={type}
            value={value}
            setValue={setValue}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
          <Button type="submit">Send Verification Code</Button>
        </form>
      )}
      {dialog && (
        <div className="flex flex-col gap-y-6">
          <Input
            type="accessCode"
            value={accessCode}
            setValue={setAccessCode}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
          <Button onClick={handleValidateCode}>Validate Code</Button>
          <button
            onClick={() => {
              setDialog(false);
              setAccessCode("");
            }}
            className="text-blue-500"
          >
            Resend code
          </button>
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
    </PageLayout>
  );
};

export default Login;
