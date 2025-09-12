function formatDate(date: string | null): string {
  return date ? date.replace(/\//g, ".") : "";
}

export default formatDate;
