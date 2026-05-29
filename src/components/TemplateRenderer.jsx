import DraggableElement from "./DraggableElement";

const TemplateRenderer = ({
  template,
  setTemplate,
  selectedElement,
  setSelectedElement,
  invoiceInfo,
  items,
}) => {

  return (
    <div className="flex-1 overflow-auto p-10">

      <div
        className="relative mx-auto bg-white shadow-xl"
        style={{
          width: "600px",
          minHeight: "850px",
        }}
      >

        {template.map((element) => (

          <DraggableElement
            key={element.id}
            element={element}
            template={template}
            setTemplate={setTemplate}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            invoiceInfo={invoiceInfo}
            items={items}
            />

        ))}

      </div>

    </div>
  );
};

export default TemplateRenderer;