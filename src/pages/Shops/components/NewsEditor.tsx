import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

interface Props {
  content: string;
  setContent: (content: string) => void;
}

const NewsEditor = (props: Props) => {
  const handleChangeInput = (e: any) => {
    props.setContent(e);
  };

  return (
    <SunEditor
      placeholder="Write something..."
      autoFocus={true}
      onChange={handleChangeInput}
      width="100%"
      height="500"
      defaultValue={props.content}
    />
  );
};

export default NewsEditor;
