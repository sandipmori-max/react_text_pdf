// TemplateRenderer.jsx

import DraggableElement from "./DraggableElement";

const PAGE_WIDTH = 600;
const PAGE_HEIGHT = 850;

const TemplateRenderer = ({
  template,
  setTemplate,
  selectedElement,
  setSelectedElement,
  invoiceInfo,
  items,
}) => {

  // =========================================
  // CREATE PAGES
  // =========================================

  const generatedPages = [];

  // =========================================
  // LOOP ELEMENTS
  // =========================================

  template.forEach((element) => {

    // =====================================
    // NORMAL ELEMENTS
    // =====================================

    if (element.type !== "customTable") {

      generatedPages.push({
        page: 0,
        element,
      });

      return;
    }

    // =====================================
    // TABLE PAGINATION
    // =====================================

    const HEADER_HEIGHT = 50;

    const ROW_HEIGHT = 45;

    const remainingHeight =
      PAGE_HEIGHT - element.y - HEADER_HEIGHT;

    const rowsPerPage =
      Math.max(
        1,
        Math.floor(
          remainingHeight / ROW_HEIGHT
        )
      );

    // =====================================
    // SPLIT ROWS
    // =====================================

    const splitRows = [];

    for (
      let i = 0;
      i < element.rows.length;
      i += rowsPerPage
    ) {

      splitRows.push(
        element.rows.slice(
          i,
          i + rowsPerPage
        )
      );
    }

    // =====================================
    // CREATE TABLE PARTS
    // =====================================

    splitRows.forEach(
      (rowsChunk, index) => {

        generatedPages.push({
          page: index,

          element: {
            ...element,

             

            rows: rowsChunk,

            y:
              index === 0
                ? element.y
                : 40,

            height:
              HEADER_HEIGHT +
              rowsChunk.length *
                ROW_HEIGHT,
          },
        });

      }
    );
  });

  // =========================================
  // GROUP BY PAGE
  // =========================================

  const pagesMap = {};

  generatedPages.forEach((item) => {

    if (!pagesMap[item.page]) {

      pagesMap[item.page] = [];

    }

    pagesMap[item.page].push(
      item.element
    );
  });

  const pages =
    Object.values(pagesMap);

  return (
    <div className="flex-1 overflow-auto bg-gray-300 p-10">

      <div className="space-y-10">

        {pages.map(
          (pageElements, pageIndex) => (

            <div
              key={pageIndex}
              className="
                relative
                mx-auto
                bg-white
                shadow-2xl
              "
              style={{
                width: PAGE_WIDTH,
                minHeight: PAGE_HEIGHT,
              }}
            >

              {/* ===================== */}
              {/* PAGE LABEL */}
              {/* ===================== */}

              <div
                className="
                  absolute
                  right-2
                  top-2
                  text-xs
                  text-gray-400
                "
              >
                Page {pageIndex + 1}
              </div>

              {/* ===================== */}
              {/* ELEMENTS */}
              {/* ===================== */}

              {pageElements.map(
                (element) => (

                  <DraggableElement
                    key={element.id}
                    element={element}
                    template={template}
                    setTemplate={
                      setTemplate
                    }
                    selectedElement={
                      selectedElement
                    }
                    setSelectedElement={
                      setSelectedElement
                    }
                    invoiceInfo={
                      invoiceInfo
                    }
                    items={items}
                  />

                )
              )}

            </div>

          )
        )}

      </div>

    </div>
  );
};

export default TemplateRenderer;
