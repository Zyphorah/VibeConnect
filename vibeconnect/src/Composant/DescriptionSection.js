import React from "react";
import "./Css/TexteDescription.css"; 
import { useTranslation } from "react-i18next";

export function DescriptionSection() {
  const { t } = useTranslation();

  return (
    <div className="vibe-side-text">
      <h1 className="vibe-title">{t('description.title')}</h1>
      <p className="vibe-subtext">{t('description.subtext')}</p>
    </div>
  );
}

export default DescriptionSection;