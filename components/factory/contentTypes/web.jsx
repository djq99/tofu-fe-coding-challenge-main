import React, { useEffect, useRef, useState, useCallback } from "react";
import Spinner from "@/components/core/spinner";
import { tofuHoveredElement } from "@/utils/factoryHelpers";
import { useFetchContentGroup, useUpdateContentGroup } from "@/hooks/api/contentGroup";
import uniqBy from 'lodash/uniqBy';


const WEBSITE_IFRAME_HTML_ID = "website-iframe";
const contentGroupId = 320321;

const Web = () => {
  const iframeRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [fetchingHtml, setFetchingHtml] = useState(false);
  const { updateContentGroup } = useUpdateContentGroup();
  const { contentGroup } = useFetchContentGroup(contentGroupId);
  const contentGroupRef = useRef(null);

  const applySelectedClass = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    const comps = contentGroupRef.current?.components;
    if (!doc || !comps) return;

    doc.querySelectorAll('[data-tofu-selected="true"]').forEach((el) => {
      el.classList.remove(tofuHoveredElement);
      el.removeAttribute('data-tofu-selected');
    });

    comps?.forEach(({ id }) => {
      const el = doc.querySelector(`[data-tofu-id="${id}"]`);
      if (el) {
        el.classList.add(tofuHoveredElement);
        el.dataset.tofuSelected = 'true';
      }
    });
  }, []);
  useEffect(() => {
    contentGroupRef.current = contentGroup;
    applySelectedClass();
  }, [contentGroup, applySelectedClass]);


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

  const loadIframeHandler = useCallback(() => {
    const frame = iframeRef.current;
    if (!frame?.contentDocument) return;

    const doc = frame.contentDocument;

    doc.addEventListener("mouseover", (e) => {
      const el = e.target;
      if (el?.dataset?.tofuId) {
        el.classList.add(tofuHoveredElement);
      }
    });

    doc.addEventListener("mouseout", (e) => {
      const el = e.target;
      if (el?.dataset?.tofuId && !el.dataset.tofuSelected) {
        el.classList.remove(tofuHoveredElement);
      }
    });

    const clickHandler = (e) => {
      const el = e.target;

      if (!el?.dataset?.tofuId) return;
      if (el.tagName === "A") {
        el.href = "javascript:void(0);";
        return;
      }

      const componentId = el.dataset.tofuId;
      const newComponent = {
        id: componentId,
        meta: {
          type: el.tagName.toLowerCase() === 'img' ? 'image' : 'text',
          html_tag: `<${el.tagName.toLowerCase()}>`,
          time_added: Date.now(),
          html_tag_index: null,
          selected_element: el.outerHTML,
          preceding_element: el.previousElementSibling
            ? el.previousElementSibling.outerHTML
            : '',
          succeeding_element: el.nextElementSibling
            ? el.nextElementSibling.outerHTML
            : '',
        },
        text: el.textContent?.trim() ?? '',
      };

      const prevComponents =
        contentGroupRef.current?.components ?? [];
      const exist = prevComponents.find((c) => c.id === componentId);
      const updatedComponents = exist
        ? prevComponents.filter((c) => c.id !== componentId)
        : uniqBy([...prevComponents, newComponent], 'id');

      const payload = {
        components: updatedComponents
      };
      updateContentGroup({ id: contentGroupId, payload });
    };
    doc.addEventListener("click", clickHandler);
    applySelectedClass();
    return () => doc.removeEventListener("click", clickHandler);
  }, [updateContentGroup, contentGroupId]);

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
