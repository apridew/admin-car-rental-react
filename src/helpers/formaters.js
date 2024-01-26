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

export const categoryTextFormater = (category) => {
  let categoryText = "";
  if (category === "small") {
    categoryText = "2 - 4 people";
  } else if (category === "medium") {
    categoryText = "4 - 6 people";
  } else if (category === "large") {
    categoryText = "6 - 8 people";
  } else {
    categoryText = "Undefined";
  }
  return categoryText;
};

export const scrollTop = () => {
  return window.scrollTo(0, 0);
};
