import { useState } from "react";

export default function IPOFrontOfficeApp() {
  const [activeTab, setActiveTab] = useState(1);
  const [nationalId, setNationalId] = useState("");
  const [clientName, setClientName] = useState("");
  const [showClientPanel, setShowClientPanel] = useState(false);
  const [clientData, setClientData] = useState({
    idExpireDate: "",
    unifiedCode: "",
    dob: "",
    age: "",
    eligibleQuantity: "",
    idStatus: "",
  });

  const tabs = [
    "Client Identification",
    "Subscription Entry",
    "Document Upload",
    "Transaction Summary",
  ];

  const sectionStyle = "bg-white rounded-3xl shadow-md p-6";
  const inputStyle = "w-full border rounded-xl p-3 mt-2";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            IPO & Capital Increase Subscription Module
          </h1>
          <p className="text-gray-600">
            Front Office / Customer Service Workflow UI
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 mb-6">
          <div className="relative flex items-center justify-between mb-6 overflow-x-auto">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

            {tabs.map((tab, index) => (
              <div
                key={tab}
                className="relative z-10 flex flex-col items-center min-w-[160px]"
              >
                <button
                  onClick={() => setActiveTab(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-4 ${
                    activeTab === index + 1
                      ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-lg"
                      : activeTab > index + 1
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </button>

                <span
                  className={`mt-3 text-sm font-medium text-center transition ${
                    activeTab === index + 1 ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  {tab}
                </span>
              </div>
            ))}
          </div>
        </div>

        {activeTab === 1 && (
          <div className={sectionStyle}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Client Identification & Subscription Selection
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* National ID Input */}
              <div>
                <label className={labelStyle}>National ID / CR Number</label>
                <input
                  type="text"
                  placeholder="Enter 14-digit National ID"
                  className={inputStyle}
                  value={nationalId}
                  maxLength={14}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 14) {
                      setNationalId(value);
                    }
                  }}
                  onBlur={() => {
                    if (nationalId === "28512118800318") {
                      const dob = new Date("1985-12-11");
                      const today = new Date();
                      let age = today.getFullYear() - dob.getFullYear();
                      const monthDiff = today.getMonth() - dob.getMonth();

                      if (
                        monthDiff < 0 ||
                        (monthDiff === 0 && today.getDate() < dob.getDate())
                      ) {
                        age--;
                      }

                      setClientName("حسين سليم محمد علي");
                      setShowClientPanel(true);
                      const expireDate = new Date("2028-12-01");
                      const sixMonthsFromToday = new Date();
                      sixMonthsFromToday.setMonth(
                        sixMonthsFromToday.getMonth() + 6
                      );

                      const idStatus =
                        expireDate > sixMonthsFromToday
                          ? "Active"
                          : "Not Active";

                      setClientData({
                        idExpireDate: "01-12-2028",
                        unifiedCode: "8800318",
                        dob: "11-12-1985",
                        age: age.toString(),
                        eligibleQuantity: "15,000",
                        idStatus,
                      });
                    } else {
                      setClientName("");
                      setShowClientPanel(false);
                    }
                  }}
                />
                {nationalId.length === 14 ? (
                  <p className="text-green-600 text-sm mt-2">
                    Valid National ID length
                  </p>
                ) : (
                  <p className="text-red-500 text-sm mt-2">
                    National ID must be exactly 14 digits
                  </p>
                )}
              </div>

              {/* Unified Code Input */}
              <div>
                <label className={labelStyle}>Unified Code (MCDR)</label>
                <input
                  type="text"
                  placeholder="Enter Unified Code"
                  className={inputStyle}
                />
              </div>

              {/* Full Width Client Panel */}
              {showClientPanel && (
                <div className="col-span-1 md:col-span-2 w-full bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-2xl shadow-md p-6 animate-slide-in">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Client Information
                      </p>
                      <h3 className="text-lg font-bold text-blue-700">
                        {clientName}
                      </h3>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                      Eligible Qty: {clientData.eligibleQuantity}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-xl p-4 border">
                      <p className="text-xs text-gray-500 mb-1">
                        ID Expire Date
                      </p>
                      <p className="font-semibold">{clientData.idExpireDate}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                      <p className="text-xs text-gray-500 mb-1">Unified Code</p>
                      <p className="font-semibold">{clientData.unifiedCode}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                      <p className="text-xs text-gray-500 mb-1">DOB</p>
                      <p className="font-semibold">{clientData.dob}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                      <p className="text-xs text-gray-500 mb-1">Age</p>
                      <p className="font-semibold">{clientData.age} Years</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border">
                      <p className="text-xs text-gray-500 mb-1">ID Status</p>
                      <p
                        className={`font-semibold ${
                          clientData.idStatus === "Active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {clientData.idStatus}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Inputs Continue Below */}
              <div>
                <label className={labelStyle}>Client Bank Account</label>
                <select className={inputStyle}>
                  <option>Select Account</option>
                  <option>Current Account - 123456</option>
                  <option>Savings Account - 987654</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Subscription Event</label>
                <select className={inputStyle}>
                  <option>Select Event</option>
                  <option>Sinawy Olive Oil IPO</option>
                  <option>Capital Increase - ABC Holdings</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Client Type</label>
                <select className={inputStyle}>
                  <option>Individual</option>
                  <option>Corporate</option>
                  <option>Representative (POA)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className={sectionStyle}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Subscription Entry (Ektitab)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Subscription Type</label>
                <select className={inputStyle}>
                  <option>Original Shareholder</option>
                  <option>Rights Buyer</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Quantity Requested</label>
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Share Par Value</label>
                <input
                  type="text"
                  value="1.00 EGP"
                  readOnly
                  className={`${inputStyle} bg-gray-100`}
                />
              </div>

              <div>
                <label className={labelStyle}>Issuance Fees (Per Share)</label>
                <input
                  type="text"
                  value="0.25 EGP"
                  readOnly
                  className={`${inputStyle} bg-gray-100`}
                />
              </div>

              <div>
                <label className={labelStyle}>Total Amount Due</label>
                <input
                  type="text"
                  value="12,500 EGP"
                  readOnly
                  className={`${inputStyle} bg-gray-100`}
                />
              </div>

              <div>
                <label className={labelStyle}>Payment Method</label>
                <select className={inputStyle}>
                  <option>Account Block</option>
                  <option>Direct Deposit</option>
                  <option>Incoming Transfer</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className={sectionStyle}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Document Upload
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>National ID Copy</label>
                <input type="file" className={inputStyle} />
              </div>

              <div>
                <label className={labelStyle}>
                  Signed Subscription Request
                </label>
                <input type="file" className={inputStyle} />
              </div>

              <div>
                <label className={labelStyle}>Power of Attorney (POA)</label>
                <input type="file" className={inputStyle} />
              </div>

              <div>
                <label className={labelStyle}>Proof of Payment</label>
                <input type="file" className={inputStyle} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className={sectionStyle}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Transaction Summary & Receipt
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-semibold">IPO-2026-00125</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Blocked Amount</p>
                <p className="font-semibold">12,500 EGP</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-semibold">10,000 Shares</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Approval Status</p>
                <p className="font-semibold text-orange-600">
                  Pending Supervisor Approval
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">
                Legal Disclaimer
              </h3>
              <p className="text-sm text-blue-700">
                This transaction represents a subscription application. Final
                allocation depends on total subscription coverage and issuer
                approval.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:opacity-90 transition">
                Submit Transaction
              </button>

              <button className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow hover:opacity-90 transition">
                Generate Receipt
              </button>

              <button className="bg-gray-800 text-white px-6 py-3 rounded-2xl shadow hover:opacity-90 transition">
                Approval
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
