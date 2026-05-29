
// InvoiceDesigner.jsx

import { useState } from "react";

import defaultTemplate from "../templates/defaultTemplate";

import Toolbar from "./Toolbar";
import TemplateRenderer from "./TemplateRenderer";
import PropertiesPanel from "./PropertiesPanel";

const InvoiceDesigner = ({
  invoiceInfo,
  items,
}) => {

  // =========================================
  // PAGES
  // =========================================

  const [pages, setPages] = useState([
    {
      id: 1,
      elements: defaultTemplate,
    },
  ]);

  // =========================================
  // CURRENT PAGE
  // =========================================

  const [currentPage, setCurrentPage] =
    useState(0);

  // =========================================
  // SELECTED ELEMENT
  // =========================================

  const [selectedElement, setSelectedElement] =
    useState(null);

  // =========================================
  // CURRENT TEMPLATE
  // =========================================

  const template =
    pages[currentPage].elements;

  // =========================================
  // UPDATE TEMPLATE
  // =========================================

  const updateTemplate = (newTemplate) => {

    const updatedPages = [...pages];

    updatedPages[currentPage].elements =
      newTemplate;

    setPages(updatedPages);
  };

  return (
    <div className="flex h-screen bg-gray-200">

      {/* ========================================= */}
      {/* LEFT TOOLBAR */}
      {/* ========================================= */}

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

      {/* ========================================= */}
      {/* CENTER DESIGNER */}
      {/* ========================================= */}

      <TemplateRenderer
        template={template}
        setTemplate={updateTemplate}

        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}

        invoiceInfo={invoiceInfo}
        items={items}
      />

      {/* ========================================= */}
      {/* RIGHT PROPERTIES */}
      {/* ========================================= */}
   

   
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
