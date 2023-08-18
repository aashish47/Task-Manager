import { Box } from "@mui/material";
import Companies from "../components/landing/Companies";
import Features from "../components/landing/Features";
import FeaturesHeading from "../components/landing/FeaturesHeading";
import Footer from "../components/landing/Footer";
import GetStartedSection from "../components/landing/GetStartedSection";
import Header from "../components/landing/Header";
import IntroHeading from "../components/landing/IntroHeading";
import IntroList from "../components/landing/IntroList";
import UseCasesHeading from "../components/landing/UseCasesHeading";
import Views from "../components/landing/Views";
import Workflows from "../components/landing/Workflows";
import WorkflowsHeading from "../components/landing/WorkflowsHeading";
import { navHeightLanding } from "../constants/constants";

const Landing = () => {
    return (
        <Box sx={{ overflowX: "hidden", overflowY: "auto", maxHeight: `calc(100vh - ${navHeightLanding}px)` }}>
            <Header />
            <IntroHeading />
            <IntroList />
            <WorkflowsHeading />
            <Workflows />
            <UseCasesHeading />
            <Views />
            <FeaturesHeading />
            <Features />
            <Companies />
            <GetStartedSection />
            <Footer />
        </Box>
    );
};

export default Landing;
