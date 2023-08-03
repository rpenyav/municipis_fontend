export function formatString(input: string | undefined): string | undefined {
  return input
    ?.toLowerCase()
    .replace(/ /g, "-")
    .replace(/ç/g, "c")
    .replace(/[´'`]/g, "")
    .replace(/[àá]/g, "a")
    .replace(/[èé]/g, "e")
    .replace(/[ìí]/g, "i")
    .replace(/[òó]/g, "o")
    .replace(/[ùú]/g, "u");
}
