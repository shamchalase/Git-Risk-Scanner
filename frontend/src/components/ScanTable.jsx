import SeverityBadge from "./SeverityBadge";

function ScanTable({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#666",
        }}
      >
        No issues found.
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#24292e",
              color: "#fff",
            }}
          >
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                color:"black"
              }}
            >
              Repository
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
                color:"black"
              }}
            >
              Issue
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                color:"black"
              }}
            >
              Severity
            </th>
          </tr>
        </thead>

        <tbody>
          {issues.map((item, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <td
                style={{
                  padding: "12px",
                }}
              >
                {item.repository}
              </td>

              <td
                style={{
                  padding: "12px",
                }}
              >
                {item.issue}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <SeverityBadge severity={item.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScanTable;