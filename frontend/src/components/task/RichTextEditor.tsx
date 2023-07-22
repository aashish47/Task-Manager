import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/RichTextEditor.css";

type RichTextEditorProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

const RichTextEdtitor: React.FC<RichTextEditorProps> = ({ value, setValue }) => {
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    return <ReactQuill value={value} onChange={setValue} modules={modules} theme="snow" />;
};

export default RichTextEdtitor;
