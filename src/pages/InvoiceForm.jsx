import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useInvoices } from "../context/InvoiceContext";
import Navbar from "../components/Navbar";

function InvoiceForm() {
  const { addInvoice, updateInvoice, invoices, currency } = useInvoices();
  const navigate = useNavigate();
  const { id } = useParams();
  const existingInvoice = invoices.find((inv) => inv.id === id);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);

  useEffect(() => {
    if (existingInvoice) {
      setClientName(existingInvoice.clientName);
      setClientEmail(existingInvoice.clientEmail);
      setDate(existingInvoice.date);
      setDueDate(existingInvoice.dueDate);
      setStatus(existingInvoice.status);
      setItems(existingInvoice.items);
    }
  }, [existingInvoice]);

  function handleItemChange(index, field, value) {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  const total = items.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.price);
  }, 0);

  function handleSubmit(e) {
    e.preventDefault();

    const invoice = {
      id: existingInvoice ? existingInvoice.id : uuidv4(),
      clientName,
      clientEmail,
      date,
      dueDate,
      status,
      items,
      total,
    };

    if (existingInvoice) {
      updateInvoice(existingInvoice.id, invoice);
    } else {
      addInvoice(invoice);
    }

    navigate("/dashboard");
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>{existingInvoice ? "Edit Invoice" : "Create New Invoice"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Client Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Email</label>
                <input
                  type="email"
                  placeholder="Enter client email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Invoice Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Invoice Items</h3>

            {items.map((item, index) => (
              <div key={index} className="item-row">
                <div className="form-group flex-3">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Price ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Subtotal</label>
                  <p className="subtotal">
                    {currency}{(item.quantity * item.price).toLocaleString()}
                  </p>
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeItem(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="btn-add-item" onClick={addItem}>
              + Add Item
            </button>
          </div>

          <div className="form-total">
            <span>Total</span>
            <h2>{currency}{total.toLocaleString()}</h2>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {existingInvoice ? "Update Invoice" : "Save Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;