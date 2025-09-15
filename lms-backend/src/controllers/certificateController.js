import PDFDocument from "pdfkit";
import Result from "../models/Result.js";
import User from "../models/User.js";

export const generateCertificate = async (req, res) => {
  try {
    const { resultId } = req.params;

    const result = await Result.findById(resultId).lean();
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (!req.user || req.user.id !== String(result.userId)) {
      return res.status(403).json({ message: "Forbidden: not your result" });
    }

    const user = await User.findById(result.userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const passThreshold = result.passThreshold ?? null;
    const passed = typeof passThreshold === "number" ? result.score >= passThreshold : true;

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${user.name.replace(/\s+/g, "_")}_MERN_certificate.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("Certificate of Completion", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(14).text(`This certificate is presented to`, { align: "center" });
    doc.moveDown(0.5);

    doc.font("Times-Bold").fontSize(24).text(user.name, { align: "center" });
    doc.moveDown(1);

    doc.font("Times-Roman")
      .fontSize(16)
      .text(`For successfully completing the MERN Fullstack Test`, { align: "center" });
    doc.moveDown(1);

    
    doc.fontSize(14).text(`Status: ${passed ? "Passed ✅" : "Failed ❌"}`, { align: "center" });

    const today = new Date(result.date).toLocaleDateString("en-GB");
    doc.moveDown(2);
    doc.fontSize(12).text(`Date: ${today}`, { align: "center" });

    doc.moveDown(3);
    doc.fontSize(12).text("_________________________", { align: "right" });
    doc.fontSize(10).text("Authorized Signature", { align: "right" });

    doc.end();
  } catch (error) {
    console.error("Certificate generation error:", error);
    if (!res.headersSent)
      res.status(500).json({ message: "Failed to generate certificate" });
  }
};
