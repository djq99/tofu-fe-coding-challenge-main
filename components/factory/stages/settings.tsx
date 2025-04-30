import { useMemo, useEffect, useCallback } from "react";
import Accordion from "../../../components/core/accordion";
import { useFetchContentGroup, useUpdateContentGroup } from "../../../hooks/api/contentGroup";

const contentGroupId = 320321;

const Settings = () => {
  const windowWidth = useMemo(() => window?.innerWidth, [window?.innerWidth]);
  const { contentGroup, isLoading } = useFetchContentGroup(contentGroupId);
  const { updateContentGroup } = useUpdateContentGroup();

  const grouped = useMemo(() => {
    const comps = contentGroup?.components ?? [];
    return {
      text: comps.filter((c) => c.meta?.type === 'text'),
      image: comps.filter((c) => c.meta?.type === 'image'),
    };
  }, [contentGroup]);


  useEffect(() => {
    console.log("contentGroup", contentGroup);
  }, [contentGroup]);

  const handleDelete = useCallback(
    (idToRemove: string) => {
      const prev = contentGroup?.components ?? [];
      const updated = prev.filter((c) => c.id !== idToRemove);

      updateContentGroup({
        id: contentGroupId,
        payload: { components: updated },
      });
    },
    [contentGroup, updateContentGroup]
  );
  const accordionLabel = (number, text, stage) => {
    let preText = <span className="pl-1 pr-2">{number}.</span>;

    if (windowWidth < 1290 && stage === "instructions") {
      return (
        <div className="flex text-left">
          <span>{preText}</span>
          <div className="grid justify-items-start">
            <span>Add Instructions</span>
            <span>(optional)</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex text-left">
        <span>{preText}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div>
          <Accordion
            key="1"
            label={accordionLabel(1, "Select components", "components")}
            customizeClassName={{
              border: "border-none",
              paddingX: "px-0",
              paddingY: "py-1",
            }}
            testId="components-accordion"
            iconPosition="right"
            initOpen={true}
          >
            <div className="flex flex-col gap-y-1 mt-6">
              <p className="text-sm font-normal text-slate-700">
                On the canvas, select components that you want Tofu to
                personalize. We’ll generate multiple options for each component.
              </p>
            </div>
            <div className="text-sm overflow-hidden">
              <p className="px-3 pt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                Text components
              </p>
              {grouped.text.map((c, idx) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between px-3 py-2 border-b`}
                >
                  <span className="truncate">{c.text}</span>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-400 hover:text-red-600 text-lg leading-none"
                    aria-label="Delete component"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {!isLoading && !grouped.text.length && (
                <div className="px-4 py-3 text-slate-500">No text components.</div>
              )}

              <p className="px-3 pt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                Image components
              </p>
              {grouped.image.map((c, idx) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between px-3 py-2 border-b`}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded bg-slate-800">
                    <span
                      className="max-w-[300px] max-h-[360px] shrink-0 overflow-hidden rounded"
                      dangerouslySetInnerHTML={{ __html: c.meta.selected_element }}
                    />
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-gray-400 hover:text-red-600 text-lg leading-none"
                      aria-label="Delete component"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              {!isLoading && !grouped.image.length && (
                <div className="px-4 py-3 text-slate-500">No image components.</div>
              )}
            </div>
          </Accordion>
        </div>
        <div>
          <Accordion
            key="2"
            label={accordionLabel(2, "Test it out!", null)}
            customizeClassName={{
              border: "border-none",
              paddingX: "px-0",
              paddingY: "py-1",
              paddingB: "pb-1",
            }}
            iconPosition="right"
            initOpen={false}
          >
            <div className="flex flex-col gap-y-1 mt-6 text-fontcolor-default">
              <h3 className="font-medium mb-3">
                Great job! 🎉 Now, let’s work together on your first target.
              </h3>
              <p className="text-sm font-normal pb-2">
                Once we get it right, Tofu will apply those learnings to your
                other targets.
              </p>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Settings;
