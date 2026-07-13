

import { useState } from "react";
import SearchForm from "../components/SearchForm";
import ScanTable from "../components/ScanTable";
import Loader from "../components/Loader";
import { scanRepository } from "../api/scannerApi";
import exportPdf from "../services/exportPdf";

function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const scanUser = async (username) => {
    try {
      setLoading(true);

      const result = await scanRepository(username);

      console.log("result _________", result);
      console.log("result issues into this data", result.data.issues.length);

      setIssues(result.data.issues || []);
    } catch (error) {
      console.error(error);
      alert("Scan Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            GitHub Repository Scanner
          </h1>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          <SearchForm onSearch={scanUser} />
        </div>

        {loading && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              marginBottom: "24px",
            }}
          >
            <Loader />
          </div>
        )}

        {issues.length > 0 && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#0f172a",
                  fontSize: "1.25rem",
                }}
              >
                Scan Results
              </h2>

              <button
                onClick={() => exportPdf(issues)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.3s",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "#1d4ed8")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "#2563eb")
                }
              >
                 Export PDF
              </button>
            </div>

            <ScanTable issues={issues} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;