import { useState } from "react";
import { useInvoices } from "../context/InvoiceContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { invoices, deleteInvoice, currency } = useInvoices();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = invoices.filter((inv) => {
    const matchesSearch = inv.clientName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "all" || inv.status === filter;
    return matchesSearch && matchesFilter;
  });

  const total = invoices.reduce((sum, inv) => sum + Number(inv.total), 0);
  const paid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + Number(inv.total), 0);
  const unpaid = invoices
    .filter((inv) => inv.status === "unpaid")
    .reduce((sum, inv) => sum + Number(inv.total), 0);
  const overdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Invoices</p>
            <h2>{invoices.length}</h2>
          </div>
          <div className="stat-card">
            <p>Total Value</p>
            <h2>{currency}{total.toLocaleString()}</h2>
          </div>
          <div className="stat-card green">
            <p>Paid</p>
            <h2>{currency}{paid.toLocaleString()}</h2>
          </div>
          <div className="stat-card red">
            <p>Unpaid</p>
            <h2>{currency}{unpaid.toLocaleString()}</h2>
          </div>
          <div className="stat-card orange">
            <p>Overdue</p>
            <h2>{currency}{overdue.toLocaleString()}</h2>
          </div>
        </div>

        {/* Controls */}
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="Search by client name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="overdue">Overdue</option>
          </select>
          <button
            className="btn-primary"
            onClick={() => navigate('/invoice/new')}
          >
            + New Invoice
          </button>
        </div>

        {/* Invoice Table */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No invoices yet. Create your first one!</p>
          </div>
        ) : (
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.clientName}</td>
                  <td>{currency}{Number(inv.total).toLocaleString()}</td>
                  <td>{inv.date}</td>
                  <td>
                    <span className={`badge badge-${inv.status}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-small"
                      onClick={() => navigate(`/invoice/${inv.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn-small red"
                      onClick={() => deleteInvoice(inv.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;