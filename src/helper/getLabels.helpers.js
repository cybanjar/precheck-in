const labels = JSON.parse(localStorage.getItem("langs"));

export function getLabels(nameKey) {
  for (let x = 0; x < labels.length; x++) {
    if (labels[x]["lang-variable"] === nameKey) {
      const splitStr = labels[x]["lang-value"].toLowerCase().split(" ");
      for (let y = 0; y < splitStr.length; y++) {
        splitStr[y] =
          splitStr[y].charAt(0).toUpperCase() + splitStr[y].substring(1);
      }
      return splitStr.join(" ");
    }
  }
}
