import { useState, useEffect } from "react";
import { Statistic, Typography, Card, Row, Col, message } from "antd";
import CountUp from "react-countup";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../Footer";

const formatter = (value) => <CountUp end={value} separator="," />;

export default function Dashboard() {
  const [totalNormalVictims, setTotalNormalVictims] = useState(0);
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalModeration, setTotalModeration] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/dashboard-records"
        );
        const data = response.data;

        setTotalNormalVictims(data.totalNormalVictims);
        setTotalFarmers(data.totalFarmers);
        setTotalFeedbacks(data.totalFeedbacks);
        setTotalComplaints(data.totalComplaints);
        setTotalModeration(data.totalModeration);
      } catch (error) {
        message.error("Error fetching dashboard records:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <NavbarAdmin />
      <Typography.Title
        level={2}
        style={{ marginTop: "2rem", marginLeft: "12px" }}
      >
        Dashboard
      </Typography.Title>
      <Row gutter={[16, 16]} wrap>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Number of Normal Victims"
              value={totalNormalVictims}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Number of Farmers"
              value={totalFarmers}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Number of Feedbacks"
              value={totalFeedbacks}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Number of Complaints"
              value={totalComplaints}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Number of Reports"
              value={totalModeration}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6} xxl={6} xl={6} lg={6} md={6} sm={12} xs={24}>
          <Card bordered={false} style={{ backgroundColor: "#f9f9f9" }}>
            <Statistic
              title="Total Number of Predictions"
              value={37}
              valueStyle={styles}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ bottom: "0", width: "100%", marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

const styles = {
  color: "#3bb19b",
  fontSize: 30,
};
