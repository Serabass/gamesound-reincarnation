let App = require("@inertiajs/inertia-react").App;
import { InertiaProgress } from "@inertiajs/progress";

import React from "react";
import { render } from "react-dom";

require("./bootstrap");

InertiaProgress.init();
const el = document.getElementById("app");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let component = React.createElement(App, {
  initialPage: JSON.parse(el?.dataset.page as any),
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  resolveComponent: (name: any) => require(`./${name}`).default
});

render(component, el);
