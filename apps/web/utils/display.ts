export const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

/* If this was a real feature, I would set these up within the .css files as a @mixin or 
some other sass-first approach */
export const BLUE_SHADES: string[] = [
  "#107AB0",
  "#0047AB",
  "#4169E1",
  "#6495ED",
  "#ADD8E6",
  "#89CFF0",
  "#000080",
  "#191970",
  "#4682B4",
];
