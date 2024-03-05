import * as p5 from "p5";

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 500);
  };

  p.draw = () => {
    p.background(220);
  };
};

export const myp5 = new p5(sketch, document.body);
