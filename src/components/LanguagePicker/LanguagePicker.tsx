import React from 'react';
import { Image, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// @ts-ignore
import poland from "../../assets/img/poland.png";
// @ts-ignore
import england from "../../assets/img/england.png";

const LanguagePicker = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n?.language.split('-')[0];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).catch();
  };
  const activeLanguage = (active:boolean) => active ? 'fw-bold' : '';

  return (
    <NavDropdown
      id='lang-dropdown'
      className='fs-5 float-end mx-4 mt-5'
      title={
        <>
          <Image
            src={currentLang === 'pl' ? poland : england}
            className='mb-1 img-fluid border'
            style={{ maxHeight:'23px' }}
          />
          <span> {currentLang.toUpperCase()}</span>
        </>
      }
    >
      <NavDropdown.Item onClick={() => changeLanguage('pl')} className={`${activeLanguage(i18n.language === 'pl')}`}>
        <Image src={poland} className='lang-flag-img'/>
        <span> PL</span>
      </NavDropdown.Item>

      <NavDropdown.Item onClick={() => changeLanguage('en')} className={`${activeLanguage(i18n.language === 'en')}`}>
        <Image src={england} className='lang-flag-img'/>
        <span> EN</span>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguagePicker;
