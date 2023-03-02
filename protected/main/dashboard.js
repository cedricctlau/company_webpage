import { hideBtn } from "../navbar";
import { loadAncmt } from "./loadAncmt";

window.onload(async () => {
  await hideBtn();
  await loadAncmt();
});


