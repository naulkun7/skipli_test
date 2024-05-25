import PageLayout from "../../components/theme/PageLayout";

type Props = {};
const Profile = (props: Props) => {
  const value = localStorage.getItem("userContact");

  return (
    <PageLayout title="Profile">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-md">Your Email: {value}</h1>
        <p className="text-lg">This is the profile page</p>
      </div>
    </PageLayout>
  );
};
export default Profile;
