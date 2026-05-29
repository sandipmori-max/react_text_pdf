const PropertiesPanel = ({
   template,
  updateTemplate,
  selectedElement,
  setSelectedElement,
}) => {

  if (!selectedElement) {
    return (
      <div className="w-72 bg-white p-4">
        Select Element
      </div>
    );
  }

 const updateField = (field, value) => {

  const updated = template.map((item) => {

    if (item.id === selectedElement.id) {

      return {
        ...item,
        [field]: value,
      };

    }

    return item;
  });

  updateTemplate(updated);

  // =====================================
  // UPDATE SELECTED ELEMENT ALSO
  // =====================================

  setSelectedElement({
    ...selectedElement,
    [field]: value,
  });
};

  return (
    <div className="w-72 overflow-auto bg-white p-4">

      <h2 className="mb-4 text-xl font-bold">
        Properties
      </h2>

      {(selectedElement.type === "text" ||
        selectedElement.type === "dynamicText") && (
        <>

          {selectedElement.type === "text" && (
            <div className="mb-4">

              <label className="block">
                Text
              </label>

              <input
                value={selectedElement.text}
                onChange={(e) =>
                  updateField(
                    "text",
                    e.target.value
                  )
                }
                className="w-full border p-2"
              />

            </div>
          )}

          <div className="mb-4">

            <label className="block">
              Font Size
            </label>

            <input
              type="number"
              value={selectedElement.fontSize}
              onChange={(e) =>
                updateField(
                  "fontSize",
                  Number(e.target.value)
                )
              }
              className="w-full border p-2"
            />
{/* ===================================== */}
{/* FONT WEIGHT */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Font Weight
  </label>

  <select
    value={selectedElement.fontWeight}
    onChange={(e) =>
      updateField(
        "fontWeight",
        e.target.value
      )
    }
    className="w-full border p-2"
  >

    <option value="normal">
      Normal
    </option>

    <option value="bold">
      Bold
    </option>

  </select>

</div>

{/* ===================================== */}
{/* FONT STYLE */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Font Style
  </label>

  <select
    value={selectedElement.fontStyle}
    onChange={(e) =>
      updateField(
        "fontStyle",
        e.target.value
      )
    }
    className="w-full border p-2"
  >

    <option value="normal">
      Normal
    </option>

    <option value="italic">
      Italic
    </option>

  </select>

</div>

{/* ===================================== */}
{/* UNDERLINE */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Underline
  </label>

  <select
    value={
      selectedElement.textDecoration
    }
    onChange={(e) =>
      updateField(
        "textDecoration",
        e.target.value
      )
    }
    className="w-full border p-2"
  >

    <option value="none">
      None
    </option>

    <option value="underline">
      Underline
    </option>

  </select>

</div>

{/* ===================================== */}
{/* TEXT ALIGN */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Text Align
  </label>

  <select
    value={selectedElement.textAlign}
    onChange={(e) =>
      updateField(
        "textAlign",
        e.target.value
      )
    }
    className="w-full border p-2"
  >

    <option value="left">
      Left
    </option>

    <option value="center">
      Center
    </option>

    <option value="right">
      Right
    </option>

  </select>

</div>

{/* ===================================== */}
{/* FONT FAMILY */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Font Family
  </label>

  <select
    value={selectedElement.fontFamily}
    onChange={(e) =>
      updateField(
        "fontFamily",
        e.target.value
      )
    }
    className="w-full border p-2"
  >

    <option value="Arial">
      Arial
    </option>

    <option value="Times New Roman">
      Times New Roman
    </option>

    <option value="Courier New">
      Courier New
    </option>

    <option value="Verdana">
      Verdana
    </option>

  </select>

</div>

{/* ===================================== */}
{/* TEXT COLOR */}
{/* ===================================== */}

<div className="mb-4">

  <label className="mb-1 block">
    Text Color
  </label>

  <input
    type="color"
    value={selectedElement.color}
    onChange={(e) =>
      updateField(
        "color",
        e.target.value
      )
    }
    className="h-12 w-full border p-1"
  />

</div>
          </div>

        </>
      )}

      {selectedElement.type === "image" && (
        <div>

          <label className="block">
            Image URL
          </label>

          <input
            value={selectedElement.src}
            onChange={(e) =>
              updateField(
                "src",
                e.target.value
              )
            }
            className="w-full border p-2"
          />

        </div>
      )}
{selectedElement?.type === "line" && (

  <>

    <div className="mb-4">

      <label className="block">
        Color
      </label>

      <input
        type="color"
        value={selectedElement.color}
        onChange={(e) =>
          updateField(
            "color",
            e.target.value
          )
        }
      />

    </div>

  </>

)}
    </div>
  );
};

export default PropertiesPanel;