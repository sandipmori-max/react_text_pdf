import { Rnd } from "react-rnd";

const DraggableElement = ({
    element,
    template,
    setTemplate,
    selectedElement,
    setSelectedElement,
    invoiceInfo,
    items,
}) => {

    const updateElement = (newProps) => {

        const updated = template.map((item) => {

            if (item.id === element.id) {
                return {
                    ...item,
                    ...newProps,
                };
            }

            return item;
        });

        setTemplate(updated);
    };

    return (
        <Rnd
            size={{
                width: element.width,
                height: element.height || "auto",
            }}
            position={{
                x: element.x,
                y: element.y,
            }}
            bounds="parent"
            onClick={() => setSelectedElement(element)}
            onDragStop={(e, d) => {

                updateElement({
                    x: d.x,
                    y: d.y,
                });

            }}
            onResizeStop={(
                e,
                direction,
                ref,
                delta,
                position
            ) => {

                updateElement({
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                });

            }}
        >
            <div
                className={`h-full w-full ${selectedElement?.id === element.id
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
            >

                {/* TEXT */}

                {element.type === "text" && (

                    <textarea
                        value={element.text}
                        onChange={(e) => {

                            const updated = template.map((item) => {

                                if (item.id === element.id) {

                                    return {
                                        ...item,
                                        text: e.target.value,
                                    };

                                }

                                return item;
                            });

                            setTemplate(updated);

                        }}
                        className="
                                h-full
                                w-full
                                resize-none
                                overflow-hidden
                                border-none
                                bg-transparent
                                outline-none
                                "
                        style={{
  fontSize: element.fontSize,

  fontWeight: element.fontWeight,

  fontStyle: element.fontStyle,

  textDecoration:
    element.textDecoration,

  textAlign: element.textAlign,

  fontFamily: element.fontFamily,

  color: element.color,
}}
                    />

                )}

                {/* DYNAMIC */}

                {element.type === "dynamicText" && (

                    <div
                        style={{
                            fontSize: element.fontSize,
                            fontWeight: element.fontWeight,
                        }}
                    >
                        <b>{element.label}:</b>{" "}
                        {invoiceInfo[element.field]}
                    </div>

                )}

                {/* IMAGE */}

                {element.type === "image" && (

                    <img
                        src={element.src}
                        alt=""
                        className="h-full w-full object-contain"
                    />

                )}

                {/* TABLE */}

                {element.type === "table" && (

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="border p-2">
                                    Item
                                </th>

                                <th className="border p-2">
                                    Qty
                                </th>

                                <th className="border p-2">
                                    Price
                                </th>

                                <th className="border p-2">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {items.map((item) => (

                                <tr key={item.id}>

                                    <td className="border p-2">
                                        {item.name}
                                    </td>

                                    <td className="border p-2">
                                        {item.qty}
                                    </td>

                                    <td className="border p-2">
                                        {item.price}
                                    </td>

                                    <td className="border p-2">
                                        {item.price * item.qty}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

{element.type === "customTable" && (

  <div className="h-full w-full overflow-auto bg-white">

    <table className="w-full border-collapse">

      {/* ========================= */}
      {/* TABLE HEADER */}
      {/* ========================= */}

      <thead>

        <tr>

          {element.columns.map((column) => (

            <th
              key={column.id}
              className="
                border
                border-gray-400
                bg-gray-100
                p-2
              "
            >

              <input
                value={column.title}
                onMouseDown={(e) =>
                  e.stopPropagation()
                }
                onChange={(e) => {

                  const updated = template.map(
                    (item) => {

                      if (
                        item.id === element.id
                      ) {

                        return {
                          ...item,

                          columns:
                            item.columns.map(
                              (col) => {

                                if (
                                  col.id ===
                                  column.id
                                ) {

                                  return {
                                    ...col,

                                    title:
                                      e.target
                                        .value,
                                  };

                                }

                                return col;
                              }
                            ),
                        };

                      }

                      return item;
                    }
                  );

                  setTemplate(updated);

                }}
                className="
                  w-full
                  border-none
                  bg-transparent
                  text-center
                  font-bold
                  outline-none
                "
              />

            </th>

          ))}

        </tr>

      </thead>

      {/* ========================= */}
      {/* TABLE BODY */}
      {/* ========================= */}

      <tbody>

        {element.rows.map(
          (row, rowIndex) => (

            <tr key={rowIndex}>

              {element.columns.map(
                (column) => (

                  <td
                    key={column.id}
                    className="
                      border
                      border-gray-300
                      p-2
                    "
                  >

                    <input
                      value={
                        row[column.field]
                      }
                      onMouseDown={(e) =>
                        e.stopPropagation()
                      }
                      onChange={(e) => {

                        const updated =
                          template.map(
                            (item) => {

                              if (
                                item.id ===
                                element.id
                              ) {

                                const newRows =
                                  [
                                    ...item.rows,
                                  ];

                                newRows[
                                  rowIndex
                                ][
                                  column.field
                                ] =
                                  e.target
                                    .value;

                                return {
                                  ...item,

                                  rows:
                                    newRows,
                                };

                              }

                              return item;
                            }
                          );

                        setTemplate(
                          updated
                        );

                      }}
                      className="
                        w-full
                        border-none
                        outline-none
                      "
                    />

                  </td>

                )
              )}

            </tr>

          )
        )}

      </tbody>

    </table>

  </div>

)}

{element.type === "line" && (

  <div
    className="
      relative
      flex
      items-center
      justify-center
      h-full
      w-full
      cursor-move
    "
  >

    {element.direction === "horizontal" && (

      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: element.color,
        }}
      />

    )}

    {element.direction === "vertical" && (

      <div
        style={{
          width: "2px",
          height: "100%",
          backgroundColor: element.color,
        }}
      />

    )}

  </div>

)}

            </div>
        </Rnd>
    );
};

export default DraggableElement;