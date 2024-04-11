import SubZone from "../SubZone/SubZone";
import "./DropZone.css";

const DropZone = () => {

  return <div className="dropzone" draggable="false">
    <SubZone title="source" index={0} />
    <SubZone title="load" index={1} />
    <SubZone title="path" index={2} />
  </div>;
};

export default DropZone;
