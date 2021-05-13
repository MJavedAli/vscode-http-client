import EditorLanguageSelect from "@/components/common/EditorLanguageSelect";
import { EditorLanguage, REQUEST_BODY_TYPE } from "@/constants";
import { useTypedDispatch, useTypedSelector } from "@/store";
import { REQUEST_ACTION } from "@/store/request/action";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import React from "react";
import BodyType from "./BodyType";
import styles from "./index.module.css";
import None from "./None";
import Raw from "./Raw";
import XwwFormUrlEncoded from "./XWwwFormUrlEncoded";

export default function Body() {
  const body = useTypedSelector((state) => state.request.request.body);
  const dispath = useTypedDispatch();

  const handleTypeChange = (type: REQUEST_BODY_TYPE) => {
    dispath({ type: REQUEST_ACTION.UPDATE_BODY, payload: { type } });
  };

  const handleLangChange = (lang: EditorLanguage) => {
    dispath({
      type: REQUEST_ACTION.UPDATE_BODY,
      payload: {
        [REQUEST_BODY_TYPE.RAW]: {
          ...body[REQUEST_BODY_TYPE.RAW],
          lang,
        },
      },
    });
  };

  const getClass = (type: REQUEST_BODY_TYPE) =>
    body.type === type ? "" : styles.hidden;

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.type}>
          <BodyType value={body.type} onChange={handleTypeChange} />
          <span className={getClass(REQUEST_BODY_TYPE.RAW)}>
            <EditorLanguageSelect
              value={body[REQUEST_BODY_TYPE.RAW].lang}
              onChange={handleLangChange}
            />
          </span>
        </div>
        <div className={styles.content}>
          <div className={getClass(REQUEST_BODY_TYPE.NONE)}>
            <None />
          </div>
          {/* <div className={getClass(REQUEST_BODY_TYPE.FORM_DATA)}>
          <FormData />
        </div> */}
          <div className={getClass(REQUEST_BODY_TYPE.X_WWW_FORM_URLENCODED)}>
            <XwwFormUrlEncoded />
          </div>
          <div className={getClass(REQUEST_BODY_TYPE.RAW)}>
            <Raw />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
