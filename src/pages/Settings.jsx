import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Settings() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [logo, setLogo] = useState(null);
  const [currency, setCurrency] = useState("₦");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = JSON.parse(
      localStorage.getItem("businessSettings") || "{}",
    );
    if (settings.businessName) setBusinessName(settings.businessName);
    if (settings.businessEmail) setBusinessEmail(settings.businessEmail);
    if (settings.businessPhone) setBusinessPhone(settings.businessPhone);
    if (settings.businessAddress) setBusinessAddress(settings.businessAddress);
    if (settings.logo) setLogo(settings.logo);
    if (settings.currency) setCurrency(settings.currency);
  }, []);

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSave(e) {
    e.preventDefault();
    const settings = {
      businessName,
      businessEmail,
      businessPhone,
      businessAddress,
      logo,
      currency,
    };
    localStorage.setItem("businessSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Business Settings</h2>

        <form onSubmit={handleSave}>
          <div className="form-section">
            <h3>Business Information</h3>

            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <label>Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="₦">₦ — Nigerian Naira</option>
                <option value="$">$ — US Dollar</option>
                <option value="£">£ — British Pound</option>
                <option value="€">€ — Euro</option>
                <option value="GH₵">GH₵ — Ghanaian Cedi</option>
                <option value="KSh">KSh — Kenyan Shilling</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Business Email</label>
                <input
                  type="email"
                  placeholder="Enter business email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Business Address</label>
              <input
                type="text"
                placeholder="Enter business address"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Business Logo</h3>
            {logo && (
              <img
                src={logo}
                alt="Business Logo"
                style={{
                  width: "120px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                }}
              />
            )}
            <div className="form-group">
              <label>Upload Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </div>
          </div>

          {saved && (
            <p
              style={{
                color: "#38a169",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              ✓ Settings saved successfully
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
