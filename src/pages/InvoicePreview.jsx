import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../context/InvoiceContext";
import Navbar from "../components/Navbar";
import html2pdf from "html2pdf.js";
import emailjs from "@emailjs/browser";

function InvoicePreview() {
  const { id } = useParams();
  const { invoices, currency } = useInvoices();
  const navigate = useNavigate();
  const invoice = invoices.find((inv) => inv.id === id);
  const settings = JSON.parse(localStorage.getItem("businessSettings") || "{}");

  if (!invoice) {
    return (
      <div>
        <Navbar />
        <div className="form-container">
          <h2>Invoice not found</h2>
          <button
            className="btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  function handleDownload() {
    const element = document.getElementById("invoice-preview");
    const options = {
      margin: 10,
      filename: `invoice-${invoice.clientName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  }

  function handleSendEmail() {
    emailjs.init("4EyvQwlkbe2HVu-Xu");
    const templateParams = {
      client_name: invoice.clientName,
      client_email: invoice.clientEmail,
      invoice_id: invoice.id.slice(0, 8).toUpperCase(),
      invoice_date: invoice.date,
      due_date: invoice.dueDate,
      total: `${currency}${Number(invoice.total).toLocaleString()}`,
      status: invoice.status,
    };

    emailjs
      .send(
        "service_h6rhfaq",
        "template_tjv4ib7",
        templateParams,
        "4EyvQwlkbe2HVu-Xu",
      )
      .then(() => {
        alert("Invoice sent to " + invoice.clientEmail);
      })
      .catch((error) => {
        alert("Failed to send email: " + JSON.stringify(error));
      });
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        {/* Header */}
        <div className="preview-header">
          <div>
            <h2>Invoice</h2>
            <p className="preview-id">
              #{invoice.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <div className="preview-actions">
            <button
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              ← Back
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate(`/invoice/edit/${invoice.id}`)}
            >
              Edit
            </button>
            <button className="btn-primary" onClick={handleDownload}>
              Download PDF
            </button>
            <button className="btn-primary" onClick={handleSendEmail}>
              Send to Client
            </button>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="preview-box" id="invoice-preview">
          <div className="preview-section">
            {/* Business Header */}
            <div className="invoice-business-header">
              {settings.logo && (
                <img
                  src={settings.logo}
                  alt="Business Logo"
                  className="invoice-logo"
                />
              )}
              <div className="invoice-business-info">
                {settings.businessName && <h3>{settings.businessName}</h3>}
                {settings.businessEmail && <p>{settings.businessEmail}</p>}
                {settings.businessPhone && <p>{settings.businessPhone}</p>}
                {settings.businessAddress && <p>{settings.businessAddress}</p>}
              </div>
            </div>
            <div className="preview-row">
              <div>
                <p className="preview-label">Client Name</p>
                <p className="preview-value">{invoice.clientName}</p>
              </div>
              <div>
                <p className="preview-label">Client Email</p>
                <p className="preview-value">{invoice.clientEmail}</p>
              </div>
              <div>
                <p className="preview-label">Status</p>
                <span className={`badge badge-${invoice.status}`}>
                  {invoice.status}
                </span>
              </div>
            </div>

            <div className="preview-row">
              <div>
                <p className="preview-label">Invoice Date</p>
                <p className="preview-value">{invoice.date}</p>
              </div>
              <div>
                <p className="preview-label">Due Date</p>
                <p className="preview-value">{invoice.dueDate}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {currency}
                    {Number(item.price).toLocaleString()}
                  </td>
                  <td>
                    {currency}
                    {(item.quantity * item.price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="preview-total">
            <span>Total</span>
            <h2>
              {currency}
              {Number(invoice.total).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
