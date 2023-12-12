export const idrFormater = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const dateFormater = (inputDate) => {
  const date = new Date(inputDate);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate.replace(/\//g, "-").replace(",", ", ");
};
