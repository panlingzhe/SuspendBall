import React from "react";
import { storiesOf } from "@storybook/react";
import SuspendBall from "../src";
import "./style.less";

storiesOf("suspend ball", module)
  .add("default", () => (
    <div>
      <SuspendBall
        style={{ width: 100, height: 100 }}
        startLeft={0}
        startTop={0}
      >
        <div className="test"></div>
      </SuspendBall>
    </div>
  ))
  .add("autoFix", () => (
    <div>
      <SuspendBall
        style={{ width: 100, height: 100 }}
        startLeft={0}
        startTop={0}
        autoFix={true}
      >
        <div className="test"></div>
      </SuspendBall>
    </div>
  ));
