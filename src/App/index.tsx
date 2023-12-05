import { useState } from "react";
import style from "./style.module.css";
import { Button } from "antd";

function App() {
  const [isOpening, setIsOpening] = useState(false);
  const [writeStream, setWriteStream] =
    useState<FileSystemWritableFileStream>();

  function onCreate() {}
  async function onOpen() {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    });
    const stream = await fileHandle.createWritable();
    setWriteStream(stream);
    setIsOpening(true);
  }
  async function onSave() {
    await writeStream?.close();
    setIsOpening(false);
  }

  return (
    <div className={style.app}>
      <div className={style.button_group}>
        <Button onClick={onCreate} disabled={isOpening}>
          新建
        </Button>
        <Button onClick={onOpen} disabled={isOpening}>
          打开
        </Button>
        <Button onClick={onSave} disabled={!isOpening}>
          保存
        </Button>
      </div>
    </div>
  );
}

export default App;
