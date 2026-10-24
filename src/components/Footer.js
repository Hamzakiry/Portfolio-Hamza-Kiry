import { Text } from "../i18n/Language";
// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer"><Text value={" Made with "}/><span style={{ color: 'red', fontSize: '24px' }}><Text value={"♥"}/></span><Text value={" by Kiry Hamza "}/></footer>
  );
};

export default Footer;
