import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography, Button } from "antd";
import { getVoulenteers } from "../Utils/ApiUtil";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const [voulenteers, setVoulenteers] = useState(0);
  const history = useHistory();

  const props = useSpring({
    number: voulenteers,
    from: { number: 0 },
    config: { duration: 1000 }
  });

  useEffect(() => {
    let isCancelled = false;

    getVoulenteers().then(res => {
      if (isCancelled) return;
      setVoulenteers(res.length);
    });

    return () => (isCancelled = true);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item>
        <Typography.Title>
          Join{" "}
          <animated.span>
            {props.number.interpolate(val => Math.floor(val))}
          </animated.span>{" "}
          people at saving lives
        </Typography.Title>
        <Typography.Paragraph>
          Helpcloud connects voulenteers with at-risk individuals in need during
          this crisis
        </Typography.Paragraph>
      </Grid>
      <Grid item>
        <Button type="primary" onClick={() => history.push("/volunteer")}>
          Become a voulenteer
        </Button>
        <Button
          type="default"
          onClick={() => history.push("/listings")}
          style={{ marginLeft: "16px" }}
        >
          Seek help
        </Button>
      </Grid>
    </Grid>
  );
}
