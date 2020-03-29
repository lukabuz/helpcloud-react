import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@material-ui/core";
import countries from "../assets/countries";
import {
  Cascader,
  Input,
  Checkbox,
  Typography,
  Button,
  Spin,
  Empty
} from "antd";
import Listings from "./Listings";
import { useToasts } from "react-toast-notifications";
import { getVoulenteers } from "../Utils/ApiUtil";

export default function Main({ reasons }) {
  const { addToast } = useToasts();
  const [residence, setResidence] = useState([]);
  const [generalLocation, setGeneralLocation] = useState(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voulenteers, setVoulenteers] = useState([]);

  function filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  const submit = () => {
    console.log(generalLocation);
    setIsLoading(true);
    getVoulenteers(residence[0], residence[1], generalLocation, offers)
      .then(res => {
        setVoulenteers(res);
        setIsLoading(false);
      })
      .catch(e => e.forEach(error => addToast(error, { appearance: "error" })));
  };

  useEffect(() => {
    submit();
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} md={5} style={{ margin: "10px" }}>
            <Typography>Your Country and City</Typography>
            <Divider style={{ margin: "5px" }} />
            <Cascader
              options={countries}
              placeholder="Please select your country and city"
              showSearch={{ filter }}
              onChange={val => setResidence(val)}
            />
          </Grid>
          <Grid item xs={12} md={5} style={{ margin: "10px" }}>
            <Typography>General Location(district, street, etc.)</Typography>
            <Divider style={{ margin: "5px" }} />
            <Input
              value={generalLocation}
              onChange={e => setGeneralLocation(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={9} style={{ margin: "10px" }}>
            <Typography>What type of services do you require?</Typography>
            <Divider style={{ margin: "5px" }} />
            <Checkbox.Group
              options={reasons.map(val => {
                return { label: val.name, value: val.id };
              })}
              onChange={value => setOffers(value)}
            />
          </Grid>
          <Grid item xs={2} style={{ margin: "10px" }}>
            <Button onClick={submit} type="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      {!isLoading && voulenteers.length === 0 && (
        <Empty
          style={{ margin: "20px", marginTop: "20px" }}
          description={
            <span>No voulenteers were found matching your search</span>
          }
        ></Empty>
      )}
      {isLoading ? (
        <Grid
          style={{ margin: "20px", marginTop: "20%" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Spin size="large" />
        </Grid>
      ) : (
        <Listings listings={voulenteers} />
      )}
    </>
  );
}
