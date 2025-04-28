import React, { useEffect, useRef, useState } from "react";
import Spinner from "@/components/core/spinner";
import { tofuHoveredElement } from "@/utils/factoryHelpers";

const WEBSITE_IFRAME_HTML_ID = "website-iframe";

const Web = () => {
  const iframeRef = useRef(null);
  const hoverStyleRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [fetchingHtml, setFetchingHtml] = useState(false);

  const fetchAndSetHtml = async (url) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    } finally {
      setFetchingHtml(false);
    }
  };

  const initDisplayContent = async () => {
    setFetchingHtml(true);
    await fetchAndSetHtml("/landing-page.html");
  };

  const loadIframeHandler = () => {
    const frame = iframeRef.current;
    if (frame && frame.contentDocument) {
      frame.contentDocument.addEventListener('mouseover', (event) => {
        const hoveredElement = event.target;
        console.log("Hovered Element:", hoveredElement);
        if (hoveredElement && hoveredElement.getAttribute('data-tofu-id')) {
          hoverStyleRef.current = hoveredElement.className;
          hoveredElement.className = hoveredElement.className + " " + tofuHoveredElement;
        }
      });

      frame.contentDocument.addEventListener('mouseout', (event) => {
        const hoveredElement = event.target;
        if (hoveredElement && hoveredElement.getAttribute('data-tofu-id')) {
          hoveredElement.className = hoverStyleRef.current;
        }
      });
      frame.contentDocument.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement && clickedElement.getAttribute('data-tofu-id')) {
          const elementId = clickedElement.getAttribute('data-tofu-id');
          const elementClass = clickedElement.className;
        }
      });
    }
  }

  useEffect(() => {
    initDisplayContent();
  }, []);

  return (
    <>
      <div className="relative w-full h-full">
        {fetchingHtml && (
          <div className="absolute left-0 w-full h-full bg-white">
            <Spinner className="flex justify-center items-center h-40" />
          </div>
        )}
        <iframe
          id={WEBSITE_IFRAME_HTML_ID}
          srcDoc={htmlContent}
          className="w-full h-full"
          ref={iframeRef}
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts"
          onLoad={loadIframeHandler}
        ></iframe>
      </div>
    </>
  );
};

export default Web;
