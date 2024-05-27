import { useEffect, useState } from "react";
import PageLayout from "../../components/theme/PageLayout";
import { getUserGeneratedContents } from "../../api";
import PostCard from "../../components/shared/PostCard";

type Props = {};

interface Content {
  data: string;
  userIdentifier: string;
  topic: string;
}

const Profile = (props: Props) => {
  const userIdentifier = localStorage.getItem("userContact");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      try {
        if (userIdentifier) {
          const response = await getUserGeneratedContents({ userIdentifier });

          if (response && Array.isArray(response)) {
            setContents(response);
          } else {
            setContents([]);
            setError("No contents found");
          }
        } else {
          setError("No user contact information");
        }
      } catch (err) {
        setError("Failed to fetch contents");
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [userIdentifier]);

  console.log(contents);

  const groupedContents = contents.reduce(
    (acc: Record<string, Content[]>, content) => {
      if (!acc[content.topic]) {
        acc[content.topic] = [];
      }
      acc[content.topic].push(content);
      return acc;
    },
    {},
  );

  return (
    <PageLayout
      title="Profile"
      desc={`User: "${userIdentifier}"`}
      className="items-center w-full"
    >
      <div className="flex flex-col gap-y-4">
        <h2 className="capitalize text-2xl font-bold">Saved content</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {Object.keys(groupedContents).length
          ? Object.keys(groupedContents).map((topic) => (
              <div key={topic}>
                <h3 className="text-lg font-bold">{topic}</h3>
                {groupedContents[topic].map((content) =>
                  JSON.parse(content.data).map((item: any) => {
                    const caption =
                      item.captions && item.captions.length > 0
                        ? item.captions.join(" ")
                        : item.title || "No content available";
                    return (
                      <PostCard
                        key={item}
                        caption={caption}
                        shareUrl="http://github.com"
                        onClick={() => {}}
                        saveButton={false}
                      />
                    );
                  }),
                )}
              </div>
            ))
          : !loading && <p>No contents found.</p>}
      </div>
    </PageLayout>
  );
};

export default Profile;
