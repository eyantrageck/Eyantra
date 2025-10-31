import toast from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#0d9488",
      color: "#fff",
      padding: "12px 16px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#0d9488",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#dc2626",
      color: "#fff",
      padding: "12px 16px",
      fontWeight: 500,
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#dc2626",
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    style: {
      borderRadius: "10px",
      background: "#2563eb",
      color: "#fff",
      padding: "12px 16px",
      fontWeight: 500,
    },
    icon: "ℹ️",
  });
};
