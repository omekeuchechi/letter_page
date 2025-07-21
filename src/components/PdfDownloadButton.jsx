import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PdfDownloadButton = ({ elementId, fileName = 'document.pdf', label = 'Download PDF' }) => {
  const generatePdf = async () => {
    // Get the element to render as PDF
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id '${elementId}' not found`);
      return;
    }

    try {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        scrollY: -window.scrollY, // Fix for scrolling issues
      });

      // Create a new PDF with proper dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate dimensions to maintain aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF
      pdf.addImage(
        imgData,
        'PNG',
        0, // x
        0, // y
        pdfWidth,
        pdfHeight
      );

      // Save the PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button 
      onClick={generatePdf}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#1a4d8f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      {label}
    </button>
  );
};

export default PdfDownloadButton;
