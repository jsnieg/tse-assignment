import React from 'react';
import SinglePagePreviewPDF from '../PDF/SinglePage';
import samplePDF from '../../sample.pdf';


const Privacy = () => {
  return (
    <div>
      <h1> Privacy Disclaimer </h1>

      <section id='pdf-preview-section'>
        <SinglePagePreviewPDF 
          pdf={samplePDF}
        />
      </section>
    </div>
  );
}

export default Privacy;
