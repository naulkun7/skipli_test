import PageLayout from "../../components/theme/PageLayout";
import Card from "../../components/shared/Card";

type Props = {};
const Services = (props: Props) => {
  return (
    <PageLayout title="Generate unique captions from scratch">
      <Card
        label="Start from scratch"
        desc="Generate new captions to engage, delight, or sell"
        href="/services/start-from-scratch"
      />
      <Card
        label="Get inspired"
        desc="Generate post ideas and captions for a topic"
        href="#"
      />
    </PageLayout>
  );
};
export default Services;
