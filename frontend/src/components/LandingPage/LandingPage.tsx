import { Button, Grid, Typography } from "@mui/material";
import HeroSlider, { Overlay, Slide } from "hero-slider";
import { Link } from "react-router-dom";
import { constants } from "../../constants";
import "./LandingPage.css"

const bogliasco =
  "https://cdn.britannica.com/72/110272-050-3CDD8564/Benjamin-Franklin.jpg";
const countyClare = "https://images.immediate.co.uk/production/volatile/sites/4/2021/04/GettyImages-98328574-hero-72f8c48.jpg";
const craterRock = "https://daily.jstor.org/wp-content/uploads/2019/10/ada_lovelace_pioneer_1050x700.jpg";
const giauPass = "https://image.cnbcfm.com/api/v1/image/106823064-1610467334769-GettyImages-105929520.jpg";

export default function BasicSlider() {
  return (
    <HeroSlider
      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
        accessability={{
            shouldDisplayButtons: false
        }}
    >
      <Overlay className={"landingOverlay"}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={6}
            sx={{margin: "auto auto", position: 'absolute', top: "20%"}}>
                <Grid item>
                    <Typography component="h2" variant="h2" align="center" color="common.white">
                        Welcome to Project Whisper
                    </Typography>
                    <Typography component="h1" variant="h4" align="center" color="common.white">
                        Experience History Through Conversation.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{width:"60%", margin: "auto"}} component="h1" variant="body1" align="center" color="common.white" justifyContent="center">
                        HW is a project that attempts to allow modern day people to converse with historical figures of the past. Built on top of OpenAI, HW hopes to display the powers of AI and how it can be used to enhance certain experiences. 
                        This project serves as a small example of what can be built around up and coming, public AI models. 
                    </Typography>
                </Grid>
                <Grid item>
                    <Link to="/options" style={{textDecoration: 'none'}}>
                        <Button variant="contained" style={{backgroundColor: constants.styleColors.mainColor, padding:"10px 50px 10px 50px"}}>Start Talking</Button>
                    </Link>
                </Grid>
            </Grid>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Giau Pass - Italy"
        background={{
            backgroundImageSrc: giauPass,
          }}
      />

      <Slide
        shouldRenderMask
        label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide
        shouldRenderMask
        label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide
        shouldRenderMask
        label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock
        }}
      />
    </HeroSlider>
  );
}
