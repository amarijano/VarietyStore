import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "../../constants/constants";
import styles from "./styles.module.scss";

const NotFoundView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
      <Button
        className={styles.homeButton}
        onClick={() => navigate(AppRoute.BASE)}
      >
        {t("notFound.homeButton")}
      </Button>
    </div>
  );
};

export default NotFoundView;
