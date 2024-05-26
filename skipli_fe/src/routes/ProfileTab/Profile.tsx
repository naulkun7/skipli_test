import { useEffect, useState } from "react";

import PageLayout from "../../components/theme/PageLayout";
import { getUserGeneratedContents } from "../../api";

type Props = {};
const Profile = (props: Props) => {
  const value = localStorage.getItem("userContact");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [contents, setContents] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchContents = async () => {
  //     setLoading(true);
  //     try {
  //       let response = await getUserGeneratedContents({ value });

  //       setContents(response.contents);
  //     } catch (err) {
  //       setError("Failed to fetch contents. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchContents();
  // }, [value]);

  return (
    <PageLayout title="Profile" desc={`User: "${value}"`}>
      <div className="flex flex-col gap-y-4">
        <h2 className="capitalize text-2xl font-bold">Saved content</h2>
      </div>
    </PageLayout>
  );
};
export default Profile;
