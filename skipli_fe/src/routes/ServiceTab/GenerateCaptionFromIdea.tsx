import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCaptionsFromIdeas, saveGeneratedContent } from "../../api";
import { parseCaptions } from "../../utils/parseCaptions";

import PageLayout from "../../components/theme/PageLayout";
import Button from "../../components/shared/Button";
import PostCard from "../../components/shared/PostCard";
import {
  FacebookShareButton,
  EmailShareButton,
  FacebookIcon,
  EmailIcon,
} from "react-share";

function GenerateIdea() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const topicParam = params.get("topic");
  const ideaParam = params.get("idea");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState(topicParam ?? "");
  const [idea, setIdea] = useState(ideaParam ?? "");
  const [captions, setCaptions] = useState<string[]>([]);

  useEffect(() => {
    if (topicParam && ideaParam) {
      setTopic(topicParam);
      setIdea(ideaParam);
    }
  }, [topicParam, ideaParam]);

  const handleGenerationCaptionFromIdea = async () => {
    setLoading(true);
    try {
      const response = (await createCaptionsFromIdeas(idea)) as {
        captions: string[];
      };
      console.log(response);
      setCaptions(response.captions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCaption = async (captions: string[]) => {
    const parsedCaptions = parseCaptions(captions);

    try {
      await saveGeneratedContent({
        topic,
        data: JSON.stringify(parsedCaptions),
      });
      alert("Captions saved successfully!");
    } catch (err) {
      alert("Failed to save captions. Please try again.");
    }
  };

  const renderCaptions = () => {
    const parsedCaptions = parseCaptions(captions);
    const shareUrl = "http://github.com";

    return parsedCaptions.map((section, index) => (
      <div key={index}>
        {section.mainTitle && (
          <h3 className="text-xl font-bold mb-2 text-center">
            {section.mainTitle}
          </h3>
        )}
        {section.title && (
          <h4 className="text-lg italic mb-2 text-gray-500">{section.title}</h4>
        )}
        {section.captions.map((caption, i) => (
          <PostCard key={i}>
            <p>{caption}</p>
            <div className="flex gap-x-2 mt-2 items-center justify-end">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <EmailShareButton
                url={caption}
                subject={`Check out the post created from ${idea}`}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <Button
                onClick={() => handleSaveCaption([caption])}
                className="w-fit py-2 h-fit"
              >
                Save
              </Button>
            </div>
          </PostCard>
        ))}
      </div>
    ));
  };

  return (
    <PageLayout
      title="Get Inspired"
      desc={`TOPIC: "${topic} || IDEA: "${idea}"`}
    >
      <Button
        onClick={handleGenerationCaptionFromIdea}
        className="w-fit"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </Button>

      <h2 className="text-2xl font-bold">Captions generated for you</h2>
      <div className="h-full overflow-y-auto">
        {captions.length ? (
          renderCaptions()
        ) : (
          <p>
            No captions generated yet. Click on the generate button to get
            started.
          </p>
        )}
      </div>
    </PageLayout>
  );
}
export default GenerateIdea;
