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

const parsePostIdeas = (rawIdeas: string[]): PostIdea => {
  const mainTitlePattern = /^##\s*(.*)$/;
  const contentPattern1 = /^\*\*\d+\.\s*"(.*)"\*\*\s*-\s*(.*)$/;
  const contentPattern2 = /^\*\*\d+\.\s*"(.*)":\*\*$/;
  const contentPattern3 = /^\*\*\d+\.\s*(.*?):\*\*\s*(.*)$/;
  const subContentPattern = /^\*\s*(.*)$/;

  let mainTitle = "";
  const contents: string[] = [];
  let currentContent = "";

  rawIdeas.forEach((line) => {
    const trimmedLine = line.trim();
    if (mainTitlePattern.test(trimmedLine)) {
      const match = mainTitlePattern.exec(trimmedLine);
      if (match) {
        mainTitle = match[1];
      }
    } else if (contentPattern1.test(trimmedLine)) {
      const match = contentPattern1.exec(trimmedLine);
      if (match) {
        if (currentContent) {
          contents.push(currentContent);
          currentContent = "";
        }
        currentContent = `${match[1]} - ${match[2]}`;
      }
    } else if (contentPattern2.test(trimmedLine)) {
      const match = contentPattern2.exec(trimmedLine);
      if (match) {
        if (currentContent) {
          contents.push(currentContent);
          currentContent = "";
        }
        currentContent = match[1];
      }
    } else if (contentPattern3.test(trimmedLine)) {
      const match = contentPattern3.exec(trimmedLine);
      if (match) {
        if (currentContent) {
          contents.push(currentContent);
          currentContent = "";
        }
        currentContent = `${match[1]} - ${match[2]}`;
      }
    } else if (subContentPattern.test(trimmedLine)) {
      const match = subContentPattern.exec(trimmedLine);
      if (match) {
        currentContent += ` ${match[1]}`;
      }
    } else if (trimmedLine) {
      if (currentContent) {
        currentContent += ` ${trimmedLine}`;
      }
    }
  });

  if (currentContent) {
    contents.push(currentContent);
  }

  return { mainTitle, contents };
};

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
      const cleanedIdeas = response.ideas.filter((idea) => idea.trim() !== "");
      const parsedIdeas = parsePostIdeas(cleanedIdeas);
      setPostIdea(parsedIdeas);
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
        <div className="mt-8">
          <h2 className="font-bold text-xl">{postIdea.mainTitle}</h2>
          <div className="flex flex-col gap-y-4">
            {postIdea.contents.map((content, index) => (
              <Card
                key={index}
                label={`Idea ${index + 1}`}
                desc={content}
                href={`/services/get-inspired/generate-ideas?topic=${topic}&idea=${content}`}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GetInspired;
