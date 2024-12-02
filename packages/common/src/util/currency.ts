export function formatMoney(cents: number): string {
  const dollars = cents / 100;

  return dollars.toLocaleString("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
