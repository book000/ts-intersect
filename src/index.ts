import { intersect } from "./solution";
type SvgInHtml = HTMLElement & SVGElement;

// 多角形の例
const examples = {
  first: [
    { x: 60, y: 60 },
    { x: 180, y: 0 },
    { x: 300, y: 60 },
    { x: 300, y: 300 },
    { x: 240, y: 180 },
    { x: 210, y: 180 },
    { x: 180, y: 240 },
    { x: 150, y: 180 },
    { x: 120, y: 180 },
    { x: 60, y: 300 },
  ],
  second: [
    { x: 300, y: 240 },
    { x: 330, y: 220 },
    { x: 330, y: 210 },
    { x: 270, y: 90 },
    { x: 230, y: 270 },
    { x: 210, y: 90 },
    { x: 180, y: 60 },
    { x: 150, y: 90 },
    { x: 140, y: 280 },
    { x: 90, y: 90 },
    { x: 30, y: 210 },
  ],
};

function drawPolygon(
  data: any[],
  container: { appendChild: (arg0: SVGPolygonElement) => void },
  color: string
) {
  const pol = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  const str = data
    .map(function (point: { x: string; y: string }) {
      return point.x + "," + point.y;
    })
    .join(" ");
  pol.setAttribute("points", str);
  pol.style.fill = color;
  container.appendChild(pol);
}

function drawAllPolygons(
  pol1: { x: number; y: number }[],
  pol2: { x: number; y: number }[]
) {
  drawPolygon(pol1, document.querySelector("svg.base") as SvgInHtml, "navy");
  drawPolygon(pol2, document.querySelector("svg.base") as SvgInHtml, "yellow");
  intersect(pol1, pol2).forEach(function (p) {
    drawPolygon(
      p,
      document.querySelector("svg.intersections") as SvgInHtml,
      "red"
    );
  });
}

function getTwoRandomPolygons(num1: number, num2: number) {
  const twoPolygons: { x: number; y: number }[][] = [[], []];
  let x: number, y: number;
  const nums = [num1, num2];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i]; j++) {
      x = Math.round(380 * Math.random() + 10);
      y = Math.round(380 * Math.random() + 10);
      twoPolygons[i].push({ x: x, y: y });
    }
  }
  //log(twoPolygons);
  return twoPolygons;
}

export function drawDefault() {
  drawAllPolygons(examples.first, examples.second);
}

export function drawRandom() {
  const svg1 = document.querySelector("svg.base") as SvgInHtml;
  let base = svg1.getElementsByTagName("*");
  for (let i = base.length - 1; i >= 0; i--) {
    svg1.removeChild(base[i]);
  }
  const svg2 = document.querySelector("svg.intersections") as SvgInHtml;
  base = svg2.getElementsByTagName("*");
  for (let i = base.length - 1; i >= 0; i--) {
    svg2.removeChild(base[i]);
  }
  const MAX = 100;
  const MIN = 3;
  const pol1 = document.getElementById("pol1") as HTMLInputElement;
  pol1.value = Math.round(parseInt(pol1.value)).toString();
  if (parseInt(pol1.value) > MAX) pol1.value = MAX.toString();
  if (parseInt(pol1.value) < MIN) pol1.value = MIN.toString();
  const pol2 = document.getElementById("pol2") as HTMLInputElement;
  pol2.value = Math.round(parseInt(pol2.value)).toString();
  if (parseInt(pol2.value) > MAX) pol2.value = MAX.toString();
  if (parseInt(pol2.value) < MIN) pol2.value = MIN.toString();
  const polygons = getTwoRandomPolygons(
    parseInt(pol1.value),
    parseInt(pol2.value)
  );
  drawAllPolygons(polygons[0], polygons[1]);
}

document.getElementById("draw-button")!.onclick = () => drawRandom();

drawDefault();
