import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'components/common/Select/Select';
import Logo from 'components/common/Logo/Logo';
import Version from 'components/Version/Version';
import AutoIcon from 'components/common/Icons/AutoIcon';
import SunIcon from 'components/common/Icons/SunIcon';
import MoonIcon from 'components/common/Icons/MoonIcon';
import { ThemeModeContext } from 'components/contexts/ThemeModeContext';
import UserInfo from './UserInfo/UserInfo';
import * as S from './NavBar.styled';
import i18n from 'i18next';
import GitIcon from '../common/Icons/GitIcon';
import DiscordIcon from '../common/Icons/DiscordIcon';
interface Props {
  onBurgerClick: () => void;
}

const NavBar: React.FC<Props> = ({ onBurgerClick }) => {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);
  const languageOptions: OptionTypeBase[] = [
    { label: 'en', value: 'en' },
    { label: 'it', value: 'it' },
  ];

  // Function to change the language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change the language
  };

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const options = [
    {
      label: (
        <>
          <AutoIcon />
          <div>{t('autoTheme')}</div>
        </>
      ),
      value: 'auto_theme',
    },
    {
      label: (
        <>
          <SunIcon />
          <div>{t('lightTheme')}</div>
        </>
      ),
      value: 'light_theme',
    },
    {
      label: (
        <>
          <MoonIcon />
          <div>{t('darkTheme')}</div>
        </>
      ),
      value: 'dark_theme',
    },
  ];

  return (
    <S.Navbar role="navigation" aria-label="Page Header">
      <S.NavbarBrand>
        <S.NavbarBurger
          onClick={onBurgerClick}
          onKeyDown={onBurgerClick}
          role="button"
          tabIndex={0}
          aria-label="burger"
        >
          <S.Span role="separator" />
          <S.Span role="separator" />
          <S.Span role="separator" />
        </S.NavbarBurger>

        <S.Hyperlink to="/">
          <Logo />
          UI for Apache Kafka
        </S.Hyperlink>

        <S.NavbarItem>
          <Version />
        </S.NavbarItem>
      </S.NavbarBrand>

      <S.NavbarSocial>
        <Select
          options={options}
          value={themeMode}
          onChange={setThemeMode}
          isThemeMode
        />
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={(value: string) => changeLanguage(value)}
          placeholder={i18n.language}
          isThemeMode
        />
        <S.SocialLink
          href="https://github.com/provectus/kafka-ui"
          target="_blank"
        >
          <GitIcon />
        </S.SocialLink>
        <S.SocialLink
          href="https://discord.com/invite/4DWzD7pGE5"
          target="_blank"
        >
          <DiscordIcon />
        </S.SocialLink>
        <UserInfo />
      </S.NavbarSocial>
    </S.Navbar>
  );
};

export default NavBar;
