interface Props {
  children: React.ReactNode;
  title?: string;
  desc?: string;
}

const PageLayout = ({ children, title, desc }: Props) => {
  return (
    <div className="flex flex-col h-full gap-4 py-24 px-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg text-gray-500 mb-4">{desc}</p>
      {children}
    </div>
  );
};

export default PageLayout;
