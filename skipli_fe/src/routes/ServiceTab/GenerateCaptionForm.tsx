import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// API
import { generatePostCaptions, saveGeneratedContent } from "../../api";

// Content
import Content from "../../assets/GeneratePostCaption.json";

// Components
import PageLayout from "../../components/theme/PageLayout";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import PostCard from "../../components/shared/PostCard";

// Utils
import { parseCaptions } from "../../utils/parseCaptions";

const GenerateCaptionForm: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const socialNetworkParam = params.get("socialNetwork");
  const [socialNetwork, setSocialNetwork] = useState(
    socialNetworkParam ?? "facebook",
  );
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);

  useEffect(() => {
    if (socialNetworkParam) {
      setSocialNetwork(socialNetworkParam);
    }
  }, [socialNetworkParam]);

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const response = (await generatePostCaptions({
        socialNetwork,
        subject: topic,
        tone,
      })) as { captions: string[] };
      setCaptions(response.captions);
    } catch (err) {
      setError("Failed to generate captions. Please try again.");
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
    // console.log(captions);
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
          <PostCard
            key={i}
            caption={caption}
            shareUrl={shareUrl}
            onClick={() => handleSaveCaption([caption])}
          />
        ))}
      </div>
    ));
  };

  return (
    <PageLayout
      title={`${socialNetwork} Post`}
      className="justify-center items-center w-full"
    >
      <div className="flex flex-col gap-y-2">
        <h3 className="text-lg">What topic do you want a caption for?</h3>
        <Input
          type="text"
          value={topic}
          setValue={setTopic}
          placeholder="Enter your topic"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-lg">What should your caption sound like?</h3>
        <Input
          type="select"
          value={tone}
          setValue={setTone}
          options={Content.tone}
        />
      </div>
      <Button
        onClick={handleGenerateCaptions}
        disabled={loading}
        className="w-fit"
      >
        {loading ? "Generating..." : "Generate"}
      </Button>
      {error && <p className="error">{error}</p>}

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
};

export default GenerateCaptionForm;
