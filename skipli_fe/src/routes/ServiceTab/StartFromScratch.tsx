import PageLayout from "../../components/theme/PageLayout";
import Card from "../../components/shared/Card";

import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

type Props = {};
const StartFromScratch = (props: Props) => {
  return (
    <PageLayout
      title="Generate unique captions from scratch"
      desc="Choose the type of post you want a caption for, and let Skipli AI write it for you"
    >
      <h2 className="text-gray-500 font-medium">
        What kind of post do you want a caption for?
      </h2>

      <Card
        icon={FaFacebookSquare}
        label="Facebook post"
        desc="Generate caption for a post"
        href="#"
      />
      <Card
        icon={FaInstagram}
        label="Instagram post"
        desc="Generate caption for a post"
        href="#"
      />
      <Card
        icon={FaTwitterSquare}
        label="Twitter post"
        desc="Generate caption for a post"
        href="#"
      />
    </PageLayout>
  );
};
export default StartFromScratch;
