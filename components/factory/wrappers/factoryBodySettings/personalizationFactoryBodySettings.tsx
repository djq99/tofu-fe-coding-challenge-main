import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FactoryContent from "../factoryContent";
import { PersonalizationFactoryControlSettings } from "../factoryControlSettings/personalizationFactoryControlSettings";
import { calculateFixedButtonsPaddingRight } from "utils/factoryHelpers";

const PersonalizationFactoryBodySettings = ({ content, campaign }) => {
  const [leftPanelSize, setLeftPanelSize] = useState(25);
  const handleResize = (sizes: number[]) => {
    setLeftPanelSize(sizes[0]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-50px)] bg-white">
      <PanelGroup direction="horizontal" onLayout={handleResize}>
        <Panel defaultSize={25} minSize={20} maxSize={80}>
          <div className="z-10 w-full h-full mb-40 overflow-x-hidden overflow-y-scroll flex flex-col items-start">
            <PersonalizationFactoryControlSettings
              currentPaneWidth={leftPanelSize}
              fixedButtonsPaddingRight={calculateFixedButtonsPaddingRight(
                leftPanelSize
              )}
            />
          </div>
        </Panel>
        <PanelResizeHandle className="w-[2px] bg-gray-200 hover:bg-primary transition-colors focus:bg-primary" />
        <Panel>
          <div className="w-full h-full relative overflow-y-scroll">
            <FactoryContent />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

type FactoryBodySettingsWrapperProps = {
  content: any;
  campaign: any;
};

const FactoryBodySettingsWrapper = ({
  content,
  campaign,
}: FactoryBodySettingsWrapperProps) => {
  return (
    <PersonalizationFactoryBodySettings content={content} campaign={campaign} />
  );
};

export default FactoryBodySettingsWrapper;
