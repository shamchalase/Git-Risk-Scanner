import jsPDF from "jspdf";

const exportPdf = (issues) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GitLab Risk Scanner Report", 20, 20);

  let y = 40;

  issues.forEach((issue) => {
    doc.text(`${issue.repository} | ${issue.issue} | ${issue.severity}`, 10, y);

    y += 10;
  });

  doc.save("scan-report.pdf");
};

export default exportPdf;
