import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Document, Page } from 'react-pdf';
import './SinglePage.css'


const SinglePagePreviewPDF = (props) => {
    const { pdf } = props;
    const isMobile = useMediaQuery({ query: `(max-width: 770px)` });

    return (
        <div className='document-container'>
            { isMobile ? (
                <div>
                    <p>
                        PDF preview not available.
                    </p>
                </div>
                ) : (
                <Document
                    className={'shadow'}
                    file={pdf}
                    options={
                        { 
                            workerSrc: "/pdf.worker.js" 
                        }
                    }
                ><Page pageNumber={1} />
                </Document>
                )
            }
        </div>
    );
}

export default SinglePagePreviewPDF;
