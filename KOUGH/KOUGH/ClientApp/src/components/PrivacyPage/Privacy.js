import React from 'react';
import SinglePagePreviewPDF from '../PDF/SinglePage';
import privacyPDF from '../../PrivacyPolicy.pdf';


const Privacy = () => {
  return (
    <div>
      <h1> Privacy Disclaimer </h1>

      <section id='pdf-preview-section'>
        <SinglePagePreviewPDF 
          pdf={privacyPDF}
        />
      </section>
    </div>
  );
}

export default Privacy;
