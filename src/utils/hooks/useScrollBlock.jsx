/* eslint-disable import/no-anonymous-default-export */
import { useRef } from "react";

const safeDocument = typeof document !== "undefined" ? document : {};

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export default () => {
  const scrollBlocked = useRef();
  const html = safeDocument.documentElement;
  const { body } = safeDocument;

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return;
    html.style.overflow = "hidden"; /* [2] */
    body.style.overflow = "hidden"; /* [2] */
    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};
