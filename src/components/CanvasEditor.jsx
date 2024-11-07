import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current);
    const canvasWidth = 800; 
    newCanvas.setDimensions({ width: canvasWidth });
    setCanvas(newCanvas);

    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement);
      

      const scaleRatio = canvasWidth / img.width;
      const scaledHeight = img.height * scaleRatio;
      
     
      newCanvas.setDimensions({ width: canvasWidth, height: scaledHeight });
      
      img.scaleToWidth(canvasWidth);
      img.selectable = false;
      newCanvas.add(img);
      newCanvas.sendToBack(img); 
    };
    imgElement.src = imageUrl;

    return () => newCanvas.dispose();
  }, [imageUrl]);

  const addText = () => {
    const text = new fabric.Textbox("Enter text here", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "white",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          left: 150,
          top: 150,
          fill: "grey",
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          left: 200,
          top: 200,
          fill: "blue",
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          left: 250,
          top: 250,
          fill: "green",
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 100, y: 0 },
            { x: 200, y: 100 },
            { x: 150, y: 200 },
            { x: 50, y: 200 },
            { x: 0, y: 100 },
          ],
          {
            left: 300,
            top: 300,
            fill: "purple",
          }
        );
        break;
      default:
        return;
    }
    canvas.add(shape);
    canvas.setActiveObject(shape);
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "canvas-image.png";
    a.click();
  };

  return (
    <div className="canvas-editor">
      <canvas ref={canvasRef} />
      <div className="toolbar">
        <button onClick={addText} title="Add Text">Add Caption</button>
        <button onClick={() => addShape("circle")} title="Add Circle">Circle</button>
        <button onClick={() => addShape("rectangle")} title="Add Rectangle">Rectangle</button>
        <button onClick={() => addShape("triangle")} title="Add Triangle">Triangle</button>
        <button onClick={downloadImage} title="Download Image">Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
