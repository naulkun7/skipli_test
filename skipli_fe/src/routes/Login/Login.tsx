import PageLayout from "../../components/theme/PageLayout";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";

type Props = {};
const Login = (props: Props) => {
  return (
    <PageLayout
      title="Welcome to Skipli AI"
      desc="Enter a mobile phone number that you have access to.This number will be use to login to SkipliAI."
    >
      <Input />
      <Button>Send Verification Code</Button>
    </PageLayout>
  );
};

export default Login;
