
const SeverityBadge = ({ severity }) => {
  const getBadgeStyle = () => {
    switch (severity?.toLowerCase()) {
      case "high":
        return {
          backgroundColor: "#dc3545",
          color: "#fff",
        };

      case "medium":
        return {
          backgroundColor: "#ffc107",
          color: "#000",
        };

      case "low":
        return {
          backgroundColor: "#28a745",
          color: "#fff",
        };

      default:
        return {
          backgroundColor: "#6c757d",
          color: "#fff",
        };
    }
  };

  return (
    <span
      style={{
        ...getBadgeStyle(),
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "600",
        display: "inline-block",
        textTransform: "capitalize",
      }}
    >
      {severity}
    </span>
  );
};

export default SeverityBadge;