import React, { useState } from "react";
import { Typography, Card, Avatar, Tag } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import Help from "./Help";
const { Meta } = Card;
const { Title, Paragraph } = Typography;

export default function Listing({ listing }) {
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  return (
    <>
      <Card
        style={{ width: 300, marginTop: 20 }}
        actions={[
          <EditOutlined onClick={() => setHelpModalVisible(true)} key="edit" />
        ]}
      >
        <Meta
          avatar={
            <Avatar
              src={`https://robohash.org/${listing.name}${listing.id}.png`}
            />
          }
          title={listing.name}
        ></Meta>
        <Typography style={{ marginTop: 15, wordWrap: "break-word" }}>
          <Paragraph>
            <strong>Profession: </strong> {listing.profession}
          </Paragraph>
          <Paragraph>
            <strong>Location: </strong>
            {listing.general_location ? listing.general_location + ", " : null}
            {listing.city + ", "}
            {listing.country}
          </Paragraph>
          <Paragraph>
            <strong>Description: </strong>
            {listing.description}
          </Paragraph>
          <Paragraph>
            <strong>Can Offer: </strong>
            {listing.offers.map(offer => (
              <Tag color="#108ee9" style={{ margin: "3px" }}>
                {offer.name}
              </Tag>
            ))}
          </Paragraph>
        </Typography>
      </Card>
      <Help
        listing={listing}
        setIsVisible={setHelpModalVisible}
        isVisible={helpModalVisible}
      />
    </>
  );
}
