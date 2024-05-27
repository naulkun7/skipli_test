import React, { useState } from "react";
import { getPostIdeas } from "../../api/services/getPostIdeas";

// Components
import PageLayout from "../../components/theme/PageLayout";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";

interface PostIdea {
  mainTitle: string;
  contents: string[];
}

const GetInspired: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [postIdea, setPostIdea] = useState<PostIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateIdeas = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getPostIdeas({ topic });
      if (response && response.ideas && response.ideas.length > 0) {
        const mainTitle = response.ideas[0];
        const contents = response.ideas.slice(2); // Skip the first two entries as the first is the title and the second is empty
        setPostIdea({ mainTitle, contents });
      }
    } catch (err) {
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      title="Get inspired"
      desc="Stuck staring at a blank page? Tell us what topic you have in mind and Skipli AI will generate a list of post ideas and captions for you."
    >
      <div className="flex flex-col gap-y-4">
        <h3 className="text-lg">What topic do you want ideas for?</h3>
        <Input
          type="text"
          value={topic}
          setValue={setTopic}
          placeholder="Enter your topic"
        />
        <div className="w-full flex justify-end">
          <Button
            className="w-fit"
            onClick={handleGenerateIdeas}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate ideas"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {postIdea && (
        <div className="mt-8 h-full overflow-y-auto">
          <h2 className="font-bold text-xl">{postIdea.mainTitle}</h2>
          <div className="flex flex-col gap-y-4">
            {postIdea.contents.map((content, index) => (
              <Card
                key={index}
                label={`Idea ${index + 1}`}
                desc={content}
                href={`/services/get-inspired/generate-ideas?topic=${topic}&idea=${content}`}
                className="w-full"
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GetInspired;
