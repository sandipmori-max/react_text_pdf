const defaultTemplate = [
  {
    id: "title",
    type: "text",
    text: "INVOICE",
    x: 240,
    y: 30,
    width: 200,
    height: 40,
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },

  {
    id: "shopName",
    type: "text",
    text: "MY SHOP",
    x: 20,
    y: 20,
    width: 200,
    height: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },

  {
    id: "customer",
    type: "dynamicText",
    field: "customerName",
    label: "Customer",
    x: 20,
    y: 100,
    width: 250,
    height: 30,
    fontSize: 16,
  },

  {
    id: "invoiceNo",
    type: "dynamicText",
    field: "invoiceNumber",
    label: "Invoice No",
    x: 20,
    y: 140,
    width: 250,
    height: 30,
    fontSize: 16,
  },

  {
    id: "cashier",
    type: "dynamicText",
    field: "cashierName",
    label: "Cashier",
    x: 20,
    y: 180,
    width: 250,
    height: 30,
    fontSize: 16,
  },

  {
    id: "logo",
    type: "image",
    src: "https://dummyimage.com/120x80/000/fff",
    x: 450,
    y: 20,
    width: 120,
    height: 80,
  },

  {
    id: "table",
    type: "table",
    x: 20,
    y: 260,
    width: 550,
  },

  {
    id: "total",
    type: "dynamicText",
    field: "total",
    label: "Total",
    x: 400,
    y: 650,
    width: 200,
    height: 30,
    fontSize: 22,
    fontWeight: "bold",
  },
];

export default defaultTemplate;