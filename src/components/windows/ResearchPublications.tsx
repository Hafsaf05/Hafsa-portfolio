const papers = [
  {
    title:
      "Car Price Prediction Using Machine Learning",
    year: "2025",
  },
  {
    title:
      "Future Proofing Real Estate: Machine Learning for Price Predictions",
    year: "2025",
  },
];

export default function ResearchPublications() {
  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <div
          key={paper.title}
          className="p-4 rounded-lg border border-white/10 bg-white/5"
        >
          <h3 className="font-bold">
            {paper.title}
          </h3>

          <p className="text-white/40">
            Published {paper.year}
          </p>
        </div>
      ))}
    </div>
  );
}