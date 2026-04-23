const formatDisplay = (rawText) => {
  let text = rawText;
  const targetHeader = "Rangkuman Eksekutif";
  const index = text.indexOf(targetHeader);
  if (index !== -1) {
    text = text.substring(index + targetHeader.length);
  }

  text = text.replace(/[*#_>\-]/g, "");
  text = text.replace(/\n+/g, " ");
  text = text.replace(/\s\s+/g, " ");

  return text.trim();
};

module.exports = formatDisplay;
