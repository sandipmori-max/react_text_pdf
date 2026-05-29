import { uid } from "uid";

const Toolbar = ({
  template,
  setTemplate,

  pages,
  setPages,

  currentPage,
  setCurrentPage,

  selectedElement,
  setSelectedElement,
}) => {

  // =========================================
  // ADD TEXT
  // =========================================

  const addPage = () => {

  setPages((prev) => [

    ...prev,

    {
      id: Date.now(),
      elements: [],
    },

  ]);
};

const addDynamicTable = () => {

  setTemplate([
    ...template,

    {
      id: uid(),

      type: "dynamicTable",

      x: 50,
      y: 250,

      width: 500,
      height: 300,

      dataSource: "items",

      columns: [
        {
          key: "name",
          label: "Item",
        },
        {
          key: "qty",
          label: "Qty",
        },
        {
          key: "price",
          label: "Price",
        },
        {
  key: "amount",
  label: "Amount",
  formula: "qty * price"
}
      ],
    },
  ]);
};


  const addText = () => {

    setTemplate([
      ...template,
      {
  id: uid(),

  type: "text",

  text: "New Text",

  x: 100,
  y: 100,

  width: 220,
  height: 60,

  fontSize: 20,

  fontWeight: "normal",

  fontStyle: "normal",

  textDecoration: "none",

  textAlign: "left",

  fontFamily: "Arial",

  color: "#000000",
}
    ]);
  };

  // =========================================
  // ADD IMAGE
  // =========================================

  const addImage = () => {

    const src = prompt("Enter Image URL");

    if (!src) return;

    setTemplate([
      ...template,
      {
        id: uid(),

        type: "image",

        src,

        x: 100,
        y: 100,

        width: 150,
        height: 150,
      },
    ]);
  };

  // =========================================
  // ADD DYNAMIC TABLE
  // =========================================

  const addTable = () => {

    // =========================
    // TAKE INPUT
    // =========================

    const rowCount = Number(
      prompt("Enter Number Of Rows", 2)
    );

    const columnCount = Number(
      prompt("Enter Number Of Columns", 2)
    );

    // =========================
    // VALIDATION
    // =========================

    if (
      !rowCount ||
      !columnCount ||
      rowCount <= 0 ||
      columnCount <= 0
    ) {

      alert("Invalid Rows / Columns");

      return;
    }

    // =========================
    // CREATE COLUMNS
    // =========================

    const columns = [];

    for (let i = 1; i <= columnCount; i++) {

      columns.push({
        id: uid(),

        title: `Column ${i}`,

        field: `col${i}`,
      });

    }

    // =========================
    // CREATE ROWS
    // =========================

    const rows = [];

    for (let r = 0; r < rowCount; r++) {

      const row = {};

      columns.forEach((column) => {

        row[column.field] = "";

      });

      rows.push(row);
    }

    // =========================
    // ADD TABLE
    // =========================

    setTemplate([
      ...template,
      {
        id: uid(),

        type: "customTable",

        x: 100,
        y: 250,

        width: 700,
        height: 300,

        columns,
        rows,
      },
    ]);
  };

  // =========================================
  // ADD ROW
  // =========================================

  const addRow = () => {

    if (
      !selectedElement ||
      selectedElement.type !== "customTable"
    ) {
      return;
    }

    const newRow = {};

    selectedElement.columns.forEach((column) => {

      newRow[column.field] = "";

    });

    const updated = template.map((item) => {

      if (item.id === selectedElement.id) {

        return {
          ...item,

          rows: [
            ...item.rows,
            newRow,
          ],
        };

      }

      return item;
    });

    setTemplate(updated);
  };

  // =========================================
  // ADD COLUMN
  // =========================================

  const addColumn = () => {

    if (
      !selectedElement ||
      selectedElement.type !== "customTable"
    ) {
      return;
    }

    const nextColumnNumber =
      selectedElement.columns.length + 1;

    const fieldName =
      `col${nextColumnNumber}`;

    const newColumn = {
      id: uid(),

      title: `Column ${nextColumnNumber}`,

      field: fieldName,
    };

    const updated = template.map((item) => {

      if (item.id === selectedElement.id) {

        // =========================
        // UPDATE ROWS
        // =========================

        const updatedRows = item.rows.map((row) => ({
          ...row,

          [fieldName]: "",
        }));

        return {
          ...item,

          columns: [
            ...item.columns,
            newColumn,
          ],

          rows: updatedRows,
        };

      }

      return item;
    });

    setTemplate(updated);
  };

  // =========================================
  // DELETE SELECTED ELEMENT
  // =========================================

  const deleteSelectedElement = () => {

    if (!selectedElement) return;

    const filtered = template.filter(
      (item) => item.id !== selectedElement.id
    );

    setTemplate(filtered);

    setSelectedElement(null);
  };

  // =========================================
  // DUPLICATE ELEMENT
  // =========================================

  const duplicateElement = () => {

    if (!selectedElement) return;

    const duplicatedElement = {

      ...selectedElement,

      id: uid(),

      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
    };

    setTemplate([
      ...template,
      duplicatedElement,
    ]);
  };

  // =========================================
  // SAVE TEMPLATE
  // =========================================

  const saveTemplate = () => {

    localStorage.setItem(
      "invoiceTemplate",
      JSON.stringify(template)
    );

    alert("Template Saved Successfully");
  };

  // =========================================
  // LOAD TEMPLATE
  // =========================================

  const loadTemplate = () => {

    const savedTemplate =
      localStorage.getItem("invoiceTemplate");

    if (!savedTemplate) {

      alert("No Saved Template Found");

      return;
    }

    setTemplate(
      JSON.parse(savedTemplate)
    );

    alert("Template Loaded Successfully");
  };

  const addHorizontalLine = () => {

  setTemplate([
    ...template,
    {
      id: uid(),

      type: "line",

      direction: "horizontal",

      x: 100,
      y: 100,

      width: 300,
      height: 2,

      color: "#000000",
    },
  ]);
};

const addVerticalLine = () => {

  setTemplate([
    ...template,
    {
      id: uid(),

      type: "line",

      direction: "vertical",

      x: 100,
      y: 100,

      width: 2,
      height: 200,

      color: "#000000",
    },
  ]);
};

  return (
    <div
      className="
        h-full
        w-64
        overflow-y-auto
        bg-white
        p-4
        shadow-lg
      "
    >

      {/* ========================================= */}
      {/* TITLE */}
      {/* ========================================= */}

      <h2
        className="
          mb-5
          text-2xl
          font-bold
        "
      >
        Toolbar
      </h2>

      <div className="space-y-3">

        {/* ========================================= */}
        {/* ADD TEXT */}
        {/* ========================================= */}

<button
  onClick={addPage}
  className="
    w-full
    rounded
    bg-cyan-600
    py-2
    text-white
  "
>
  Add Page
</button>

<button
  onClick={addDynamicTable}
  className="
    w-full
    rounded
    bg-violet-600
    py-2
    text-white
  "
>
  Add Dynamic Table
</button>

        <button
          onClick={addText}
          className="
            w-full
            rounded
            bg-blue-500
            py-2
            text-white
          "
        >
          Add Text
        </button>

        <button
  onClick={addHorizontalLine}
  className="
    w-full
    rounded
    bg-indigo-500
    py-2
    text-white
  "
>
  Add Horizontal Line
</button>

<button
  onClick={addVerticalLine}
  className="
    w-full
    rounded
    bg-teal-500
    py-2
    text-white
  "
>
  Add Vertical Line
</button>

        {/* ========================================= */}
        {/* ADD IMAGE */}
        {/* ========================================= */}

        <button
          onClick={addImage}
          className="
            w-full
            rounded
            bg-green-500
            py-2
            text-white
          "
        >
          Add Image
        </button>

        {/* ========================================= */}
        {/* ADD TABLE */}
        {/* ========================================= */}

        <button
          onClick={addTable}
          className="
            w-full
            rounded
            bg-purple-500
            py-2
            text-white
          "
        >
          Add Table
        </button>

        {/* ========================================= */}
        {/* TABLE CONTROLS */}
        {/* ========================================= */}

        {selectedElement?.type === "customTable" && (
          <>

            <button
              onClick={addRow}
              className="
                w-full
                rounded
                bg-orange-500
                py-2
                text-white
              "
            >
              Add Row
            </button>

            <button
              onClick={addColumn}
              className="
                w-full
                rounded
                bg-pink-500
                py-2
                text-white
              "
            >
              Add Column
            </button>

          </>
        )}

        {/* ========================================= */}
        {/* DUPLICATE */}
        {/* ========================================= */}

        <button
          onClick={duplicateElement}
          disabled={!selectedElement}
          className="
            w-full
            rounded
            bg-yellow-500
            py-2
            text-white
            disabled:opacity-50
          "
        >
          Duplicate Selected
        </button>

        {/* ========================================= */}
        {/* DELETE */}
        {/* ========================================= */}

        <button
          onClick={deleteSelectedElement}
          disabled={!selectedElement}
          className="
            w-full
            rounded
            bg-red-500
            py-2
            text-white
            disabled:opacity-50
          "
        >
          Delete Selected
        </button>

        {/* ========================================= */}
        {/* SAVE */}
        {/* ========================================= */}

        <button
          onClick={saveTemplate}
          className="
            w-full
            rounded
            bg-black
            py-2
            text-white
          "
        >
          Save Template
        </button>

        {/* ========================================= */}
        {/* LOAD */}
        {/* ========================================= */}

        <button
          onClick={loadTemplate}
          className="
            w-full
            rounded
            bg-gray-700
            py-2
            text-white
          "
        >
          Load Template
        </button>
<div className="space-y-2">

  {pages.map((page, index) => (

    <button
      key={page.id}
      onClick={() =>
        setCurrentPage(index)
      }
      className={`
        w-full
        rounded
        py-2
        text-white

        ${
          currentPage === index
            ? "bg-blue-600"
            : "bg-gray-500"
        }
      `}
    >
      Page {index + 1}
    </button>

  ))}

</div>
      </div>

    </div>
  );
};

export default Toolbar;