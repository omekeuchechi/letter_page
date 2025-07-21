import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import headerImage from './assets/state_basic_logo.png';
import './App.css'
import PdfDownloadButton from './components/PdfDownloadButton'

const letterHeadData = {
  header_1: 'GOVERNMENT OF BENUE STATE OF NIGERIA',
  info_1: [{telName: 'Teacher Help Line', telNumber: '+234 (0) 8080917184'}, {telName: 'General Enquiries', telNumber: '+234 (0) 7082505052'}],
  replying: 'In replying please quote the number and date of this letter',
  middleImage: headerImage,
  info_2: {info_text: 'STATE UNIVERSAL BASIC EDUCATION BOARD (SUBEB)', ADDRESS: '#3 Ahmadu Bello Way, old GRA Marurdi P.M.B 102070, Marurdi Benue State.', ref: 'SUBEB/SEC/APPT/104', date: '26th MAY, 2025'}
}

const recieverAddressData = {
 recieverName: 'NYAMKYUME Andon',
 recieverAddress: 'The Education Secretary, LGEA, Vaneikya, Benue State', 
}

const letterBodyData = {
 letterTitle: 'OFFER OF TEMPORARY APPOINTMENT',
 paragraph_1: 'I am pleased to offer you the position of Temporary Assistant Teacher (TAT) in the State Universal Basic Education Board (SUBEB) for the academic session of 2025/2026.',
 paragraph_1_list: ['Either you or the Board may terminate this appointment at any time by giving not less than 14 days written notice to the other party.', 'The Board reserves the right to withdraw this offer at any time without giving notice.', 'if you are found lobbying for a permanent position, you will be dismissed from the Board.'],
 paragraph_2: 'If you wish to accept this offer , kindly submit a written acceptance to the Executive Chairman, State Universal Basic Education Board (SUBEB) not later than 14 days from the date of this letter.',
}

const ChairmanData = {
  name: 'Dr Grace Adegba',
  title: 'EXECUTIVE CHAIRMAN',
  school: 'STATE UNIVERSAL BASIC EDUCATION BOARD',
}

function App() {

  const [qrValue] = useState('https://subeb.example.com/verify/12345');
  
  return (
    <>
      <main id="letter-content" className='letter-container'>
        <div className="letter-head-section">
          <b>{letterHeadData.header_1}</b>
          <div className="letter-head-info">
            <div className="info_1">
              {letterHeadData.info_1.map((item, index) => (
                <div key={index}>
                  <b>{item.telName}</b>
                  <p>{item.telNumber}</p>
                </div>
              ))}
              <span className='replying'>{letterHeadData.replying}</span>
            </div>
            <img className='middle-image' src={letterHeadData.middleImage} alt="" />
            <div className="info_2">
              <b className='info_2_text'>{letterHeadData.info_2.info_text}</b>
              <p className='info_2_address'>{letterHeadData.info_2.ADDRESS}</p>
              <div className="ref-date">
              <p className='info_2_ref'>Ref No: <span>{letterHeadData.info_2.ref}</span></p>
              <p className='info_2_date'>Date: <span>{letterHeadData.info_2.date}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="reciever-address">
          <p>{recieverAddressData.recieverName}</p>
          <span>UFS: <b>{recieverAddressData.recieverAddress}</b></span>
        </div>
        <div className="letter-body">
          <h2 
            className={letterBodyData.letterTitle === letterBodyData.letterTitle.toUpperCase() 
              ? 'uppercase-title' 
              : 'lowercase-title'}
              id='letter-title'
          >
            {letterBodyData.letterTitle}
          </h2>
          <div className="letter-body-inner">
            <p>{letterBodyData.paragraph_1}</p>

            <ol>
              {letterBodyData.paragraph_1_list.map(li => (
                <li>{li}</li>
              ))}
            </ol>

          <p>{letterBodyData.paragraph_2}</p>
          </div>
        </div>
        <div className="letter-footer">
          <div className="signature-section">
            <div className="signature-line"></div>
            <div className="signature-data">
              <b>{ChairmanData.name}</b>
              <p>{ChairmanData.title}</p>
              <span>{ChairmanData.school}</span>
            </div>
          </div>
          <div className="qr-code-section">
            <QRCodeSVG 
              value={qrValue}
              size={100}
              level="H"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
        </div>
      </main>
      
      <PdfDownloadButton 
        elementId="letter-content"
        fileName="official-letter.pdf"
        label="Download Letter as PDF"
      />
    </>
  );

}

export default App
