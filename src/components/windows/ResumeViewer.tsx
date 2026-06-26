"use client";

const ResumeViewer = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex gap-3">
        <a
          href="/resume/Hafsa_Fathima_Resume.pdf"
          target="_blank"
          className="px-4 py-2 rounded-lg bg-neon-blue/20"
        >
          Open PDF
        </a>

        <a
          href="/resume/Hafsa_Fathima_Resume.pdf"
          download
          className="px-4 py-2 rounded-lg bg-neon-purple/20"
        >
          Download Resume
        </a>
      </div>

      <iframe
        src="/resume/Hafsa_Fathima_Resume.pdf"
        className="w-full flex-1 rounded-lg"
      />
    </div>
  );
};

export default ResumeViewer;