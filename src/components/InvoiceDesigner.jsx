import { useState } from "react";
import defaultTemplate from "../templates/defaultTemplate";

import Toolbar from "./Toolbar";
import TemplateRenderer from "./TemplateRenderer";
import PropertiesPanel from "./PropertiesPanel";

const InvoiceDesigner = ({ invoiceInfo, items }) => {
  const [pages, setPages] = useState([
    {
      id: 1,
      elements: defaultTemplate,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);

  // ✅ ONLY SOURCE OF TRUTH UPDATE FUNCTION
  const updateTemplate = (newElements) => {
    setPages((prev) =>
      prev.map((page, index) =>
        index === currentPage
          ? {
              ...page,
              elements:
                typeof newElements === "function"
                  ? newElements(page.elements)
                  : newElements,
            }
          : page
      )
    );
  };

  const template = pages[currentPage]?.elements || [];

  return (
    <div className="flex h-screen bg-gray-200">

      <Toolbar
        template={template}
        setTemplate={updateTemplate}
        pages={pages}
        setPages={setPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />

      <TemplateRenderer
        template={template}
        setTemplate={updateTemplate}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        invoiceInfo={invoiceInfo}
        items={items}
      />

      <PropertiesPanel
        template={template}
        updateTemplate={updateTemplate}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
      />

    </div>
  );
};

export default InvoiceDesigner;