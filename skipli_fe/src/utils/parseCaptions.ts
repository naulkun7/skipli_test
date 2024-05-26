export const parseCaptions = (captions: string[]) => {
  const parsedCaptions: {
    mainTitle?: string;
    title?: string;
    captions: string[];
  }[] = [];
  let currentSection: {
    mainTitle?: string;
    title?: string;
    captions: string[];
  } | null = null;

  captions.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("##")) {
      if (currentSection) {
        parsedCaptions.push(currentSection);
      }
      currentSection = { mainTitle: trimmedLine.slice(2).trim(), captions: [] };
    } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
      if (currentSection && currentSection.captions.length > 0) {
        parsedCaptions.push(currentSection);
      }
      currentSection = { title: trimmedLine.slice(2, -2).trim(), captions: [] };
    } else if (trimmedLine) {
      if (currentSection) {
        currentSection.captions.push(trimmedLine.replace(/^\* /, "").trim());
      } else {
        parsedCaptions.push({
          captions: [trimmedLine.replace(/^\* /, "").trim()],
        });
      }
    }
  });

  if (currentSection) {
    parsedCaptions.push(currentSection);
  }

  return parsedCaptions;
};
